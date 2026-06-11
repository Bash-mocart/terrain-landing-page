import Link from "next/link";

// Shared App Store / Google Play button row. The hero defines its own
// inline pair (left untouched to keep the map section stable); this is
// the reusable version for the rest of the page, currently the closing
// CTA. `tone` flips the chrome so the row works on either surface:
// "onLight" = filled Late-Night Boardroom pills (for Warm Canvas
// sections), "onDark" = Warm Canvas pills (for Late-Night Boardroom
// sections).
export function StoreButtons({
  tone = "onLight",
}: {
  tone?: "onLight" | "onDark";
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <StoreButton href="https://apps.apple.com" platform="ios" tone={tone} />
      <StoreButton href="https://play.google.com" platform="android" tone={tone} />
    </div>
  );
}

function StoreButton({
  href,
  platform,
  tone,
}: {
  href: string;
  platform: "ios" | "android";
  tone: "onLight" | "onDark";
}) {
  const chrome =
    tone === "onLight"
      ? "border-primary bg-primary text-canvas"
      : "border-canvas bg-canvas text-primary";
  const sub = tone === "onLight" ? "text-canvas/70" : "text-primary/60";
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-3 rounded-full border px-5 py-3 transition-opacity hover:opacity-90 ${chrome}`}
    >
      {platform === "ios" ? <AppleGlyph /> : <PlayGlyph />}
      <span className="flex flex-col leading-tight">
        <span
          className={`text-[9px] uppercase tracking-[0.18em] ${sub}`}
          style={{ fontFamily: "var(--font-interactive)" }}
        >
          {platform === "ios" ? "Download on" : "Get it on"}
        </span>
        <span
          className="text-[15px]"
          style={{ fontFamily: "var(--font-interactive)", fontWeight: 600 }}
        >
          {platform === "ios" ? "App Store" : "Google Play"}
        </span>
      </span>
    </Link>
  );
}

function AppleGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden>
      <path d="M17.5 12.4c0-2.7 2.2-4 2.3-4.1-1.3-1.8-3.2-2.1-3.9-2.1-1.7-.2-3.2 1-4 1-.8 0-2.1-1-3.5-1-1.8 0-3.4 1-4.3 2.7-1.8 3.2-.5 7.9 1.3 10.5.9 1.3 1.9 2.7 3.3 2.6 1.3-.1 1.8-.8 3.4-.8s2.1.8 3.5.8c1.5 0 2.4-1.3 3.3-2.6 1-1.4 1.5-2.8 1.5-2.9-.1 0-2.9-1.1-2.9-4.1zM14.8 4.5c.7-.9 1.2-2.1 1.1-3.4-1 .1-2.3.7-3 1.6-.7.8-1.3 2.1-1.1 3.3 1.2.1 2.3-.6 3-1.5z" />
    </svg>
  );
}

function PlayGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden>
      <path d="M3.6 1.8C3.2 2 3 2.5 3 3v18c0 .5.2 1 .6 1.2l9.6-9.6L3.6 1.8zM14.7 11.4l2.7-2.7 5.1 2.9c.4.2.6.6.6 1s-.2.8-.6 1l-5.1 2.9-2.7-2.7v-2.4zM4.5 22.5l9.2-9.2 2.7 2.7-9.9 5.7c-.5.3-1.4.5-2 .8z" />
    </svg>
  );
}
