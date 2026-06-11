import Link from "next/link";
import type { Metadata } from "next";

// Brand preview. Three logo directions for Terrain, designed as SVG
// (not raster) so the chosen mark drops straight into the nav, footer,
// and favicon and stays crisp at every size. All within the five-token
// palette: Late-Night Boardroom marks, Warm Canvas voids, a single
// Forest Verification survey accent where it earns its place.
//
// Concepts:
//   A. Plot Pin   — a map pin with a square plot cut out of it. Ties
//      directly to the live map + a registered parcel.
//   B. Boundary T — a geometric "T" monogram with a Forest
//      Verification survey-beacon node at its base.
//   C. Contour    — stacked topographic contour lines, land read as
//      terrain/elevation. The most abstract, the most ownable.

export const metadata: Metadata = {
  title: "Terrain · Brand",
  description: "Logo directions for Terrain.",
};

const DARK = "#090503";
const CANVAS = "#fdfcfb";
const VERIFIED = "#4a7c59";

type MarkProps = { size?: number; fg?: string; accent?: string };

function PlotPinMark({ size = 48, fg = DARK, accent = VERIFIED }: MarkProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden>
      <path
        d="M24 4C15.16 4 8 11.16 8 20c0 10.5 13.2 22.06 15.06 23.62a1.46 1.46 0 0 0 1.88 0C26.8 42.06 40 30.5 40 20 40 11.16 32.84 4 24 4Z"
        fill={fg}
      />
      <rect x="17" y="13" width="14" height="14" rx="3" fill={CANVAS} />
      <rect x="21.5" y="17.5" width="5" height="5" rx="1.2" fill={accent} />
    </svg>
  );
}

function BoundaryTMark({ size = 48, fg = DARK, accent = VERIFIED }: MarkProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden>
      {/* plot frame */}
      <rect
        x="5"
        y="5"
        width="38"
        height="38"
        rx="9"
        stroke={fg}
        strokeWidth="3"
      />
      {/* T monogram */}
      <rect x="13" y="14" width="22" height="5.5" rx="2.5" fill={fg} />
      <rect x="21.25" y="14" width="5.5" height="20" rx="2.5" fill={fg} />
      {/* survey beacon node */}
      <circle cx="24" cy="36" r="3.4" fill={accent} />
    </svg>
  );
}

function ContourMark({ size = 48, fg = DARK, accent = VERIFIED }: MarkProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden>
      <path
        d="M7 33c5-9 11.5-13.5 17-13.5S36 24 41 33"
        stroke={fg}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M12 39c4-7 8.4-10.5 12-10.5S32 32 36 39"
        stroke={fg}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path
        d="M18 26.5c2.4-4 4.2-6 6-6s3.6 2 6 6"
        stroke={accent}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

const CONCEPTS = [
  {
    key: "A",
    name: "Plot Pin",
    Mark: PlotPinMark,
    note: "A map pin with a registered parcel cut out of it. Reads instantly as property + the live map; the Forest Verification square is the verified plot.",
  },
  {
    key: "B",
    name: "Boundary T",
    Mark: BoundaryTMark,
    note: "A geometric T monogram inside a plot boundary, with a survey-beacon node at its base. The most literal registry mark; strong as a single letter.",
  },
  {
    key: "C",
    name: "Contour",
    Mark: ContourMark,
    note: "Stacked topographic contour lines, land read as terrain. The most abstract and the most ownable; no one else in the category looks like this.",
  },
] as const;

export default function BrandPage() {
  return (
    <main className="min-h-screen bg-canvas px-6 py-16 sm:px-10 sm:py-24">
      <div className="mx-auto max-w-[960px]">
        <Link
          href="/"
          className="text-sm text-secondary transition-colors hover:text-primary"
          style={{ fontFamily: "var(--font-interactive)" }}
        >
          ← Terrain
        </Link>

        <header className="mt-8 max-w-xl">
          <span
            className="text-[11px] uppercase tracking-[0.18em] text-secondary"
            style={{ fontFamily: "var(--font-interactive)" }}
          >
            Brand exploration
          </span>
          <span aria-hidden className="mt-3 inline-block h-px w-12 bg-[--color-border-rule]" />
          <h1
            className="mt-6 text-[clamp(34px,5vw,56px)] leading-[1.02] tracking-tight text-primary"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
          >
            Three marks for Terrain.
          </h1>
          <p
            className="mt-5 text-base leading-relaxed text-secondary sm:text-lg"
            style={{ fontFamily: "var(--font-body)" }}
          >
            SVG, not raster, so the chosen mark stays crisp from favicon to
            billboard and lives entirely in the five-token palette. Each is a
            genuinely different concept, not a colour variant.
          </p>
        </header>

        <div className="mt-14 flex flex-col gap-6">
          {CONCEPTS.map(({ key, name, Mark, note }) => (
            <section
              key={key}
              className="rounded-[24px] border border-[--color-border-rule] bg-canvas p-6 sm:p-8"
            >
              <div className="flex items-center gap-3">
                <span
                  className="text-[11px] uppercase tracking-[0.16em] text-secondary"
                  style={{ fontFamily: "var(--font-interactive)", fontWeight: 600 }}
                >
                  {key}
                </span>
                <h2
                  className="text-xl tracking-tight text-primary"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
                >
                  {name}
                </h2>
              </div>
              <p
                className="mt-2 max-w-lg text-sm leading-relaxed text-secondary"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {note}
              </p>

              <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {/* App icon on light */}
                <Tile label="App icon">
                  <div className="flex h-24 w-24 items-center justify-center rounded-[22px] border border-[--color-border-rule] bg-canvas">
                    <Mark size={52} />
                  </div>
                </Tile>
                {/* App icon on dark */}
                <Tile label="On dark">
                  <div className="flex h-24 w-24 items-center justify-center rounded-[22px] bg-primary">
                    <Mark size={52} fg={CANVAS} accent={VERIFIED} />
                  </div>
                </Tile>
                {/* Horizontal lockup */}
                <Tile label="Lockup" wide>
                  <div className="flex items-center gap-3">
                    <Mark size={40} />
                    <span
                      className="text-3xl tracking-tight text-primary"
                      style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
                    >
                      Terrain
                    </span>
                  </div>
                </Tile>
              </div>
            </section>
          ))}
        </div>

        <p
          className="mt-12 text-sm leading-relaxed text-secondary"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Tell me which direction (A, B, or C) and I will refine it, build the
          full lockup set, generate the favicon, and wire it into the nav and
          footer in place of the plain TERRAIN text.
        </p>
      </div>
    </main>
  );
}

function Tile({
  label,
  wide = false,
  children,
}: {
  label: string;
  wide?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={wide ? "sm:col-span-2" : ""}>
      <div className="flex min-h-[112px] items-center justify-center rounded-[16px] bg-[--color-border-rule]/40 p-4">
        {children}
      </div>
      <p
        className="mt-2 text-center text-[10px] uppercase tracking-[0.16em] text-secondary"
        style={{ fontFamily: "var(--font-interactive)" }}
      >
        {label}
      </p>
    </div>
  );
}
