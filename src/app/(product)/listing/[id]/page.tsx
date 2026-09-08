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
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let listing: Awaited<ReturnType<typeof getExploreListing>>;

  try {
    listing = await getExploreListing(id);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }
    return <ListingDetail error="Check your connection and try again." />;
  }

  return <ListingDetail listing={listing} />;
}
