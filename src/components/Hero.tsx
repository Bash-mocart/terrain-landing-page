import Link from "next/link";
import { LiveMap } from "./LiveMap";

// Hero. Title block on the left, live Abuja map on the right (Plate I).
// Reads as the cover of a registry document: section number, eyebrow
// caps, headline, subhead, two store buttons, quiet trust line. No
// pill chrome, no photography behind the type, no animation. The page
// IS the brand voice; the hero is the document's title page.
export function Hero() {
  return (
    <section className="border-b border-[#ebebeb]">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-12 px-6 pb-16 pt-24 sm:px-10 lg:grid-cols-12 lg:gap-16 lg:pb-24 lg:pt-32">
        <div className="lg:col-span-7">
          <p
            className="text-[11px] uppercase tracking-[0.18em] text-[#090503]"
            style={{ fontFamily: "var(--font-interactive)" }}
          >
            <span className="tabular-nums">01</span>
            <span aria-hidden> &nbsp;·&nbsp; </span>
            Terrain, Nigeria
          </p>
          <h1
            className="mt-8 text-[clamp(48px,8vw,104px)] leading-[0.92] tracking-[-0.015em] text-[#090503]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
          >
            Every plot,
            <br />
            on record.
          </h1>
          <p
            className="mt-8 max-w-[44ch] text-lg leading-relaxed text-[#717171]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            We started in Abuja. Browse the verified plots beside this entry; the
            app holds the rest of Nigeria.
          </p>
          <div className="mt-12 flex flex-wrap items-center gap-3">
            <StoreButton href="https://apps.apple.com" platform="ios" />
            <StoreButton href="https://play.google.com" platform="android" />
          </div>
          <p
            className="mt-12 max-w-[60ch] border-t border-[#ebebeb] pt-6 text-[12px] uppercase tracking-[0.14em] text-[#717171]"
            style={{ fontFamily: "var(--font-interactive)" }}
          >
            Verified on the ground
            <span aria-hidden> &nbsp;·&nbsp; </span>
            Title transfers held in escrow
            <span aria-hidden> &nbsp;·&nbsp; </span>
            Reviewed before listing
          </p>
        </div>
        <div className="lg:col-span-5">
          <LiveMap />
        </div>
      </div>
    </section>
  );
}

// Custom monochrome store buttons. Late-Night Boardroom fill, Warm
// Canvas text, hairline border at 60% alpha so the button reads as
// a plate, not a SaaS pill. Apple/Google glyphs sit at left in Warm
// Canvas. Pure registry voice; the official Apple/Google badges
// would bring colors the palette can't carry.
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
      className="inline-flex items-center gap-3 rounded-sm border border-[#090503] bg-[#090503] px-5 py-3 text-[#fdfcfb] transition-opacity hover:opacity-90"
    >
      {platform === "ios" ? <AppleGlyph /> : <PlayGlyph />}
      <span className="flex flex-col leading-tight">
        <span
          className="text-[9px] uppercase tracking-[0.18em] text-[#fdfcfb]/70"
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
      <path d="M17.5 12.4c0-2.7 2.2-4 2.3-4.1-1.3-1.8-3.2-2.1-3.9-2.1-1.7-.2-3.2 1-4 1-.8 0-2.1-1-3.5-1-1.8 0-3.4 1-4.3 2.7-1.8 3.2-.5 7.9 1.3 10.5.9 1.3 1.9 2.7 3.3 2.6 1.3-.1 1.8-.8 3.4-.8s2.1.8 3.5.8c1.5 0 2.4-1.3 3.3-2.6 1-1.4 1.5-2.8 1.5-2.9-.1 0-2.9-1.1-2.9-4.1zM14.8 4.5c.7-.9 1.2-2.1 1.1-3.4-1 .1-2.3.7-3 1.6-.7.8-1.3 2.1-1.1 3.3 1.2.1 2.3-.6 3-1.5z"/>
    </svg>
  );
}

function PlayGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden>
      <path d="M3.6 1.8C3.2 2 3 2.5 3 3v18c0 .5.2 1 .6 1.2l9.6-9.6L3.6 1.8zM14.7 11.4l2.7-2.7 5.1 2.9c.4.2.6.6.6 1s-.2.8-.6 1l-5.1 2.9-2.7-2.7v-2.4zM4.5 22.5l9.2-9.2 2.7 2.7-9.9 5.7c-.5.3-1.4.5-2 .8z"/>
    </svg>
  );
}
