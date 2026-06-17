// Terrain logo — the real brand mark: a disc holding a location pin with a
// small navigation arrow (matches the app's assets/brand/terrain_mark.svg).
// Monochrome by design; kept as a tintable component so it reads on any
// surface. Pass the surface it sits on:
//   - light surfaces (nav, canvas): fg dark disc, bg canvas pin (defaults)
//   - dark surfaces (footer): tone="onDark" -> fg canvas disc, bg dark pin

const DARK = "#090503";
const CANVAS = "#fdfcfb";

type MarkProps = {
  size?: number;
  fg?: string;
  bg?: string;
  className?: string;
};

export function TerrainMark({
  size = 32,
  fg = DARK,
  bg = CANVAS,
  className,
}: MarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-hidden
    >
      <rect width="16" height="16" rx="8" fill={fg} />
      <path
        d="M6.13229 10.944L9.02838 12.42C9.13162 12.4726 9.17645 12.597 9.13049 12.7039L8.20059 14.8673C8.12446 15.0442 7.87531 15.0442 7.79919 14.8673L6.11841 10.9574C6.1173 10.9548 6.11732 10.9518 6.11841 10.9492C6.12072 10.9438 6.12704 10.9414 6.13229 10.944Z"
        fill={bg}
      />
      <path
        d="M8 3C9.93297 3.00003 11.5 4.5778 11.5 6.52408C11.5 7.17059 11.3267 7.77623 11.0249 8.29709L9.4787 11.8939C9.42867 12.0103 9.29158 12.0601 9.1792 12.0029L6.48114 10.6281C6.37785 10.5754 6.3332 10.4509 6.37924 10.3439L7.06433 8.75438C7.11208 8.64361 7.23941 8.59335 7.354 8.62898C7.55817 8.69245 7.77514 8.72663 8 8.72663C9.2081 8.72661 10.1875 7.7405 10.1875 6.52408C10.1875 5.30766 9.2081 4.32156 8 4.32153C6.7919 4.32156 5.8125 5.30766 5.8125 6.52408C5.8125 7.21389 6.1276 7.82939 6.62064 8.23321C6.70193 8.29979 6.73499 8.41196 6.69327 8.50874L5.92957 10.2803C5.91679 10.3098 5.8819 10.3226 5.8533 10.308C5.84173 10.3021 5.83241 10.2922 5.82724 10.2803L4.97488 8.29709C4.67313 7.77625 4.5 7.17055 4.5 6.52408C4.5 4.5778 6.06703 3.00003 8 3Z"
        fill={bg}
      />
      <path
        d="M8.56567 5.50003C8.62478 5.46755 8.69669 5.51164 8.69513 5.57939L8.65112 7.41973C8.64895 7.50721 8.52955 7.54212 8.47809 7.47157C8.32511 7.26182 8.08645 6.9705 7.84833 6.82478C7.61205 6.68021 7.24852 6.60073 6.99469 6.56022C6.90885 6.54641 6.88503 6.42364 6.96136 6.38169L8.56567 5.50003Z"
        fill={bg}
      />
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
