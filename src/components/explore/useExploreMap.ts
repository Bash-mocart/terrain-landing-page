"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import type { MapMarker } from "@/lib/types";
import {
  addExploreLayers,
  CLUSTER_LAYER_ID,
  INITIAL_ZOOM,
  MAP_STYLE,
  markerData,
  NIGERIA_CENTER,
  SOURCE_ID,
} from "./exploreMapStyle";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";
const MIN_ZOOM = 4;
const MAX_ZOOM = 20;

export function useExploreMap(markers: MapMarker[]) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef(markers);
  const [mapError, setMapError] = useState<string | null>(null);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    if (
      !MAPBOX_TOKEN ||
      !sectionRef.current ||
      !containerRef.current ||
      mapRef.current
    ) {
      return;
    }

    const section = sectionRef.current;
    const sizeSection = () => {
      const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
      const bottomNavigation = document.querySelector<HTMLElement>(
        "[data-product-bottom-nav]",
      );
      const bottomNavigationHeight =
        bottomNavigation?.getBoundingClientRect().height ?? 0;
      const availableHeight = Math.max(
        viewportHeight -
          section.getBoundingClientRect().top -
          bottomNavigationHeight,
        0,
      );
      section.style.height = `${availableHeight}px`;
    };
    sizeSection();

    mapboxgl.accessToken = MAPBOX_TOKEN;
    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: MAP_STYLE,
      center: NIGERIA_CENTER,
      zoom: INITIAL_ZOOM,
      minZoom: MIN_ZOOM,
      maxZoom: MAX_ZOOM,
      projection: "mercator",
      pitchWithRotate: false,
      touchPitch: false,
      attributionControl: false,
    });
    let styleReady = false;

    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");
    map.addControl(
      new mapboxgl.AttributionControl({ compact: true }),
      "bottom-left",
    );

    const resizeMap = () => {
      sizeSection();
      map.resize();
    };
    const resizeObserver = new ResizeObserver(() => map.resize());
    resizeObserver.observe(containerRef.current);
    window.addEventListener("resize", resizeMap);
    window.visualViewport?.addEventListener("resize", resizeMap);

    map.on("error", (event) => {
      if (styleReady) {
        console.warn("explore: recoverable Mapbox error", event.error);
        return;
      }
      console.error("explore: Mapbox failed to load", event.error);
      setMapError("The map couldn't load. Check your connection and try again.");
    });
    map.on("load", () => {
      try {
        addExploreLayers(map, markersRef.current);
        styleReady = true;
        map.resize();
        setMapError(null);
        setMapReady(true);
      } catch (layerError) {
        console.error("explore: map layers failed to load", layerError);
        setMapError("The property map couldn't finish loading.");
      }
    });
    map.on("click", CLUSTER_LAYER_ID, (event) => {
      const feature = map.queryRenderedFeatures(event.point, {
        layers: [CLUSTER_LAYER_ID],
      })[0];
      const clusterId = feature?.properties?.cluster_id;
      const coordinates = (feature?.geometry as GeoJSON.Point | undefined)
        ?.coordinates;
      const source = map.getSource(SOURCE_ID) as
        | mapboxgl.GeoJSONSource
        | undefined;
      if (typeof clusterId !== "number" || !coordinates || !source) return;
      source.getClusterExpansionZoom(clusterId, (clusterError, zoom) => {
        if (clusterError) {
          console.error("explore: cluster expansion unavailable", clusterError);
          return;
        }
        if (zoom === null || zoom === undefined) return;
        map.easeTo({ center: [coordinates[0], coordinates[1]], zoom });
      });
    });
    map.on("mouseenter", CLUSTER_LAYER_ID, () => {
      map.getCanvas().style.cursor = "pointer";
    });
    map.on("mouseleave", CLUSTER_LAYER_ID, () => {
      map.getCanvas().style.cursor = "";
    });
    mapRef.current = map;

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", resizeMap);
      window.visualViewport?.removeEventListener("resize", resizeMap);
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    markersRef.current = markers;
    const source = mapRef.current?.getSource(SOURCE_ID) as
      | mapboxgl.GeoJSONSource
      | undefined;
    source?.setData(markerData(markers));
  }, [markers]);

  return {
    containerRef,
    hasMapboxToken: MAPBOX_TOKEN.length > 0,
    mapError,
    mapReady,
    sectionRef,
  };
}
