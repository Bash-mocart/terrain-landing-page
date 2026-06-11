import { Reveal } from "./Reveal";

// How we check agents. The seller-side trust story, told as a numbered
// process that mirrors the buyer-side "How you buy" ledger so the two
// read as a matched pair: same flow, two sides of the marketplace,
// distinguished by surface (this one Late-Night Boardroom dark, the
// buyer one Warm Canvas light). It is also the page's first full dark
// section, breaking the canvas run.
//
// Copy is honest to what Terrain actually does (CAC registration +
// business review before listing). No inflated protocol; five real
// steps.

type Step = {
  number: string;
  title: string;
  detail: string;
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
  },
];

export function AgentVetting() {
  return (
    <section id="vetting" className="bg-primary py-16 text-canvas sm:py-24 lg:py-32">
      <Reveal className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-10">
        <div className="flex max-w-xl flex-col items-start">
          <span
            className="text-[11px] uppercase tracking-[0.18em] text-canvas/60"
            style={{ fontFamily: "var(--font-interactive)" }}
          >
            How we check agents
          </span>
          <span aria-hidden className="mt-3 inline-block h-px w-12 bg-canvas/30" />
          <h2
            className="mt-6 text-[clamp(36px,5vw,64px)] leading-[1.0] tracking-tight"
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

        <ol className="mt-12 grid grid-cols-1 gap-x-6 gap-y-8 sm:mt-14 sm:grid-cols-2 lg:grid-cols-5 lg:gap-x-8">
          {STEPS.map((step) => (
            <li key={step.number} className="border-t border-canvas/20 pt-5">
              <span
                className="text-[34px] leading-none tracking-tight text-canvas/30"
                style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
              >
                {step.number}
              </span>
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
