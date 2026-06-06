// How verification works. Replaces the three pill-card "Steps" section
// with numbered registry sub-headings separated by hairlines. Roman
// numerals because a public record numbers its sections that way; no
// peach / dark / topo cards.
const STEPS: { numeral: string; title: string; body: string }[] = [
  {
    numeral: "I",
    title: "Reviewer visits the plot",
    body:
      "A Terrain reviewer travels to the parcel, walks the boundary, confirms each beacon number against the survey plan, and photographs every corner. Nothing reaches the listing without a person standing on the land.",
  },
  {
    numeral: "II",
    title: "Title confirmed at the Lands Bureau",
    body:
      "We pull the Certificate of Occupancy, Right of Occupancy, or Governor's Consent at the state Lands Bureau. The title number is cross-checked against the seller's KYC identity and the survey plan submitted with the listing.",
  },
  {
    numeral: "III",
    title: "Funds held in escrow",
    body:
      "Buyer payment sits in Terrain Trustees Ltd., a regulated escrow account, until the title transfers at the Lands Registry. Funds release to the seller only on completion. Refunded automatically if the deed does not land.",
  },
];

export function VerificationSteps() {
  return (
    <section className="border-b border-[#ebebeb]">
      <div className="mx-auto max-w-[1200px] px-6 py-24 sm:px-10 lg:py-32">
        <div className="flex flex-col gap-4">
          <p
            className="text-[11px] uppercase tracking-[0.18em] text-[#090503]"
            style={{ fontFamily: "var(--font-interactive)" }}
          >
            <span className="tabular-nums">03</span>
            <span aria-hidden> &nbsp;·&nbsp; </span>
            How verification works
          </p>
          <span className="block h-px w-full bg-[#ebebeb]" aria-hidden />
        </div>
        <p
          className="mt-6 max-w-[60ch] text-base leading-relaxed text-[#717171]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Every plot that reaches the app has been through this sequence.
          Nothing shortcuts it.
        </p>
        <ol className="mt-12 flex flex-col">
          {STEPS.map((step, i) => (
            <li
              key={step.numeral}
              className={`grid grid-cols-12 gap-6 py-10 lg:gap-12 ${i > 0 ? "border-t border-[#ebebeb]" : ""}`}
            >
              <div className="col-span-12 lg:col-span-3">
                <p
                  className="text-[11px] uppercase tracking-[0.2em] text-[#717171]"
                  style={{ fontFamily: "var(--font-interactive)" }}
                >
                  Step {step.numeral}
                </p>
                <h3
                  className="mt-3 text-2xl leading-tight text-[#090503] lg:text-3xl"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
                >
                  {step.title}
                </h3>
              </div>
              <div className="col-span-12 lg:col-span-9">
                <p
                  className="max-w-[62ch] text-base leading-relaxed text-[#090503]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
