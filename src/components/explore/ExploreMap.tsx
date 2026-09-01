"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getExploreMarkers } from "@/lib/explore";
import type { MapMarker } from "@/lib/types";
import type { PlaceSearchResult } from "@/lib/geocoding";
import { ExploreControls, type ExploreFilter } from "./ExploreControls";
import { ExploreLoadingIndicator } from "./ExploreLoadingIndicator";
import { useExploreMap } from "./useExploreMap";

type LoadStatus = "ready" | "loading" | "error";

export function ExploreMap() {
  const abortRef = useRef<AbortController | null>(null);
  const [markers, setMarkers] = useState<MapMarker[]>([]);
  const [filter, setFilter] = useState<ExploreFilter>("all");
  const [status, setStatus] = useState<LoadStatus>("loading");
  const [requestError, setRequestError] = useState<string | null>(null);
  const [initialRequestComplete, setInitialRequestComplete] = useState(false);
  const { containerRef, hasMapboxToken, mapError, mapReady, sectionRef, recenter, selectPlace, zoomIn, zoomOut } =
    useExploreMap(markers);

  const loadMarkers = useCallback(async (nextFilter: ExploreFilter) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setStatus("loading");
    setRequestError(null);

    try {
      const nextMarkers = await getExploreMarkers(
        nextFilter === "all" ? undefined : nextFilter,
        controller.signal,
      );
      if (controller.signal.aborted) return;
      setMarkers(nextMarkers);
      setStatus("ready");
    } catch (loadError) {
      if (controller.signal.aborted) return;
      console.error("explore: map markers unavailable", loadError);
      setRequestError("We couldn't load properties on the map.");
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    if (!hasMapboxToken) return;
    const controller = new AbortController();
    abortRef.current = controller;

    async function loadInitialMarkers() {
      try {
        const nextMarkers = await getExploreMarkers(
          undefined,
          controller.signal,
        );
        if (controller.signal.aborted) return;
        setMarkers(nextMarkers);
        setStatus("ready");
        setInitialRequestComplete(true);
      } catch (loadError) {
        if (controller.signal.aborted) return;
        console.error("explore: initial map markers unavailable", loadError);
        setRequestError("We couldn't load properties on the map.");
        setStatus("error");
        setInitialRequestComplete(true);
      }
    }

    void loadInitialMarkers();
    return () => controller.abort();
  }, [hasMapboxToken]);

  if (!hasMapboxToken) {
    return (
      <div className="flex min-h-[65vh] items-center justify-center rounded-3xl border border-border-rule bg-white p-8 text-center">
        <div className="max-w-md">
          <h2 className="font-display text-3xl font-bold">Map unavailable</h2>
          <p className="mt-3 text-secondary">
            Add the public Mapbox token to load Explore.
          </p>
        </div>
      </div>
    );
  }

  const visibleError = mapError ?? (status === "error" ? requestError : null);
  const showInitialLoading =
    !visibleError && (!mapReady || !initialRequestComplete);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[65vh] overflow-hidden bg-border-rule"
    >
      <div
        ref={containerRef}
        style={{ position: "absolute", inset: 0 }}
        aria-label="Property map"
      />

      <ExploreControls
        filter={filter}
        disabled={!initialRequestComplete || status === "loading"}
        onRecenter={recenter}
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
        onPlaceSelect={(place: PlaceSearchResult) => selectPlace(place.lng, place.lat)}
        onFilterChange={(nextFilter) => {
          if (nextFilter === filter) return;
          setFilter(nextFilter);
          void loadMarkers(nextFilter);
        }}
      />

      {showInitialLoading && <ExploreLoadingIndicator />}

      {initialRequestComplete && status === "loading" && (
        <div className="absolute right-4 top-4 z-10 rounded-full bg-canvas px-4 py-2 text-sm text-secondary shadow-lg sm:right-6 sm:top-6">
          Loading properties…
        </div>
      )}

      {visibleError && (
        <div className="absolute inset-x-4 bottom-6 z-10 mx-auto max-w-md rounded-2xl border border-border-rule bg-canvas p-5 shadow-xl">
          <p className="font-semibold">{visibleError}</p>
          <button
            type="button"
            onClick={() => {
              if (mapError) {
                window.location.reload();
                return;
              }
              void loadMarkers(filter);
            }}
            className="mt-3 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-canvas"
          >
            {mapError ? "Reload map" : "Try again"}
          </button>
        </div>
      )}

      {!visibleError && status === "ready" && markers.length === 0 && (
        <div className="absolute inset-x-4 bottom-6 z-10 mx-auto max-w-md rounded-2xl border border-border-rule bg-canvas p-5 text-center shadow-xl">
          No properties match this filter yet.
        </div>
      )}
    </section>
  );
}
