"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import Supercluster from "supercluster";
import "mapbox-gl/dist/mapbox-gl.css";
import { api } from "@/lib/api";
import type { ListResponse, Listing } from "@/lib/types";

const ABUJA_CENTER: [number, number] = [7.4951, 9.0579]; // [lng, lat], central FCT urban
const ABUJA_ZOOM = 11.4;
const MOBILE_BREAKPOINT = 640;
const ABUJA_MAX_BOUNDS: [[number, number], [number, number]] = [
  [7.1, 8.7], // SW
  [7.85, 9.45], // NE
];

// Sample fallback inventory used when the API fails or returns no FCT listings.
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

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";

type PopupRef = { current: mapboxgl.Popup | null };

function createClusterMarker(
  lng: number,
  lat: number,
  count: number,
  onActivate: () => void,
): mapboxgl.Marker {
  const badge = document.createElement("button");
  badge.type = "button";
  badge.className = "terrain-cluster-badge";
  badge.setAttribute(
    "aria-label",
    `Explore ${count} verified plots in this area`,
  );
  badge.innerHTML = `<span class="terrain-cluster-count">${count > 99 ? "99+" : count}</span>`;
  badge.addEventListener("click", (e) => {
    e.stopPropagation();
    onActivate();
  });
  return new mapboxgl.Marker({ element: badge, anchor: "center" }).setLngLat([
    lng,
    lat,
  ]);
}

