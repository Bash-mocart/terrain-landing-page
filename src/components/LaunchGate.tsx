import Link from "next/link";
import { TerrainLogo } from "./TerrainLogo";
import { Countdown } from "./Countdown";
import { WaitlistForm } from "./home/WaitlistForm";

// Opening day, Lagos time (WAT, UTC+1). Until then the home page is this
// gate: real Abuja contour lines drawing in behind the slogan, a countdown,
// the waitlist.
// ponytail: one constant; move to the backend's app config if it ever
// needs changing without a deploy.
export const LAUNCH_AT = "2027-01-01T00:00:00+01:00";

const WORDS = ["Own.", "Build.", "Grow."];

export function LaunchGate() {
  return (
    <>
      <section
        aria-labelledby="gate-title"
        className="fixed inset-0 overflow-y-auto bg-canvas"
      >
        {/* Real Abuja contour lines (public/terrain), drawing themselves in. */}
        {/* eslint-disable-next-line @next/next/no-img-element -- animated SVG must stay an untouched file */}
        <img
          src="/terrain/abuja-contours.svg"
          alt=""
          aria-hidden
          className="gate-breathe pointer-events-none fixed inset-0 h-full w-full object-cover"
        />
        {/* Canvas veil: clear for the words in the middle, terrain at the edges. */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 50% at 50% 46%, rgb(253 252 251 / 0.85) 0%, rgb(253 252 251 / 0.5) 55%, rgb(253 252 251 / 0) 100%)",
          }}
        />
        <div className="relative mx-auto flex min-h-full max-w-2xl flex-col items-center justify-center px-6 py-14 text-center">
          <div className="gate-rise">
            <TerrainLogo markSize={32} />
          </div>

          <h1
            id="gate-title"
            className="mt-10 text-[clamp(56px,13vw,124px)] leading-[0.9] tracking-[-0.03em] text-primary"
            style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}
          >
            {WORDS.map((w, i) => (
              <span
                key={w}
                className={`gate-rise inline-block pl-[0.22em] ${w === "Grow." ? "text-[#1a5c38]" : ""}`}
                style={{ "--d": `${200 + i * 160}ms` } as React.CSSProperties}
              >
                {w}
              </span>
            ))}
          </h1>

          <div className="gate-rise mt-12 w-full" style={{ "--d": "760ms" } as React.CSSProperties}>
            <p
              className="flex items-center justify-center gap-2.5 text-[15px] text-primary"
              style={{ fontFamily: "var(--font-body)", fontWeight: 700 }}
            >
              <span className="gate-pulse relative size-2 rounded-full bg-[#1a5c38]" aria-hidden />
              Opening 1 January 2027
            </p>
            <div className="mt-5">
              <Countdown to={LAUNCH_AT} />
            </div>
          </div>

          <div
            className="gate-rise mt-10 flex w-full justify-center"
            style={{ "--d": "920ms" } as React.CSSProperties}
          >
            <WaitlistForm id="gate-waitlist" />
          </div>

          <nav
            aria-label="Legal"
            className="gate-rise mt-12 flex gap-6 text-sm text-secondary"
            style={{ fontFamily: "var(--font-body)", "--d": "1060ms" } as React.CSSProperties}
          >
            <Link href="/privacy" className="hover:text-primary">Privacy</Link>
            <Link href="/terms" className="hover:text-primary">Terms</Link>
            <a href="mailto:support@terrain.ng" className="hover:text-primary">Contact</a>
          </nav>
        </div>
      </section>
    </>
  );
}
