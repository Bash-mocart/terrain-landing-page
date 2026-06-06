// Static placeholder for the hero map. Painted as a topographic
// surface in the brand colors (no Mapbox call yet — that lands in
// the next commit as a 'use client' component that calls /v1/
// listings/map and renders real plot pins).
//
// Aspect, position, and chrome match the Figma so the swap is a
// straight component substitution.
export function LiveMapPlaceholder() {
  return (
    <div
      className="relative aspect-square w-full overflow-hidden rounded-[44px] border border-[--color-border-rule] bg-canvas"
      aria-label="Map of available plots, interactive map coming soon"
      role="img"
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="400" height="400" fill="var(--color-canvas)" />
        {Array.from({ length: 16 }).map((_, i) => {
          const r = 40 + i * 14;
          return (
            <ellipse
              key={i}
              cx={210}
              cy={220}
              rx={r}
              ry={r * 0.78}
              transform={`rotate(${-12 + i * 0.6}, 210, 220)`}
              stroke="var(--color-verified)"
              strokeOpacity={0.18}
              strokeWidth={1}
              fill="none"
            />
          );
        })}
        {[
          [128, 142, "₦35M"],
          [218, 196, "₦82M"],
          [294, 268, "₦120M"],
          [156, 286, "₦48M"],
        ].map(([x, y, label], i) => (
          <g key={i}>
            <rect
              x={(x as number) - 28}
              y={(y as number) - 14}
              width={56}
              height={26}
              rx={13}
              fill="var(--color-primary)"
            />
            <text
              x={x as number}
              y={(y as number) + 4}
              textAnchor="middle"
              fontFamily="var(--font-interactive)"
              fontSize={11}
              fontWeight={700}
              fill="var(--color-canvas)"
            >
              {label}
            </text>
          </g>
        ))}
      </svg>
      <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs">
        <span
          className="rounded-full bg-canvas/90 px-3 py-1 text-primary backdrop-blur"
          style={{ fontFamily: "var(--font-interactive)", fontWeight: 600 }}
        >
          Lagos · Abuja · Port Harcourt
        </span>
        <span
          className="inline-flex items-center gap-1.5 rounded-full bg-verified/95 px-3 py-1 text-canvas"
          style={{ fontFamily: "var(--font-interactive)", fontWeight: 600 }}
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-canvas" />
          Live
        </span>
      </div>
    </div>
  );
}
