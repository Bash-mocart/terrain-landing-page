import Link from "next/link";
import { ListingCard } from "@/components/browse/ListingCard";
import type { Listing, PublicSellerProfile } from "@/lib/types";

function validImage(url?: string) {
  return url && /^https?:\/\//.test(url) ? url : undefined;
}

function sellerName(profile: PublicSellerProfile) {
  return profile.company_name || profile.full_name || "Terrain seller";
}

export function SellerProfile({
  profile,
  listings,
  listingsError,
  error,
}: {
  profile?: PublicSellerProfile;
  listings: Listing[];
  listingsError?: string;
  error?: string;
}) {
  if (error || !profile) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-canvas px-6">
        <div className="max-w-md text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-verified">
            Seller unavailable
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-primary">
            We couldn’t load this seller.
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

  const avatar = validImage(profile.avatar_url);
  const companyLogo = validImage(profile.company_logo_url);
  const name = sellerName(profile);

  return (
    <main className="min-w-0 bg-canvas">
      <div className="mx-auto max-w-[1280px] px-6 py-10 sm:px-8 sm:py-14 lg:px-10">
        <Link href="/browse" className="text-sm font-semibold text-verified">
          ← Browse properties
        </Link>

        <section className="mt-6 rounded-3xl border border-border-rule bg-white p-6 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <div
              className="flex size-24 shrink-0 items-center justify-center rounded-3xl bg-border-rule bg-cover bg-center text-3xl font-bold text-primary"
              style={
                avatar || companyLogo
                  ? { backgroundImage: `url(${JSON.stringify(companyLogo ?? avatar)})` }
                  : undefined
              }
              role={avatar || companyLogo ? "img" : undefined}
              aria-label={avatar || companyLogo ? `${name} profile photo` : undefined}
            >
              {!avatar && !companyLogo && name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-display text-3xl font-bold tracking-tight text-primary">
                  {name}
                </h1>
                {(profile.company_verified || profile.kyc_verified) && (
                  <span className="rounded-full bg-verified px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
                    Verified
                  </span>
                )}
              </div>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-secondary">
                {profile.seller_type && <span>{profile.seller_type}</span>}
                {profile.location && <span>{profile.location}</span>}
                {profile.listings_count !== undefined && (
                  <span>{profile.listings_count} listings</span>
                )}
              </div>
              {profile.bio && (
                <p className="mt-5 max-w-2xl whitespace-pre-line leading-relaxed text-secondary">
                  {profile.bio}
                </p>
              )}
              {profile.company_name && profile.full_name && (
                <p className="mt-4 text-sm text-secondary">
                  Contact person: <span className="font-semibold text-primary">{profile.full_name}</span>
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="mt-12">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
            {profile.listings_count ?? listings.length} {profile.listings_count === 1 ? "listing" : "listings"}
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Properties from {name}
          </h2>
          {listingsError ? (
            <div className="mt-6 rounded-3xl border border-border-rule px-6 py-14 text-center text-secondary">
              <p className="font-semibold text-primary">{listingsError}</p>
              <p className="mt-2">The seller profile is still available.</p>
            </div>
          ) : listings.length === 0 ? (
            <div className="mt-6 rounded-3xl border border-dashed border-border-rule px-6 py-14 text-center text-secondary">
              This seller has no available listings yet.
            </div>
          ) : (
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {listings.map((listing) => (
                <Link
                  key={listing.id}
                  href={`/listing/${encodeURIComponent(listing.id)}?from=seller`}
                  className="block rounded-3xl transition-transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-verified"
                >
                  <ListingCard listing={listing} />
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
