import type { Metadata } from "next";
import { ExploreMap } from "@/components/explore/ExploreMap";

export const metadata: Metadata = {
  title: "Explore property across Nigeria | Terrain",
  description: "Explore verified land and homes across Nigeria on the map.",
};

export default function ExplorePage() {
  return <ExploreMap />;
}
