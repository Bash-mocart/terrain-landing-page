import Image from "next/image";
import Link from "next/link";

// "Browse, Transact, and Track Properties, all on your Phone" —
// dark-grade section anchoring the app download. Phone mockup
// foreground, store buttons beside the copy.
export function BrowseTransactTrack() {
  return (
    <section id="download" className="bg-primary py-24 lg:py-32 text-canvas">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-12 px-10 lg:grid-cols-12">
        <div className="relative order-2 lg:order-1 lg:col-span-6">
          <div className="relative mx-auto aspect-[3/4] max-w-md overflow-hidden rounded-[44px] border border-canvas/15 bg-canvas/5">
            <Image
              src="/figma/mockup-map.png"
              alt="Terrain app showing the buyer map with live plot pins"
              fill
              className="object-cover object-top"
              sizes="(min-width: 1024px) 33vw, 80vw"
            />
          </div>
        </div>
        <div className="order-1 lg:order-2 lg:col-span-6">
          <span
            className="rounded-full bg-canvas/12 px-3 py-1.5 text-xs uppercase tracking-[0.18em] text-canvas/80"
            style={{ fontFamily: "var(--font-interactive)" }}
          >
            On every device
          </span>
          <h2
            className="mt-6 text-[clamp(36px,5vw,64px)] leading-[1.0] tracking-tight"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
          >
            Browse, Transact, and Track
            <br />
            Properties, all on your Phone.
          </h2>
          <p
            className="mt-6 max-w-md text-lg leading-relaxed text-canvas/75"
            style={{ fontFamily: "var(--font-body)" }}
          >
            The Terrain app puts Nigeria&rsquo;s most verified land marketplace
            in your pocket. Explore listings on a live map, communicate with
            realtors, and track your transaction in real time.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="https://apps.apple.com"
              className="inline-flex items-center gap-3 rounded-full border border-canvas/20 bg-canvas/5 px-6 py-3 transition-colors hover:border-canvas/40"
            >
              <Image
                src="/figma/apple-logo.svg"
                alt=""
                width={20}
                height={24}
                className="invert"
              />
              <span
                className="text-base"
                style={{
                  fontFamily: "var(--font-interactive)",
                  fontWeight: 600,
                }}
              >
                App Store
              </span>
            </Link>
            <Link
              href="https://play.google.com"
              className="inline-flex items-center gap-3 rounded-full border border-canvas/20 bg-canvas/5 px-6 py-3 transition-colors hover:border-canvas/40"
            >
              <Image
                src="/figma/google-play.svg"
                alt=""
                width={20}
                height={22}
              />
              <span
                className="text-base"
                style={{
                  fontFamily: "var(--font-interactive)",
                  fontWeight: 600,
                }}
              >
                Google Play
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
