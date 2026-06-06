import { TopNav } from "@/components/TopNav";
import { Hero } from "@/components/Hero";
import { ThreeSteps } from "@/components/ThreeSteps";
import { WhatsOnMarket } from "@/components/WhatsOnMarket";
import { BrowseTransactTrack } from "@/components/BrowseTransactTrack";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

// Landing page composition. Each section ships as its own component
// so a future polish pass on any one section doesn't drag the whole
// file. Hero is server-rendered with a static map placeholder; the
// LiveMap (Mapbox GL + /v1/listings/map) drops in next as a client
// component that replaces <LiveMapPlaceholder /> in Hero.
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
