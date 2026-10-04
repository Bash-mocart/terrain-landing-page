import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "Explore property across Nigeria | Terrain",
  description: "Explore verified land and homes across Nigeria on the map.",
};

// Paused before launch; at launch render <ExploreMap /> again
// (@/components/explore/ExploreMap).
export default function ExplorePage() {
  return <ComingSoon />;
}
