import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "Browse property | Terrain",
  description:
    "Browse land and homes from verified real estate companies across Nigeria.",
};

// Paused before launch. At launch: render <BrowseFeed searchParams={searchParams} />
// (src/components/browse/BrowseFeed.tsx).
export default function BrowsePage() {
  return <ComingSoon />;
}
