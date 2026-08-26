// Line glyphs for the five buyer destinations, drawn to the same 24x24 grid
// and 1.7 stroke so they read as one set. Keyed by href so every surface that
// renders a destination gets the same glyph.

const PATHS: Record<string, React.ReactNode> = {
  "/explore": (
    <>
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </>
  ),
  "/browse": (
    <>
      <path d="M4 10.5 12 4l8 6.5" />
      <path d="M6 9.6V20h12V9.6" />
    </>
  ),
  "/inbox": (
    <path d="M20 12.5c0 3.6-3.6 6.5-8 6.5a9.6 9.6 0 0 1-2.6-.35L5 20.5l1.1-3.2A6.2 6.2 0 0 1 4 12.5C4 8.9 7.6 6 12 6s8 2.9 8 6.5Z" />
  ),
  "/saved": (
    <path d="M12 20s-7-4.4-7-9.1A3.9 3.9 0 0 1 12 8.4a3.9 3.9 0 0 1 7 2.5c0 4.7-7 9.1-7 9.1Z" />
  ),
  "/account": (
    <>
      <circle cx="12" cy="8.4" r="3.6" />
      <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
    </>
  ),
};

export function DestinationIcon({
  href,
  size = 22,
}: {
  href: string;
  size?: number;
}) {
  const path = PATHS[href];
  if (!path) return null;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {path}
    </svg>
  );
}
