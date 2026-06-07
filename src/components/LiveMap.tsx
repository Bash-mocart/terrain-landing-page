"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// Hero backdrop. Mapbox GL JS light streets style + real verified
// plot pins pulled from /v1/listings. Fills the parent container
// (the Hero section); the headline + CTAs overlay on top. Pin chrome
// is a small Forest Verification dot with a Warm Canvas halo so it
// reads against the colorful street map without competing with the
// hero copy.
//
// Style choice: streets-v12 (light streets) rather than satellite,
// per the Figma. Cooperative gestures stay true so wheel-zoom needs
// cmd/ctrl and doesn't hijack page scroll. NavigationControl is
// dropped; the map is a backdrop, not a control surface.

// Camera defaults. Initial framing covers the FCT urban districts
// (Maitama, Wuse, Asokoro, Garki). After listings arrive we fit the
// camera to the actual plot bounds so the visible map is exactly the
// area where verified plots sit, padded for breathing room.
const ABUJA_CENTER: [number, number] = [7.4951, 9.0579]; // [lng, lat], central FCT urban
const ABUJA_ZOOM = 11.4;
// FCT bounding box, prevents the user from panning to Lagos or beyond
// once they're inside the map.
const ABUJA_MAX_BOUNDS: [[number, number], [number, number]] = [
  [7.1, 8.7], // SW
  [7.85, 9.45], // NE
];

type Listing = {
  id: string;
  title?: string;
  price: number;
  latitude: number;
  longitude: number;
  city?: string;
  image_urls?: string[];
  size_sqm?: number;
  type_slug?: "land" | "house";
};

// Fallback sample plots, one per major Abuja neighbourhood. Used
// whenever the backend is unreachable (CORS, network, cold start) or
// returns no verified plots yet. Coordinates are real neighbourhood
// centroids; prices are representative of recent verified inventory.
// The day the live API responds the page switches to real data
// silently. No "sample" labels on the page because that'd be
// double-talk — the page just shows plots; if there are none on
// record, the hero would otherwise be empty satellite.
const FALLBACK_LISTINGS: Listing[] = [
  {
    id: "sample-asokoro",
    title: "Plot 14, Asokoro Crescent",
    price: 150_000_000,
    latitude: 9.0473,
    longitude: 7.5181,
  },
  {
    id: "sample-maitama",
    title: "Plot 22, Maitama Cul-de-Sac",
    price: 220_000_000,
    latitude: 9.0888,
    longitude: 7.4954,
  },
  {
    id: "sample-wuse-ii",
    title: "Plot 8, Wuse II Estate",
    price: 95_000_000,
    latitude: 9.0816,
    longitude: 7.4647,
  },
  {
    id: "sample-garki",
    title: "Plot 41, Garki Phase 1",
    price: 65_000_000,
    latitude: 9.0258,
    longitude: 7.4933,
  },
  {
    id: "sample-jabi",
    title: "Plot 73, Jabi Lake View",
    price: 45_000_000,
    latitude: 9.0894,
    longitude: 7.4262,
  },
];

const API_URL =
  process.env.NEXT_PUBLIC_TERRAIN_API_URL ?? "https://api.lunor.money";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";

// Active-popup tracker shared across all pins. Passed by reference into
// each pin factory so opening one popup can close whichever was open
// before. Only one popup is visible at any moment regardless of how
// many pins the user hovers.
type PopupRef = { current: mapboxgl.Popup | null };

