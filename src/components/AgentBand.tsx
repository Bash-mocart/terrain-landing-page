import { Reveal } from "./Reveal";
import { Coordinate, SurveyRule } from "./cartographic";

// The seller-side ask. One quiet band for the page's second audience:
// agents and companies who want their inventory in front of buyers who
// have already read how the vetting works. Hairline-ruled, no plate,
// no cards; it should read as a form notice at the end of the dossier,
// not a second hero.
export function AgentBand() {
  return (
    <section
      id="for-agents"
      className="border-t border-[--color-border-rule] bg-canvas"
    >
      <Reveal className="mx-auto flex max-w-[1100px] flex-col gap-8 px-6 py-16 sm:px-8 sm:py-20 lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:px-10">
        <div>
          <div className="flex items-center gap-3">
            <span
              className="text-[11px] uppercase tracking-[0.18em] text-secondary"
              style={{ fontFamily: "var(--font-interactive)" }}
            >
              For agents and companies
            </span>
            <Coordinate>APPLICATIONS&nbsp;OPEN</Coordinate>
          </div>
          <SurveyRule className="mt-4 max-w-[200px]" />
          <h2
            className="mt-6 text-[clamp(28px,4vw,44px)] leading-[1.04] tracking-tight text-primary"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
          >
            Sell on Terrain.
          </h2>
          <p
            className="mt-4 max-w-lg text-base leading-relaxed text-secondary sm:text-lg"
            style={{ fontFamily: "var(--font-body)" }}
          >
            CAC-registered? Apply, pass vetting, and list to buyers at home
            and in the diaspora who already trust what they find here.
          </p>
        </div>
        <a
          href="mailto:agents@terrain.ng"
          className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-primary px-7 py-3.5 text-primary transition-colors hover:bg-primary hover:text-canvas lg:self-auto"
          style={{ fontFamily: "var(--font-interactive)", fontWeight: 600 }}
        >
          Apply to list
          <span aria-hidden>&rarr;</span>
        </a>
      </Reveal>
    </section>
  );
}
