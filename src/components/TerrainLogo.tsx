// Terrain logo — "Plot Pin" direction. A map pin with a registered
// parcel cut out of it; the Forest Verification square is the verified
// plot. SVG so it stays crisp from favicon to billboard and lives in
// the five-token palette.
//
// The void (the square hole) is filled with `bg` rather than left
// transparent so the mark reads crisply on any solid surface. Pass the
// surface colour the mark sits on:
//   - light surfaces (nav, canvas): fg dark, bg canvas (defaults)
//   - dark surfaces (footer): tone="onDark" -> fg canvas, bg dark

const DARK = "#090503";
const CANVAS = "#fdfcfb";
const VERIFIED = "#4a7c59";

type MarkProps = {
  size?: number;
  fg?: string;
  bg?: string;
  accent?: string;
  className?: string;
};

export function TerrainMark({
  size = 32,
  fg = DARK,
  bg = CANVAS,
  accent = VERIFIED,
  className,
}: MarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M24 4C15.16 4 8 11.16 8 20c0 10.5 13.2 22.06 15.06 23.62a1.46 1.46 0 0 0 1.88 0C26.8 42.06 40 30.5 40 20 40 11.16 32.84 4 24 4Z"
        fill={fg}
      />
      <rect x="17" y="13" width="14" height="14" rx="3" fill={bg} />
      <rect x="21.5" y="17.5" width="5" height="5" rx="1.2" fill={accent} />
    </svg>
  );
}

export function TerrainLogo({
  markSize = 28,
  tone = "onLight",
  wordClassName = "text-2xl",
  className = "",
}: {
  markSize?: number;
  tone?: "onLight" | "onDark";
  wordClassName?: string;
  className?: string;
}) {
  const onDark = tone === "onDark";
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <TerrainMark
        size={markSize}
        fg={onDark ? CANVAS : DARK}
        bg={onDark ? DARK : CANVAS}
      />
      <span
        className={`${wordClassName} tracking-tight ${onDark ? "text-canvas" : "text-primary"}`}
        style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
      >
        Terrain
      </span>
    </span>
  );
}
