import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import { ListingCard } from "@/components/browse/ListingCard";
import { StoreButtons } from "@/components/StoreButtons";
import { ApiError } from "@/lib/api";
import { getCompanyPage } from "@/lib/company";

// Where a shared company link (www.terrain.ng/company/<id>) lands. With the
// app installed, iOS opens the company in the app instead (the
// apple-app-site-association file claims /company/*); everyone else sees the
// company here, with its live listings and a way to get the app.

const load = cache(getCompanyPage);

function validImage(url?: string) {
  return url && /^https?:\/\//.test(url) ? url : undefined;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  try {
    const p = await load(id);
    const description = p.share_text.split("\n")[0];
    const logo = validImage(p.logo_url);
    return {
      title: `${p.name} | Terrain`,
      description,
      openGraph: {
        title: p.name,
        description,
        images: logo ? [{ url: logo }] : undefined,
      },
    };
  } catch {
    return { title: "Real estate company | Terrain" };
  }
}

export default async function CompanyPublicPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let p: Awaited<ReturnType<typeof getCompanyPage>>;
  try {
    p = await load(id);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    throw error;
  }
  const logo = validImage(p.logo_url);
  const facts = [p.price_range_label, p.plans_label].filter(Boolean);

  return (
    <main className="min-w-0 bg-canvas">
      <div className="mx-auto max-w-[1280px] px-6 py-10 sm:px-8 sm:py-14 lg:px-10">
        <section className="rounded-3xl border border-border-rule bg-white p-6 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <div
              className="flex size-24 shrink-0 items-center justify-center rounded-3xl bg-border-rule bg-cover bg-center text-3xl font-bold text-primary"
              style={logo ? { backgroundImage: `url(${JSON.stringify(logo)})` } : undefined}
              role={logo ? "img" : undefined}
              aria-label={logo ? `${p.name} logo` : undefined}
            >
              {!logo && p.name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-display text-3xl font-bold tracking-tight text-primary">
                  {p.name}
                </h1>
                {p.verified && (
                  <span className="rounded-full bg-verified px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
                    Verified
                  </span>
                )}
              </div>
              {p.registry_label && (
                <p className="mt-2 text-sm text-secondary">{p.registry_label}</p>
              )}
              {p.office?.label && (
                <p className="mt-1 text-sm text-secondary">{p.office.label}</p>
              )}
              {p.reply_label && (
                <p className="mt-1 text-sm text-secondary">{p.reply_label}</p>
              )}
              {p.stats.length > 0 && (
                <dl className="mt-6 grid max-w-xl grid-cols-3 gap-3">
                  {p.stats.slice(0, 3).map((s) => (
                    <div key={s.label} className="rounded-2xl border border-border-rule px-4 py-3">
                      <dt className="sr-only">{s.label}</dt>
                      <dd className="font-display text-3xl font-bold text-primary">{s.value}</dd>
                      <dd className="text-sm text-secondary">{s.label}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {facts.length > 0 && (
                <p className="mt-4 text-sm text-secondary">{facts.join(" · ")}</p>
              )}
              <div className="mt-6">
                <p className="mb-3 text-sm font-semibold text-primary">
                  Message {p.name} and follow their new listings in the app
                </p>
                <StoreButtons />
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Live listings
          </h2>
          {p.listings.length === 0 ? (
            <div className="mt-6 rounded-3xl border border-dashed border-border-rule px-6 py-14 text-center text-secondary">
              No live listings right now.
            </div>
          ) : (
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {p.listings.map((listing) => (
                <Link
                  key={listing.id}
                  href={`/listing/${encodeURIComponent(listing.id)}`}
                  className="block rounded-3xl transition-transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-verified"
                >
                  <ListingCard listing={listing} />
                </Link>
              ))}
            </div>
          )}
          {p.see_all_label && (
            <p className="mt-6 text-sm text-secondary">
              {p.see_all_label} in the Terrain app.
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
