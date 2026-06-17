import { Reveal } from "./Reveal";

// Problem -> Solution. The spine of the pitch: name what's broken about
// buying property in Nigeria today (plainly, no fear-mongering), and answer
// each with what Terrain does instead. Pays off on "With Terrain, you're
// secured." Left column is the old way (Survey Gray, muted); right column is
// the Terrain answer (primary + a Forest Verification check).
const PAIRS: { problem: string; solution: string }[] = [
  {
    problem: "Agents pile on fees and commission.",
    solution: "No agent fees. No commission.",
  },
  {
    problem: "You can't tell if a property is even real.",
    solution: "We verify every property you want to buy.",
  },
  {
    problem: "Nothing sits on a record you can trust.",
    solution: "Every property, on a verified record.",
  },
  {
    problem: "Anyone can pose as an agent.",
    solution: "Only verified agents and companies, in one place.",
  },
];

export function ProblemSolution() {
  return (
    <section className="bg-canvas py-24 sm:py-32">
      <div className="mx-auto max-w-[1100px] px-6 sm:px-8 lg:px-10">
        <Reveal>
          <span
            className="inline-block text-xs uppercase tracking-[0.18em] text-secondary"
            style={{ fontFamily: "var(--font-interactive)" }}
          >
            The problem, and the fix
          </span>
          <h2
            className="mt-5 max-w-2xl text-[clamp(32px,5vw,52px)] leading-[1.02] tracking-tight text-primary"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
          >
            The old way, and the Terrain way.
          </h2>
        </Reveal>

        <div className="mt-12 border-t border-[var(--color-border-rule)] sm:mt-16">
          {PAIRS.map((p) => (
            <Reveal key={p.solution}>
              <div className="grid grid-cols-1 items-start gap-5 border-b border-[var(--color-border-rule)] py-8 sm:grid-cols-2 sm:gap-12 sm:py-10">
                {/* The problem — the old way */}
                <div className="flex items-start gap-3">
                  <CrossGlyph />
                  <p
                    className="text-lg leading-snug text-secondary"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {p.problem}
                  </p>
                </div>
                {/* The Terrain answer */}
                <div className="flex items-start gap-3">
                  <CheckGlyph />
                  <p
                    className="text-lg leading-snug text-primary sm:text-xl"
                    style={{ fontFamily: "var(--font-body)", fontWeight: 700 }}
                  >
                    {p.solution}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p
            className="mt-16 text-center text-[clamp(28px,4.5vw,46px)] leading-tight tracking-tight text-primary sm:mt-20"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
          >
            With Terrain, you&rsquo;re{" "}
            <span className="text-verified">secured.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function CheckGlyph() {
  return (
    <span
      className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
      style={{
        background: "color-mix(in oklch, var(--color-verified) 16%, transparent)",
      }}
      aria-hidden
    >
      <svg viewBox="0 0 16 16" className="h-3 w-3">
        <path
          d="M3 8.5 L6.5 12 L13 4.5"
          fill="none"
          stroke="var(--color-verified)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function CrossGlyph() {
  return (
    <span
      className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[var(--color-border-rule)]"
      aria-hidden
    >
      <svg viewBox="0 0 16 16" className="h-2.5 w-2.5">
        <path
          d="M4 4 L12 12 M12 4 L4 12"
          fill="none"
          stroke="var(--color-secondary)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
