// Cartographic survey kit. Reusable primitives that give every section
// below the hero the language of a land survey: coordinate annotations,
// survey-rule dividers, cadastral plot-corner brackets, a verified
// survey-seal, and a faint contour field. All decorative pieces are
// aria-hidden; they carry no information a screen reader needs.
//
// Tokens only: Late-Night Boardroom ink, Warm Canvas, Forest
// Verification (the survey/verified accent), Survey Gray, Border Rule.

const INK = "#090503";
const CANVAS = "#fdfcfb";
const VERIFIED = "#4a7c59";

// ── Coordinate annotation ────────────────────────────────────────────
// A monospace technical label, e.g. "6.5244° N · 3.3792° E" or a plot
// reference. The one move that sells the survey feel.
export function Coordinate({
  children,
  tone = "ink",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "ink" | "canvas";
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[11px] tracking-[0.08em] ${
        tone === "canvas" ? "text-canvas/55" : "text-secondary"
      } ${className}`}
      style={{ fontFamily: "var(--font-mono)" }}
    >
      {children}
    </span>
  );
}

// ── Survey rule ──────────────────────────────────────────────────────
// A horizontal divider with downward tick marks, like a map scale bar.
// Replaces the plain hairline. Pure CSS (no SVG ids to collide).
export function SurveyRule({
  tone = "ink",
  className = "",
}: {
  tone?: "ink" | "canvas";
  className?: string;
}) {
  const line =
    tone === "canvas" ? "rgba(253,252,251,0.25)" : "rgba(9,5,3,0.14)";
  const tick =
    tone === "canvas" ? "rgba(253,252,251,0.30)" : "rgba(9,5,3,0.18)";
  return (
    <div className={`relative h-3 w-full ${className}`} aria-hidden>
      <div
        className="absolute inset-x-0 bottom-0 h-px"
        style={{ background: line }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-1.5"
        style={{
          backgroundImage: `repeating-linear-gradient(to right, ${tick} 0 1px, transparent 1px 28px)`,
        }}
      />
    </div>
  );
}

// ── Plot-corner brackets ─────────────────────────────────────────────
// Four L-shaped cadastral corner marks. Drop inside a `relative`
// parent; they pin to its corners like survey beacons on a plot.
export function PlotCorners({
  tone = "ink",
  inset = 10,
  size = 14,
}: {
  tone?: "ink" | "canvas";
  inset?: number;
  size?: number;
}) {
  const color = tone === "canvas" ? "rgba(253,252,251,0.5)" : "rgba(9,5,3,0.4)";
  const common = "absolute";
  const v = `${size}px`;
  const t = `${inset}px`;
  return (
    <span aria-hidden>
      <span className={common} style={{ top: t, left: t, width: v, height: v, borderTop: `1.5px solid ${color}`, borderLeft: `1.5px solid ${color}` }} />
      <span className={common} style={{ top: t, right: t, width: v, height: v, borderTop: `1.5px solid ${color}`, borderRight: `1.5px solid ${color}` }} />
      <span className={common} style={{ bottom: t, left: t, width: v, height: v, borderBottom: `1.5px solid ${color}`, borderLeft: `1.5px solid ${color}` }} />
      <span className={common} style={{ bottom: t, right: t, width: v, height: v, borderBottom: `1.5px solid ${color}`, borderRight: `1.5px solid ${color}` }} />
    </span>
  );
}

// ── Verified survey-seal ─────────────────────────────────────────────
// A circular Forest Verification stamp for the vetting / verification
// moments. A notched outer ring, a check, and the word VERIFIED set
// around the form, like an official seal.
export function VerifiedSeal({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden>
      <circle cx="32" cy="32" r="30" stroke={VERIFIED} strokeWidth="1.5" />
      <circle
        cx="32"
        cy="32"
        r="25"
        stroke={VERIFIED}
        strokeWidth="1"
        strokeDasharray="2 3"
        opacity="0.6"
      />
      <circle cx="32" cy="32" r="15" fill={VERIFIED} />
      <path
        d="M25.5 32.2l4.3 4.3 9-9"
        stroke={CANVAS}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ── Contour field ────────────────────────────────────────────────────
// Faint topographic contour lines as a section-background texture. Drop
// into a `relative overflow-hidden` parent as an absolute inset-0 layer
// behind the content. Stroke adapts to the surface.
export function ContourField({
  tone = "ink",
  className = "",
}: {
  tone?: "ink" | "canvas";
  className?: string;
}) {
  const stroke = tone === "canvas" ? CANVAS : INK;
  const opacity = tone === "canvas" ? 0.05 : 0.04;
  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      viewBox="0 0 1200 600"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      aria-hidden
    >
      <g stroke={stroke} strokeWidth="1.25" opacity={opacity}>
        <path d="M-50 180 C 200 90, 420 250, 650 160 S 1050 60, 1280 200" />
        <path d="M-50 250 C 220 170, 430 320, 660 230 S 1060 140, 1280 270" />
        <path d="M-50 330 C 240 250, 450 400, 680 300 S 1080 220, 1280 350" />
        <path d="M-50 420 C 260 340, 470 480, 700 380 S 1100 300, 1280 440" />
        <path d="M-50 520 C 280 440, 500 560, 720 470 S 1120 390, 1280 530" />
      </g>
    </svg>
  );
}
