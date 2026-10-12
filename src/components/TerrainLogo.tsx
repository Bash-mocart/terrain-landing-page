import Image from "next/image";

// The full logo (mark + TERRAIN wordmark), from the app's assets/brand files
// copied to public/brand. The dark-surface file keeps the white disc behind
// the pin (56x16). The light file drops the disc, which was invisible on the
// canvas but threw off centring, and is cropped to the pin + wordmark
// (49.86x12, i.e. the pin's own height). markSize is the disc size either way.
export function TerrainLogo({
  markSize = 28,
  tone = "onLight",
  className = "",
}: {
  markSize?: number;
  tone?: "onLight" | "onDark";
  className?: string;
}) {
  const dark = tone === "onDark";
  const height = dark ? markSize : markSize * 0.75;
  return (
    <Image
      src={dark ? "/brand/terrain_logo_ondark.svg" : "/brand/terrain_logo.svg"}
      alt="Terrain"
      width={Math.round(height * (dark ? 3.5 : 49.86 / 12))}
      height={Math.round(height)}
      unoptimized
      priority
      className={className}
    />
  );
}
