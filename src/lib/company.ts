import { api } from "./api";
import type { Listing } from "./types";

/** A company's public page (`GET /v1/companies/{id}/page`): every label
 *  arrives ready to show, every list is capped by the server. */
export type CompanyPage = {
  id: string;
  name: string;
  logo_url: string;
  verified: boolean;
  registry_label: string;
  reply_label?: string;
  stats: { value: string; label: string }[];
  price_range_label?: string;
  plans_label?: string;
  office?: { label: string };
  share_text: string;
  listings: Listing[];
  see_all_label?: string;
};

export function getCompanyPage(id: string) {
  return api.get<CompanyPage>(`/v1/companies/${encodeURIComponent(id)}/page`, {
    cache: "no-store",
  });
}
