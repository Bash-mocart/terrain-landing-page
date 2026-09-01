"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { searchPlaces, type PlaceSearchResult } from "@/lib/geocoding";

export type ExploreFilter = "all" | "land" | "house";

type Props = {
  filter: ExploreFilter;
  state: string;
  disabled: boolean;
  onFilterChange: (filter: ExploreFilter) => void;
  onRecenter: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onPlaceSelect: (place: PlaceSearchResult) => void;
  onStateClear: () => void;
};

const LABELS = { land: "Land", house: "House" } as const;

function FilterIcon() {
  return <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M4 5h16M7 12h10M10 19h4" /></svg>;
}

export function ExploreControls({ filter, state, disabled, onFilterChange, onRecenter, onZoomIn, onZoomOut, onPlaceSelect, onStateClear }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PlaceSearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const skipNextSearch = useRef(false);
  const hasFilter = filter !== "all";
  const activeCount = Number(hasFilter) + Number(Boolean(state));

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
    return () => { window.clearTimeout(timer); controller.abort(); };
  }, [query]);

  return <>
    <div className="absolute inset-x-4 top-4 z-10 sm:inset-x-6 sm:top-6">
      <div className="flex h-[52px] max-w-xl items-center gap-2 rounded-full border border-border-rule bg-canvas px-4 shadow-lg">
        <span aria-hidden className="text-lg text-secondary">⌕</span>
        <input value={query} disabled={disabled} onChange={(event) => setQuery(event.target.value)} className="min-w-0 flex-1 bg-transparent text-base text-primary outline-none placeholder:text-secondary" placeholder="City, area or landmark…" aria-label="Search by city, area or landmark" />
        {query && <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="text-lg text-secondary">×</button>}
        <div className="flex shrink-0 rounded-full bg-border-rule/60 p-0.5" role="group" aria-label="Map or list view">
          <button type="button" aria-pressed="true" className="rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-canvas">Map</button>
          <Link href="/browse" prefetch={false} className="rounded-full px-3 py-1.5 text-xs font-semibold text-primary">List</Link>
        </div>
      </div>
      {query.trim().length >= 2 && (searching || results.length > 0) && <div className="mt-2 max-w-xl overflow-hidden rounded-2xl border border-border-rule bg-canvas shadow-lg">
        {searching && <p className="px-4 py-3 text-sm text-secondary">Searching…</p>}
        {results.map((place, index) => <button key={`${place.name}-${place.lng}-${place.lat}-${index}`} type="button" onClick={() => { skipNextSearch.current = true; onPlaceSelect(place); setQuery(place.name); setResults([]); }} className="block w-full px-4 py-3 text-left text-sm hover:bg-border-rule"><span className="block font-semibold text-primary">{place.name}</span><span className="block text-xs text-secondary">{place.region}</span></button>)}
      </div>}
      <div className="mt-2 flex items-center gap-2 overflow-x-auto pb-1">
        <button type="button" disabled={disabled} onClick={() => setFilterOpen(true)} aria-expanded={filterOpen} className="relative flex size-10 shrink-0 items-center justify-center rounded-full border border-border-rule bg-canvas text-primary shadow-sm disabled:opacity-50" aria-label="Open filters"><FilterIcon />{activeCount > 0 && <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-verified text-[10px] font-bold text-canvas">{activeCount}</span>}</button>
        {hasFilter && <button type="button" disabled={disabled} onClick={() => onFilterChange("all")} className="shrink-0 rounded-full border border-verified bg-canvas px-3 py-1.5 text-xs font-semibold text-verified">{LABELS[filter]} ×</button>}
        {state && <button type="button" disabled={disabled} onClick={onStateClear} className="shrink-0 rounded-full border border-verified bg-canvas px-3 py-1.5 text-xs font-semibold text-verified">{state} ×</button>}
      </div>
    </div>
    <div className="absolute right-4 top-[42%] z-10 flex flex-col gap-2 sm:right-6">
      <button type="button" onClick={onZoomIn} className="flex size-11 items-center justify-center rounded-full border border-border-rule bg-canvas text-xl text-primary shadow-lg" aria-label="Zoom in">+</button>
      <button type="button" onClick={onZoomOut} className="flex size-11 items-center justify-center rounded-full border border-border-rule bg-canvas text-xl text-primary shadow-lg" aria-label="Zoom out">−</button>
      <button type="button" onClick={onRecenter} className="flex size-11 items-center justify-center rounded-full border border-border-rule bg-canvas text-base text-primary shadow-lg" aria-label="Recenter map">◎</button>
    </div>
    {filterOpen && <div className="fixed inset-0 z-50 flex items-end bg-primary/30 sm:items-center sm:justify-center" role="presentation" onMouseDown={() => setFilterOpen(false)}>
      <div role="dialog" aria-modal="true" aria-labelledby="explore-filter-title" className="w-full rounded-t-3xl bg-canvas p-6 shadow-2xl sm:max-w-md sm:rounded-3xl" onMouseDown={(event) => event.stopPropagation()}>
        <div className="flex items-center justify-between"><h2 id="explore-filter-title" className="font-display text-xl font-bold text-primary">Filters</h2><button type="button" onClick={() => setFilterOpen(false)} aria-label="Close filters" className="text-2xl text-secondary">×</button></div>
        <div className="mt-5 grid grid-cols-2 gap-3">{(Object.keys(LABELS) as Array<Exclude<ExploreFilter, "all">>).map((value) => <button key={value} type="button" disabled={disabled} aria-pressed={filter === value} onClick={() => onFilterChange(filter === value ? "all" : value)} className={`rounded-2xl border px-4 py-4 text-left font-semibold ${filter === value ? "border-primary bg-primary text-canvas" : "border-border-rule text-primary"}`}>{LABELS[value]}<span className="mt-1 block text-xs font-normal opacity-70">Show {LABELS[value].toLowerCase()} listings</span></button>)}</div>
        <button type="button" onClick={() => { onFilterChange("all"); setFilterOpen(false); }} className="mt-4 w-full rounded-full border border-border-rule px-4 py-3 text-sm font-semibold text-primary">Clear filters</button>
      </div>
    </div>}
  </>;
}
