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

const ABUJA_CENTER: [number, number] = [7.3986, 9.0765]; // [lng, lat]
const ABUJA_ZOOM = 10.2;

type Listing = {
  id: string;
  title?: string;
  price: number;
  latitude: number;
  longitude: number;
  city?: string;
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

  useEffect(() => {
    if (!containerRef.current) return;
    if (!MAPBOX_TOKEN) {
      console.warn("Terrain map: NEXT_PUBLIC_MAPBOX_TOKEN is not set.");
      return;
    }
    mapboxgl.accessToken = MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: ABUJA_CENTER,
      zoom: ABUJA_ZOOM,
      attributionControl: false,
      cooperativeGestures: true,
    });
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
        const json = (await res.json()) as { results?: Listing[] };
        const listings = json.results ?? [];
        if (cancelled) return;

        for (const m of markersRef.current) m.remove();
        markersRef.current = [];

        for (const listing of listings) {
          if (!Number.isFinite(listing.latitude) || !Number.isFinite(listing.longitude)) continue;
          const dot = document.createElement("button");
          dot.className = "terrain-pin-dot";
          dot.type = "button";
          dot.setAttribute(
            "aria-label",
            `${listing.title ?? "Verified plot"}, ${formatPrice(listing.price)}`,
          );

          const popup = new mapboxgl.Popup({
            offset: 14,
            closeButton: false,
            className: "terrain-popup",
            anchor: "bottom",
          }).setHTML(
            `<div class="terrain-popup-inner">
               <div class="terrain-popup-title">${(listing.title ?? "Verified plot").replace(/</g, "&lt;")}</div>
               <div class="terrain-popup-price">${formatPrice(listing.price)}</div>
               <div class="terrain-popup-cta">Get the app to view the record</div>
             </div>`,
          );

          const marker = new mapboxgl.Marker({ element: dot, anchor: "center" })
            .setLngLat([listing.longitude, listing.latitude])
            .setPopup(popup)
            .addTo(map);
          markersRef.current.push(marker);
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
