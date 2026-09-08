"use client";

import type { Listing } from "@/lib/types";
import Link from "next/link";

type Props = {
  listing?: Listing;
  error?: string | null;
  loading?: boolean;
  onRetry?: () => void;
  onClose: () => void;
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-NG", {
    currency: "NGN",
    maximumFractionDigits: 0,
    style: "currency",
  }).format(price);
}

function firstImage(listing: Listing) {
  return listing.image_urls?.find((url) => /^https?:\/\//.test(url));
}

export function ListingPreviewCard({
  listing,
  error,
  loading = false,
  onRetry,
  onClose,
}: Props) {
  const image = listing && firstImage(listing);
  const location = listing
    ? [listing.city, listing.state].filter(Boolean).join(", ") || "Nigeria"
    : "";

  return (
    <aside
      aria-label="Selected property preview"
      className="absolute inset-x-4 bottom-6 z-20 overflow-hidden rounded-3xl border border-border-rule bg-canvas shadow-2xl sm:inset-x-auto sm:left-6 sm:w-[min(380px,calc(100vw-3rem))]"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close property preview"
        className="absolute right-3 top-3 z-10 flex size-9 items-center justify-center rounded-full bg-canvas/90 text-xl text-primary shadow-sm"
      >
        ×
      </button>

      {loading && (
        <div role="status" className="p-6 text-sm text-secondary">
          Loading property…
        </div>
      )}

      {!loading && error && (
        <div className="p-6">
          <p className="font-semibold text-primary">{error}</p>
          <button
            type="button"
            onClick={onRetry}
            className="mt-4 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-canvas"
          >
            Try again
          </button>
        </div>
      )}

      {!loading && !error && listing && (
        <>
          <div
            className="aspect-[16/9] bg-border-rule bg-cover bg-center"
            style={image ? { backgroundImage: `url(${JSON.stringify(image)})` } : undefined}
            role={image ? "img" : undefined}
            aria-label={image ? `Photo of ${listing.title ?? "property"}` : undefined}
          />
          <div className="p-5">
            <div className="flex items-start gap-2">
              <div>
                <p className="text-lg font-bold text-primary">
                  {formatPrice(Number(listing.price) || 0)}
                </p>
                <h2 className="mt-1 text-base font-semibold text-primary">
                  {listing.title || "Verified property"}
                </h2>
              </div>
              {listing.is_verified && (
                <span className="ml-auto shrink-0 rounded-full bg-verified px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
                  Verified
                </span>
              )}
            </div>
            <p className="mt-2 text-sm text-secondary">
              {location}
              {listing.size_sqm
                ? ` · ${listing.size_sqm.toLocaleString("en-NG")} sqm`
                : ""}
            </p>
            {listing.description && (
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-secondary">
                {listing.description}
              </p>
            )}
            {listing.seller_name && (
              <p className="mt-4 border-t border-border-rule pt-3 text-xs font-semibold uppercase tracking-[0.12em] text-secondary">
                Listed by {listing.seller_name}
              </p>
            )}
            <Link
              href={`/listing/${encodeURIComponent(listing.id)}?from=explore`}
              className="mt-5 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-canvas"
            >
              View full listing
            </Link>
          </div>
        </>
      )}
    </aside>
  );
}
