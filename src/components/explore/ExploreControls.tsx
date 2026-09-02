"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { ExploreFilters } from "@/lib/explore";
import { searchPlaces, type PlaceSearchResult } from "@/lib/geocoding";
import type { ListingTaxonomy } from "@/lib/types";
import {
  ExploreFilterSheet,
  EXPLORE_TYPE_LABELS,
  formatExplorePrice,
} from "./ExploreFilterSheet";

type Props = {
  filters: ExploreFilters;
  taxonomy: ListingTaxonomy;
  disabled: boolean;
  onFiltersChange: (filters: ExploreFilters) => void;
  onRecenter: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onPlaceSelect: (place: PlaceSearchResult) => void;
};

function FilterIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M4 5h16M7 12h10M10 19h4" />
    </svg>
  );
}

export function ExploreControls({
  filters,
  taxonomy,
  disabled,
  onFiltersChange,
  onRecenter,
  onZoomIn,
  onZoomOut,
  onPlaceSelect,
}: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PlaceSearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const skipNextSearch = useRef(false);
  const activeType = taxonomy.types.find(
    (type) => type.slug === filters.typeSlug,
  );
  const activeSubtype = activeType?.subtypes.find(
    (subtype) => subtype.slug === filters.subtypeSlug,
  );
  const hasPrice =
    filters.minPrice !== undefined || filters.maxPrice !== undefined;
  const activeCount =
    Number(Boolean(filters.typeSlug)) +
    Number(Boolean(filters.subtypeSlug)) +
    Number(Boolean(filters.state)) +
    Number(hasPrice) +
    Number(Boolean(filters.verified));

  useEffect(() => {
    if (skipNextSearch.current) {
      skipNextSearch.current = false;
      return;
    }
    if (query.trim().length < 2) return;
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setSearching(true);
      try {
        setResults(await searchPlaces(query, controller.signal));
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("explore: place search unavailable", error);
          setResults([]);
        }
      } finally {
        if (!controller.signal.aborted) setSearching(false);
      }
    }, 300);
    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  const clear = (key: keyof ExploreFilters) => {
    const next = { ...filters };
    delete next[key];
    onFiltersChange(next);
  };
  const priceLabel = `${
    filters.minPrice === undefined
      ? "Any"
      : formatExplorePrice(filters.minPrice)
  }–${
    filters.maxPrice === undefined
      ? "Any"
      : formatExplorePrice(filters.maxPrice)
  }`;

  return (
    <>
      <div className="absolute inset-x-4 top-4 z-10 sm:inset-x-6 sm:top-6">
        <div className="flex h-[52px] max-w-xl items-center gap-2 rounded-full border border-border-rule bg-canvas px-4 shadow-lg">
          <span aria-hidden className="text-lg text-secondary">⌕</span>
          <input
            value={query}
            disabled={disabled}
            onChange={(event) => setQuery(event.target.value)}
            className="min-w-0 flex-1 bg-transparent text-base text-primary outline-none placeholder:text-secondary"
            placeholder="City, area or landmark…"
            aria-label="Search by city, area or landmark"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                if (filters.state) clear("state");
              }}
              aria-label="Clear search"
              className="text-lg text-secondary"
            >
              ×
            </button>
          )}
          <div
            className="flex shrink-0 rounded-full bg-border-rule/60 p-0.5"
            role="group"
            aria-label="Map or list view"
          >
            <button
              type="button"
              aria-pressed="true"
              className="rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-canvas"
            >
              Map
            </button>
            <Link
              href="/browse"
              prefetch={false}
              className="rounded-full px-3 py-1.5 text-xs font-semibold text-primary"
            >
              List
            </Link>
          </div>
        </div>

        {query.trim().length >= 2 && (searching || results.length > 0) && (
          <div className="mt-2 max-w-xl overflow-hidden rounded-2xl border border-border-rule bg-canvas shadow-lg">
            {searching && (
              <p className="px-4 py-3 text-sm text-secondary">Searching…</p>
            )}
            {results.map((place, index) => (
              <button
                key={`${place.name}-${place.lng}-${place.lat}-${index}`}
                type="button"
                onClick={() => {
                  skipNextSearch.current = true;
                  onPlaceSelect(place);
                  setQuery(place.name);
                  setResults([]);
                }}
                className="block w-full px-4 py-3 text-left text-sm hover:bg-border-rule"
              >
                <span className="block font-semibold text-primary">
                  {place.name}
                </span>
                <span className="block text-xs text-secondary">
                  {place.region}
                </span>
              </button>
            ))}
          </div>
        )}

        <div className="mt-2 flex items-center gap-2 overflow-x-auto pb-1">
          <button
            type="button"
            disabled={disabled}
            onClick={() => setFilterOpen(true)}
            aria-expanded={filterOpen}
            className="relative flex size-10 shrink-0 items-center justify-center rounded-full border border-border-rule bg-canvas text-primary shadow-sm disabled:opacity-50"
            aria-label="Open filters"
          >
            <FilterIcon />
            {activeCount > 0 && (
              <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-verified text-[10px] font-bold text-canvas">
                {activeCount}
              </span>
            )}
          </button>
          {filters.typeSlug && (
            <button
              type="button"
              disabled={disabled}
              onClick={() => {
                const next = { ...filters };
                delete next.typeSlug;
                delete next.subtypeSlug;
                onFiltersChange(next);
              }}
              className="shrink-0 rounded-full border border-verified bg-canvas px-3 py-1.5 text-xs font-semibold text-verified"
            >
              {EXPLORE_TYPE_LABELS[filters.typeSlug]} ×
            </button>
          )}
          {activeSubtype && (
            <button
              type="button"
              disabled={disabled}
              onClick={() => clear("subtypeSlug")}
              className="shrink-0 rounded-full border border-verified bg-canvas px-3 py-1.5 text-xs font-semibold text-verified"
            >
              {activeSubtype.name} ×
            </button>
          )}
          {filters.state && (
            <button
              type="button"
              disabled={disabled}
              onClick={() => {
                setQuery("");
                clear("state");
              }}
              className="shrink-0 rounded-full border border-verified bg-canvas px-3 py-1.5 text-xs font-semibold text-verified"
            >
              {filters.state} ×
            </button>
          )}
          {hasPrice && (
            <button
              type="button"
              disabled={disabled}
              onClick={() => {
                const next = { ...filters };
                delete next.minPrice;
                delete next.maxPrice;
                onFiltersChange(next);
              }}
              className="shrink-0 rounded-full border border-verified bg-canvas px-3 py-1.5 text-xs font-semibold text-verified"
            >
              {priceLabel} ×
            </button>
          )}
          {filters.verified && (
            <button
              type="button"
              disabled={disabled}
              onClick={() => clear("verified")}
              className="shrink-0 rounded-full border border-verified bg-canvas px-3 py-1.5 text-xs font-semibold text-verified"
            >
              Verified ×
            </button>
          )}
        </div>
      </div>

      <div className="absolute right-4 top-[42%] z-10 flex flex-col gap-2 sm:right-6">
        <button
          type="button"
          onClick={onZoomIn}
          className="flex size-11 items-center justify-center rounded-full border border-border-rule bg-canvas text-xl text-primary shadow-lg"
          aria-label="Zoom in"
        >
          +
        </button>
        <button
          type="button"
          onClick={onZoomOut}
          className="flex size-11 items-center justify-center rounded-full border border-border-rule bg-canvas text-xl text-primary shadow-lg"
          aria-label="Zoom out"
        >
          −
        </button>
        <button
          type="button"
          onClick={onRecenter}
          className="flex size-11 items-center justify-center rounded-full border border-border-rule bg-canvas text-base text-primary shadow-lg"
          aria-label="Recenter map"
        >
          ◎
        </button>
      </div>

      {filterOpen && (
        <ExploreFilterSheet
          filters={filters}
          taxonomy={taxonomy}
          disabled={disabled}
          onFiltersChange={onFiltersChange}
          onClose={() => setFilterOpen(false)}
          onClear={() => {
            setQuery("");
            onFiltersChange({});
          }}
        />
      )}
    </>
  );
}
