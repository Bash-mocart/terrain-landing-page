"use client";

import { useState } from "react";
import Link from "next/link";
import { LiveMap } from "./LiveMap";

export function Hero() {
  const [isExploring, setIsExploring] = useState(false);

  return (
    <section className="relative min-h-[680px] w-full overflow-hidden bg-canvas sm:min-h-[760px] lg:min-h-[1012px]">
      {/* Avoid a stacking context here so Mapbox popups can appear above the gradients. */}
      <div className="absolute inset-0">
        <LiveMap isExploring={isExploring} />
      </div>
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[60%] bg-gradient-to-b from-canvas/90 via-canvas/65 to-transparent sm:hidden"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-[1] hidden w-3/5 bg-gradient-to-r from-canvas/80 via-canvas/30 to-transparent sm:block lg:w-2/5 lg:from-canvas/75 lg:via-canvas/25"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-20 bg-gradient-to-b from-transparent to-canvas sm:h-32"
        aria-hidden
      />
      {/* Let the empty grid area pass pointer events through to map pins. */}
      <div className="pointer-events-none relative z-10 mx-auto grid max-w-[1440px] grid-cols-12 gap-6 px-6 pt-24 pb-16 sm:gap-8 sm:px-8 sm:pt-28 sm:pb-20 lg:px-10 lg:pt-36 lg:pb-32">
        <div className="pointer-events-auto col-span-12 lg:col-span-6">
          <span
            className="inline-block rounded-full bg-canvas/85 px-3 py-1.5 text-xs uppercase tracking-[0.18em] text-primary backdrop-blur-sm"
            style={{ fontFamily: "var(--font-interactive)" }}
          >
            CAC-verified agents &amp; companies
          </span>
          <h1
            className="mt-5 text-[clamp(40px,9vw,80px)] leading-[0.95] tracking-tight text-primary sm:mt-6"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
          >
            Own property
            <br />
            you can trust.
          </h1>
          <p
            className="mt-6 max-w-xl text-lg leading-relaxed text-secondary"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Walk every property across Nigeria through videos, drone
            aerials, and 3D tours before you visit. Listed by real
            estate agents and companies we have CAC-verified and vetted.
          </p>
          <div className="mt-10 flex flex-nowrap items-center gap-2 sm:gap-3">
            <Link
              href="/browse"
              className="inline-flex min-h-12 shrink-0 items-center justify-center whitespace-nowrap rounded-full border border-primary bg-primary px-5 py-3 text-canvas transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-verified focus-visible:ring-offset-2 focus-visible:ring-offset-canvas sm:px-6"
              style={{
                fontFamily: "var(--font-interactive)",
                fontWeight: 600,
              }}
            >
              Browse properties
            </Link>
            <Link
              href="/#download"
              className="inline-flex min-h-12 shrink-0 items-center justify-center whitespace-nowrap rounded-full border border-primary bg-canvas/85 px-5 py-3 text-primary transition-colors hover:bg-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-verified focus-visible:ring-offset-2 focus-visible:ring-offset-canvas sm:px-6"
              style={{
                fontFamily: "var(--font-interactive)",
                fontWeight: 600,
              }}
            >
              Get the app
            </Link>
          </div>
          <button
            type="button"
            onClick={() => setIsExploring((prev) => !prev)}
            aria-pressed={isExploring}
            className="terrain-map-link sm:hidden"
          >
            {isExploring ? "Done exploring ×" : "Tap to explore the map →"}
          </button>
        </div>
      </div>
    </section>
  );
}
