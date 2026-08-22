"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
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

  function update(values: Record<string, string>) {
    const next = new URLSearchParams(searchParams.toString());
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
    <div className="space-y-5">
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
          className="min-w-0 flex-1 rounded-full border border-border-rule bg-white px-5 py-3 text-sm text-primary outline-none transition-colors placeholder:text-secondary focus:border-verified"
        />
        <button
          type="submit"
          className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-canvas"
        >
          Search
        </button>
      </form>

      <div className="flex flex-wrap gap-3">
        <label className="sr-only" htmlFor="browse-city">
          City
        </label>
        <select
          id="browse-city"
          value={city}
          onChange={(event) => update({ city: event.target.value })}
          className="rounded-full border border-border-rule bg-canvas px-4 py-2.5 text-sm text-primary"
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
          className="rounded-full border border-border-rule bg-canvas px-4 py-2.5 text-sm text-primary"
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
              className="rounded-full border border-border-rule bg-canvas px-4 py-2.5 text-sm text-primary"
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
    </div>
  );
}
