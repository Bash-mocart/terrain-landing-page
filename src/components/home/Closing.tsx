import Image from "next/image";
import { WaitlistForm } from "./WaitlistForm";

// The close: the company path, then the promise and the one action again.
export function Closing() {
  return (
    <>
      <section id="for-companies" aria-labelledby="sell-title" className="bg-canvas pb-16 sm:pb-24">
        <div className="mx-auto max-w-[1240px] px-6 sm:px-10">
          <div className="flex flex-col gap-6 border-t border-border-rule pt-14 sm:pt-20 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h2
                id="sell-title"
                className="text-[clamp(28px,4vw,40px)] leading-[1.05] tracking-[-0.02em] text-primary"
                style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}
              >
                Selling as a company?
              </h2>
              <p
                className="mt-3 max-w-[60ch] text-base leading-relaxed text-secondary"
                style={{ fontFamily: "var(--font-body)" }}
              >
                CAC-registered real estate companies list on Terrain after a check. Your whole team answers
                buyers from one inbox, and every deal stays on record.
              </p>
            </div>
            <a
              href="mailto:agents@terrain.ng"
              className="inline-flex h-12 w-fit shrink-0 items-center rounded-full border border-primary px-6 text-[15px] text-primary transition-colors hover:bg-primary hover:text-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-verified focus-visible:ring-offset-2"
              style={{ fontFamily: "var(--font-interactive)", fontWeight: 600 }}
            >
              Apply to list
            </a>
          </div>
        </div>
      </section>

      <section id="waitlist" aria-labelledby="close-title" className="bg-canvas pb-16 sm:pb-24">
        <div className="mx-auto max-w-[1240px] px-6 sm:px-10">
          <div className="relative overflow-hidden rounded-3xl">
            <Image
              src="/photos/estate.webp"
              alt="A new estate taking shape on open land, seen from above"
              fill
              sizes="(min-width: 1240px) 1160px, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#090503]/80 via-[#090503]/55 to-[#090503]/10" aria-hidden />
            <div className="relative px-6 py-14 sm:px-12 sm:py-20 lg:py-24">
              <p
                className="text-[clamp(40px,7vw,72px)] leading-[0.95] tracking-[-0.02em] text-white"
                style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}
              >
                Own. Build. Grow.
              </p>
              <h2
                id="close-title"
                className="mt-4 max-w-md text-lg leading-snug text-white/90"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Be first in when Terrain opens.
              </h2>
              <div className="mt-8">
                <WaitlistForm id="closing-waitlist" onDark />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
