import Link from "next/link";
import { Reveal } from "./Reveal";
import { Coordinate, ContourField, PlotCorners, SurveyRule } from "./cartographic";

// Live inventory. Re-crafted to a Late-Night Boardroom surface: it
// breaks the four-light run through the middle of the page, the city
// map thumbnails read better on dark (the streets glow), and it sits
// as the inverse of the dark vetting section. The tiles are
// asymmetric, a wide featured Lagos banner over a row of smaller
// cities, rather than a uniform grid.

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";

type City = { name: string; lng: number; lat: number };

const FEATURED: City = { name: "Lagos", lng: 3.3792, lat: 6.5244 };
const CITIES: City[] = [
  { name: "Abuja", lng: 7.4898, lat: 9.0579 },
  { name: "Port Harcourt", lng: 7.0134, lat: 4.8156 },
  { name: "Ibadan", lng: 3.947, lat: 7.3776 },
  { name: "Kano", lng: 8.5167, lat: 12.0022 },
  { name: "Enugu", lng: 7.5106, lat: 6.4413 },
];

const MEDIA_TYPES = ["Photos", "Video", "Drone aerials", "3D tours"];

// Mapbox Static Images API caps each dimension at 1280.
function cityMapUrl(c: City, w: number, h: number) {
  if (!MAPBOX_TOKEN) return null;
  return `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/${c.lng},${c.lat},11,0/${w}x${h}@2x?access_token=${MAPBOX_TOKEN}`;
}

export function WhatsOnMarket() {
  return (
    <section
      id="listings"
      className="survey-grid-dark relative overflow-hidden bg-primary py-16 text-canvas sm:py-24 lg:py-32"
    >
      <ContourField tone="canvas" />
      <div className="relative mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-10">
        <Reveal className="flex max-w-xl flex-col items-start">
          <div className="flex items-center gap-3">
            <span
              className="text-[11px] uppercase tracking-[0.18em] text-canvas/60"
              style={{ fontFamily: "var(--font-interactive)" }}
            >
              Live inventory
            </span>
            <Coordinate tone="canvas">6&nbsp;CITIES</Coordinate>
          </div>
          <SurveyRule tone="canvas" className="mt-4 max-w-[200px]" />
          <h2
            className="mt-6 text-[clamp(36px,5vw,64px)] leading-[1.0] tracking-tight"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
          >
            Property across Nigeria.
          </h2>
          <p
            className="mt-6 text-lg leading-relaxed text-canvas/70"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Land, houses, and commercial property in cities across Nigeria,
            from Lagos to Kano. Every listing carries enough to judge it from
            your phone before you ever drive out.
          </p>

          <ul className="mt-7 flex flex-wrap gap-2.5">
            {MEDIA_TYPES.map((m) => (
              <li
                key={m}
                className="rounded-full border border-canvas/25 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.14em] text-canvas"
                style={{ fontFamily: "var(--font-interactive)", fontWeight: 600 }}
              >
                {m}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Featured Lagos banner over a row of the other five cities,
           each tile revealing with a small per-tile stagger. */}
        <div className="mt-12 flex flex-col gap-4 sm:mt-14 sm:gap-5">
          <Reveal>
            <FeaturedTile city={FEATURED} />
          </Reveal>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5">
            {CITIES.map((c, i) => (
              <li key={c.name}>
                <Reveal delay={i * 70}>
                  <CityTile city={c} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        <Reveal className="mt-10 sm:mt-12">
          <Link
            href="#download"
            className="inline-flex items-center justify-center rounded-full bg-canvas px-7 py-3.5 text-primary transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-verified focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
            style={{ fontFamily: "var(--font-interactive)", fontWeight: 600 }}
          >
            Browse the map in the app
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function FeaturedTile({ city }: { city: City }) {
  const mapUrl = cityMapUrl(city, 1200, 460);
  return (
    <Link
      href="#download"
      className="group block overflow-hidden rounded-[18px] border border-canvas/15 transition-colors hover:border-canvas/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-verified focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-primary sm:aspect-[5/2]">
        {mapUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={mapUrl}
            alt={`Map of ${city.name}, Nigeria`}
            className="h-full w-full object-cover opacity-90 transition-opacity group-hover:opacity-100"
          />
        )}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/10 to-transparent"
        />
        <PlotCorners tone="canvas" inset={12} size={14} />
        <div className="absolute right-4 top-3 sm:right-5 sm:top-4">
          <Coordinate tone="canvas">
            {city.lat.toFixed(4)}&deg; N &middot; {city.lng.toFixed(4)}&deg; E
          </Coordinate>
        </div>
        <div className="absolute bottom-4 left-5 sm:bottom-6 sm:left-7">
          <span
            className="text-[11px] uppercase tracking-[0.16em] text-canvas/70"
            style={{ fontFamily: "var(--font-interactive)", fontWeight: 600 }}
          >
            Most active
          </span>
          <p
            className="mt-1 text-[clamp(28px,4vw,40px)] leading-none tracking-tight text-canvas"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
          >
            {city.name}
          </p>
        </div>
      </div>
    </Link>
  );
}

function CityTile({ city }: { city: City }) {
  const mapUrl = cityMapUrl(city, 360, 360);
  return (
    <Link
      href="#download"
      className="group block overflow-hidden rounded-[16px] border border-canvas/15 transition-colors hover:border-canvas/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-verified focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-primary">
        {mapUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={mapUrl}
            alt={`Map of ${city.name}, Nigeria`}
            className="h-full w-full object-cover opacity-90 transition-opacity group-hover:opacity-100"
          />
        )}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary/80 to-transparent"
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
  );
}
