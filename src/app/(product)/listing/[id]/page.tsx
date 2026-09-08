import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ListingDetail } from "@/components/listing/ListingDetail";
import { getExploreListing } from "@/lib/explore";
import { ApiError } from "@/lib/api";

export const metadata: Metadata = {
  title: "Property listing | Terrain",
  description: "Review verified property details from Terrain.",
};

export default async function ListingPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ from?: string | string[] }>;
}) {
  const { id } = await params;
  const rawFrom = (await searchParams).from;
  const from = typeof rawFrom === "string" ? rawFrom : "";
  const backHref = from === "explore" ? "/explore" : "/browse";
  const backLabel = from === "explore" ? "Back to Explore" : "Browse properties";
  let listing: Awaited<ReturnType<typeof getExploreListing>>;

  try {
    listing = await getExploreListing(id);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }
    return (
      <ListingDetail
        error="Check your connection and try again."
        backHref={backHref}
        backLabel={backLabel}
      />
    );
  }

  return (
    <ListingDetail
      listing={listing}
      backHref={backHref}
      backLabel={backLabel}
    />
  );
}
