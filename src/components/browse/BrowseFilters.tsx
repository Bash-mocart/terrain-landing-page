"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import type { FormEvent } from "react";
import type { CityCount, ListingTaxonomy } from "@/lib/types";

type BrowseFiltersProps = {
  cities: CityCount[];
  taxonomy: ListingTaxonomy;
  city: string;
  typeSlug: string;
  subtypeSlug: string;
  query: string;
};

export function BrowseFilters({
  cities,
  taxonomy,
  city,
  typeSlug,
  subtypeSlug,
  query,
}: BrowseFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeType = taxonomy.types.find((type) => type.slug === typeSlug);
  const [open, setOpen] = useState(false);
  const activeCount = Number(Boolean(city)) + Number(Boolean(typeSlug)) + Number(Boolean(subtypeSlug));

  function update(values: Record<string, string>) {
    const next = new URLSearchParams(searchParams.toString());
    next.delete("page");
    for (const [key, value] of Object.entries(values)) {
      if (value) next.set(key, value);
      else next.delete(key);
    }
    const queryString = next.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  }

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    update({ q: String(form.get("q") ?? "").trim() });
  }

  return (
    <div className="min-w-0 space-y-4">
      <form onSubmit={submitSearch} className="flex gap-2">
        <label className="sr-only" htmlFor="browse-search">
          Search properties
        </label>
        <input
          id="browse-search"
          name="q"
          type="search"
          defaultValue={query}
          placeholder="Search by area, estate, or address"
          className="min-w-0 flex-1 rounded-full border border-border-rule bg-canvas px-5 py-3 text-base text-primary outline-none transition-colors placeholder:text-secondary focus:border-verified"
        />
        <button
          type="submit"
          className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-canvas"
        >
          Search
        </button>
      </form>

      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button type="button" onClick={() => setOpen(true)} className="flex shrink-0 items-center gap-2 rounded-full border border-primary bg-canvas px-4 py-2.5 text-sm font-semibold text-primary">
          Filters{activeCount > 0 ? ` · ${activeCount}` : ""}
        </button>
        {city && <button type="button" onClick={() => update({ city: "" })} className="shrink-0 rounded-full border border-verified bg-canvas px-4 py-2.5 text-sm font-semibold text-verified">{city} ×</button>}
        {typeSlug && <button type="button" onClick={() => update({ type: "", subtype: "" })} className="shrink-0 rounded-full border border-verified bg-canvas px-4 py-2.5 text-sm font-semibold text-verified">{activeType?.name ?? typeSlug} ×</button>}
        {subtypeSlug && <button type="button" onClick={() => update({ subtype: "" })} className="shrink-0 rounded-full border border-verified bg-canvas px-4 py-2.5 text-sm font-semibold text-verified">{subtypeSlug} ×</button>}
      </div>
      {open && <div className="fixed inset-0 z-50 flex items-end bg-primary/30 sm:items-center sm:justify-center" role="presentation" onMouseDown={() => setOpen(false)}>
        <div role="dialog" aria-modal="true" aria-labelledby="browse-filter-title" className="w-full rounded-t-3xl bg-canvas p-6 shadow-2xl sm:max-w-lg sm:rounded-3xl" onMouseDown={(event) => event.stopPropagation()}>
          <div className="flex items-center justify-between"><h2 id="browse-filter-title" className="font-display text-2xl font-bold">Filters</h2><button type="button" onClick={() => setOpen(false)} aria-label="Close filters" className="text-2xl text-secondary">×</button></div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="sr-only" htmlFor="browse-city">
          City
        </label>
        <select
          id="browse-city"
          value={city}
          onChange={(event) => update({ city: event.target.value })}
          className="w-full rounded-2xl border border-border-rule bg-canvas px-4 py-3 text-sm text-primary"
        >
          <option value="">All cities</option>
          {cities.map((item) => (
            <option key={`${item.city}-${item.state}`} value={item.city}>
              {item.city} ({item.plot_count})
            </option>
          ))}
        </select>

        <label className="sr-only" htmlFor="browse-type">
          Property type
        </label>
        <select
          id="browse-type"
          value={typeSlug}
          onChange={(event) =>
            update({ type: event.target.value, subtype: "" })
          }
          className="w-full rounded-2xl border border-border-rule bg-canvas px-4 py-3 text-sm text-primary"
        >
          <option value="">All properties</option>
          {taxonomy.types.map((type) => (
            <option key={type.slug} value={type.slug}>
              {type.name}
            </option>
          ))}
        </select>

        {activeType && activeType.subtypes.length > 0 && (
          <>
            <label className="sr-only" htmlFor="browse-subtype">
              Property subtype
            </label>
            <select
              id="browse-subtype"
              value={subtypeSlug}
              onChange={(event) => update({ subtype: event.target.value })}
              className="w-full rounded-2xl border border-border-rule bg-canvas px-4 py-3 text-sm text-primary"
            >
              <option value="">All {activeType.name.toLowerCase()}</option>
              {activeType.subtypes.map((subtype) => (
                <option key={subtype.slug} value={subtype.slug}>
                  {subtype.name}
                </option>
              ))}
            </select>
          </>
        )}
          </div>
          <button type="button" onClick={() => { update({ city: "", type: "", subtype: "", q: "" }); setOpen(false); }} className="mt-5 w-full rounded-full border border-border-rule px-4 py-3 text-sm font-semibold text-primary">Clear filters</button>
        </div>
      </div>}
    </div>
  );
}
