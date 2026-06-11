import Link from "next/link";
import { Reveal } from "./Reveal";

// Live inventory. Owns the inventory ITSELF, its geography and the
// media experience, while the Terrain Own flagship owns the buying
// flow. Shows where properties are as a grid of city cards built from
// Mapbox static thumbnails (the map motif the product is built around,
// in cameo). Warm Canvas, part of the page's light/dark heartbeat.

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";

type City = { name: string; lng: number; lat: number };

// Major Nigerian property markets. Real city centroids; no fabricated
// listing counts (we do not claim numbers we cannot stand behind).
const CITIES: City[] = [
  { name: "Lagos", lng: 3.3792, lat: 6.5244 },
  { name: "Abuja", lng: 7.4898, lat: 9.0579 },
  { name: "Port Harcourt", lng: 7.0134, lat: 4.8156 },
  { name: "Ibadan", lng: 3.947, lat: 7.3776 },
  { name: "Kano", lng: 8.5167, lat: 12.0022 },
  { name: "Enugu", lng: 7.5106, lat: 6.4413 },
];

const MEDIA_TYPES = ["Photos", "Video", "Drone aerials", "3D tours"];

function cityMapUrl(lng: number, lat: number) {
  if (!MAPBOX_TOKEN) return null;
  return `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/${lng},${lat},11,0/360x360@2x?access_token=${MAPBOX_TOKEN}`;
}

export function WhatsOnMarket() {
  return (
    <section id="listings" className="bg-canvas py-16 sm:py-24 lg:py-32">
      <Reveal className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-10">
        <div className="flex max-w-xl flex-col items-start">
          <span
            className="text-[11px] uppercase tracking-[0.18em] text-primary"
            style={{ fontFamily: "var(--font-interactive)" }}
          >
            Live inventory
          </span>
          <span
            aria-hidden
            className="mt-3 inline-block h-px w-12 bg-[--color-border-rule]"
          />
          <h2
            className="mt-6 text-[clamp(36px,5vw,64px)] leading-[1.0] tracking-tight text-primary"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
          >
            Property across Nigeria.
          </h2>
          <p
            className="mt-6 text-lg leading-relaxed text-secondary"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Land, houses, and commercial property in cities across Nigeria,
            from Lagos to Kano. Every listing carries enough to judge it
            from your phone before you ever drive out.
          </p>

          {/* The media experience is this section's unique asset, so the
             four ways a listing comes to life stay here, as chips. */}
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
        </div>

        {/* City grid. Each tile is a Mapbox static of the real city, so
           the section shows WHERE the inventory is rather than telling. */}
        <ul className="mt-12 grid grid-cols-2 gap-4 sm:mt-14 sm:gap-5 md:grid-cols-3 lg:grid-cols-6">
          {CITIES.map((c, i) => (
            <CityTile key={c.name} city={c} index={i} />
          ))}
        </ul>

        <div className="mt-10 sm:mt-12">
          <Link
            href="#download"
            className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3.5 text-canvas transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-verified focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
            style={{ fontFamily: "var(--font-interactive)", fontWeight: 600 }}
          >
            Browse the map in the app
          </Link>
        </div>
      </Reveal>
    </section>
  );
}

function CityTile({ city, index }: { city: City; index: number }) {
  const mapUrl = cityMapUrl(city.lng, city.lat);
  return (
    <li>
      <Reveal delay={index * 70}>
        <Link
          href="#download"
          className="group block overflow-hidden rounded-[16px] border border-[--color-border-rule] bg-canvas transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-verified focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
        >
          <div className="relative aspect-square w-full overflow-hidden bg-[--color-border-rule]">
            {mapUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={mapUrl}
                alt={`Map of ${city.name}, Nigeria`}
                className="h-full w-full object-cover"
              />
            )}
            {/* Late-Night Boardroom wash along the bottom so the city
               label stays legible over the streets. */}
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary/70 to-transparent"
            />
            <span
              className="absolute bottom-3 left-3 text-canvas"
              style={{
                fontFamily: "var(--font-interactive)",
                fontWeight: 600,
                fontSize: 13,
                letterSpacing: "0.02em",
              }}
            >
              {city.name}
            </span>
          </div>
        </Link>
      </Reveal>
    </li>
  );
}
