const PIXEL_DELAYS = Array.from({ length: 9 }, (_, index) => {
  const row = Math.floor(index / 3);
  const column = index % 3;
  return (column + Math.abs(row - 1)) * 90;
});

export function ExploreLoadingIndicator() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading property map"
      className="absolute inset-0 z-20 flex items-center justify-center bg-canvas/55 backdrop-blur-[1px]"
    >
      <span aria-hidden="true" className="grid grid-cols-3 gap-1">
        {PIXEL_DELAYS.map((delay, index) => (
          <span
            key={index}
            className="terrain-map-loader-pixel size-1.5 rounded-[1px] bg-verified"
            style={{ animationDelay: `${delay}ms` }}
          />
        ))}
      </span>
      <span className="sr-only">Loading property map.</span>
    </div>
  );
}
