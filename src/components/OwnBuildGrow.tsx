import Image from "next/image";
import { Reveal } from "./Reveal";
import { Coordinate, PlotCorners, SurveyRule } from "./cartographic";

// The Terrain product family. Three named products presented as a
// lineup with one shipped flagship (Terrain Own) and two on the
// roadmap (Terrain Build, Terrain Grow). Replaces the earlier
// accordion: the dark-flagship / light-roadmap hierarchy now does the
// work the accordion did, and the whole pitch is visible at once on
// every viewport. The separate "Three Steps to Verified Ownership"
// section was removed; its content (browse, connect with the agent,
// visit and buy) is folded into Terrain Own's checklist here.
//
// Composition (impeccable craft brief, confirmed):
//   - Flagship Terrain Own = a full-width Late-Night Boardroom card,
//     the one place this section commits to a saturated surface, so
//     the live product carries real gravity.
//   - Terrain Build + Terrain Grow = two quieter Warm Canvas cards in
//     a 2-up row, tagged "In rollout", reading as siblings-in-waiting.
//
// Stays inside the five-token Terrain palette. No "use client" — the
// section is fully static; hierarchy and hover are pure CSS.
//
// Copy integrity: Terrain is a marketplace only (holds no funds, no
// escrow, no legal review, not a party to the transaction). Every
// claim below stays on the agent-vetting + immersive-media truth from
// the honesty sweep.

type Product = {
  number: string;
  name: string;
  claim: string;
  points: string[];
  icon: "own" | "build" | "grow";
};

const OWN: Product = {
  number: "01",
  name: "Terrain Own",
  claim: "Buy verified land and houses, direct from the agents we have vetted.",
  points: [
    "Browse vetted listings on a live map",
    "Walk every plot through photos, video, drone aerials, and 3D tours",
    "Connect with the CAC-verified agent directly",
    "Visit and buy on their terms, with no middle layer",
  ],
  icon: "own",
};

const ROADMAP: Product[] = [
  {
    number: "02",
    name: "Terrain Build",
    claim: "We help you build on the land you own, finish a stalled project, or furnish what is bare.",
    points: [
      "Build from the ground up with developers we have vetted",
      "Finish an unfinished or abandoned building",
      "Furnish and fit out, ready to live in or let",
    ],
    icon: "build",
  },
  {
    number: "03",
    name: "Terrain Grow",
    claim: "After you buy, we help you grow a portfolio, track its value, and sell or rent when you are ready.",
    points: [
      "Hold every property you own in one portfolio",
      "Track worth and appreciation over time",
      "Sell or rent through agents we have vetted",
    ],
    icon: "grow",
  },
];

const capsStyle: React.CSSProperties = {
  fontFamily: "var(--font-interactive)",
  textTransform: "uppercase",
};