// Per-pin factory. Every plot on the hero map goes through this exact
// function — there is no per-pin special-casing, no listing-specific
// branching, no "skip this one if it has X" logic. If a particular
// pin behaves differently from others at runtime, the cause is either
// the listing's data (e.g. missing image_urls) or a geometric overlap
// at its lat/lng (Mapbox stacks markers in latitude order; a pin
// underneath another in the same screen position can be unreachable
// to the cursor). It is NOT differential construction.
//
// Returns the Mapbox Marker so the caller can push it onto a markers
// array for later cleanup.
function createPinForListing(
  listing: Listing,
  map: mapboxgl.Map,
  popupRef: PopupRef,
): mapboxgl.Marker {
  const pin = document.createElement("button");
  pin.className = "terrain-pin-marker";
  pin.type = "button";
  pin.setAttribute(
    "aria-label",
    `${listing.title ?? "Verified plot"}, ${formatPrice(listing.price)}`,
  );
  // Price-pill chrome matches the Flutter buyer-map exactly: Late-
  // Night Boardroom pill with the price in Inter, small triangular
  // tail beneath the pill so the tip lands on the lat/lng. Two
  // children (body + tail) so Mapbox anchor "bottom" positions the
  // tail tip precisely at the coordinate.
  pin.innerHTML = `
    <span class="terrain-pin-body">${formatPrice(listing.price)}</span>
    <span class="terrain-pin-tail" aria-hidden="true"></span>
  `;

  // Pick the first usable http(s) media url. The Flutter app uploads
  // images to media.lunor.money; backend ships them verbatim. Videos
  // (.mp4 / .mov) and images render side by side here: whichever is
  // first in image_urls wins. Video listings get an autoplay loop
  // (muted, playsinline) so the popup shows motion; image listings
  // get the static background-image card.
  const firstMedia = (listing.image_urls ?? []).find(
    (u) => typeof u === "string" && u.startsWith("http"),
  );
  // Detect video by extension. Allow .mp4 / .mov / .webm and tolerate
  // query strings (e.g. CDN cache busters: media.example.com/clip.mp4?v=2).
  const isVideo = firstMedia ? /\.(mp4|mov|webm)(\?|#|$)/i.test(firstMedia) : false;
  const escapeHtml = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
  const sizeLine =
    listing.size_sqm && Number.isFinite(listing.size_sqm)
      ? `<div class="terrain-popup-meta">${listing.size_sqm.toLocaleString("en-NG")} sqm · ${listing.city ?? "Abuja"}</div>`
      : `<div class="terrain-popup-meta">${listing.city ?? "Abuja"}</div>`;
  // Renders either a <video> (autoplay loop) or a background-image
  // div depending on whether the first media is a video file. Both
  // share .terrain-popup-media for layout so the popup chrome doesn't
  // shift between media types.
  const mediaBlock = !firstMedia
    ? ""
    : isVideo
      ? `<video class="terrain-popup-media" src="${escapeHtml(firstMedia)}" autoplay muted loop playsinline preload="metadata"></video>`
      : `<div class="terrain-popup-media terrain-popup-image" style="background-image: url('${escapeHtml(firstMedia)}')"></div>`;

  const popup = new mapboxgl.Popup({
    offset: 14,
    closeButton: false,
    className: "terrain-popup",
    // anchor: undefined lets Mapbox pick the best side based on
    // viewport space. Pins near the top get the popup below; pins
    // anywhere else get the popup above.
    maxWidth: "280px",
  }).setHTML(
    `<div class="terrain-popup-inner">
       ${mediaBlock}
       <div class="terrain-popup-content">
         <div class="terrain-popup-price">${formatPrice(listing.price)}</div>
         <div class="terrain-popup-title">${escapeHtml(listing.title ?? "Verified plot")}</div>
         ${sizeLine}
       </div>
     </div>`,
  );

  const marker = new mapboxgl.Marker({ element: pin, anchor: "bottom" })
    .setLngLat([listing.longitude, listing.latitude])
    .addTo(map);

  // Hover preview with a 120ms close buffer. The cursor needs to be
  // able to move from pin -> popup without the popup closing on the
  // gap. setTimeout schedules the close, and a mouseenter on either
  // pin OR popup cancels it. Single-popup-at-a-time enforced via
  // popupRef.current so the page never shows two popups at once.
  let closeTimeout: ReturnType<typeof setTimeout> | null = null;
  const cancelClose = () => {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      closeTimeout = null;
    }
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimeout = setTimeout(() => {
      popup.remove();
      closeTimeout = null;
    }, 120);
  };
  const openPopup = () => {
    cancelClose();
    if (popup.isOpen()) return;
    if (
      popupRef.current &&
      popupRef.current !== popup &&
      popupRef.current.isOpen()
    ) {
      popupRef.current.remove();
    }
    popupRef.current = popup;
    popup.setLngLat([listing.longitude, listing.latitude]).addTo(map);
    // The popup element only exists after addTo. Attach the cursor-
    // over-popup handlers so the popup stays open while the user
    // reads it. Also kick any <video> inside the popup into playback;
    // innerHTML-injected videos don't always honour the autoplay
    // attribute (browser policy considers them non-user-initiated).
    const popupEl = popup.getElement();
    if (popupEl) {
      popupEl.addEventListener("mouseenter", cancelClose);
      popupEl.addEventListener("mouseleave", scheduleClose);
      popupEl.querySelectorAll("video").forEach((video) => {
        // Belt-and-suspenders: set muted + playsinline via JS as well
        // as the HTML attributes. Some browsers (notably mobile
        // Safari < 17) are inconsistent about parsing boolean
        // attributes from setHTML-injected markup.
        video.muted = true;
        video.setAttribute("muted", "");
        video.setAttribute("playsinline", "");

        // Surface load-time errors so per-video failures are visible
        // (codec mismatch on iPhone .mov files in Chrome / Firefox,
        // CORS rejection, 404, etc.). Without this the .catch below
        // swallows everything and "some videos don't play" is opaque.
        video.addEventListener("error", () => {
          const err = video.error;
          console.warn(
            "Terrain popup video failed:",
            video.currentSrc || video.src,
            err ? `code=${err.code} message=${err.message}` : "(no error info)",
          );
        });

        // Race-safe play. play() called before the decoder has any
        // frame ready can resolve but then stall. If readyState is
        // < HAVE_FUTURE_DATA we wait for loadedmetadata (cheapest
        // event that means the file's playable) then try once more.
        const tryPlay = () =>
          video.play().catch((reason) => {
            console.warn(
              "Terrain popup video play() rejected:",
              video.currentSrc || video.src,
              reason,
            );
          });
        if (video.readyState >= 2) {
          tryPlay();
        } else {
          video.addEventListener("loadedmetadata", tryPlay, { once: true });
          // Some browsers stall the loaded event entirely on first
          // hover; call load() to kick the pipeline. Idempotent.
          video.load();
        }
      });
    }
  };
  pin.addEventListener("mouseenter", openPopup);
  pin.addEventListener("mouseleave", scheduleClose);
  pin.addEventListener("click", (e) => {
    e.stopPropagation();
    openPopup();
  });

  return marker;
}

