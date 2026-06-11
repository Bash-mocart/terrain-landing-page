import { TopNav } from "@/components/TopNav";
import { Hero } from "@/components/Hero";
import { OwnBuildGrow } from "@/components/OwnBuildGrow";
import { WhatsOnMarket } from "@/components/WhatsOnMarket";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

// Landing page composition. OwnBuildGrow (the Terrain product family:
// Own / Build / Grow) sits right after the hero and now carries the
// "how a purchase works" content too, folded into Terrain Own. The
// separate ThreeSteps section was removed as redundant once the
// flagship absorbed the buying flow.
export default function Home() {
  return (
    <>
      <TopNav />
      <Hero />
      <OwnBuildGrow />
      <WhatsOnMarket />
      <Testimonials />
      <FAQ />
      <Footer />
    </>
  );
}
