import { TopNav } from "@/components/TopNav";
import { Hero } from "@/components/Hero";
import { SamplePlotRecord } from "@/components/SamplePlotRecord";
import { VerificationSteps } from "@/components/VerificationSteps";
import { Citations } from "@/components/Citations";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

// Landing page composition. Five content sections read top-to-bottom
// as a single Terrain Record entry: title block (with live Abuja
// map), sample plot drawn from the live registry, the three
// verification steps, citations, and common questions. The hairline
// rule (1px Border Rule) is the dominant structural element; no
// section-level background swaps, no pill chrome.
export default function Home() {
  return (
    <>
      <TopNav />
      <Hero />
      <SamplePlotRecord />
      <VerificationSteps />
      <Citations />
      <FAQ />
      <Footer />
    </>
  );
}
