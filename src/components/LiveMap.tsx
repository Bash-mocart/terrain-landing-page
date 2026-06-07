"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import Supercluster from "supercluster";
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

// Cluster-badge factory. When supercluster groups two or more pins
// into a single visual point at the current zoom level, this renders
// a Late-Night Boardroom circular badge with the plot count inside
// it. Buyers read "12 plots" rather than a stack of overlapping
// price pills — registry-document quietness over marketing density.
//
// With the map's cooperative gestures enabled the badge becomes
// tappable: click / Enter / Space eases the camera into the
// supercluster-reported expansion zoom for that cluster, breaking
// the badge apart into its constituent pins (or smaller sub-clusters)
// on the next idle re-render. Buyers can explore inventory from the
// hero without leaving the page.
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
  // Single span inside the circle; count formatted "12" for ≤99
  // and "99+" beyond — keeps the badge a consistent two-character
  // width so the layout stays calm at any cluster size.
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

// GeoJSON Point feature properties for supercluster. The leaf carries
// the full Listing so the same createPinForListing factory can render
// it once supercluster reports it as a non-cluster leaf at the current
// zoom. Cluster nodes get their own auto-generated properties from
// supercluster ({ cluster: true, point_count, cluster_id, ... }).
type LeafProps = { listing: Listing };
type ClusterProps = {
  cluster: true;
  cluster_id: number;
  point_count: number;
  point_count_abbreviated: string | number;
};

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
  // Prefer a video so the popup leads with motion (the immersive
  // "walk every plot through videos, drone aerials, and 3D tours"
  // promise from the landing copy). Listings whose seller uploaded
  // media in [image, image, video] order were showing the first image
  // and the video never autoplayed — reported as "we only show the
  // images not the video for those ones." Walking the array for a
  // video URL first, falling back to the first valid URL otherwise,
  // makes the popup honour the listing's most informative media.
  //
  // Detect video by extension. Allow .mp4 / .mov / .webm and tolerate
  // query strings (e.g. CDN cache busters: media.example.com/clip.mp4?v=2).
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

type LiveMapProps = {
  /**
   * When true on a mobile viewport the map's pan / pinch / double-tap
   * handlers are enabled and the user can interact freely; when false
   * the map is a backdrop and single-finger touches pass through to
   * page scroll. The Hero owns this flag so the toggle UI lives in
   * the document's reading flow (a caps link beneath the store CTAs)
   * rather than as floating chrome on top of the map. Ignored on
   * desktop where cooperative-gestures + ⌘+wheel handle interaction.
   */
  isExploring?: boolean;
};

