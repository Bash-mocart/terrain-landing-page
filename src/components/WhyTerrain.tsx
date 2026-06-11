import { Reveal } from "./Reveal";

// The problem. Names the fear every Nigerian property buyer already
// knows, so everything below it reads as the answer. Registry voice:
// calm and factual, validating the buyer rather than scaring them. A
// dark section right after the hero, the tonal low point of the page
// (hopeful hero -> the real risk -> light solutions), and the bridge
// line hands off to the vetting + buying story.

const RISKS = [
  "Titles that turn out forged, duplicated, or already sold to someone else.",
  "Omo onile and family claims that resurface long after you have paid.",
  "Agents with no company, no record, and no one to hold responsible.",
  "Land under government acquisition or dispute that was never theirs to sell.",
];

export function WhyTerrain() {
  return (
    <section id="why" className="bg-primary py-16 text-canvas sm:py-24 lg:py-32">
      <Reveal className="mx-auto grid max-w-[1440px] grid-cols-1 gap-10 px-6 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-10">
        <div className="lg:col-span-5">
          <span
            className="text-[11px] uppercase tracking-[0.18em] text-canvas/60"
            style={{ fontFamily: "var(--font-interactive)" }}
          >
            Why Terrain exists
          </span>
          <span aria-hidden className="mt-3 inline-block h-px w-12 bg-canvas/30" />
          <h2
            className="mt-6 text-[clamp(36px,5vw,64px)] leading-[1.0] tracking-tight"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
          >
            The fear is rational.
          </h2>
          <p
            className="mt-6 max-w-md text-base leading-relaxed text-canvas/70 sm:text-lg"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Across Nigeria, buying land or a house too often means handing
            your savings to a stranger and hoping. The risks are real, and
            everyone has heard the stories.
          </p>
        </div>

        <div className="lg:col-span-7 lg:pt-1">
          <ul className="flex flex-col">
            {RISKS.map((risk) => (
              <li
                key={risk}
                className="flex items-start gap-4 border-t border-canvas/15 py-5 first:border-t-0 first:pt-0 sm:py-6"
              >
                <span
                  aria-hidden
                  className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-canvas/35"
                />
                <span
                  className="text-base leading-relaxed text-canvas/80 sm:text-lg"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {risk}
                </span>
              </li>
            ))}
          </ul>
          <p
            className="mt-8 max-w-xl text-base leading-relaxed text-canvas sm:text-lg"
            style={{ fontFamily: "var(--font-body)", fontWeight: 600 }}
          >
            Terrain is built to take that risk off the table, starting with
            who is even allowed to sell to you.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
