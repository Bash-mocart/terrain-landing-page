import type { Metadata } from "next";
import { SavedListings } from "@/components/saved/SavedListings";

export const metadata: Metadata = {
  title: "Saved properties | Terrain",
  description: "Review the properties you saved on Terrain.",
};

export default function SavedPage() {
  return <SavedListings />;
}
