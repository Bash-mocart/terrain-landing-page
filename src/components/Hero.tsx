import Link from "next/link";
import { LiveMap } from "./LiveMap";

// Hero. The map fills the full hero as a backdrop; headline, eyebrow,
// subhead, and two store CTAs overlay on the left half. Matches the
// Figma's 1440x1012 hero composition where the map is the surface,
// not a side panel. A subtle Warm Canvas wash on the left lifts text
// contrast against any high-contrast street segments behind it.
export function Hero() {
  return (
    <section className="relative min-h-[760px] w-full overflow-hidden bg-canvas lg:min-h-[1012px]">
      <div className="absolute inset-0 z-0">
        <LiveMap />
      </div>
      {/* Reading wash: confined to the left 40% of the hero so the
         headline + CTAs sit on a quieter surface, while plot pins in
         the middle and right of the map are never washed out. Opacity
         drops fast — peak 75% at the left edge, 25% by mid-wash, 0%
         at the right edge of the wash (which is 40% across the hero).
         A typical pin in the wash region still reads clearly because
         peak opacity sits behind the text density, not behind the
         middle of the map where pins cluster. */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-2/5 bg-gradient-to-r from-canvas/75 via-canvas/25 to-transparent"
        aria-hidden
      />
      <div className="relative z-10 mx-auto grid max-w-[1440px] grid-cols-12 gap-8 px-10 pt-28 pb-20 lg:pt-36 lg:pb-32">
        <div className="col-span-12 lg:col-span-7">
          <span
            className="inline-block rounded-full bg-canvas/85 px-3 py-1.5 text-xs uppercase tracking-[0.18em] text-primary backdrop-blur-sm"
            style={{ fontFamily: "var(--font-interactive)" }}
          >
            Verified on the ground
          </span>
          <h1
            className="mt-6 text-[clamp(48px,7vw,96px)] leading-[0.95] tracking-tight text-primary"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
          >
            Own a Property
            <br />
            Without Fear.
          </h1>
          <p
            className="mt-6 max-w-xl text-lg leading-relaxed text-secondary"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Browse verified plots across Abuja, Lagos, and beyond. Every title
            confirmed before funds move.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <StoreButton href="https://apps.apple.com" platform="ios" />
            <StoreButton href="https://play.google.com" platform="android" />
          </div>
        </div>
      </div>
    </section>
  );
}

function StoreButton({
  href,
  platform,
}: {
  href: string;
  platform: "ios" | "android";
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-3 rounded-full border border-primary bg-primary px-5 py-3 text-canvas transition-opacity hover:opacity-90"
    >
      {platform === "ios" ? <AppleGlyph /> : <PlayGlyph />}
      <span className="flex flex-col leading-tight">
        <span
          className="text-[9px] uppercase tracking-[0.18em] text-canvas/70"
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
