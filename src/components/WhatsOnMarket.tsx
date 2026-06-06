import Image from "next/image";
import Link from "next/link";

// "What's on the Market" — headline left, phone mockup right showing
// the app's search results. CTA invites a peek at live inventory.
export function WhatsOnMarket() {
  return (
    <section id="listings" className="bg-canvas py-24 lg:py-32">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-12 px-10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <span
            className="rounded-full bg-[--color-border-rule]/60 px-3 py-1.5 text-xs uppercase tracking-[0.18em] text-primary"
            style={{ fontFamily: "var(--font-interactive)" }}
          >
            Live inventory
          </span>
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
            Hundreds of plots, verified and on record. Filter by city, price
            range, certificate type, and verification status. Title documents
            confirmed before they reach you.
          </p>
          <Link
            href="#download"
            className="mt-10 inline-flex items-center justify-center rounded-full bg-verified px-7 py-3.5 text-canvas transition-opacity hover:opacity-90"
            style={{ fontFamily: "var(--font-interactive)", fontWeight: 600 }}
          >
            View all Listings
          </Link>
        </div>
        <div className="relative lg:col-span-6">
          <div className="relative mx-auto aspect-[3/4] max-w-md overflow-hidden rounded-[44px] border border-[--color-border-rule] bg-canvas">
            <Image
              src="/figma/mockup-search.png"
              alt="Terrain app showing search results for verified plots in Lagos"
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
