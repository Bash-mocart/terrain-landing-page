import mapboxgl, { type ExpressionSpecification } from "mapbox-gl";
import type { MapMarker } from "@/lib/types";

export const MAP_STYLE = "mapbox://styles/mapbox/satellite-streets-v12";
export const NIGERIA_CENTER: [number, number] = [8.6753, 9.082];
export const INITIAL_ZOOM = 4.2;
export const SOURCE_ID = "terrain-listings";
export const CLUSTER_LAYER_ID = "terrain-clusters";

const CLUSTER_COUNT_LAYER_ID = "terrain-cluster-count";
const MARKER_LAYER_ID = "terrain-marker-prices";
const PRICE_PILL_IMAGE_ID = "terrain-price-pill";
const CLUSTER_MAX_ZOOM = 11;
const CLUSTER_RADIUS = 60;
const PRICE_PILL_PIXEL_RATIO = 3;
const PRICE_PILL_WIDTH = 38;
const PRICE_PILL_BODY_HEIGHT = 21;
const PRICE_PILL_TAIL_HEIGHT = 5;
const PRICE_PILL_TAIL_HALF_WIDTH = 4;
const PRICE_PILL_RADIUS = 7;
const PRICE_PILL_BORDER_WIDTH = 1;
const PRICE_PILL_TEXT_PADDING: [number, number, number, number] = [
  0,
  2,
  0,
  2,
];
const PRICE_PILL_TEXT_SIZE: ExpressionSpecification = [
  "interpolate",
  ["linear"],
  ["zoom"],
  11,
  9.5,
  14,
  11,
  17,
  12.5,
];
const ONE_THOUSAND = 1_000;
const ONE_MILLION = 1_000_000;
const ONE_BILLION = 1_000_000_000;
const WHOLE_COMPACT_UNIT = 100;

function compactUnit(value: number, suffix: string) {
  if (value >= WHOLE_COMPACT_UNIT) return `${Math.round(value)}${suffix}`;
  const oneDecimal = value.toFixed(1);
  const displayValue = oneDecimal.endsWith(".0")
    ? String(Math.round(value))
    : oneDecimal;
  return `${displayValue}${suffix}`;
}

function priceLabel(price: number) {
  if (price >= ONE_BILLION) {
    return `₦${compactUnit(price / ONE_BILLION, "B")}`;
  }
  if (price >= ONE_MILLION) {
    return `₦${compactUnit(price / ONE_MILLION, "M")}`;
  }
  if (price >= ONE_THOUSAND) {
    const thousands = Math.round(price / ONE_THOUSAND);
    return thousands >= ONE_THOUSAND
      ? `₦${compactUnit(price / ONE_MILLION, "M")}`
      : `₦${thousands}k`;
  }
  return `₦${Math.round(price)}`;
}

function pricePillImage() {
  const canvas = document.createElement("canvas");
  canvas.width = PRICE_PILL_WIDTH * PRICE_PILL_PIXEL_RATIO;
  canvas.height =
    (PRICE_PILL_BODY_HEIGHT + PRICE_PILL_TAIL_HEIGHT) *
    PRICE_PILL_PIXEL_RATIO;

  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Could not create the Explore price marker image.");
  }

  const borderInset = PRICE_PILL_BORDER_WIDTH / 2;
  const pillCenter = PRICE_PILL_WIDTH / 2;
  context.scale(PRICE_PILL_PIXEL_RATIO, PRICE_PILL_PIXEL_RATIO);
  context.beginPath();
  context.moveTo(PRICE_PILL_RADIUS, borderInset);
  context.lineTo(PRICE_PILL_WIDTH - PRICE_PILL_RADIUS, borderInset);
  context.quadraticCurveTo(
    PRICE_PILL_WIDTH - borderInset,
    borderInset,
    PRICE_PILL_WIDTH - borderInset,
    PRICE_PILL_RADIUS,
  );
  context.lineTo(
    PRICE_PILL_WIDTH - borderInset,
    PRICE_PILL_BODY_HEIGHT - PRICE_PILL_RADIUS,
  );
  context.quadraticCurveTo(
    PRICE_PILL_WIDTH - borderInset,
    PRICE_PILL_BODY_HEIGHT - borderInset,
    PRICE_PILL_WIDTH - PRICE_PILL_RADIUS,
    PRICE_PILL_BODY_HEIGHT - borderInset,
  );
  context.lineTo(
    pillCenter + PRICE_PILL_TAIL_HALF_WIDTH,
    PRICE_PILL_BODY_HEIGHT - borderInset,
  );
  context.lineTo(
    pillCenter,
    PRICE_PILL_BODY_HEIGHT + PRICE_PILL_TAIL_HEIGHT - borderInset,
  );
  context.lineTo(
    pillCenter - PRICE_PILL_TAIL_HALF_WIDTH,
    PRICE_PILL_BODY_HEIGHT - borderInset,
  );
  context.lineTo(PRICE_PILL_RADIUS, PRICE_PILL_BODY_HEIGHT - borderInset);
  context.quadraticCurveTo(
    borderInset,
    PRICE_PILL_BODY_HEIGHT - borderInset,
    borderInset,
    PRICE_PILL_BODY_HEIGHT - PRICE_PILL_RADIUS,
  );
  context.lineTo(borderInset, PRICE_PILL_RADIUS);
  context.quadraticCurveTo(
    borderInset,
    borderInset,
    PRICE_PILL_RADIUS,
    borderInset,
  );
  context.closePath();
  context.fillStyle = "#ffffff";
  context.fill();
  context.lineWidth = PRICE_PILL_BORDER_WIDTH;
  context.strokeStyle = "rgba(0, 0, 0, 0.12)";
  context.stroke();

  return context.getImageData(0, 0, canvas.width, canvas.height);
}

