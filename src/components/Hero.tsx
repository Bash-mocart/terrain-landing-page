import { LiveMap } from "./LiveMap";
import { WaitlistForm } from "./home/WaitlistForm";
import { ComingSoonPill } from "./ComingSoonPill";

// The live map of Abuja (no pins before launch) owns the right of the hero
// and fades into the page ground behind the copy.
export function Hero() {
  return (
    <section className="terrain-hero relative w-full overflow-hidden bg-canvas">
      <div className="absolute inset-0">
        <LiveMap />
      </div>
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-canvas from-[64%] via-canvas/60 via-[71%] to-transparent to-[80%] sm:bg-gradient-to-r sm:from-canvas sm:from-35% sm:via-canvas/75 sm:via-50% sm:to-transparent sm:to-75%"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-16 bg-gradient-to-b from-transparent to-canvas sm:h-24"
        aria-hidden
      />
      <div className="pointer-events-none relative z-10 mx-auto max-w-[1240px] px-6 pb-[18rem] pt-32 sm:px-10 sm:pb-24 sm:pt-36 lg:pb-24 lg:pt-40">
        <div className="pointer-events-auto max-w-xl">
          <h1
            className="text-[clamp(44px,8vw,76px)] leading-[0.95] tracking-[-0.02em] text-primary"
            style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}
          >
            Own. Build. Grow.
          </h1>
          <p
            className="mt-5 text-xl leading-snug text-primary sm:text-2xl"
            style={{ fontFamily: "var(--font-body)" }}
          >
            A home to own. Land to build on. Land to hold.
          </p>
          <p
            className="mt-3 max-w-md text-base leading-relaxed text-secondary"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Verified companies, and every deal kept on record.
          </p>
          <div className="mt-8">
            <WaitlistForm id="hero-waitlist" />
          </div>
          <p
            className="mt-4 flex flex-wrap items-center gap-2 text-sm text-secondary"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <ComingSoonPill />
            Listings open on the map at launch.
          </p>
        </div>
      </div>
    </section>
  );
}
