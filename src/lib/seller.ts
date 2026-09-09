import { api } from "./api";
import type { ListResponse, Listing, PublicSellerProfile } from "./types";

export function getSellerProfile(id: string) {
  return api.get<PublicSellerProfile>(
    `/v1/sellers/${encodeURIComponent(id)}`,
  );
}

export function getSellerListings(id: string) {
  return api.get<ListResponse<Listing>>(
    `/v1/sellers/${encodeURIComponent(id)}/listings`,
  );
}