export function OwnBuildGrow() {
  return (
    <section id="the-terrain-way" className="survey-grid relative bg-canvas py-16 sm:py-24 lg:py-32">
      <Reveal className="mx-auto max-w-[1100px] px-6 sm:px-8 lg:px-10">
        {/* Left-aligned header — distinct from the centered headers
           elsewhere on the page, and the natural anchor for a
           left-reading product lineup. */}
        <header className="flex max-w-2xl flex-col items-start">
          <div className="flex items-center gap-3">
            <span
              className="text-[11px] tracking-[0.18em] text-secondary"
              style={capsStyle}
            >
              The Terrain way
            </span>
            <Coordinate>3&nbsp;PRODUCTS</Coordinate>
          </div>
          <SurveyRule className="mt-4 max-w-[200px]" />
          <h2
            className="mt-6 text-[clamp(34px,5vw,60px)] leading-[1.02] tracking-tight text-primary"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
          >
            Own it. Build on it.
            <br className="hidden sm:block" /> Grow it.
          </h2>
          <p
            className="mt-5 max-w-md text-base leading-relaxed text-secondary sm:text-lg"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Three products for the whole life of a property. Terrain Own
            ships today; Build and Grow are on the way.
          </p>
        </header>

        <div className="mt-12 flex flex-col gap-5 sm:mt-14 sm:gap-6">
          <FlagshipCard product={OWN} />
          <div className="grid gap-5 sm:gap-6 lg:grid-cols-2">
            {ROADMAP.map((p) => (
              <RoadmapCard key={p.name} product={p} />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function FlagshipCard({ product }: { product: Product }) {
  return (
    <article className="relative overflow-hidden rounded-[24px] bg-primary text-canvas">
      <PlotCorners tone="canvas" inset={14} size={16} />
      <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
        {/* Content column. Light-on-dark type compensation per the
           typography reference: body weight stepped up (Nunito reads
           at 400 on canvas, so the dark card leans on /90 opacity +
           relaxed leading), caps get a touch more tracking. */}
        <div className="flex flex-col gap-7 p-7 sm:p-10 lg:p-12">
          <div className="flex items-center gap-3">
            <ProductGlyph icon={product.icon} tone="onDark" />
            <span
              className="text-[11px] tracking-[0.16em] text-canvas/60"
              style={capsStyle}
            >
              {product.number}
            </span>
            <StatusTag kind="live" />
          </div>

          <div className="flex flex-col gap-3">
            <h3
              className="text-[clamp(30px,4vw,44px)] leading-[1.0] tracking-tight"
              style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
            >
              {product.name}
            </h3>
            <p
              className="max-w-sm text-lg leading-relaxed text-canvas/90"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {product.claim}
            </p>
          </div>

          <ul className="flex flex-col gap-3">
            {product.points.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-verified"
                >
                  <CheckGlyph />
                </span>
                <span
                  className="text-[15px] leading-relaxed text-canvas/85"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {point}
                </span>
              </li>
            ))}
          </ul>

          <div className="pt-1">
            <a
              href="#listings"
              className="group inline-flex items-center gap-2 rounded-full bg-canvas px-6 py-3 text-sm text-primary transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-verified focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
              style={{ fontFamily: "var(--font-interactive)", fontWeight: 600 }}
            >
              Browse verified plots
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </a>
          </div>
        </div>

        {/* Image column. On mobile it sits above a comfortable height;
           on desktop it fills the card's full height beside the
           content. */}
        <div className="relative order-first h-56 w-full overflow-hidden sm:h-72 lg:order-last lg:h-auto lg:min-h-[420px]">
          <Image
            src="/figma/family-home.jpg"
            alt="A family at home together in their living room"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 520px, 100vw"
          />
          {/* A whisper of Late-Night Boardroom along the seam so the
             image marries the dark card instead of butting against it. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 lg:bg-gradient-to-r lg:from-primary/40 lg:to-transparent"
          />
        </div>
      </div>
    </article>
  );
}

function RoadmapCard({ product }: { product: Product }) {
  return (
    <article className="group flex flex-col gap-5 rounded-[24px] border border-[--color-border-rule] bg-canvas p-7 transition-colors duration-200 hover:border-primary sm:p-8">
      <div className="flex items-center gap-3">
        <ProductGlyph icon={product.icon} tone="onLight" />
        <span
          className="text-[11px] tracking-[0.16em] text-secondary"
          style={capsStyle}
        >
          {product.number}
        </span>
        <StatusTag kind="rollout" />
      </div>

      <div className="flex flex-col gap-2">
        <h3
          className="text-[clamp(24px,3vw,30px)] leading-none tracking-tight text-primary"
          style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
        >
          {product.name}
        </h3>
        <p
          className="text-[15px] leading-relaxed text-secondary"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {product.claim}
        </p>
      </div>

      {/* Roadmap previews use a Survey Gray dash marker, NOT the
         Forest Verification check. The check means "live / verified";
         these features are not live yet, so they must not borrow its
         signal. */}
      <ul className="mt-1 flex flex-col gap-2.5">
        {product.points.map((point) => (
          <li key={point} className="flex items-start gap-3">
            <span
              aria-hidden
              className="mt-2 h-px w-3 shrink-0 bg-secondary/50"
            />
            <span
              className="text-sm leading-relaxed text-primary/80"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {point}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function StatusTag({ kind }: { kind: "live" | "rollout" }) {
  if (kind === "live") {
    // Late-Night Boardroom text on Forest Verification (4.6:1, clears
    // AA for this 10px badge; Warm Canvas text on the same green is
    // ~4.2:1 and would fail).
    return (
      <span
        className="inline-flex items-center gap-1.5 rounded-full bg-verified px-2.5 py-1 text-[10px] tracking-[0.14em] text-primary"
        style={{ ...capsStyle, fontWeight: 700 }}
      >
        {/* Radar-ping "beep": an expanding ring around the dot signals a
           live status. motion-safe so it stays still for reduced-motion. */}
        <span aria-hidden className="relative inline-flex h-1.5 w-1.5 items-center justify-center">
          <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-60 motion-safe:animate-ping" />
          <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-primary" />
        </span>
        Live
      </span>
    );
  }
  return (
    <span
      className="inline-flex items-center rounded-full border border-[--color-border-rule] px-2.5 py-1 text-[10px] tracking-[0.14em] text-secondary"
      style={{ ...capsStyle, fontWeight: 600 }}
    >
      In rollout
    </span>
  );
}

function ProductGlyph({
  icon,
  tone,
}: {
  icon: "own" | "build" | "grow";
  tone: "onDark" | "onLight";
}) {
  // Small product mark. On the dark flagship it inverts (canvas chip,
  // primary glyph); on the light roadmap cards it is a primary chip
  // with a canvas glyph, echoing the flagship's contrast in reverse.
  const chip =
    tone === "onDark"
      ? "bg-canvas text-primary"
      : "bg-primary text-canvas";
  return (
    <span
      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] ${chip}`}
      aria-hidden
    >
      <GlyphPath icon={icon} />
    </span>
  );
}

function GlyphPath({ icon }: { icon: "own" | "build" | "grow" }) {
  if (icon === "own") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M14.5 3a6.5 6.5 0 00-6.3 8.2L3 16.4V21h4.6v-2.3h2.3v-2.3h2.3l1.2-1.2A6.5 6.5 0 1014.5 3zm2.5 5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    );
  }
  if (icon === "build") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M3 3h8l-1.2 6.4a3 3 0 01-.86 1.62l-1.1 1.1 4.04 4.04a1.5 1.5 0 010 2.12l-.71.71a1.5 1.5 0 01-2.12 0l-4.04-4.04-1.1 1.1a3 3 0 01-1.62.86L3 18z" />
      </svg>
    );
  }
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 21v-7m0 0c0-3 2-5 5-5h2v1c0 3-2 5-5 5h-2zm0 0c0-3.2-2-5-5-5H5v1c0 3 2 5 5 5h2z" />
    </svg>
  );
}

function CheckGlyph() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M2.5 6.2l2.2 2.2 4.8-4.8"
        stroke="#fdfcfb"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