type LeafProps = { listing: Listing };
type ClusterProps = {
  cluster: true;
  cluster_id: number;
  point_count: number;
  point_count_abbreviated: string | number;
};

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
  pin.innerHTML = `
    <span class="terrain-pin-body">${formatPrice(listing.price)}</span>
    <span class="terrain-pin-tail" aria-hidden="true"></span>
  `;

  // Prefer video over still images for the property preview.
  const isVideoUrl = (u: string) =>
    /\.(mp4|mov|webm)(\?|#|$)/i.test(u);
  const validMediaUrls = (listing.image_urls ?? []).filter(
    (u): u is string => typeof u === "string" && u.startsWith("http"),
  );
  const firstMedia = validMediaUrls.find(isVideoUrl) ?? validMediaUrls[0];
  const isVideo = firstMedia ? isVideoUrl(firstMedia) : false;
  const escapeHtml = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
  const sizeLine =
    listing.size_sqm && Number.isFinite(listing.size_sqm)
      ? `<div class="terrain-popup-meta">${listing.size_sqm.toLocaleString("en-NG")} sqm · ${listing.city ?? "Abuja"}</div>`
      : `<div class="terrain-popup-meta">${listing.city ?? "Abuja"}</div>`;
  const mediaBlock = !firstMedia
    ? ""
    : isVideo
      ? `<video class="terrain-popup-media" src="${escapeHtml(firstMedia)}" autoplay muted loop playsinline preload="metadata"></video>`
      : `<div class="terrain-popup-media terrain-popup-image" style="background-image: url('${escapeHtml(firstMedia)}')"></div>`;

  const popup = new mapboxgl.Popup({
    offset: 14,
    closeButton: false,
    className: "terrain-popup",
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

  // Delay closing so the cursor can cross the gap between pin and popup.
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
    // The popup DOM is available only after addTo().
    const popupEl = popup.getElement();
    if (popupEl) {
      popupEl.addEventListener("mouseenter", cancelClose);
      popupEl.addEventListener("mouseleave", scheduleClose);
      popupEl.querySelectorAll("video").forEach((video) => {
        // Set playback attributes on the injected video element as well as its markup.
        video.muted = true;
        video.setAttribute("muted", "");
        video.setAttribute("playsinline", "");

        video.addEventListener("error", () => {
          const err = video.error;
          console.warn(
            "Terrain popup video failed:",
            video.currentSrc || video.src,
            err ? `code=${err.code} message=${err.message}` : "(no error info)",
          );
        });

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
          // Start loading explicitly when the video has no decoded frame yet.
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

type LiveMapProps = {
  /** Enable mobile map gestures; desktop interaction is unaffected. */
  isExploring?: boolean;
};

export function LiveMap({ isExploring = false }: LiveMapProps = {}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  // Restore the original camera when the user exits explore mode.
  const preExploreCameraRef = useRef<{
    center: mapboxgl.LngLat;
    zoom: number;
  } | null>(null);
  // Keep the interaction mode chosen at mount; resizing does not recreate the map.
  const isMobileRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (!MAPBOX_TOKEN) {
      console.warn("Terrain map: NEXT_PUBLIC_MAPBOX_TOKEN is not set.");
      return;
    }
    // Clear leftover Mapbox DOM before Strict Mode reinitializes the map.
    container.replaceChildren();
    mapboxgl.accessToken = MAPBOX_TOKEN;

    // Use viewport width: the absolute container can measure zero before layout.
    const isMobileVal = window.innerWidth < MOBILE_BREAKPOINT;
    isMobileRef.current = isMobileVal;
    const map = new mapboxgl.Map({
      container,
      style: "mapbox://styles/mapbox/streets-v12",
      center: ABUJA_CENTER,
      zoom: ABUJA_ZOOM,
      maxBounds: ABUJA_MAX_BOUNDS,
      attributionControl: false,
      interactive: !isMobileVal,
      cooperativeGestures: false,
      // Keep the map flat, including when mobile explore mode enables gestures.
      dragRotate: false,
      pitchWithRotate: false,
      touchPitch: false,
    });

    // Allow desktop panning while leaving wheel scrolling to the page.
    if (!isMobileVal) {
      map.dragPan.enable();
      map.doubleClickZoom.enable();
      map.scrollZoom.disable();
    }
    map.addControl(
      new mapboxgl.AttributionControl({ compact: true }),
      "bottom-right",
    );
    mapRef.current = map;

    let cancelled = false;
    async function loadPins() {
      let listings: Listing[] = [];
      try {
        // Filter by coordinates because FCT listings may use district names as their city.
        // See docs/known-data-issues.md for the normalization work.
        const [land, house] = await Promise.all([
          api.get<ListResponse<Listing>>("/v1/listings", {
            query: { verified: true, limit: 50, type_slug: "land" },
          }).catch(() => ({ results: [] })),
          api.get<ListResponse<Listing>>("/v1/listings", {
            query: { verified: true, limit: 50, type_slug: "house" },
          }).catch(() => ({ results: [] })),
        ]);
        const [[minLng, minLat], [maxLng, maxLat]] = ABUJA_MAX_BOUNDS;
        listings = [...(land.results ?? []), ...(house.results ?? [])].filter(
          (l) => {
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
          },
        );
      } catch (e) {
        console.warn("Terrain map fetch failed, using fallback:", e);
        listings = [];
      }
      if (cancelled) return;
      if (listings.length === 0) listings = FALLBACK_LISTINGS;

      try {
        for (const m of markersRef.current) m.remove();
        markersRef.current = [];

        // Share the active popup across idle renders so only one remains open.
        const popupRef: PopupRef = { current: null };

        const features = listings
          .filter(
            (l) =>
              Number.isFinite(l.latitude) && Number.isFinite(l.longitude),
          )
          .map<GeoJSON.Feature<GeoJSON.Point, LeafProps>>((l) => ({
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [l.longitude, l.latitude],
            },
            properties: { listing: l },
          }));

        const cluster = new Supercluster<LeafProps, ClusterProps>({
          radius: 50,
          maxZoom: 16,
          minPoints: 2,
        });
        cluster.load(features);

        // Query the full FCT bounds so panning does not remove edge markers.
        const [[bbWest, bbSouth], [bbEast, bbNorth]] = ABUJA_MAX_BOUNDS;
        const fullBbox: [number, number, number, number] = [
          bbWest,
          bbSouth,
          bbEast,
          bbNorth,
        ];

        const renderClusters = () => {
          if (cancelled) return;
          for (const m of markersRef.current) m.remove();
          markersRef.current = [];

          const zoom = Math.round(map.getZoom());
          const items = cluster.getClusters(fullBbox, zoom);

          for (const item of items) {
            const [lng, lat] = item.geometry.coordinates as [number, number];
            const props = item.properties;
            if (
              "cluster" in props &&
              (props as { cluster?: boolean }).cluster === true
            ) {
              const { point_count, cluster_id } = props as ClusterProps;
              // Zoom slightly beyond the cluster split threshold, capped at the index maxZoom.
              const onActivate = () => {
                const expansionZoom = Math.min(
                  16,
                  cluster.getClusterExpansionZoom(cluster_id) + 0.5,
                );
                map.easeTo({
                  center: [lng, lat],
                  zoom: expansionZoom,
                  duration: 600,
                });
              };
              const marker = createClusterMarker(
                lng,
                lat,
                point_count,
                onActivate,
              ).addTo(map);
              markersRef.current.push(marker);
            } else {
              const { listing } = props as LeafProps;
              const marker = createPinForListing(listing, map, popupRef);
              markersRef.current.push(marker);
            }
          }
        };
        map.on("idle", renderClusters);
        // The map may already be idle when the listings arrive.
        renderClusters();

        const coords = features.map(
          (f) => f.geometry.coordinates as [number, number],
        );
        if (coords.length >= 2) {
          const bounds = new mapboxgl.LngLatBounds(coords[0], coords[0]);
          for (const c of coords) bounds.extend(c);
          // Reserve space for the hero text and controls when framing the listings.
          const c = map.getContainer();
          const w = c.clientWidth;
          const h = c.clientHeight;
          const padding =
            w < 640
              ? {
                  // Keep pins below the mobile CTA stack and explore toggle.
                  top: Math.min(600, Math.round(h * 0.8)),
                  bottom: 64,
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
          // Offset a single pin away from the hero text.
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

  useEffect(() => {
    if (!isMobileRef.current) return;
    const map = mapRef.current;
    if (!map) return;
    if (isExploring) {
      preExploreCameraRef.current = {
        center: map.getCenter(),
        zoom: map.getZoom(),
      };
      map.dragPan.enable();
      map.touchZoomRotate.enable();
      map.doubleClickZoom.enable();
    } else {
      map.dragPan.disable();
      map.touchZoomRotate.disable();
      map.doubleClickZoom.disable();
      if (preExploreCameraRef.current) {
        map.easeTo({
          center: preExploreCameraRef.current.center,
          zoom: preExploreCameraRef.current.zoom,
          duration: 500,
        });
      }
    }
  }, [isExploring]);

  return (
    <div
      ref={containerRef}
      className="h-full w-full"
      aria-label="Map of verified plots in Abuja"
      role="region"
    />
  );
}
