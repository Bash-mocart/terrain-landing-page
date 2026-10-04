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

export type CompanyCard = {
  id: string;
  name: string;
  logo_url: string;
  verified: boolean;
  count_label: string;
};

/** The verified companies the app's home shows ("Companies you can trust"),
 *  from `GET /v1/home/sections`. Empty when the API has none or is down. */
export async function getVerifiedCompanies(): Promise<CompanyCard[]> {
  try {
    const res = await api.get<{ sections?: { key: string; companies?: CompanyCard[] }[] }>(
      "/v1/home/sections",
      { query: { city: "Abuja" }, next: { revalidate: 3600 } },
    );
    const section = res.sections?.find((s) => s.key === "companies");
    return (section?.companies ?? []).filter((c) => c.verified);
  } catch (error) {
    console.error("home: verified companies unavailable", error);
    return [];
  }
}
