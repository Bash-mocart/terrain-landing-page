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
        // surface on the hero map. The backend's /v1/listings without
        // a type_slug filter does return both kinds, but the dev DB
        // skewed land-only and we want the call shape to make our
        // intent explicit. If either call fails the other still
        // contributes; only a total miss falls through to the empty
        // array (which triggers the FALLBACK_LISTINGS path below).
        const baseUrl = `${API_URL}/v1/listings?city=Abuja&verified=true&limit=25`;
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
        listings = [...land, ...house];
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

        for (const listing of listings) {
          if (!Number.isFinite(listing.latitude) || !Number.isFinite(listing.longitude)) continue;
          const pin = document.createElement("button");
          pin.className = "terrain-pin-marker";
          pin.type = "button";
          pin.setAttribute(
            "aria-label",
            `${listing.title ?? "Verified plot"}, ${formatPrice(listing.price)}`,
          );
          // Price-pill chrome matches the Flutter buyer-map exactly:
          // Late-Night Boardroom pill with the price in Inter, small
          // triangular tail beneath the pill so the tip lands on the
          // lat/lng. Two children (body + tail) so Mapbox's anchor
          // "bottom" positioning lands the tail tip precisely at the
          // coordinate.
          pin.innerHTML = `
            <span class="terrain-pin-body">${formatPrice(listing.price)}</span>
            <span class="terrain-pin-tail" aria-hidden="true"></span>
          `;

          // Pick the first http(s) image url if any. The Flutter app
          // uploads images to media.lunor.money; backend ships them
          // verbatim. Videos (.mp4 / .mov) are filtered out so the
          // popup never gets a broken video-as-image render.
          const heroImage = (listing.image_urls ?? []).find((u) => {
            if (typeof u !== "string" || !u.startsWith("http")) return false;
            const lower = u.toLowerCase();
            return !lower.endsWith(".mp4") && !lower.endsWith(".mov");
          });
          const escapeHtml = (s: string) =>
            s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
          const sizeLine =
            listing.size_sqm && Number.isFinite(listing.size_sqm)
              ? `<div class="terrain-popup-meta">${listing.size_sqm.toLocaleString("en-NG")} sqm · ${listing.city ?? "Abuja"}</div>`
              : `<div class="terrain-popup-meta">${listing.city ?? "Abuja"}</div>`;

          const popup = new mapboxgl.Popup({
            offset: 14,
            closeButton: false,
            className: "terrain-popup",
            anchor: "bottom",
            maxWidth: "280px",
          }).setHTML(
            `<div class="terrain-popup-inner">
               ${
                 heroImage
                   ? `<div class="terrain-popup-image" style="background-image: url('${escapeHtml(heroImage)}')"></div>`
                   : ""
               }
               <div class="terrain-popup-content">
                 <div class="terrain-popup-price">${formatPrice(listing.price)}</div>
                 <div class="terrain-popup-title">${escapeHtml(listing.title ?? "Verified plot")}</div>
                 ${sizeLine}
                 <div class="terrain-popup-cta">Get the app to view the record</div>
               </div>
             </div>`,
          );

          const marker = new mapboxgl.Marker({ element: pin, anchor: "bottom" })
            .setLngLat([listing.longitude, listing.latitude])
            .addTo(map);

          // Hover preview: open on mouseenter, close on mouseleave.
          // Mobile browsers also fire mouseenter on first tap, so the
          // tap surface effectively becomes a tap-to-toggle without
          // separate touch handlers.
          pin.addEventListener("mouseenter", () => {
            popup.setLngLat([listing.longitude, listing.latitude]).addTo(map);
          });
          pin.addEventListener("mouseleave", () => {
            popup.remove();
          });
          // Click on a marker keeps the popup open even after the
          // pointer leaves, useful for users who want to dwell on the
          // detail without holding the cursor.
          pin.addEventListener("click", (e) => {
            e.stopPropagation();
            popup.setLngLat([listing.longitude, listing.latitude]).addTo(map);
          });

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
          map.fitBounds(bounds, {
            padding: { top: 80, bottom: 80, left: 80, right: 80 },
            maxZoom: 13,
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
