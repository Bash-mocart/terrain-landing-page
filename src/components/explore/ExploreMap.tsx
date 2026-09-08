"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  getExploreMarkers,
  getExploreListing,
  getExploreTaxonomy,
  type ExploreFilters,
} from "@/lib/explore";
import type { Listing, ListingTaxonomy, MapMarker } from "@/lib/types";
import type { PlaceSearchResult } from "@/lib/geocoding";
import { ExploreControls } from "./ExploreControls";
import { ExploreLoadingIndicator } from "./ExploreLoadingIndicator";
import { useExploreMap } from "./useExploreMap";
import { ListingPreviewCard } from "./ListingPreviewCard";

type LoadStatus = "ready" | "loading" | "error";
const FILTER_REQUEST_DEBOUNCE_MS = 300;

export function ExploreMap() {
  const abortRef = useRef<AbortController | null>(null);
  const filterRequestTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [markers, setMarkers] = useState<MapMarker[]>([]);
  const [filters, setFilters] = useState<ExploreFilters>({});
  const [taxonomy, setTaxonomy] = useState<ListingTaxonomy>({ types: [] });
  const [status, setStatus] = useState<LoadStatus>("loading");
  const [requestError, setRequestError] = useState<string | null>(null);
  const [initialRequestComplete, setInitialRequestComplete] = useState(false);
  const [selectedListingId, setSelectedListingId] = useState<string | null>(null);
  const [selectedListing, setSelectedListing] = useState<Listing | undefined>();
  const [previewStatus, setPreviewStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [previewError, setPreviewError] = useState<string | null>(null);
  const [previewRetry, setPreviewRetry] = useState(0);
  const previewAbortRef = useRef<AbortController | null>(null);
  const selectedListingIdRef = useRef<string | null>(null);
  const handleMarkerSelect = useCallback((id: string) => {
    if (selectedListingIdRef.current === id) return;
    selectedListingIdRef.current = id;
    setSelectedListingId(id);
    setSelectedListing(undefined);
    setPreviewError(null);
    setPreviewStatus("loading");
    setPreviewRetry(0);
  }, []);
  const { containerRef, hasMapboxToken, mapError, mapReady, sectionRef, recenter, selectPlace, zoomIn, zoomOut } =
    useExploreMap(markers, selectedListingId, handleMarkerSelect);

  useEffect(() => {
    if (!selectedListingId) return;
    previewAbortRef.current?.abort();
    const controller = new AbortController();
    previewAbortRef.current = controller;
    getExploreListing(selectedListingId, controller.signal)
      .then((listing) => {
        if (controller.signal.aborted) return;
        setSelectedListing(listing);
        setPreviewStatus("ready");
      })
      .catch((error) => {
        if (controller.signal.aborted) return;
        console.error("explore: listing preview unavailable", error);
        setPreviewError("We couldn't load this property.");
        setPreviewStatus("error");
      });
    return () => controller.abort();
  }, [selectedListingId, previewRetry]);

  const loadMarkers = useCallback(async (nextFilters: ExploreFilters) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setStatus("loading");
    setRequestError(null);

    try {
      const nextMarkers = await getExploreMarkers(nextFilters, controller.signal);
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

  const handleFiltersChange = useCallback(
    (nextFilters: ExploreFilters) => {
      abortRef.current?.abort();
      if (filterRequestTimerRef.current) {
        clearTimeout(filterRequestTimerRef.current);
      }
      selectedListingIdRef.current = null;
      setSelectedListingId(null);
      setSelectedListing(undefined);
      setPreviewStatus("idle");
      setFilters(nextFilters);
      setStatus("loading");
      filterRequestTimerRef.current = setTimeout(() => {
        filterRequestTimerRef.current = null;
        void loadMarkers(nextFilters);
      }, FILTER_REQUEST_DEBOUNCE_MS);
    },
    [loadMarkers],
  );

  useEffect(() => {
    return () => {
      if (filterRequestTimerRef.current) {
        clearTimeout(filterRequestTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!hasMapboxToken) return;
    const controller = new AbortController();
    abortRef.current = controller;

    async function loadInitialMarkers() {
      try {
        const nextMarkers = await getExploreMarkers({}, controller.signal);
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

  useEffect(() => {
    const controller = new AbortController();
    getExploreTaxonomy(controller.signal)
      .then(setTaxonomy)
      .catch((error) => {
        if (!controller.signal.aborted) {
          console.warn("explore: listing taxonomy unavailable", error);
        }
      });
    return () => controller.abort();
  }, []);

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
        filters={filters}
        taxonomy={taxonomy}
        disabled={!initialRequestComplete}
        onRecenter={recenter}
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
        onPlaceSelect={(place: PlaceSearchResult) => {
          selectPlace(place.lng, place.lat);
          if (place.state && place.state !== filters.state) {
            handleFiltersChange({ ...filters, state: place.state });
          }
        }}
        onFiltersChange={handleFiltersChange}
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
              void loadMarkers(filters);
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

      {selectedListingId && (
        <ListingPreviewCard
          listing={selectedListing}
          loading={previewStatus === "loading"}
          error={previewStatus === "error" ? previewError : null}
          onRetry={() => {
            setPreviewError(null);
            setPreviewStatus("loading");
            setPreviewRetry((value) => value + 1);
          }}
          onClose={() => {
            selectedListingIdRef.current = null;
            setSelectedListingId(null);
            setSelectedListing(undefined);
            setPreviewStatus("idle");
          }}
        />
      )}
    </section>
  );
}
