import Link from "next/link";
import { Reveal } from "./Reveal";
import { Coordinate, ContourField, SurveyRule } from "./cartographic";

// Why Terrain exists — the MISSION beat. No fear, no relisting the problems
// (those live in ProblemSolution above): this is the positive "why we built
// this / what we believe" statement. Kept on the dark survey plate so it
// still breaks the run of light sections and reads as the brand's voice.

export function WhyTerrain() {
  return (
    <section
      id="why"
      className="survey-grid-dark relative overflow-hidden bg-primary py-16 text-canvas sm:py-24 lg:py-32"
    >
      <ContourField tone="canvas" />

      <Reveal className="relative mx-auto grid max-w-[1440px] grid-cols-1 gap-10 px-6 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-10">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3">
            <span
              className="text-[11px] uppercase tracking-[0.18em] text-canvas/60"
              style={{ fontFamily: "var(--font-interactive)" }}
            >
              Why Terrain exists
            </span>
            <Coordinate tone="canvas">FIELD&nbsp;NOTE&nbsp;00</Coordinate>
          </div>
          <SurveyRule tone="canvas" className="mt-4 max-w-[220px]" />
          <h2
            className="mt-7 text-[clamp(36px,5vw,64px)] leading-[1.0] tracking-tight"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
          >
            We built Terrain for certainty.
          </h2>
        </div>

        <div className="lg:col-span-7 lg:pt-1">
          <p
            className="max-w-xl text-lg leading-relaxed text-canvas/80 sm:text-xl"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Property is how Nigerians build wealth that lasts. Owning it should
            feel as certain as a stamped registry record, not a leap of faith.
          </p>
          <p
            className="mt-6 max-w-xl text-lg leading-relaxed text-canvas sm:text-xl"
            style={{ fontFamily: "var(--font-body)", fontWeight: 600 }}
          >
            That is the whole reason Terrain exists: to make every property
            checkable, every agent and company accountable, and every buyer
            secure. Find it,
            confirm it is real, and own it, with no fear and no middleman taking
            a cut.
          </p>
          <Link
            href="/#verification"
            className="group mt-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-canvas transition-colors hover:text-verified"
            style={{ fontFamily: "var(--font-interactive)", fontWeight: 600 }}
          >
            See how we vet every property
            <span
              aria-hidden
              className="transition-transform group-hover:translate-x-0.5"
            >
              &rarr;
            </span>
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
