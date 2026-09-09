import { ApiError, api } from "./api";
import { getExploreListing } from "./explore";
import type { Listing, SavedFavorite } from "./types";

const SAVED_LISTING_CONCURRENCY = 6;

export function getSavedFavorites() {
  return api.get<SavedFavorite[]>("/v1/saved", { cache: "no-store" });
}

export function saveListing(listingId: string) {
  return api.post<void>("/v1/saved", { listing_id: listingId });
}

export function unsaveListing(listingId: string) {
  return api.delete<void>(`/v1/saved/${encodeURIComponent(listingId)}`);
}

export async function getSavedListings(): Promise<Listing[]> {
  const favorites = await getSavedFavorites();
  const hydrated: Array<Listing | null> = Array.from(
    { length: favorites.length },
    () => null,
  );
  let nextIndex = 0;

  async function hydrateNext() {
    while (nextIndex < favorites.length) {
      const index = nextIndex;
      nextIndex += 1;
      const favorite = favorites[index];
      try {
        hydrated[index] = await getExploreListing(favorite.listing_id);
      } catch (error) {
        if (!(error instanceof ApiError) || error.status !== 404) throw error;
        console.warn("saved: listing unavailable", favorite.listing_id, error);
      }
    }
  }

  const workerCount = Math.min(SAVED_LISTING_CONCURRENCY, favorites.length);
  await Promise.all(Array.from({ length: workerCount }, hydrateNext));
  return hydrated.filter((listing): listing is Listing => listing !== null);
}
