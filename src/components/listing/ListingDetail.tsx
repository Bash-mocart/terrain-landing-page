import Link from "next/link";
import type { Listing } from "@/lib/types";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-NG", {
    currency: "NGN",
    maximumFractionDigits: 0,
    style: "currency",
  }).format(price);
}

function validImages(listing: Listing) {
  return (listing.image_urls ?? []).filter((url) => /^https?:\/\//.test(url));
}

function imageStyle(url: string) {
  return { backgroundImage: `url(${JSON.stringify(url)})` };
}

export function ListingDetail({
  listing,
  error,
}: {
  listing?: Listing;
  error?: string;
}) {
  if (error || !listing) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-canvas px-6">
        <div className="max-w-md text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-verified">
            Listing unavailable
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-primary">
            We couldn’t load this property.
          </h1>
          <p className="mt-4 leading-relaxed text-secondary">
            {error ?? "Check your connection and try again."}
          </p>
          <Link
            href="/browse"
            className="mt-8 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-canvas"
          >
            Browse properties
          </Link>
        </div>
      </main>
    );
  }

  const images = validImages(listing);
  const location = [listing.city, listing.state].filter(Boolean).join(", ");

  return (
    <main className="min-w-0 bg-canvas">
      <div className="mx-auto max-w-[1280px] px-6 py-8 sm:px-8 sm:py-12 lg:px-10">
        <Link href="/browse" className="text-sm font-semibold text-verified">
          ← Browse properties
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)] lg:items-start">
          <section aria-label="Property photos">
            {images.length > 0 ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {images.map((image, index) => (
                  <div
                    key={image}
                    className={`min-h-64 rounded-3xl bg-border-rule bg-cover bg-center ${
                      index === 0 ? "sm:col-span-2 sm:min-h-[460px]" : ""
                    }`}
                    style={imageStyle(image)}
                    role="img"
                    aria-label={`Property photo ${index + 1}`}
                  />
                ))}
              </div>
            ) : (
              <div className="flex min-h-[360px] items-center justify-center rounded-3xl bg-border-rule text-secondary">
                No property photos available
              </div>
            )}
          </section>

          <article className="rounded-3xl border border-border-rule bg-white p-6 sm:p-8 lg:sticky lg:top-28">
            <div className="flex items-start gap-3">
              <div>
                <p className="text-2xl font-bold text-primary">
                  {formatPrice(Number(listing.price) || 0)}
                </p>
                <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-primary">
                  {listing.title || "Verified property"}
                </h1>
              </div>
              {listing.is_verified && (
                <span className="ml-auto shrink-0 rounded-full bg-verified px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
                  Verified
                </span>
              )}
            </div>

            <p className="mt-4 text-secondary">
              {location || "Nigeria"}
              {listing.address ? ` · ${listing.address}` : ""}
            </p>

            <dl className="mt-6 grid grid-cols-2 gap-4 border-y border-border-rule py-5 text-sm">
              {listing.size_sqm ? (
                <div>
                  <dt className="text-secondary">Size</dt>
                  <dd className="mt-1 font-semibold text-primary">
                    {listing.size_sqm.toLocaleString("en-NG")} sqm
                  </dd>
                </div>
              ) : null}
              {listing.type_slug ? (
                <div>
                  <dt className="text-secondary">Property type</dt>
                  <dd className="mt-1 font-semibold capitalize text-primary">
                    {listing.type_slug}
                  </dd>
                </div>
              ) : null}
              {listing.certificate_type ? (
                <div>
                  <dt className="text-secondary">Documentation</dt>
                  <dd className="mt-1 font-semibold text-primary">
                    {listing.certificate_type}
                  </dd>
                </div>
              ) : null}
              {listing.has_payment_plan ? (
                <div>
                  <dt className="text-secondary">Payment</dt>
                  <dd className="mt-1 font-semibold text-primary">
                    Installments available
                  </dd>
                </div>
              ) : null}
            </dl>

            {listing.seller_name && (
              <p className="mt-5 text-sm text-secondary">
                Listed by <span className="font-semibold text-primary">{listing.seller_name}</span>
              </p>
            )}
          </article>
        </div>

        {listing.description && (
          <section className="mt-10 max-w-3xl">
            <h2 className="font-display text-2xl font-bold text-primary">
              About this property
            </h2>
            <p className="mt-4 whitespace-pre-line leading-relaxed text-secondary">
              {listing.description}
            </p>
          </section>
        )}
      </div>
    </main>
  );
}