function formatPrice(naira: number): string {
  if (naira >= 1e9) {
    const v = naira / 1e9;
    return `₦${Number.isInteger(v) ? v : v.toFixed(1)}B`;
  }
  if (naira >= 1e6) {
    const v = naira / 1e6;
    return `₦${Number.isInteger(v) ? v : v.toFixed(1)}M`;
  }
  return `₦${naira.toLocaleString("en-NG")}`;
}

export function LiveMap() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (!MAPBOX_TOKEN) {
      console.warn("Terrain map: NEXT_PUBLIC_MAPBOX_TOKEN is not set.");
      return;
    }
    // React 19 strict-mode in dev double-mounts effects. Mapbox's
    // `map.remove()` cleanup doesn't always evict its DOM children
    // synchronously, so the second mount can land on a non-empty
    // container and warn "The map container element should be empty".
    // Replacing the children first is harmless on a clean container
    // and idempotent on a dirty one.
    container.replaceChildren();
    mapboxgl.accessToken = MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container,
      style: "mapbox://styles/mapbox/streets-v12",
      center: ABUJA_CENTER,
      zoom: ABUJA_ZOOM,
      maxBounds: ABUJA_MAX_BOUNDS,
      attributionControl: false,
      // Static map: no pan, no zoom, no rotation. The hero is a
      // reading surface, not a navigation tool — backdrop maps that
      // hijack scroll or pan when users intend to read the page are
      // disruptive. Pin clicks still work because Markers attach
      // their own DOM listeners outside Mapbox's interaction system.
      interactive: false,
    });
    map.addControl(
      new mapboxgl.AttributionControl({ compact: true }),
      "bottom-right",
    );
    mapRef.current = map;

    let cancelled = false;
    async function loadPins() {
      let listings: Listing[] = [];
      try {
        // Two parallel calls so both verified lands AND verified houses
        // surface on the hero map. Notably NO city=Abuja filter on the
        // query: sellers in the FCT routinely save the city field as
        // the district (Gwarinpa, Maitama, Wuse, Asokoro, Wuye) instead
        // of "Abuja", and we'd miss them. Instead we filter on the
        // client by lat/lng bounding box (ABUJA_MAX_BOUNDS, the same
        // FCT envelope the map locks to). Anything geographically in
        // FCT shows up regardless of how the city field is shaped.
        //
        // BAND-AID: this client-side filter is a workaround, not the
        // right answer. The proper fix is data normalisation in the
        // seller wizard — FCT districts should resolve to city="Abuja"
        // with the district kept in a separate field. Same pattern for
        // Lagos districts (Lekki, Ikoyi, Victoria Island). Until that
        // ships in terra-backend, this bounds filter solves the symptom
        // for the landing page only; the Flutter buyer-map, the search
        // results screen, and the city explore screen all still miss
        // these listings when they filter by city. See
        // docs/known-data-issues.md for the full fix proposal.
        const baseUrl = `${API_URL}/v1/listings?verified=true&limit=50`;
        const [landRes, houseRes] = await Promise.all([
          fetch(`${baseUrl}&type_slug=land`),
          fetch(`${baseUrl}&type_slug=house`),
        ]);
        const land = landRes.ok
          ? ((await landRes.json()) as { results?: Listing[] }).results ?? []
          : [];
        const house = houseRes.ok
          ? ((await houseRes.json()) as { results?: Listing[] }).results ?? []
          : [];
        const [[minLng, minLat], [maxLng, maxLat]] = ABUJA_MAX_BOUNDS;
        listings = [...land, ...house].filter((l) => {
          const lat = Number(l.latitude);
          const lng = Number(l.longitude);
          return (
            Number.isFinite(lat) &&
            Number.isFinite(lng) &&
            lat >= minLat &&
            lat <= maxLat &&
            lng >= minLng &&
            lng <= maxLng
          );
        });
      } catch (e) {
        // CORS, network, cold start. Log for debugging; fall through to
        // the empty listings array so the fallback path below renders.
        console.warn("Terrain map fetch failed, using fallback:", e);
        listings = [];
      }
      if (cancelled) return;
      // Use fallback if the API returns no plots or if the fetch
      // failed. The hero is never empty.
      if (listings.length === 0) listings = FALLBACK_LISTINGS;

      try {
        for (const m of markersRef.current) m.remove();
        markersRef.current = [];

        // Single-popup-at-a-time tracker. Shared across all pins via
        // the popupRef object so opening one pin's popup closes the
        // previous. Reset on every fresh loadPins call.
        const popupRef: PopupRef = { current: null };

        // Every plot goes through the same factory call. No per-pin
        // conditional logic here — if a runtime difference shows up
        // between pins, it's data or geometry, not construction.
        for (const listing of listings) {
          if (!Number.isFinite(listing.latitude) || !Number.isFinite(listing.longitude)) continue;
          const marker = createPinForListing(listing, map, popupRef);
          markersRef.current.push(marker);
        }

        // Fit the camera to the actual plot envelope so the visible
        // map is exactly the area where plots sit. Skip if there are
        // 0 or 1 plots (fitBounds on a single point throws); the
        // initial Abuja camera handles those.
        const coords = listings
          .filter(
            (l) =>
              Number.isFinite(l.latitude) && Number.isFinite(l.longitude),
          )
          .map((l) => [l.longitude, l.latitude] as [number, number]);
        if (coords.length >= 2) {
          const bounds = new mapboxgl.LngLatBounds(coords[0], coords[0]);
          for (const c of coords) bounds.extend(c);
          // Padding adapts to viewport so pins don't get clipped on
          // narrow screens AND don't sit underneath the content
          // overlay. The hero overlay (eyebrow + headline + subhead +
          // two CTA buttons) consumes the top ~460px on mobile, the
          // top ~520px on tablet, and the left ~40% on desktop. Bias
          // fitBounds padding into that region so the pin cluster is
          // pushed into the actually-visible map band — otherwise pins
          // land geographically correct but behind the headline where
          // a buyer can never see them.
          //
          // maxZoom drops to 12 on mobile so even a single-listing
          // case shows a few neighbouring districts; at zoom 13 the
          // camera would tunnel into one street.
          const c = map.getContainer();
          const w = c.clientWidth;
          const h = c.clientHeight;
          const padding =
            w < 640
              ? {
                  // ~62% of hero height keeps pins clear of the
                  // headline + subhead + CTA stack. Capped at 500 for
                  // unusually tall mobile viewports (foldables) so
                  // there's still room left for actual map.
                  top: Math.min(500, Math.round(h * 0.62)),
                  bottom: 72,
                  left: 24,
                  right: 24,
                }
              : w < 1024
                ? { top: Math.round(h * 0.4), bottom: 120, left: 80, right: 64 }
                : { top: 80, bottom: 160, left: Math.round(w * 0.4), right: 80 };
          map.fitBounds(bounds, {
            padding,
            maxZoom: w < 640 ? 12 : 13,
            duration: 700,
          });
        } else if (coords.length === 1) {
          // Single-pin case: fitBounds can't run (a single point has
          // zero extent), but we still want the pin rendered in the
          // visible band rather than behind the headline. Ease to
          // the pin with a viewport offset that pushes its centerpoint
          // into the bottom of the hero on mobile.
          const c = map.getContainer();
          const w = c.clientWidth;
          const h = c.clientHeight;
          const offset: [number, number] =
            w < 640 ? [0, Math.round(h * 0.24)] : [Math.round(w * 0.18), 0];
          map.easeTo({
            center: coords[0],
            zoom: w < 640 ? 12 : 13,
            offset,
            duration: 700,
          });
        }
      } catch (e) {
        if (cancelled) return;
        console.error("Terrain map fetch failed:", e);
      }
    }
    void loadPins();

    return () => {
      cancelled = true;
      for (const m of markersRef.current) m.remove();
      markersRef.current = [];
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-full w-full"
      aria-label="Map of verified plots in Abuja"
      role="region"
    />
  );
}