export function LiveMap({ isExploring = false }: LiveMapProps = {}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  // Camera state captured the moment the user enters explore mode,
  // so exiting can ease back to the original framing instead of
  // leaving the map stranded wherever the user panned/zoomed to.
  const preExploreCameraRef = useRef<{
    center: mapboxgl.LngLat;
    zoom: number;
  } | null>(null);
  // isMobile gates the runtime handler-enable effect — desktop
  // doesn't toggle handlers at runtime because cooperative-gestures
  // handles its interaction model statically. Set once on mount;
  // this hero doesn't try to adapt across breakpoints in a single
  // session (would require tearing down + re-creating the map).
  const [isMobile, setIsMobile] = useState(false);

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

    // Mobile vs desktop interactivity split. The cooperative-gestures
    // overlay was reported by users as firing constantly on mobile —
    // every incidental touch during page scroll landed on the map
    // (full-bleed inset-0) and Mapbox's blocker assumes "the user is
    // trying to use the map" instead of "the user is trying to scroll
    // past it." On a long-scroll landing page hero, the latter is
    // by far the more common intent. We turn the map non-interactive
    // on mobile so single-finger touches pass straight through to
    // page scroll with no overlay flash. Cluster badges + pin pills
    // remain tappable: their click handlers are DOM listeners outside
    // Mapbox's interaction system, and they call map.easeTo() /
    // popup.addTo() programmatically — those work fine when user
    // pan/zoom is disabled.
    //
    // Desktop keeps interactive + cooperativeGestures because wheel-
    // zoom is a real exploration win on a trackpad/mouse and the
    // overlay rarely fires (a deliberate ⌘+wheel is the common case).
    const isMobileVal = container.clientWidth < 640;
    setIsMobile(isMobileVal);
    const map = new mapboxgl.Map({
      container,
      style: "mapbox://styles/mapbox/streets-v12",
      center: ABUJA_CENTER,
      zoom: ABUJA_ZOOM,
      maxBounds: ABUJA_MAX_BOUNDS,
      attributionControl: false,
      interactive: !isMobileVal,
      cooperativeGestures: !isMobileVal,
      // 2D inventory map — rotation and pitch would only confuse the
      // top-down lat/lng reading; disable them so a user who two-
      // fingers can pan + zoom but never tilt or twist.
      dragRotate: false,
      pitchWithRotate: false,
      touchPitch: false,
      // Override Mapbox's default cooperative-gestures help text so
      // the overlay reads in Terrain's registry voice instead of the
      // mechanical "move the map" default. Visual chrome of the
      // overlay is restyled in globals.css to Warm Canvas + Inter
      // caps so the whole affordance matches the rest of the page.
      locale: {
        "ScrollZoomBlocker.CtrlMessage":
          "Hold ctrl + scroll to explore the registry",
        "ScrollZoomBlocker.CmdMessage":
          "Hold ⌘ + scroll to explore the registry",
        "TouchPanBlocker.Message":
          "Two fingers to explore the registry",
      },
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

        // Single-popup-at-a-time tracker. Shared across renderClusters
        // invocations so opening a leaf pin's popup closes whichever
        // was open before, even across the idle re-renders that fire
        // after fitBounds settles.
        const popupRef: PopupRef = { current: null };

        // Build the supercluster index once from the listings. Each
        // leaf carries its full Listing in feature properties so the
        // same createPinForListing factory can render it at zoom
        // levels where supercluster no longer merges it.
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

        // Cluster radius 50px at the current zoom — empirically the
        // value where the Wuse / Gwarinpa / Asokoro corridor reads as
        // 2-3 district badges rather than one giant lump, while a
        // single neighbourhood with overlapping pins collapses cleanly.
        // maxZoom 16 means past that level supercluster releases every
        // pin as a leaf (the hero only ever sits between 10-13, so this
        // mainly matters when the same module powers the Registry map).
        const cluster = new Supercluster<LeafProps, ClusterProps>({
          radius: 50,
          maxZoom: 16,
          minPoints: 2,
        });
        cluster.load(features);

        // Re-render the visible markers from the supercluster index
        // every time the map is idle (post-fitBounds settle, post-
        // initial-load). Idempotent: clear existing markers, recompute
        // clusters at the current zoom + visible bounds, render.
        // Cluster bbox is the full FCT envelope, NOT the current
        // visible viewport. Supercluster's bbox filter is there to
        // skip points you can't see when you have thousands of them;
        // we have <50, so the perf savings are zero and the cost is
        // real: if we filtered by the visible viewport, panning even
        // a little would shift pins off the bbox edge, dropping them
        // from the next render. Users reported pins disappearing
        // after they tapped "explore" and panned. Pinning the bbox
        // to ABUJA_MAX_BOUNDS means every pin in FCT is always
        // evaluated, regardless of where the camera sits. Mapbox
        // clips the markers visually for free; we don't need
        // supercluster to do it again.
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
            // Discriminate cluster vs leaf via the supercluster-
            // assigned `cluster: true` flag on cluster features. Leaf
            // features carry our original LeafProps shape with the
            // full Listing inside.
            if (
              "cluster" in props &&
              (props as { cluster?: boolean }).cluster === true
            ) {
              const { point_count, cluster_id } = props as ClusterProps;
              // Ask supercluster how far we need to zoom to break this
              // cluster apart. +0.5 nudges past the merge threshold so
              // the next idle render releases the leaves cleanly
              // instead of rebuilding the same cluster one zoom-level
              // shallower. Capped at 16 to match the index's maxZoom.
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
        // Render once immediately for the case where the map is
        // already idle by the time listings finish loading (cache hit,
        // very fast network). The idle event won't fire again until
        // something changes, so without this we'd see no markers
        // until fitBounds runs below.
        renderClusters();

        // Fit the camera to the actual plot envelope so the visible
        // map is exactly the area where plots sit. Skip if there are
        // 0 or 1 plots (fitBounds on a single point throws); the
        // initial Abuja camera handles those.
        const coords = features.map(
          (f) => f.geometry.coordinates as [number, number],
        );
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
                  // ~70% of hero height keeps the pin pill (which
                  // extends 30-40px ABOVE its lat/lng anchor) clear
                  // of the CTA button bottom edge. The earlier 62%
                  // value put pill labels touching the buttons.
                  // Capped at 560 for foldables / unusually tall
                  // viewports so there's still room for actual map.
                  top: Math.min(560, Math.round(h * 0.7)),
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

  // Toggle map interaction handlers in lockstep with isExploring.
  // The map is constructed non-interactive on mobile, so dragPan /
  // touchZoomRotate / doubleClickZoom are disabled at startup. When
  // the user taps "Tap to explore", we enable them; tapping "Done"
  // disables and eases the camera back to the pre-explore framing
  // so the user lands where they started rather than wherever they
  // last panned. Cooperative gestures stays off in both states —
  // the user has already opted in via the pill, so the overlay
  // would be pure noise.
  useEffect(() => {
    if (!isMobile) return;
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
  }, [isExploring, isMobile]);

  return (
    <div
      ref={containerRef}
      className="h-full w-full"
      aria-label="Map of verified plots in Abuja"
      role="region"
    />
  );
}
