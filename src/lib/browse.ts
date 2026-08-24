import { api } from "./api";
import type {
  CityCount,
  HomeHero,
  ListingSearchResponse,
  ListingTaxonomy,
} from "./types";

export type BrowseFilters = {
  city?: string;
  typeSlug?: string;
  subtypeSlug?: string;
  query?: string;
};

function listingQuery(filters: BrowseFilters) {
  return {
    city: filters.city,
    type_slug: filters.typeSlug,
    subtype_slug: filters.subtypeSlug,
    q: filters.query,
  };
}

export function getBrowseFeed(filters: BrowseFilters) {
  return api.get<ListingSearchResponse>("/v1/listings", {
    query: { ...listingQuery(filters), limit: 10, offset: 0 },
  });
}

export function getTerrainPicks() {
  return api.get<HomeHero>("/v1/home/hero");
}

export function getVerifiedThisWeek(filters: BrowseFilters) {
  const cutoff = new Date();
  cutoff.setUTCDate(cutoff.getUTCDate() - 7);
  return api.get<ListingSearchResponse>("/v1/listings", {
    query: {
      city: filters.city,
      verified_after: cutoff.toISOString(),
      limit: 6,
      offset: 0,
    },
  });
}

export function getBrowseCities() {
  return api.get<CityCount[]>("/v1/listings/cities", {
    query: { limit: 50 },
  });
}

export function getListingTaxonomy() {
  return api.get<ListingTaxonomy>("/v1/listings/taxonomy");
}
