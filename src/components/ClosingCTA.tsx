import { StoreButtons } from "./StoreButtons";
import { Reveal } from "./Reveal";
import { Coordinate, VerifiedSeal } from "./cartographic";

// Closing CTA — the conversion peak, and a deliberate bookend to the
// hero. A faint Nigeria street map sits behind the content at low
// opacity, echoing the live map at the top of the page (the one the
// whole product is built around) without competing with the headline.
// Warm Canvas surface so it reads as light relief between the dark FAQ
// above and the dark Footer below.

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";

// Nigeria, centred so Lagos through Kano sit in frame. Two crops: the
// landscape frame for sm+ and a portrait frame for phones, because a
// single 2:1 image object-covered into a tall narrow section crops to
// the Gulf of Guinea and the neighbours (Douala, Niamey), not Nigeria.
// The zoom is tuned so the country fills the frame's height; at the
// old 5.1 Nigeria was ~20% of the width and the neighbours dominated.
// NOTE: the Mapbox Static Images API caps {width}x{height} at 1280 each.
// The previous 1600 wide silently 422'd and rendered nothing; keep both
// dimensions <= 1280. @2x still returns a retina-resolution image.
function nigeriaMapUrl(w: number, h: number, zoom: number) {
  if (!MAPBOX_TOKEN) return null;
  return `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/8.7,9.15,${zoom},0/${w}x${h}@2x?access_token=${MAPBOX_TOKEN}`;
}

export function ClosingCTA() {
  const mapUrl = nigeriaMapUrl(1280, 640, 5.85);
  const mapUrlPortrait = nigeriaMapUrl(640, 960, 6);
  return (
    <section
      id="download"
      className="relative overflow-hidden bg-canvas py-20 sm:py-28 lg:py-36"
    >
      {/* Faint map echo. Held low and masked top/bottom into Warm Canvas
         so it reads as a watermark of the country the buyer is here for,
         never as a foreground image. */}
      {mapUrl && mapUrlPortrait && (
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={mapUrlPortrait}
            alt=""
            className="h-full w-full object-cover opacity-[0.42] sm:hidden"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={mapUrl}
            alt=""
            className="hidden h-full w-full object-cover opacity-[0.42] sm:block"
          />
          {/* Map clearly reads as Nigeria now. The streets style is
             light-toned (beige/grey roads on near-white), so the dark
             headline keeps very high contrast over it; the mask only
             needs to fade the top/bottom edges into solid Warm Canvas
             and hold a light veil through the centre. */}
          <div className="absolute inset-0 bg-gradient-to-b from-canvas via-canvas/35 to-canvas" />
        </div>
      )}

      <Reveal className="relative mx-auto flex max-w-[760px] flex-col items-center px-6 text-center sm:px-8">
        <VerifiedSeal size={56} />
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          <span
            className="text-[11px] uppercase tracking-[0.18em] text-secondary"
            style={{ fontFamily: "var(--font-interactive)" }}
          >
            Property, on record
          </span>
          <Coordinate>9.0820&deg; N &middot; 8.6753&deg; E</Coordinate>
        </div>
        <h2
          className="mt-6 text-[clamp(38px,6vw,72px)] leading-[0.98] tracking-tight text-primary"
          style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
        >
          Own property in Nigeria,
          <br /> without the fear.
        </h2>
        <p
          className="mt-6 max-w-md text-base leading-relaxed text-secondary sm:text-lg"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Inspect verified land, houses, and commercial property from
          wherever you are in the world, deal with CAC-vetted agents
          directly, and let us help you check it before you pay.
        </p>
        <div className="mt-10">
          <StoreButtons tone="onLight" />
        </div>
      </Reveal>
    </section>
  );
}
