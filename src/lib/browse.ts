import { api } from "./api";
import type {
  CityCount,
  HomeHero,
  ListingSearchResponse,
  ListingTaxonomy,
} from "./types";

const EMPTY_SEARCH: ListingSearchResponse = {
  results: [],
  total: 0,
  new_this_week: 0,
  limit: 0,
  offset: 0,
};
export const BROWSE_PAGE_SIZE = 5;

export type BrowseFilters = {
  city?: string;
  typeSlug?: string;
  subtypeSlug?: string;
  query?: string;
  page?: number;
};

function listingQuery(filters: BrowseFilters) {
  return {
    city: filters.city,
    type_slug: filters.typeSlug,
    subtype_slug: filters.subtypeSlug,
    q: filters.query,
  };
}

// Supporting sections must not take the page down with them: the feed is the
// only request /browse cannot render without.
async function optional<T>(
  request: Promise<T>,
  fallback: T,
  label: string,
): Promise<T> {
  try {
    return await request;
  } catch (error) {
    // warn, not error: this path is deliberately non-fatal, and Next's dev
    // overlay intercepts console.error only, which would flag a healthy page.
    console.warn(`browse: ${label} unavailable`, error);
    return fallback;
  }
}

export function getBrowseFeed(filters: BrowseFilters) {
  const page = Math.max(1, filters.page ?? 1);
  return api.get<ListingSearchResponse>("/v1/listings", {
    query: { ...listingQuery(filters), limit: BROWSE_PAGE_SIZE, offset: (page - 1) * BROWSE_PAGE_SIZE },
  });
}

export function getTerrainPicks() {
  return optional(
    api.get<HomeHero>("/v1/home/hero"),
    { slides: [], max_slides: 0 },
    "terrain picks",
  );
}

export function getVerifiedThisWeek(filters: BrowseFilters) {
  const cutoff = new Date();
  cutoff.setUTCDate(cutoff.getUTCDate() - 7);
  return optional(
    api.get<ListingSearchResponse>("/v1/listings", {
      query: {
        city: filters.city,
        verified_after: cutoff.toISOString(),
        limit: 6,
        offset: 0,
      },
    }),
    EMPTY_SEARCH,
    "verified this week",
  );
}

export function getBrowseCities() {
  return optional(
    api.get<CityCount[]>("/v1/listings/cities", {
      query: { limit: 50 },
    }),
    [],
    "cities",
  );
}

export function getListingTaxonomy() {
  return optional(
    api.get<ListingTaxonomy>("/v1/listings/taxonomy"),
    { types: [] },
    "taxonomy",
  );
}
