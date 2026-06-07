import Image from "next/image";
import Link from "next/link";

// "What's on the Market" — headline left, phone mockup right showing
// the app's search results. CTA invites a peek at live inventory.
// Eyebrow chip replaced with typeset caps Inter + hairline rule.
// Mockup frame radius reduced from 44px to 20px to match the Flutter
// app's card discipline. CTA renamed from "View all Listings"
// (dishonest — anchor went to #download) to "Get the App" (honest).
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
            What&rsquo;s on the Market.
          </h2>
          <p
            className="mt-6 max-w-md text-lg leading-relaxed text-secondary"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Hundreds of plots and houses listed by CAC-verified real
            estate agents we have vetted. Filter by city, price, and
            property type. Contact the agent directly through the app.
          </p>
          <Link
            href="#top"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-7 py-3.5 text-canvas transition-opacity hover:opacity-90 sm:mt-10"
            style={{ fontFamily: "var(--font-interactive)", fontWeight: 600 }}
          >
            Get the App
          </Link>
        </div>
        <div className="relative lg:col-span-6">
          <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-[20px] border border-[--color-border-rule] bg-canvas sm:max-w-md">
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
