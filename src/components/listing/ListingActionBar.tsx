"use client";

import { useState } from "react";
import type { Listing } from "@/lib/types";
import { SaveButton } from "@/components/saved/SaveButton";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-NG", {
    currency: "NGN",
    maximumFractionDigits: 0,
    style: "currency",
  }).format(price);
}

function cleanShareUrl() {
  return `${window.location.origin}${window.location.pathname}`;
}

export function ListingShareButton({ title }: { title?: string }) {
  const [notice, setNotice] = useState("");

  async function share() {
    const url = cleanShareUrl();
    const shareData = {
      title: title || "Terrain property",
      text: title || "View this property on Terrain",
      url,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setNotice("Link copied");
      } else {
        setNotice("Copy this page URL to share it");
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setNotice("We couldn't share this listing.");
    }
    window.setTimeout(() => setNotice(""), 2500);
  }

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => void share()}
        className="rounded-full border border-border-rule px-5 py-2.5 text-sm font-semibold text-primary"
      >
        Share
      </button>
      {notice && (
        <p className="text-xs text-secondary" aria-live="polite">
          {notice}
        </p>
      )}
    </div>
  );
}

export function ListingActionBar({ listing }: { listing: Listing }) {
  return (
    <div className="sticky bottom-[calc(4.5rem+env(safe-area-inset-bottom))] z-20 mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-border-rule bg-canvas/95 px-1 py-4 backdrop-blur md:hidden">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary">
          Asking price
        </p>
        <p className="mt-1 text-xl font-bold text-primary">
          {formatPrice(Number(listing.price) || 0)}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <ListingShareButton title={listing.title} />
        <SaveButton listingId={listing.id} />
      </div>
    </div>
  );
}
