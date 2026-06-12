import type { Metadata } from "next";
import Link from "next/link";
import { TopNav } from "@/components/TopNav";
import { AgentVetting } from "@/components/AgentVetting";
import { BuyerJourney } from "@/components/BuyerJourney";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { ClosingCTA } from "@/components/ClosingCTA";
import { Footer } from "@/components/Footer";
import {
  Coordinate,
  ContourField,
  PlotCorners,
  SurveyRule,
  VerifiedSeal,
} from "@/components/cartographic";

export const metadata: Metadata = {
  title: "How Terrain works",
  description:
    "Terrain's trust dossier: how every agent is checked, how you buy, and the questions buyers ask.",
};

// The trust dossier. The deeper material lifted off the landing,
// composed as one page in its own right: a dark dossier-cover hero with
// a numbered contents index that doubles as jump nav, then the four
// chapters (vetting, buying, proof, questions) and the close. Chapter
// numbers echo from the index into each section so the buyer always
// knows which record they are reading.

const CONTENTS = [
  { num: "01", name: "How we vet", href: "#vetting" },
  { num: "02", name: "How you buy", href: "#how-to-buy" },
  { num: "03", name: "Proof", href: "#testimonials" },
  { num: "04", name: "Questions", href: "#questions" },
];

export default function HowItWorksPage() {
  return (
    <>
      <TopNav />

      <header className="survey-grid-dark relative overflow-hidden bg-primary px-6 pt-28 pb-16 text-canvas sm:px-8 sm:pt-36 sm:pb-20 lg:px-10">
        <ContourField tone="canvas" />
        <div className="relative mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3">
              <span
                className="text-[11px] uppercase tracking-[0.18em] text-canvas/60"
                style={{ fontFamily: "var(--font-interactive)" }}
              >
                How Terrain works
              </span>
              <Coordinate tone="canvas">DOSSIER&nbsp;/&nbsp;TRUST</Coordinate>
            </div>
            <SurveyRule tone="canvas" className="mt-4 max-w-[220px]" />
            <h1
              className="mt-7 max-w-3xl text-[clamp(38px,6vw,72px)] leading-[1.0] tracking-tight"
              style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
            >
              We only deal with certified companies.
            </h1>
            <p
              className="mt-6 max-w-xl text-base leading-relaxed text-canvas/70 sm:text-lg"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Every agent on Terrain is a CAC-registered real estate company we
              have checked. This is the record: how we vet them, how you buy,
              and the proof it works.
            </p>
            <div className="mt-9">
              <VerifiedSeal size={56} />
            </div>
          </div>

          {/* Contents index, doubling as jump nav into the chapters. */}
          <nav aria-label="On this page" className="lg:col-span-5 lg:pt-1">
            <div className="relative rounded-[20px] border border-canvas/15 px-2 py-1">
              <PlotCorners tone="canvas" inset={10} size={12} />
              <ul>
                {CONTENTS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group flex items-center justify-between gap-4 border-b border-canvas/10 px-4 py-5 last:border-b-0"
                    >
                      <span className="flex items-baseline gap-4">
                        <Coordinate tone="canvas">{item.num}</Coordinate>
                        <span
                          className="text-xl tracking-tight text-canvas sm:text-2xl"
                          style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
                        >
                          {item.name}
                        </span>
                      </span>
                      <span
                        aria-hidden
                        className="text-canvas/40 transition-transform group-hover:translate-y-0.5"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M12 5v14m0 0l-6-6m6 6l6-6"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </header>

      <AgentVetting chapter="01" />
      <BuyerJourney chapter="02" />
      <Testimonials chapter="03" />
      <FAQ chapter="04" />
      <ClosingCTA />
      <Footer />
    </>
  );
}
