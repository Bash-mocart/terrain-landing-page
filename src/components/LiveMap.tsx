"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// Hero map. Mapbox GL JS satellite tiles + real verified plot pins
// pulled from /v1/listings. Mirrors the Flutter buyer-map vocabulary
// (satellite-streets-v12, Warm Canvas pill chrome) so a visitor who
// later installs the app sees the same map. Client component because
// Mapbox GL JS is a browser-only library.
//
// On mount:
//   1. Initialise the map centred on Abuja.
//   2. Fetch verified plots from /v1/listings?city=Abuja.
//   3. Render each plot as an HTML marker (DOM element, not bitmap).
//      HTML markers are fine at the 50-plot cap; we'd switch to a
//      GeoJSON source + SymbolLayer if the count ever scaled past
//      ~500, the same break-point the Flutter app has.
//   4. Click a marker -> small popup with price + "Get the app to
//      view the record" link.
//
// No animation on entry: the map renders in place to match the
// document register. No scroll-driven zoom (the camera responds to
// user gestures only).

const ABUJA_CENTER: [number, number] = [7.3986, 9.0765]; // [lng, lat]
const ABUJA_ZOOM = 10.2;

type Listing = {
  id: string;
  title?: string;
  price: number;
  latitude: number;
  longitude: number;
  city?: string;
  is_verified?: boolean;
};

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
  const [count, setCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (!MAPBOX_TOKEN) {
      setError("Map unavailable: NEXT_PUBLIC_MAPBOX_TOKEN is not set.");
      return;
    }
    mapboxgl.accessToken = MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      center: ABUJA_CENTER,
      zoom: ABUJA_ZOOM,
      attributionControl: false,
      cooperativeGestures: true, // wheel zoom requires ctrl/cmd; respects readers
    });
    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "top-right");
    map.addControl(
      new mapboxgl.AttributionControl({ compact: true }),
      "bottom-right",
    );
    mapRef.current = map;

    let cancelled = false;
    async function loadPins() {
      try {
        const url = `${API_URL}/v1/listings?city=Abuja&verified=true&limit=50`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`status ${res.status}`);
        const json = (await res.json()) as { results?: Listing[]; total?: number };
        const listings = json.results ?? [];
        if (cancelled) return;

        for (const m of markersRef.current) m.remove();
        markersRef.current = [];

        for (const listing of listings) {
          if (!Number.isFinite(listing.latitude) || !Number.isFinite(listing.longitude)) continue;
          const el = document.createElement("div");
          el.className = "terrain-pin";
          el.textContent = formatPrice(listing.price);
          el.setAttribute("role", "button");
          el.setAttribute(
            "aria-label",
            `${listing.title ?? "Verified plot"}, ${formatPrice(listing.price)}`,
          );

          const popup = new mapboxgl.Popup({
            offset: 18,
            closeButton: false,
            className: "terrain-popup",
          }).setHTML(
            `<div class="terrain-popup-inner">
               <div class="terrain-popup-title">${(listing.title ?? "Verified plot").replace(/</g, "&lt;")}</div>
               <div class="terrain-popup-price">${formatPrice(listing.price)}</div>
               <div class="terrain-popup-cta">Get the app to view the record</div>
             </div>`,
          );

          const marker = new mapboxgl.Marker({ element: el, anchor: "bottom" })
            .setLngLat([listing.longitude, listing.latitude])
            .setPopup(popup)
            .addTo(map);
          markersRef.current.push(marker);
        }

        setCount(typeof json.total === "number" ? json.total : listings.length);
      } catch (e) {
        if (cancelled) return;
        // Don't surface the raw error to users; render the map empty
        // and fall through to the typeset caption beneath which still
        // reads honestly without a plot count.
        console.error("Terrain map fetch failed:", e);
        setError("Couldn't load plots. The map is interactive; the app holds the records.");
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
    <div className="flex flex-col gap-3">
      <div
        ref={containerRef}
        className="aspect-[4/5] w-full overflow-hidden rounded-md border border-[#ebebeb] bg-[#fdfcfb] sm:aspect-square lg:aspect-[5/6]"
        aria-label="Map of verified plots in Abuja"
        role="region"
      />
      <p
        className="text-[11px] uppercase tracking-[0.16em] text-[#717171]"
        style={{ fontFamily: "var(--font-interactive)" }}
      >
        {error
          ? error
          : `Plate I · Abuja, plots on record${count !== null ? ` · ${count} plots` : ""}`}
      </p>
    </div>
  );
}
