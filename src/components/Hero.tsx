import Link from "next/link";
import { LiveMap } from "./LiveMap";

// Hero. Headline left-aligned, live Abuja map on the right. The map
// is the arrival proof: real verified plots from /v1/listings, queryable
// on first paint. Pin chrome matches the Flutter buyer-map (Warm Canvas
// pill with price text, hairline border) so a visitor who later installs
// the app sees the same map.
export function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-canvas">
      <div className="relative mx-auto max-w-[1440px] px-10 pt-28 pb-16">
        <div className="grid grid-cols-12 gap-8 items-start">
          <div className="col-span-12 lg:col-span-7">
            <span
              className="inline-block rounded-full bg-[--color-border-rule]/60 px-3 py-1.5 text-xs uppercase tracking-[0.18em] text-primary"
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
              Browse verified plots across Lagos, Abuja, and beyond. Every title
              confirmed before funds move.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="#listings"
                className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3.5 text-canvas transition-opacity hover:opacity-90"
                style={{ fontFamily: "var(--font-interactive)", fontWeight: 600 }}
              >
                Start Searching
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center justify-center rounded-full border border-[--color-border-rule] px-7 py-3.5 text-primary transition-colors hover:border-primary"
                style={{ fontFamily: "var(--font-interactive)", fontWeight: 600 }}
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-5">
            <LiveMap />
          </div>
        </div>
      </div>
    </section>
  );
}
