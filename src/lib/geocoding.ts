const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";

export type PlaceSearchResult = { name: string; region: string; lng: number; lat: number };

export async function searchPlaces(query: string, signal?: AbortSignal): Promise<PlaceSearchResult[]> {
  const trimmed = query.trim();
  if (!MAPBOX_TOKEN || trimmed.length < 2) return [];
  const url = new URL(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(trimmed)}.json`);
  url.searchParams.set("access_token", MAPBOX_TOKEN);
  url.searchParams.set("country", "NG");
  url.searchParams.set("types", "place,locality,district,region,neighborhood");
  url.searchParams.set("limit", "5");
  const response = await fetch(url, { signal });
  if (!response.ok) throw new Error(`Place search failed (${response.status}).`);
  const body = (await response.json()) as { features?: unknown[] };
  return (body.features ?? []).flatMap((raw) => {
    if (!raw || typeof raw !== "object") return [];
    const feature = raw as { text?: unknown; place_name?: unknown; center?: unknown };
    const center = Array.isArray(feature.center) ? feature.center : [];
    const lng = typeof center[0] === "number" ? center[0] : NaN;
    const lat = typeof center[1] === "number" ? center[1] : NaN;
    if (typeof feature.text !== "string" || typeof feature.place_name !== "string" || !Number.isFinite(lng) || !Number.isFinite(lat)) return [];
    const [, region = ""] = feature.place_name.split(", ");
    return [{ name: feature.text, region, lng, lat }];
  });
}
