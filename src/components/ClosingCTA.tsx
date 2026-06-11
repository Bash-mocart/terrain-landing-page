import { StoreButtons } from "./StoreButtons";

// Closing CTA — the conversion peak, and a deliberate bookend to the
// hero. A faint Abuja street map sits behind the content at low
// opacity, echoing the live map at the top of the page (the one the
// whole product is built around) without competing with the headline.
// Warm Canvas surface so it reads as light relief between the dark FAQ
// above and the dark Footer below.

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";

// Abuja, centred on the FCT urban districts, matching the hero camera.
function abujaMapUrl(w = 1600, h = 700) {
  if (!MAPBOX_TOKEN) return null;
  return `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/7.4951,9.0579,10.5,0/${w}x${h}@2x?access_token=${MAPBOX_TOKEN}`;
}

export function ClosingCTA() {
  const mapUrl = abujaMapUrl();
  return (
    <section
      id="download"
      className="relative overflow-hidden bg-canvas py-20 sm:py-28 lg:py-36"
    >
      {/* Faint map echo. Held low (opacity ~0.1) and masked top/bottom
         into Warm Canvas so it reads as a watermark of the terrain the
         buyer is here for, never as a foreground image. */}
      {mapUrl && (
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={mapUrl}
            alt=""
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-canvas via-canvas/35 to-canvas" />
        </div>
      )}

      <div className="relative mx-auto flex max-w-[760px] flex-col items-center px-6 text-center sm:px-8">
        <span
          className="text-[11px] uppercase tracking-[0.18em] text-secondary"
          style={{ fontFamily: "var(--font-interactive)" }}
        >
          Start with Abuja
        </span>
        <span aria-hidden className="mt-3 inline-block h-px w-12 bg-[--color-border-rule]" />
        <h2
          className="mt-6 text-[clamp(38px,6vw,72px)] leading-[0.98] tracking-tight text-primary"
          style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
        >
          Own land in Abuja,
          <br /> without the fear.
        </h2>
        <p
          className="mt-6 max-w-md text-base leading-relaxed text-secondary sm:text-lg"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Browse verified plots and houses from CAC-vetted agents, see every
          property before you visit, and deal with them directly. The app is
          where it all happens.
        </p>
        <div className="mt-10">
          <StoreButtons tone="onLight" />
        </div>
      </div>
    </section>
  );
}
