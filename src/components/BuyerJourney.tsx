import { Reveal } from "./Reveal";

// How you buy. A buyer-facing numbered journey, distinct from the
// agent-vetting timeline (which is the seller-side trust story) and
// from the Terrain Own checklist (which is the product framing). This
// is the buyer's actual path, told plainly, so a first-timer knows
// exactly what happens. Reads like a ledger: a row of numbered
// entries, each with a top hairline. Warm Canvas surface.
//
// Accurate to the marketplace model: Terrain introduces buyers to
// vetted agents and never holds funds, takes commission, or sits in
// the transaction.

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
    title: "Visit and verify",
    detail:
      "Arrange a site visit, see it in person, and run your own title checks, or hand it to your lawyer.",
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
    <section id="how-to-buy" className="bg-canvas py-16 sm:py-24 lg:py-32">
      <Reveal className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-10">
        <div className="flex max-w-xl flex-col items-start">
          <span
            className="text-[11px] uppercase tracking-[0.18em] text-primary"
            style={{ fontFamily: "var(--font-interactive)" }}
          >
            For buyers
          </span>
          <span aria-hidden className="mt-3 inline-block h-px w-12 bg-[--color-border-rule]" />
          <h2
            className="mt-6 text-[clamp(36px,5vw,64px)] leading-[1.0] tracking-tight text-primary"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
          >
            From the map to the keys.
          </h2>
          <p
            className="mt-5 text-base leading-relaxed text-secondary sm:text-lg"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Five steps, and you stay in control of every one. Terrain points
            you to a vetted agent; the rest of the deal is yours.
          </p>
        </div>

        <ol className="mt-12 grid grid-cols-1 gap-x-6 gap-y-8 sm:mt-14 sm:grid-cols-2 lg:grid-cols-5 lg:gap-x-8">
          {STEPS.map((step) => (
            <li key={step.number} className="border-t border-primary/15 pt-5">
              <span
                className="text-[34px] leading-none tracking-tight text-primary/25"
                style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
              >
                {step.number}
              </span>
              <h3
                className="mt-4 text-lg text-primary"
                style={{ fontFamily: "var(--font-body)", fontWeight: 700 }}
              >
                {step.title}
              </h3>
              <p
                className="mt-2 text-sm leading-relaxed text-secondary"
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
