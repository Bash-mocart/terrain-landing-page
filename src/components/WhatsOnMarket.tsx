import Image from "next/image";
import Link from "next/link";

// Live inventory. The section's real point is the immersive media on
// every listing (the thing a buyer cannot get from a WhatsApp realtor),
// so the craft pass surfaces the four media types as a deliberate row
// instead of burying them in the paragraph. Left header + media row +
// CTA; right column is the app's search screen framed as a clean card.
// Warm Canvas surface, part of the page's light/dark heartbeat.

const MEDIA_TYPES = ["Photos", "Video", "Drone aerials", "3D tours"];

export function WhatsOnMarket() {
  return (
    <section id="listings" className="bg-canvas py-16 sm:py-24 lg:py-32">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-10 px-6 sm:gap-12 sm:px-8 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-6">
          <span
            className="text-[11px] uppercase tracking-[0.18em] text-primary"
            style={{ fontFamily: "var(--font-interactive)" }}
          >
            Live inventory
          </span>
          <span
            aria-hidden
            className="mt-3 ml-1 inline-block h-px w-12 bg-[--color-border-rule] align-middle"
          />
          <h2
            className="mt-6 text-[clamp(36px,5vw,64px)] leading-[1.0] tracking-tight text-primary"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
          >
            See the plot
            <br /> before you go.
          </h2>
          <p
            className="mt-6 max-w-md text-lg leading-relaxed text-secondary"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Hundreds of plots and houses across the FCT, each listed by a
            CAC-verified agent. Every one carries enough to judge it from
            your phone, then contact the agent directly.
          </p>

          {/* Media-type row. The four ways a listing comes to life,
             called out as caps chips so the differentiator is visible
             at a glance rather than hidden in prose. */}
          <ul className="mt-7 flex flex-wrap gap-2.5">
            {MEDIA_TYPES.map((m) => (
              <li
                key={m}
                className="rounded-full border border-[--color-border-rule] px-3.5 py-1.5 text-[11px] uppercase tracking-[0.14em] text-primary"
                style={{ fontFamily: "var(--font-interactive)", fontWeight: 600 }}
              >
                {m}
              </li>
            ))}
          </ul>

          <Link
            href="#download"
            className="mt-9 inline-flex items-center justify-center rounded-full bg-primary px-7 py-3.5 text-canvas transition-opacity hover:opacity-90"
            style={{ fontFamily: "var(--font-interactive)", fontWeight: 600 }}
          >
            Get the app
          </Link>
        </div>

        <div className="relative lg:col-span-6">
          <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-[20px] border border-[--color-border-rule] bg-canvas shadow-[0_24px_60px_rgba(9,5,3,0.10)] sm:max-w-md">
            <Image
              src="/figma/mockup-search.png"
              alt="Terrain app showing search results for verified plots"
              fill
              className="object-cover object-top"
              sizes="(min-width: 1024px) 33vw, 80vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
