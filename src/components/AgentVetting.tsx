// Agent Vetting — the trust anchor. Terrain's single biggest
// differentiator is that every agent is checked before a buyer ever
// sees them; this section gives that its own moment. Late-Night
// Boardroom surface (the page's first full dark section, breaking the
// canvas run above it) with a left header column and a numbered
// vertical process on the right, echoing the FAQ's 5/7 dark grid so
// the two dark sections read as a family.
//
// Copy is honest to what Terrain actually does (CAC registration +
// business review before listing). No inflated "7-point protocol";
// five real steps. Only the terminal step carries the Forest
// Verification check, so the trust mark stays scarce.

import { Reveal } from "./Reveal";

type Step = {
  number: string;
  title: string;
  detail: string;
  terminal?: boolean;
};

const STEPS: Step[] = [
  {
    number: "01",
    title: "The agent applies to list",
    detail:
      "No one self-publishes. Every agent or company asks to join Terrain before a single plot goes up.",
  },
  {
    number: "02",
    title: "We confirm their CAC registration",
    detail:
      "We check the company against the Corporate Affairs Commission register. A real, named, registered business, not a phone number.",
  },
  {
    number: "03",
    title: "We check the business is reachable",
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
      "Approved agents are allowed onto Terrain to publish their business and properties. Every listing carries verifiable media: photos, video, drone aerials, and 3D tours, so you can judge it before you reach out.",
    terminal: true,
  },
];

export function AgentVetting() {
  return (
    <section
      id="vetting"
      className="bg-primary py-16 text-canvas sm:py-24 lg:py-32"
    >
      <Reveal className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-6 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-10">
        <div className="lg:col-span-5">
          <span
            className="text-[11px] uppercase tracking-[0.18em] text-canvas/60"
            style={{ fontFamily: "var(--font-interactive)" }}
          >
            Before an agent can list
          </span>
          <span
            aria-hidden
            className="mt-3 inline-block h-px w-12 bg-canvas/30"
          />
          <h2
            className="mt-6 text-[clamp(34px,5vw,60px)] leading-[1.02] tracking-tight"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
          >
            Checked before
            <br className="hidden sm:block" /> you ever see them.
          </h2>
          <p
            className="mt-6 max-w-md text-base leading-relaxed text-canvas/70 sm:text-lg"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Terrain is a register, not a noticeboard. The vetting happens
            upstream of you, so the first agent you meet is already a
            real, CAC-verified business.
          </p>
        </div>

        <ol className="lg:col-span-7 lg:pt-2">
          {STEPS.map((step, i) => (
            <StepRow key={step.number} step={step} isLast={i === STEPS.length - 1} />
          ))}
        </ol>
      </Reveal>
    </section>
  );
}

function StepRow({ step, isLast }: { step: Step; isLast: boolean }) {
  return (
    <li className="relative flex gap-5 sm:gap-6">
      {/* Left rail: a node + the connecting vertical line. The line is
         drawn on every row except the last so the timeline terminates
         cleanly at step 05. */}
      <div className="relative flex flex-col items-center">
        <span
          className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
            step.terminal
              ? "bg-verified text-canvas"
              : "border border-canvas/25 bg-primary text-canvas"
          }`}
          aria-hidden
        >
          {step.terminal ? (
            <CheckGlyph />
          ) : (
            <span
              className="text-[12px] tracking-[0.08em]"
              style={{ fontFamily: "var(--font-interactive)", fontWeight: 700 }}
            >
              {step.number}
            </span>
          )}
        </span>
        {!isLast && (
          <span aria-hidden className="w-px flex-1 bg-canvas/15" />
        )}
      </div>

      {/* Content. Bottom padding creates the rhythm between steps; the
         last step drops it so the section closes tight. */}
      <div className={isLast ? "pb-0" : "pb-9 sm:pb-10"}>
        <h3
          className="text-lg leading-snug text-canvas sm:text-xl"
          style={{ fontFamily: "var(--font-body)", fontWeight: 700 }}
        >
          {step.title}
        </h3>
        <p
          className="mt-2 max-w-md text-[15px] leading-relaxed text-canvas/65"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {step.detail}
        </p>
      </div>
    </li>
  );
}

function CheckGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3.5 8.4l3 3 6-6.4"
        stroke="#fdfcfb"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
