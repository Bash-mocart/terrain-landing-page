"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// Hero map, treated as Plate I in a Terrain registry document. Chamfered
// frame (45deg cuts at each corner) makes the plate read as a stamped
// surveyor's document, not a raw rectangle. Inside the frame:
//
//   - Header strip:   PLATE I · ABUJA, PLOTS ON RECORD      N ↑
//   - Hairline divider
//   - Map content:    satellite tiles + verified-plot dots
//                     + four corner coordinate tickmarks
//   - Bottom caption: UPDATED dd MMM yyyy · N VERIFIED PLOTS ON RECORD
//
// Pins are 8px Forest Verification dots with a Warm Canvas halo so they
// read against the satellite. Hover (desktop) shows a small price-only
// chip; click reveals the full popup. Mobile collapses to tap = full
// popup since touchscreens don't fire hover events.

const ABUJA_CENTER: [number, number] = [7.3986, 9.0765]; // [lng, lat]
const ABUJA_ZOOM = 10.2;

// Hardcoded bounding box for the corner tickmarks. Reflects the initial
// camera frame, not the live pan/zoom — the registry voice is "this is
// the bounding box of Plate I as published", not a live readout.
const PLATE_BOUNDS = {
  northLat: 9.2,
  southLat: 9.0,
  westLng: 7.3,
  eastLng: 7.5,
};

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

function formatLat(lat: number): string {
  return `${lat.toFixed(2)}°${lat >= 0 ? "N" : "S"}`;
}

function formatLng(lng: number): string {
  return `${lng.toFixed(2)}°${lng >= 0 ? "E" : "W"}`;
}

function formatUpdatedDate(d: Date): string {
  return d
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .toUpperCase();
}

export function LiveMap() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [count, setCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [updatedAt] = useState(() => new Date());

  useEffect(() => {
    if (!containerRef.current) return;
    if (!MAPBOX_TOKEN) {
      setError("Map unavailable. NEXT_PUBLIC_MAPBOX_TOKEN is not set.");
      return;
    }
    mapboxgl.accessToken = MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      center: ABUJA_CENTER,
      zoom: ABUJA_ZOOM,
      attributionControl: false,
      cooperativeGestures: true,
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

          const dot = document.createElement("button");
          dot.className = "terrain-pin-dot";
          dot.type = "button";
          dot.setAttribute(
            "aria-label",
            `${listing.title ?? "Verified plot"}, ${formatPrice(listing.price)}`,
          );

          // Hover-peek: price-only chip that follows the dot on
          // mouseenter. closeOnClick:false lets the marker's own click
          // handler swap it for the full popup without a flicker.
          const peekPopup = new mapboxgl.Popup({
            offset: 14,
            closeButton: false,
            closeOnClick: false,
            className: "terrain-popup terrain-popup-peek",
            anchor: "bottom",
          }).setHTML(
            `<span class="terrain-popup-peek-price">${formatPrice(listing.price)}</span>`,
          );

          const fullPopup = new mapboxgl.Popup({
            offset: 16,
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
            .addTo(map);

          dot.addEventListener("mouseenter", () => {
            if (fullPopup.isOpen()) return;
            peekPopup.setLngLat([listing.longitude, listing.latitude]).addTo(map);
          });
          dot.addEventListener("mouseleave", () => peekPopup.remove());
          dot.addEventListener("click", (e) => {
            e.stopPropagation();
            peekPopup.remove();
            fullPopup.setLngLat([listing.longitude, listing.latitude]).addTo(map);
          });

          markersRef.current.push(marker);
        }

        setCount(typeof json.total === "number" ? json.total : listings.length);
      } catch (e) {
        if (cancelled) return;
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
    <figure className="flex flex-col gap-3">
      <div className="terrain-plate">
        <div className="terrain-plate-inner">
          <div className="terrain-plate-header">
            <span className="terrain-plate-header-label">
              <span className="tabular-nums">Plate I</span>
              <span aria-hidden> · </span>
              Abuja, plots on record
            </span>
            <span className="terrain-plate-header-compass" aria-hidden>
              N ↑
            </span>
          </div>
          <div className="terrain-plate-divider" aria-hidden />
          <div className="terrain-plate-map-wrap">
            <div ref={containerRef} className="terrain-plate-map" />
            <span className="terrain-plate-corner terrain-plate-corner-tl">
              {formatLat(PLATE_BOUNDS.northLat)} · {formatLng(PLATE_BOUNDS.westLng)}
            </span>
            <span className="terrain-plate-corner terrain-plate-corner-tr">
              {formatLat(PLATE_BOUNDS.northLat)} · {formatLng(PLATE_BOUNDS.eastLng)}
            </span>
            <span className="terrain-plate-corner terrain-plate-corner-bl">
              {formatLat(PLATE_BOUNDS.southLat)} · {formatLng(PLATE_BOUNDS.westLng)}
            </span>
            <span className="terrain-plate-corner terrain-plate-corner-br">
              {formatLat(PLATE_BOUNDS.southLat)} · {formatLng(PLATE_BOUNDS.eastLng)}
            </span>
          </div>
        </div>
      </div>
      <figcaption
        className="px-1 text-[11px] uppercase tracking-[0.16em] text-[#717171]"
        style={{ fontFamily: "var(--font-interactive)" }}
      >
        {error ? (
          error
        ) : (
          <>
            Updated {formatUpdatedDate(updatedAt)}
            <span aria-hidden> &nbsp;·&nbsp; </span>
            {count !== null ? `${count} verified plots on record` : "loading plots…"}
          </>
        )}
      </figcaption>
    </figure>
  );
}
