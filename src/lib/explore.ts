import { api } from "./api";
import type { MapMarker } from "./types";

export type ExploreType = "land" | "house";

const NIGERIA_BOUNDS = {
  min_lng: 2.6769,
  min_lat: 4.2406,
  max_lng: 14.6779,
  max_lat: 13.8856,
};

export function getExploreMarkers(typeSlug?: ExploreType, state?: string, signal?: AbortSignal) {
  return api.get<MapMarker[]>("/v1/listings/map", {
    cache: "no-store",
    signal,
    query: {
      ...NIGERIA_BOUNDS,
      type_slug: typeSlug,
      state,
      limit: 500,
    },
  });
}
