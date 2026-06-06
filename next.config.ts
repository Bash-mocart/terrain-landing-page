import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow HMR over the LAN IP so the dev server can be previewed on
  // a phone or another machine on the same network (e.g. checking the
  // mobile breakpoint on an iPhone without deploying). Next 16
  // blocks this by default for safety; the value is dev-only.
  allowedDevOrigins: ["192.168.178.22"],
  // Mapbox tile + sprite hosts. next/image throws by default on
  // remote hosts we haven't allow-listed; the verified-plot photos
  // come from media.lunor.money (the same CDN the Flutter app uses
  // for listing photography).
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "media.lunor.money" },
      { protocol: "https", hostname: "api.mapbox.com" },
    ],
  },
};

export default nextConfig;
