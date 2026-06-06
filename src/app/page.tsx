import { TopNav } from "@/components/TopNav";
import { Hero } from "@/components/Hero";
import { ThreeSteps } from "@/components/ThreeSteps";
import { WhatsOnMarket } from "@/components/WhatsOnMarket";
import { BrowseTransactTrack } from "@/components/BrowseTransactTrack";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

// Landing page composition. Tracks the Figma's 7-section structure with
// the live Mapbox map in the hero (replacing the Figma's blank map
// placeholder) and palette discipline enforced throughout (no peach,
// no medium gray, no em-dashes, no "Built in Lagos" pose).
export default function Home() {
  return (
    <>
      <TopNav />
      <Hero />
      <ThreeSteps />
      <WhatsOnMarket />
      <BrowseTransactTrack />
      <Testimonials />
      <FAQ />
      <Footer />
    </>
  );
}
