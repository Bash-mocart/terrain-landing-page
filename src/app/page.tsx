import { TopNav } from "@/components/TopNav";
import { Hero } from "@/components/Hero";
import { TrustStrip } from "@/components/TrustStrip";
import { ProblemSolution } from "@/components/ProblemSolution";
import { WhyTerrain } from "@/components/WhyTerrain";
import { BuyerJourney } from "@/components/BuyerJourney";
import { Verification } from "@/components/Verification";
import { AgentVetting } from "@/components/AgentVetting";
import { OwnBuildGrow } from "@/components/OwnBuildGrow";
import { WhatsOnMarket } from "@/components/WhatsOnMarket";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { AgentBand } from "@/components/AgentBand";
import { ClosingCTA } from "@/components/ClosingCTA";
import { Footer } from "@/components/Footer";

// The full landing arc, one page, each beat once. Light/dark plates
// alternate so the scroll has rhythm; /how-it-works redirects here.
//
//   Hero (map)       hook
//   TrustStrip       the four facts, stamped under the hero
//   ProblemSolution  the old way vs the Terrain way
//   WhyTerrain       mission (dark)
//   BuyerJourney     how you buy, five steps        #how-it-works
//   Verification     the field report artefact      #verification
//   AgentVetting     how we check agents (dark)     #vetting
//   OwnBuildGrow     the product family             #the-terrain-way
//   WhatsOnMarket    live inventory by city (dark)  #listings
//   Testimonials     proof
//   FAQ              questions (dark)               #questions
//   AgentBand        the seller-side ask            #for-agents
//   ClosingCTA       download close                 #download
//   Footer
export default function Home() {
  return (
    <>
      <TopNav />
      <Hero />
      <TrustStrip />
      <ProblemSolution />
      <WhyTerrain />
      <BuyerJourney />
      <Verification />
      <AgentVetting />
      <OwnBuildGrow />
      <WhatsOnMarket />
      <Testimonials />
      <FAQ />
      <AgentBand />
      <ClosingCTA />
      <Footer />
    </>
  );
}
