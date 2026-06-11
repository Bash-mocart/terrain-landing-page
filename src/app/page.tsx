import { TopNav } from "@/components/TopNav";
import { Hero } from "@/components/Hero";
import { OwnBuildGrow } from "@/components/OwnBuildGrow";
import { ThreeSteps } from "@/components/ThreeSteps";
import { WhatsOnMarket } from "@/components/WhatsOnMarket";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

// Landing page composition. OwnBuildGrow (the three Terrain product
// pillars) sits right after the hero, framing WHAT Terrain lets you
// do before ThreeSteps explains HOW a purchase works. Mirrors the
// TERRA Figma flow (philosophy -> how-it-works -> listings) while
// staying on the restrained Terrain token system.
export default function Home() {
  return (
    <>
      <TopNav />
      <Hero />
      <OwnBuildGrow />
      <ThreeSteps />
      <WhatsOnMarket />
      <Testimonials />
      <FAQ />
      <Footer />
    </>
  );
}
