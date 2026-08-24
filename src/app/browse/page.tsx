import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { BrowseFilters } from "@/components/browse/BrowseFilters";
import { ListingCard } from "@/components/browse/ListingCard";
import { TerrainLogo } from "@/components/TerrainLogo";
import {
  getBrowseCities,
  getBrowseFeed,
  getListingTaxonomy,
  getTerrainPicks,
  getVerifiedThisWeek,
} from "@/lib/browse";
import type { Listing } from "@/lib/types";

export const metadata: Metadata = {
  title: "Browse verified property | Terrain",
  description:
    "Browse verified land and homes from vetted real estate companies across Nigeria.",
};

type BrowseSearchParams = Promise<{
  city?: string | string[];
  type?: string | string[];
  subtype?: string | string[];
  q?: string | string[];
}>;

function valueOf(value: string | string[] | undefined) {
  return typeof value === "string" ? value : "";
}

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: BrowseSearchParams;
}) {
  const params = await searchParams;
  const filters = {
    city: valueOf(params.city),
    typeSlug: valueOf(params.type),
    subtypeSlug: valueOf(params.subtype),
    query: valueOf(params.q),
  };

  const [feed, hero, verified, cities, taxonomy] = await Promise.all([
    getBrowseFeed(filters),
    getTerrainPicks(),
    getVerifiedThisWeek(filters),
    getBrowseCities(),
    getListingTaxonomy(),
  ]);
  const picks = (hero.slides ?? []).map((slide) => slide.listing);
  const feedListings = feed.results ?? [];
  const verifiedListings = verified.results ?? [];
  const cityCounts = cities ?? [];
  const otherCities = cityCounts.filter((item) => item.city !== filters.city);
  const heading = filters.city
    ? `Now in ${filters.city}`
    : "Properties on record";

  return (
    <main className="min-h-screen bg-canvas">
      <header className="border-b border-border-rule bg-canvas/95">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-5 sm:px-8 lg:px-10">
          <Link href="/" aria-label="Terrain home">
            <TerrainLogo />
          </Link>
          <Link
            href="/"
            className="text-sm font-semibold text-secondary transition-colors hover:text-primary"
          >
            Back to home
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-[1280px] px-6 py-10 sm:px-8 sm:py-14 lg:px-10">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-verified">
            Verified property marketplace
          </p>
          <h1 className="mt-3 font-display text-[clamp(38px,6vw,64px)] font-bold leading-none tracking-tight">
            Find property you can trust.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-secondary sm:text-lg">
            Browse land and homes listed by real estate companies Terrain has
            vetted.
          </p>
        </div>

        <div className="mt-9 rounded-3xl border border-border-rule bg-white p-4 sm:p-6">
          <Suspense
            fallback={
              <div className="h-24 animate-pulse rounded-2xl bg-border-rule/60" />
            }
          >
            <BrowseFilters
              cities={cityCounts}
              taxonomy={{ types: taxonomy.types ?? [] }}
              city={filters.city}
              typeSlug={filters.typeSlug}
              subtypeSlug={filters.subtypeSlug}
              query={filters.query}
            />
          </Suspense>
        </div>

        {picks.length > 0 && (
          <PropertySection
            title="Terrain Pick"
            listings={picks}
            className="mt-14"
          />
        )}

        <PropertySection
          title={heading}
          eyebrow={`${feed.total} ${feed.total === 1 ? "property" : "properties"}`}
          listings={feedListings}
          className="mt-14"
          emptyMessage="No properties match these filters yet."
        />

        {verifiedListings.length > 0 && (
          <PropertySection
            title="Verified this week"
            listings={verifiedListings}
            className="mt-14"
          />
        )}

        {otherCities.length > 0 && (
          <section className="mt-16 border-t border-border-rule pt-10">
            <h2 className="font-display text-3xl font-bold tracking-tight">
              Explore other cities
            </h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {otherCities.map((item) => (
                <Link
                  key={`${item.city}-${item.state}`}
                  href={`/browse?city=${encodeURIComponent(item.city)}`}
                  className="rounded-full border border-border-rule bg-white px-5 py-3 text-sm text-primary transition-colors hover:border-primary"
                >
                  {item.city} · {item.plot_count}
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

function PropertySection({
  title,
  eyebrow,
  listings,
  className,
  emptyMessage,
}: {
  title: string;
  eyebrow?: string;
  listings: Listing[];
  className?: string;
  emptyMessage?: string;
}) {
  return (
    <section className={className}>
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {listings.length > 0 ? (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-3xl border border-dashed border-border-rule px-6 py-14 text-center text-secondary">
          {emptyMessage ?? "Nothing has been selected for this section yet."}
        </div>
      )}
    </section>
  );
}
