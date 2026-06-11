import { TopNav } from "@/components/TopNav";
import { Hero } from "@/components/Hero";
import { WhyTerrain } from "@/components/WhyTerrain";
import { OwnBuildGrow } from "@/components/OwnBuildGrow";
import { AgentVetting } from "@/components/AgentVetting";
import { BuyerJourney } from "@/components/BuyerJourney";
import { WhatsOnMarket } from "@/components/WhatsOnMarket";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { ClosingCTA } from "@/components/ClosingCTA";
import { Footer } from "@/components/Footer";

// Landing composition, ordered as a story: name the problem, then
// answer it immediately, before getting to the product lineup.
//
//   Hero (map)     L   hook: own property in Nigeria, with confidence
//   WhyTerrain     D   the problem: the fear is rational
//   AgentVetting   D   the answer: how we check every agent
//   BuyerJourney   L   how you buy, end to end (airy 2-col steps)
//   OwnBuildGrow   L   what you can do with Terrain (Own/Build/Grow)
//   WhatsOnMarket  D   what's available, by city (dark, breaks the run)
//   Testimonials   L   proof
//   FAQ            D   objections
//   ClosingCTA     L   conversion peak, faint Nigeria map bookend
//   Footer         D   sign-off
//
// WhyTerrain + AgentVetting are a deliberate back-to-back dark passage:
// the problem and how we close it, one continuous serious beat (the
// Why turn line hands straight into the vetting steps), after which the
// page opens to light. Their layouts differ (risk list vs numbered
// ledger) so the two darks don't read as a repeat.
export default function Home() {
  return (
    <>
      <TopNav />
      <Hero />
      <WhyTerrain />
      <AgentVetting />
      <BuyerJourney />
      <OwnBuildGrow />
      <WhatsOnMarket />
      <Testimonials />
      <FAQ />
      <ClosingCTA />
      <Footer />
    </>
  );
}
