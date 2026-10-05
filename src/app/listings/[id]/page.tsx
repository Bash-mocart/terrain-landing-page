import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { TerrainLogo } from "@/components/TerrainLogo";
import { StoreButtons } from "@/components/StoreButtons";
import { ApiError } from "@/lib/api";
import { getExploreListing } from "@/lib/explore";
import type { Listing } from "@/lib/types";

// Where a listing shared from the app lands (www.terrain.ng/listings/<id>).
// On a phone with the app installed, iOS opens the app straight to the
// listing (apple-app-site-association claims /listings/*), so this page is
// the link preview in WhatsApp and the fallback for everyone else.

type Props = { params: Promise<{ id: string }> };

// generateMetadata and the page both read it; one request.
const getListing = cache((id: string) => getExploreListing(id));

// TODO(backend): drop the fallback once the API serving this site returns
// share.image_url (terra-backend #206); listings often lead with a video.
function coverOf(listing: Listing) {
  return (
    listing.share?.image_url ??
    listing.image_urls?.find((u) => !/\.(mp4|mov)$/i.test(u))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const listing = await getListing(id);
    const title = listing.share?.text ?? listing.title ?? "Property on Terrain";
    const description = listing.title
      ? `${listing.title}. Listed by ${listing.seller_name ?? "a seller"} on Terrain.`
      : "See this property on Terrain.";
    const cover = coverOf(listing);
    const url = listing.share?.url ?? `/listings/${id}`;
    const images = cover ? [{ url: cover }] : undefined;
    return {
      title,
      description,
      alternates: { canonical: `/listings/${id}` },
      openGraph: {
        title,
        description,
        url,
        siteName: "Terrain",
        type: "website",
        images,
      },
      twitter: {
        card: cover ? "summary_large_image" : "summary",
        title,
        description,
        images: cover ? [cover] : undefined,
      },
    };
  } catch (error) {
    // The page itself shows the 404 or rethrows; the preview falls back to
    // the site's default card.
    console.error("listing share metadata", id, error);
    return { title: "Property on Terrain" };
  }
}

export default async function SharedListingPage({ params }: Props) {
  const { id } = await params;
  let listing: Awaited<ReturnType<typeof getListing>>;
  try {
    listing = await getListing(id);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    throw error;
  }
  const cover = coverOf(listing);
  const line = listing.share?.text ?? listing.place_label;

  return (
    <main className="flex min-h-dvh flex-col items-center bg-canvas px-6 py-10">
      <Link href="/" aria-label="Terrain home">
        <TerrainLogo />
      </Link>
      <article className="mt-10 w-full max-w-md overflow-hidden rounded-3xl border border-border-rule bg-white">
        {cover && (
          // eslint-disable-next-line @next/next/no-img-element -- listing photos come from any media host; next/image would need each in remotePatterns
          <img
            src={cover}
            alt={listing.title || "Property photo"}
            className="aspect-[4/3] w-full object-cover"
          />
        )}
        <div className="p-6">
          {listing.is_verified && (
            <span className="inline-flex rounded-full bg-verified px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
              Verified
            </span>
          )}
          <h1
            className="mt-3 text-3xl leading-tight text-primary"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {listing.title || "Property on Terrain"}
          </h1>
          {line && <p className="mt-2 text-secondary">{line}</p>}
          {listing.seller_name && (
            <p className="mt-4 text-sm text-secondary">
              Listed by{" "}
              <span className="font-semibold text-primary">
                {listing.seller_name}
              </span>
            </p>
          )}
        </div>
      </article>
      <section className="mt-8 flex w-full max-w-md flex-col items-center text-center">
        <h2
          className="text-2xl text-primary"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Open in the Terrain app
        </h2>
        <p className="mt-2 text-secondary">
          Message the seller and save this property in the app. Already have
          it? Open this link on your phone.
        </p>
        <div className="mt-6">
          <StoreButtons />
        </div>
        <Link
          href={`/listing/${encodeURIComponent(listing.id)}`}
          className="mt-6 text-sm font-semibold text-verified"
        >
          See full details on the web
        </Link>
      </section>
    </main>
  );
}
