import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "Browse verified property | Terrain",
  description:
    "Browse verified land and homes from vetted real estate companies across Nigeria.",
};

// Paused before launch. At launch: render <BrowseFeed searchParams={searchParams} />
// (src/components/browse/BrowseFeed.tsx).
export default function BrowsePage() {
  return <ComingSoon />;
}
