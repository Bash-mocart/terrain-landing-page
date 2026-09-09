import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ApiError } from "@/lib/api";
import { getSellerListings, getSellerProfile } from "@/lib/seller";
import type { Listing } from "@/lib/types";
import { SellerProfile } from "@/components/seller/SellerProfile";

export const metadata: Metadata = {
  title: "Seller profile | Terrain",
  description: "View verified property sellers and their listings on Terrain.",
};

export default async function SellerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let profile: Awaited<ReturnType<typeof getSellerProfile>>;

  try {
    profile = await getSellerProfile(id);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    return <SellerProfile listings={[]} error="Check your connection and try again." />;
  }

  let listings: Listing[] = [];
  let listingsError = "";
  try {
    const response = await getSellerListings(id);
    listings = response.results ?? [];
  } catch (error) {
    console.error("seller: listings unavailable", error);
    listingsError = "We couldn't load this seller's listings.";
  }

  return (
    <SellerProfile
      profile={profile}
      listings={listings}
      listingsError={listingsError || undefined}
    />
  );
}
