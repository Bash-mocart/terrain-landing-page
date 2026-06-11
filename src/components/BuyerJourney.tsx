import { Reveal } from "./Reveal";
import { Coordinate, SurveyRule } from "./cartographic";

// How you buy. The buyer-facing journey. Re-crafted away from the
// 5-across ledger (which mirrored the agent-vetting section sitting
// just above it) into an airier two-column layout: a sticky header on
// the left, and large numbered steps stacked on the right with room to
// breathe. Same numbered-step type family as vetting, deliberately
// different spatial signature, so the two read as a call-and-response
// pair rather than the same module twice. The buyer journey is the
// emotional one, so it earns the extra air.
//
// Accurate to the model: Terrain introduces buyers to vetted agents
// and now also helps verify the property; it holds no funds and takes
// no commission.

type Step = {
  number: string;
  title: string;
  detail: string;
};

const STEPS: Step[] = [
  {
    number: "01",
    title: "Search the map",
    detail:
      "Browse verified land, houses, and commercial property across Nigeria. Filter by city, price, and type.",
  },
  {
    number: "02",
    title: "Inspect from your phone",
    detail:
      "Walk every listing through photos, video, drone aerials, and 3D tours before you ever drive out.",
  },
  {
    number: "03",
    title: "Contact the agent",
    detail:
      "Message or call the CAC-verified agent directly. Terrain never sits between you and them.",
  },
  {
    number: "04",
    title: "Verify the property",
    detail:
      "We can help with the site visit, property inspection, and document checks, so you know exactly what you are buying.",
  },
  {
    number: "05",
    title: "Buy direct",
    detail:
      "Close on the agent's terms. Terrain takes no commission and holds none of your money.",
  },
];

export function BuyerJourney() {
  return (
    <section id="how-to-buy" className="survey-grid bg-canvas py-16 sm:py-24 lg:py-32">
      <Reveal className="mx-auto grid max-w-[1440px] grid-cols-1 gap-10 px-6 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <div className="flex items-center gap-3">
              <span
                className="text-[11px] uppercase tracking-[0.18em] text-primary"
                style={{ fontFamily: "var(--font-interactive)" }}
              >
                For buyers
              </span>
              <Coordinate>ROUTE&nbsp;/&nbsp;5&nbsp;STEPS</Coordinate>
            </div>
            <SurveyRule className="mt-4 max-w-[200px]" />
            <h2
              className="mt-6 text-[clamp(36px,5vw,60px)] leading-[1.0] tracking-tight text-primary"
              style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
            >
              From the map
              <br className="hidden sm:block" /> to the keys.
            </h2>
            <p
              className="mt-5 max-w-sm text-base leading-relaxed text-secondary sm:text-lg"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Five steps from the map to the keys. We point you to a vetted
              agent, and we can help you check the property before you pay.
            </p>
          </div>
        </div>

        <ol className="lg:col-span-8">
          {STEPS.map((step, i) => (
            <li
              key={step.number}
              className={`flex gap-5 border-t border-[--color-border-rule] py-7 sm:gap-8 sm:py-9 ${
                i === 0 ? "lg:border-t-0 lg:pt-0" : ""
              }`}
            >
              <span
                className="shrink-0 text-[clamp(40px,5vw,56px)] leading-none tracking-tight text-primary/20"
                style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
              >
                {step.number}
              </span>
              <div className="pt-1 sm:pt-2">
                <h3
                  className="text-xl text-primary sm:text-2xl"
                  style={{ fontFamily: "var(--font-body)", fontWeight: 700 }}
                >
                  {step.title}
                </h3>
                <p
                  className="mt-2 max-w-md text-[15px] leading-relaxed text-secondary sm:text-base"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {step.detail}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}
