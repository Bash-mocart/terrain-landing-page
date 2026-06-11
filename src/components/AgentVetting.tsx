import { Reveal } from "./Reveal";
import { Coordinate, ContourField, SurveyRule, VerifiedSeal } from "./cartographic";

// How we check agents, in the survey language. The seller-side trust
// story as a numbered survey procedure on a dark plate: each step a
// logged check, the final one stamped with the verified seal. Mirrors
// the buyer journey's content family but reads as an official checklist
// rather than a marketing list.

type Step = {
  number: string;
  title: string;
  detail: string;
  sealed?: boolean;
};

const STEPS: Step[] = [
  {
    number: "01",
    title: "The agent applies",
    detail:
      "No one self-publishes. Every agent or company asks to join before a single property goes up.",
  },
  {
    number: "02",
    title: "We confirm their CAC",
    detail:
      "We check the company against the Corporate Affairs Commission register. A real, registered business, not a phone number.",
  },
  {
    number: "03",
    title: "We check it is reachable",
    detail:
      "We verify the company is operating and that the people behind it answer for the listings they put up.",
  },
  {
    number: "04",
    title: "We review before approving",
    detail:
      "A person reviews the company and its first listings. Agents that do not pass are not allowed to publish.",
  },
  {
    number: "05",
    title: "Only then can they post",
    detail:
      "Approved agents publish, and every listing carries verifiable media: photos, video, drone aerials, and 3D tours.",
    sealed: true,
  },
];

export function AgentVetting() {
  return (
    <section
      id="vetting"
      className="survey-grid-dark relative overflow-hidden bg-primary py-16 text-canvas sm:py-24 lg:py-32"
    >
      <ContourField tone="canvas" />

      <Reveal className="relative mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-10">
        <div className="flex max-w-2xl flex-col items-start">
          <div className="flex items-center gap-3">
            <span
              className="text-[11px] uppercase tracking-[0.18em] text-canvas/60"
              style={{ fontFamily: "var(--font-interactive)" }}
            >
              How we check agents
            </span>
            <Coordinate tone="canvas">PROC&nbsp;/&nbsp;5&nbsp;CHECKS</Coordinate>
          </div>
          <SurveyRule tone="canvas" className="mt-4 max-w-[220px]" />
          <h2
            className="mt-7 text-[clamp(36px,5vw,64px)] leading-[1.0] tracking-tight"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
          >
            Checked before
            <br className="hidden sm:block" /> you ever see them.
          </h2>
          <p
            className="mt-6 text-base leading-relaxed text-canvas/70 sm:text-lg"
            style={{ fontFamily: "var(--font-body)" }}
          >
            We check every agent and their company before they are allowed
            to list. So everyone you find on Terrain is a real, CAC-registered
            business, not just a name and a phone number.
          </p>
        </div>

        <ol className="mt-12 grid grid-cols-1 gap-x-6 gap-y-8 sm:mt-16 sm:grid-cols-2 lg:grid-cols-5 lg:gap-x-8">
          {STEPS.map((step) => (
            <li key={step.number} className="relative border-t border-canvas/20 pt-5">
              <div className="flex items-center justify-between">
                <Coordinate tone="canvas">CHK&nbsp;{step.number}</Coordinate>
                {step.sealed && <VerifiedSeal size={34} />}
              </div>
              <h3
                className="mt-4 text-lg text-canvas"
                style={{ fontFamily: "var(--font-body)", fontWeight: 700 }}
              >
                {step.title}
              </h3>
              <p
                className="mt-2 text-sm leading-relaxed text-canvas/65"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {step.detail}
              </p>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}