function addPricePillImage(map: mapboxgl.Map) {
  if (map.hasImage(PRICE_PILL_IMAGE_ID)) return;

  const scale = PRICE_PILL_PIXEL_RATIO;
  const radius = PRICE_PILL_RADIUS * scale;
  const width = PRICE_PILL_WIDTH * scale;
  const pillCenter = (PRICE_PILL_WIDTH / 2) * scale;
  const tailHalfWidth = PRICE_PILL_TAIL_HALF_WIDTH * scale;
  const bodyHeight = PRICE_PILL_BODY_HEIGHT * scale;

  map.addImage(PRICE_PILL_IMAGE_ID, pricePillImage(), {
    pixelRatio: PRICE_PILL_PIXEL_RATIO,
    stretchX: [
      [radius, pillCenter - tailHalfWidth],
      [pillCenter + tailHalfWidth, width - radius],
    ],
    stretchY: [[radius, bodyHeight - radius]],
    content: [radius, 4 * scale, width - radius, bodyHeight - 4 * scale],
  });
}

export function markerData(
  markers: MapMarker[],
): GeoJSON.FeatureCollection<GeoJSON.Point> {
  return {
    type: "FeatureCollection",
    features: markers
      .filter(
        (marker) =>
          Number.isFinite(marker.lng) && Number.isFinite(marker.lat),
      )
      .map((marker) => ({
        type: "Feature",
        geometry: { type: "Point", coordinates: [marker.lng, marker.lat] },
        properties: {
          id: marker.id,
          price: priceLabel(marker.price),
          verified: marker.verified,
        },
      })),
  };
}

export function addExploreLayers(map: mapboxgl.Map, markers: MapMarker[]) {
  addPricePillImage(map);
  map.addSource(SOURCE_ID, {
    type: "geojson",
    data: markerData(markers),
    cluster: true,
    clusterMaxZoom: CLUSTER_MAX_ZOOM,
    clusterRadius: CLUSTER_RADIUS,
  });
  map.addLayer({
    id: CLUSTER_LAYER_ID,
    type: "circle",
    source: SOURCE_ID,
    filter: ["has", "point_count"],
    paint: {
      "circle-color": "#090503",
      "circle-radius": ["step", ["get", "point_count"], 20, 20, 24, 75, 29],
      "circle-stroke-color": "#fdfcfb",
      "circle-stroke-width": 3,
    },
  });
  map.addLayer({
    id: CLUSTER_COUNT_LAYER_ID,
    type: "symbol",
    source: SOURCE_ID,
    filter: ["has", "point_count"],
    layout: {
      "text-field": ["get", "point_count_abbreviated"],
      "text-size": 13,
    },
    paint: { "text-color": "#fdfcfb" },
  });
  map.addLayer({
    id: MARKER_LAYER_ID,
    type: "symbol",
    source: SOURCE_ID,
    filter: ["!", ["has", "point_count"]],
    layout: {
      "icon-image": PRICE_PILL_IMAGE_ID,
      "icon-text-fit": "width",
      "icon-text-fit-padding": PRICE_PILL_TEXT_PADDING,
      "icon-allow-overlap": true,
      "icon-ignore-placement": true,
      "icon-anchor": "bottom",
      "text-field": ["get", "price"],
      "text-size": PRICE_PILL_TEXT_SIZE,
      "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
      "text-allow-overlap": true,
      "text-ignore-placement": true,
      "text-anchor": "bottom",
      "text-offset": [0, -1.4],
      "text-padding": 8,
    },
    paint: {
      "text-color": "#0b3d2e",
    },
  });
}
