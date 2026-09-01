"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { searchPlaces, type PlaceSearchResult } from "@/lib/geocoding";

export type ExploreFilter = "all" | "land" | "house";
type Props = { filter: ExploreFilter; disabled: boolean; onFilterChange: (filter: ExploreFilter) => void; onRecenter: () => void; onZoomIn: () => void; onZoomOut: () => void; onPlaceSelect: (place: PlaceSearchResult) => void };
const LABELS = { land: "Land", house: "House" } as const;

export function ExploreControls({ filter, disabled, onFilterChange, onRecenter, onZoomIn, onZoomOut, onPlaceSelect }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PlaceSearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const hasFilter = filter !== "all";

  useEffect(() => {
    if (query.trim().length < 2) return;
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setSearching(true);
      try { setResults(await searchPlaces(query, controller.signal)); }
      catch (error) { if (!controller.signal.aborted) { console.error("explore: place search unavailable", error); setResults([]); } }
      finally { if (!controller.signal.aborted) setSearching(false); }
    }, 300);
    return () => { window.clearTimeout(timer); controller.abort(); };
  }, [query]);

  return <>
    <div className="absolute inset-x-4 top-4 z-10 sm:inset-x-6 sm:top-6">
      <div className="flex h-[52px] max-w-xl items-center gap-2 rounded-full border border-border-rule bg-canvas px-4 shadow-lg">
        <span aria-hidden className="text-lg text-secondary">⌕</span>
        <input value={query} disabled={disabled} onChange={(event) => setQuery(event.target.value)} className="min-w-0 flex-1 bg-transparent text-sm text-primary outline-none placeholder:text-secondary" placeholder="City, area or landmark…" aria-label="Search by city, area or landmark" />
        {query && <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="text-lg text-secondary">×</button>}
        <div className="flex shrink-0 rounded-full bg-border-rule/60 p-0.5" role="group" aria-label="Map or list view">
          <button type="button" aria-pressed="true" className="rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-canvas">Map</button>
          <Link href="/browse" prefetch={false} className="rounded-full px-3 py-1.5 text-xs font-semibold text-primary">List</Link>
        </div>
      </div>
      {query.trim().length >= 2 && (searching || results.length > 0) && <div className="mt-2 max-w-xl overflow-hidden rounded-2xl border border-border-rule bg-canvas shadow-lg">
        {searching && <p className="px-4 py-3 text-sm text-secondary">Searching…</p>}
        {results.map((place) => <button key={`${place.lng}-${place.lat}`} type="button" onClick={() => { onPlaceSelect(place); setQuery(place.name); setResults([]); }} className="block w-full px-4 py-3 text-left text-sm hover:bg-border-rule"><span className="block font-semibold text-primary">{place.name}</span><span className="block text-xs text-secondary">{place.region}</span></button>)}
      </div>}
      <div className="mt-2 flex items-center gap-2 overflow-x-auto pb-1">
        <button type="button" disabled={disabled} onClick={() => setFilterOpen((open) => !open)} aria-expanded={filterOpen} className="relative flex size-9 shrink-0 items-center justify-center rounded-full border border-border-rule bg-canvas text-primary shadow-sm disabled:opacity-50" aria-label="Open filters">☷{hasFilter && <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-verified text-[10px] font-bold text-canvas">1</span>}</button>
        {hasFilter && <button type="button" disabled={disabled} onClick={() => onFilterChange("all")} className="shrink-0 rounded-full border border-verified bg-canvas px-3 py-1.5 text-xs font-semibold text-verified">{LABELS[filter]} ×</button>}
      </div>
      {filterOpen && <div className="mt-1 flex w-fit gap-2 rounded-2xl border border-border-rule bg-canvas p-2 shadow-lg">{(Object.keys(LABELS) as Array<Exclude<ExploreFilter, "all">>).map((value) => <button key={value} type="button" disabled={disabled} aria-pressed={filter === value} onClick={() => onFilterChange(filter === value ? "all" : value)} className={`rounded-full px-3 py-1.5 text-xs font-semibold ${filter === value ? "bg-primary text-canvas" : "text-primary hover:bg-border-rule"}`}>{LABELS[value]}</button>)}</div>}
    </div>
    <div className="absolute right-4 top-[42%] z-10 flex flex-col gap-2 sm:right-6">
      <button type="button" onClick={onZoomIn} className="flex size-11 items-center justify-center rounded-full border border-border-rule bg-canvas text-xl text-primary shadow-lg" aria-label="Zoom in">+</button>
      <button type="button" onClick={onZoomOut} className="flex size-11 items-center justify-center rounded-full border border-border-rule bg-canvas text-xl text-primary shadow-lg" aria-label="Zoom out">−</button>
      <button type="button" onClick={onRecenter} className="flex size-11 items-center justify-center rounded-full border border-border-rule bg-canvas text-base text-primary shadow-lg" aria-label="Recenter map">◎</button>
    </div>
  </>;
}
