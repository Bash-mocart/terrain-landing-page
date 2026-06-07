import { TopNav } from "@/components/TopNav";
import { Hero } from "@/components/Hero";
import { ThreeSteps } from "@/components/ThreeSteps";
import { WhatsOnMarket } from "@/components/WhatsOnMarket";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

// Landing page composition. Six sections after the impeccable critique
// trimmed BrowseTransactTrack as a duplicate of WhatsOnMarket. Each
// surface is now expected to clear the same bar as the hero popup:
// restrained, photo-where-it-earns, one CTA, exact Flutter type rhythm.
export default function Home() {
  return (
    <>
      <TopNav />
      <Hero />
      <ThreeSteps />
      <WhatsOnMarket />
      <Testimonials />
      <FAQ />
      <Footer />
    </>
  );
}
