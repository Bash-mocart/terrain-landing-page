import type { Listing } from "@/lib/types";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(price);
}

function firstImage(listing: Listing) {
  return listing.image_urls?.find((url) => /^https?:\/\//.test(url));
}

export function ListingCard({ listing }: { listing: Listing }) {
  const image = firstImage(listing);
  const location = [listing.city, listing.state].filter(Boolean).join(", ");

  return (
    <article className="group overflow-hidden rounded-3xl border border-border-rule bg-white">
      <div
        className="aspect-[4/3] bg-[color-mix(in_oklch,var(--color-border-rule)_55%,var(--color-canvas))] bg-cover bg-center"
        style={
          image
            ? { backgroundImage: `url(${JSON.stringify(image)})` }
            : undefined
        }
        role={image ? "img" : undefined}
        aria-label={
          image ? `Photo of ${listing.title ?? "property"}` : undefined
        }
      >
        <div className="flex h-full items-start justify-between p-4">
          {listing.is_verified && (
            <span className="rounded-full bg-verified px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
              Verified
            </span>
          )}
          {listing.has_payment_plan && (
            <span className="ml-auto rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-canvas">
              Installments
            </span>
          )}
        </div>
      </div>
      <div className="p-5">
        <p className="text-lg font-bold text-primary">
          {formatPrice(Number(listing.price) || 0)}
        </p>
        <h3 className="mt-1 line-clamp-1 text-base text-primary">
          {listing.title || "Verified property"}
        </h3>
        <p className="mt-2 text-sm text-secondary">
          {location || "Nigeria"}
          {listing.size_sqm
            ? ` · ${listing.size_sqm.toLocaleString("en-NG")} sqm`
            : ""}
        </p>
      </div>
    </article>
  );
}
