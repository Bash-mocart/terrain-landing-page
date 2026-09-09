"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ApiError } from "@/lib/api";
import { getSavedListings } from "@/lib/saved";
import type { Listing } from "@/lib/types";
import { ListingCard } from "@/components/browse/ListingCard";
import { SaveButton } from "./SaveButton";

export function SavedListings() {
  const router = useRouter();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    getSavedListings()
      .then((savedListings) => {
        if (active) setListings(savedListings);
      })
      .catch((requestError) => {
        if (!active) return;
        if (requestError instanceof ApiError && requestError.status === 401) {
          router.replace("/login");
          return;
        }
        setError("We couldn't load your saved properties.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [router]);

  if (loading) {
    return (
      <main className="bg-canvas" aria-busy="true" aria-label="Loading saved properties">
        <div className="mx-auto max-w-6xl px-6 py-10 sm:px-8 sm:py-14">
          <div className="h-10 w-56 animate-pulse rounded bg-border-rule/70" />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }, (_, index) => (
              <div key={index} className="h-80 animate-pulse rounded-3xl bg-border-rule/60" />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-canvas px-6">
        <p className="text-center text-secondary">{error}</p>
      </main>
    );
  }

  return (
    <main className="min-w-0 bg-canvas">
      <div className="mx-auto max-w-6xl px-6 py-10 sm:px-8 sm:py-14">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-verified">
          Your properties
        </p>
        <h1 className="mt-1 font-display text-4xl font-bold tracking-tight text-primary">
          Saved
        </h1>
        {listings.length === 0 ? (
          <section className="mt-8 rounded-3xl border border-border-rule bg-white p-8 text-center">
            <h2 className="font-display text-2xl font-bold text-primary">
              No saved properties yet
            </h2>
            <p className="mx-auto mt-2 max-w-md text-secondary">
              Save a property while browsing and it will appear here.
            </p>
            <Link
              href="/browse"
              className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-canvas"
            >
              Browse properties
            </Link>
          </section>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {listings.map((listing) => (
              <div key={listing.id}>
                <Link href={`/listing/${encodeURIComponent(listing.id)}`}>
                  <ListingCard listing={listing} />
                </Link>
                <div className="mt-3">
                  <SaveButton
                    listingId={listing.id}
                    initialSaved
                    onSavedChange={(saved) => {
                      if (!saved) {
                        setListings((current) =>
                          current.filter((item) => item.id !== listing.id),
                        );
                      }
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
