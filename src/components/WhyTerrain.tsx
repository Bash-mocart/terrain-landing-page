import { Reveal } from "./Reveal";
import { Coordinate, ContourField, SurveyRule } from "./cartographic";

// The problem, in the cartographic survey language. A dark plate with a
// faint contour field and survey grid behind it, the risks plotted like
// survey findings flagged on a parcel. Names the fear every Nigerian
// property buyer knows, calmly, then hands off to the vetting answer.

const RISKS = [
  "Titles that turn out forged, duplicated, or already sold to someone else.",
  "Omo onile and family claims that resurface long after you have paid.",
  "Agents with no company, no record, and no one to hold responsible.",
  "Land under government acquisition or dispute that was never theirs to sell.",
];

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
            {RISKS.map((risk, i) => (
              <li
                key={risk}
                className="flex items-start gap-4 border-t border-canvas/15 py-5 first:border-t-0 first:pt-0 sm:gap-5 sm:py-6"
              >
                <Coordinate tone="canvas" className="mt-1 shrink-0">
                  R-{String(i + 1).padStart(2, "0")}
                </Coordinate>
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
