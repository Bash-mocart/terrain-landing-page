import { Reveal } from "./Reveal";
import { Coordinate, PlotCorners, SurveyRule, VerifiedSeal } from "./cartographic";

// How verification works — crafted (impeccable, "claim + record" lane) as a
// two-up: the narrative claim on the left, and on the right the ARTEFACT the
// verification produces, a field report. Showing the receipt is more
// convincing than listing the steps, and folds the whole process into one
// compact, on-brand survey document. No card grid, no tall traverse.

// What a Terrain reviewer confirms on the ground (steps 01–02, folded in).
const CHECKS = [
  "Reviewer on the ground, in person",
  "Title and document confirmed",
  "Survey boundary and beacons",
  "Ownership verified",
];

// What they field-test on site (step 03), the realities you live with.
const SIGNALS = [
  { label: "Power", detail: "how steady it is" },
  { label: "Water", detail: "whether it runs" },
  { label: "Road", detail: "holds in the rains" },
  { label: "Network", detail: "which networks reach" },
];

export function HowWeVerify() {
  return (
    <section className="survey-grid relative bg-canvas py-24 sm:py-32">
      <div className="mx-auto grid max-w-[1100px] grid-cols-1 items-center gap-12 px-6 sm:px-8 lg:grid-cols-[1fr_minmax(0,460px)] lg:gap-16 lg:px-10">
        {/* Left: the claim */}
        <Reveal>
          <span
            className="text-[11px] uppercase tracking-[0.18em] text-secondary"
            style={{ fontFamily: "var(--font-interactive)" }}
          >
            How verification works
          </span>
          <SurveyRule className="mt-4 max-w-[200px]" />
          <h2
            className="mt-6 max-w-md text-[clamp(32px,5vw,52px)] leading-[1.02] tracking-tight text-primary"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
          >
            Checked in person, not from a desk.
          </h2>
          <p
            className="mt-5 max-w-md text-lg leading-relaxed text-secondary"
            style={{ fontFamily: "var(--font-body)" }}
          >
            &ldquo;Verified&rdquo; only means something if someone actually went
            there. So someone does, then writes it down.
          </p>
          <p
            className="mt-6 max-w-md text-lg leading-relaxed text-primary"
            style={{ fontFamily: "var(--font-body)", fontWeight: 600 }}
          >
            Every check becomes the property&rsquo;s{" "}
            <span className="text-verified">Terrain Record</span>, the verified
            history you read before you ever pay.
          </p>
          <p
            className="mt-3 max-w-md text-sm leading-relaxed text-secondary"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Terrain is a registered Nigerian company. Nothing lists until it
            passes.
          </p>
        </Reveal>

        {/* Right: the record it produces */}
        <Reveal delay={120}>
          <article
            className="relative rounded-2xl border border-[var(--color-border-rule)] p-7 sm:p-8"
            style={{
              background: "#fffdfb",
              boxShadow: "0 22px 60px -28px rgba(9,5,3,0.22)",
            }}
          >
            <PlotCorners inset={12} size={13} />

            {/* report header */}
            <div className="flex items-center justify-between">
              <span
                className="text-[11px] uppercase tracking-[0.2em] text-primary"
                style={{ fontFamily: "var(--font-interactive)", fontWeight: 700 }}
              >
                Field report
              </span>
              <Coordinate>9.06&deg;N &middot; 7.49&deg;E</Coordinate>
            </div>
            <SurveyRule className="mt-3" />

            {/* on-site checks */}
            <ul className="mt-6 flex flex-col gap-3.5">
              {CHECKS.map((c) => (
                <li key={c} className="flex items-center gap-3">
                  <CheckGlyph />
                  <span
                    className="text-[15px] text-primary"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {c}
                  </span>
                </li>
              ))}
            </ul>

            {/* field-test readout */}
            <div className="mt-7 border-t border-dashed border-[var(--color-border-rule)] pt-5">
              <span
                className="text-[10px] uppercase tracking-[0.2em] text-verified"
                style={{ fontFamily: "var(--font-interactive)", fontWeight: 700 }}
              >
                Field-tested on site
              </span>
              <ul className="mt-3.5 grid grid-cols-2 gap-x-6 gap-y-3.5">
                {SIGNALS.map((s) => (
                  <li key={s.label}>
                    <div
                      className="text-[12px] uppercase tracking-[0.1em] text-primary"
                      style={{
                        fontFamily: "var(--font-interactive)",
                        fontWeight: 700,
                      }}
                    >
                      {s.label}
                    </div>
                    <div
                      className="mt-0.5 text-sm leading-snug text-secondary"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {s.detail}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* filed */}
            <div className="mt-7 flex items-center gap-4 border-t border-[var(--color-border-rule)] pt-5">
              <VerifiedSeal size={42} />
              <div>
                <div
                  className="text-[11px] uppercase tracking-[0.18em] text-verified"
                  style={{
                    fontFamily: "var(--font-interactive)",
                    fontWeight: 700,
                  }}
                >
                  Filed
                </div>
                <p
                  className="text-sm text-secondary"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Added to the property&rsquo;s Terrain Record.
                </p>
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

function CheckGlyph() {
  return (
    <span
      aria-hidden
      className="flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full"
      style={{ background: "rgba(74,124,89,0.12)" }}
    >
      <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
        <path
          d="M2 6.4 L4.7 9 L10 3.2"
          stroke="#4a7c59"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
