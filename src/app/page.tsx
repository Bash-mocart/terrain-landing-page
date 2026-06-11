import { TopNav } from "@/components/TopNav";
import { Hero } from "@/components/Hero";
import { OwnBuildGrow } from "@/components/OwnBuildGrow";
import { AgentVetting } from "@/components/AgentVetting";
import { WhatsOnMarket } from "@/components/WhatsOnMarket";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { ClosingCTA } from "@/components/ClosingCTA";
import { Footer } from "@/components/Footer";

// Landing composition, full-page craft. Deliberate Warm Canvas / Late-
// Night Boardroom heartbeat instead of a flat stack of canvas
// sections: the dark surfaces (AgentVetting, FAQ, Footer) land between
// light ones so the page breathes.
//
//   Hero (map)        L   the interactive Mapbox hero
//   OwnBuildGrow      L   product family, dark flagship card within
//   AgentVetting      D   the trust anchor: how every agent is vetted
//   WhatsOnMarket     L   live inventory + immersive media
//   Testimonials      L   featured diaspora quote + two supporting
//   FAQ               D   objection handling
//   ClosingCTA        L   conversion peak, faint Abuja map bookend
//   Footer            D   sign-off
export default function Home() {
  return (
    <>
      <TopNav />
      <Hero />
      <OwnBuildGrow />
      <AgentVetting />
      <WhatsOnMarket />
      <Testimonials />
      <FAQ />
      <ClosingCTA />
      <Footer />
    </>
  );
}
