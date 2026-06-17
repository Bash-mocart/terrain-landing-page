import Image from "next/image";
import { Reveal } from "./Reveal";

// Verify + Request. The app's verified-record screen carries the proof
// (show, don't tell), paired with the two promises from the notes: every
// Terrain listing is verified, and you can request ANY property and we'll
// verify it for you. The phone is the hero image of the section.
export function VerifyAndRequest() {
  return (
    <section className="bg-canvas py-24 sm:py-32">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-14 px-6 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-10">
        {/* Copy */}
        <Reveal>
          <span
            className="inline-block text-xs uppercase tracking-[0.18em] text-secondary"
            style={{ fontFamily: "var(--font-interactive)" }}
          >
            Verify any property
          </span>
          <h2
            className="mt-5 max-w-xl text-[clamp(30px,4.5vw,48px)] leading-[1.04] tracking-tight text-primary"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
          >
            We verify every property you want to buy.
          </h2>
          <p
            className="mt-6 max-w-lg text-lg leading-relaxed text-secondary"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Every listing on Terrain is checked on the ground, title, boundary,
            and access, before it ever reaches you. Found a property somewhere
            else? Request it, and we&rsquo;ll verify it for you.
          </p>

          <ul className="mt-8 space-y-3">
            {[
              "Title and document checked",
              "Boundary and survey confirmed",
              "Power, water and road access field-tested",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <CheckGlyph />
                <span
                  className="text-base text-primary"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <a
            href="#download"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-canvas transition-opacity hover:opacity-90"
            style={{ fontFamily: "var(--font-interactive)", fontWeight: 600 }}
          >
            Request a property
            <span aria-hidden>&rarr;</span>
          </a>
        </Reveal>

        {/* The app's verified-record screen */}
        <Reveal delay={120} className="flex justify-center lg:justify-end">
          <AppPhone src="/app/listing.png" alt="A verified property on Terrain" />
        </Reveal>
      </div>
    </section>
  );
}

// A phone-framed app screenshot: dark device bezel + the rounded screen.
// No bezel image needed; the frame is a rounded padded surface.
export function AppPhone({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[2.6rem] bg-primary p-[6px] shadow-[0_30px_70px_-20px_rgba(9,5,3,0.45)] ${className}`}
      style={{ width: "min(300px, 78vw)" }}
    >
      <Image
        src={src}
        alt={alt}
        width={640}
        height={1391}
        className="block h-auto w-full rounded-[2.15rem]"
        priority={false}
      />
    </div>
  );
}

function CheckGlyph() {
  return (
    <span
      className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
      style={{
        background: "color-mix(in oklch, var(--color-verified) 16%, transparent)",
      }}
      aria-hidden
    >
      <svg viewBox="0 0 16 16" className="h-3 w-3">
        <path
          d="M3 8.5 L6.5 12 L13 4.5"
          fill="none"
          stroke="var(--color-verified)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
