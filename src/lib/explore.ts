import { api } from "./api";
import type { ListingTaxonomy, MapMarker } from "./types";

export type ExploreType = "land" | "house";

export type ExploreFilters = {
  typeSlug?: ExploreType;
  subtypeSlug?: string;
  state?: string;
  minPrice?: number;
  maxPrice?: number;
  verified?: boolean;
};

const NIGERIA_BOUNDS = {
  min_lng: 2.6769,
  min_lat: 4.2406,
  max_lng: 14.6779,
  max_lat: 13.8856,
};

export function getExploreMarkers(
  filters: ExploreFilters = {},
  signal?: AbortSignal,
) {
  return api.get<MapMarker[]>("/v1/listings/map", {
    cache: "no-store",
    signal,
    query: {
      ...NIGERIA_BOUNDS,
      type_slug: filters.typeSlug,
      subtype_slug: filters.subtypeSlug,
      state: filters.state,
      min_price: filters.minPrice,
      max_price: filters.maxPrice,
      verified: filters.verified,
      limit: 500,
    },
  });
}

export function getExploreTaxonomy(signal?: AbortSignal) {
  return api.get<ListingTaxonomy>("/v1/listings/taxonomy", { signal });
}
