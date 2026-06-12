import type { Metadata } from "next";
import { TopNav } from "@/components/TopNav";
import { AgentVetting } from "@/components/AgentVetting";
import { BuyerJourney } from "@/components/BuyerJourney";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { ClosingCTA } from "@/components/ClosingCTA";
import { Footer } from "@/components/Footer";
import { Coordinate, SurveyRule } from "@/components/cartographic";

export const metadata: Metadata = {
  title: "How Terrain works",
  description:
    "How Terrain checks every agent, how you buy, and the questions buyers ask.",
};

// The deeper material lifted off the landing so the home page stays
// lean. Same sections, now a page of their own: how we vet agents,
// how you buy, proof, and the FAQ, closing on the app CTA.
export default function HowItWorksPage() {
  return (
    <>
      <TopNav />
      <header className="survey-grid bg-canvas px-6 pt-28 pb-4 sm:px-8 sm:pt-36 lg:px-10">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex items-center gap-3">
            <span
              className="text-[11px] uppercase tracking-[0.18em] text-secondary"
              style={{ fontFamily: "var(--font-interactive)" }}
            >
              How Terrain works
            </span>
            <Coordinate>REF&nbsp;/&nbsp;TRUST</Coordinate>
          </div>
          <SurveyRule className="mt-4 max-w-[220px]" />
          <h1
            className="mt-7 max-w-3xl text-[clamp(36px,6vw,68px)] leading-[1.0] tracking-tight text-primary"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
          >
            We only deal with certified companies.
          </h1>
          <p
            className="mt-6 max-w-xl text-base leading-relaxed text-secondary sm:text-lg"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Every agent on Terrain is a CAC-registered real estate company we
            have checked. Here is how we vet them, how you buy, and what other
            buyers asked before you.
          </p>
        </div>
      </header>
      <AgentVetting />
      <BuyerJourney />
      <Testimonials />
      <FAQ />
      <ClosingCTA />
      <Footer />
    </>
  );
}
