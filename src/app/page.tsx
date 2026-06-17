import { TopNav } from "@/components/TopNav";
import { Hero } from "@/components/Hero";
import { ProblemSolution } from "@/components/ProblemSolution";
import { VerifyAndRequest } from "@/components/VerifyAndRequest";
import { HowWeVerify } from "@/components/HowWeVerify";
import { WhyTerrain } from "@/components/WhyTerrain";
import { OwnBuildGrow } from "@/components/OwnBuildGrow";
import { WhatsOnMarket } from "@/components/WhatsOnMarket";
import { ClosingCTA } from "@/components/ClosingCTA";
import { Footer } from "@/components/Footer";

// Lean landing: the map hero plus three content sections and a close.
// The deeper material (how we vet, how you buy, testimonials, FAQ)
// lives on /how-it-works so the landing stays scannable.
//
//   Hero (map)     hook
//   WhyTerrain     the problem, resolving to "we only list certified
//                  CAC-registered companies and agents"
//   OwnBuildGrow   Terrain Own / Build / Grow
//   WhatsOnMarket  the properties, by city
//   ClosingCTA     download close
//   Footer
export default function Home() {
  return (
    <>
      <TopNav />
      <Hero />
      <ProblemSolution />
      <VerifyAndRequest />
      <HowWeVerify />
      <WhyTerrain />
      <OwnBuildGrow />
      <WhatsOnMarket />
      <ClosingCTA />
      <Footer />
    </>
  );
}
