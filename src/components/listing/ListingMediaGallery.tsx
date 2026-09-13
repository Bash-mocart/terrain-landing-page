"use client";

import Link from "next/link";
import { useState } from "react";

const VIDEO_URL_PATTERN = /\.(mp4|mov|webm)(\?|#|$)/i;

type MediaItem = {
  type: "image" | "video";
  url: string;
};

type Props = {
  imageUrls?: string[];
  backHref: string;
  backLabel: string;
  title: string;
};

function mediaItems(imageUrls: string[] | undefined): MediaItem[] {
  return (imageUrls ?? [])
    .filter((url) => /^https?:\/\//.test(url))
    .map((url) => ({
      type: VIDEO_URL_PATTERN.test(url) ? "video" : "image",
      url,
    }));
}

export function ListingMediaGallery({
  imageUrls,
  backHref,
  backLabel,
  title,
}: Props) {
  const media = mediaItems(imageUrls);
  const [activeIndex, setActiveIndex] = useState(0);
  const [failedUrls, setFailedUrls] = useState<string[]>([]);
  const available = media.filter((item) => !failedUrls.includes(item.url));

  function markFailed(url: string) {
    setFailedUrls((current) =>
      current.includes(url) ? current : [...current, url],
    );
  }

  if (available.length === 0) {
    return (
      <section aria-label="Property media" className="relative">
        <Link
          href={backHref}
          className="absolute left-4 top-4 z-10 rounded-full bg-primary/85 px-4 py-2 text-sm font-semibold text-canvas"
        >
          ← {backLabel}
        </Link>
        <div className="flex min-h-[360px] items-center justify-center rounded-3xl bg-border-rule px-6 text-center text-secondary">
          No property photos available
        </div>
      </section>
    );
  }

  const index = Math.min(activeIndex, available.length - 1);
  const current = available[index];
  const canNavigate = available.length > 1;

  function moveBy(step: number) {
    setActiveIndex((currentIndex) =>
      (currentIndex + step + available.length) % available.length,
    );
  }

  return (
    <section aria-label="Property media" className="relative">
      <Link
        href={backHref}
        className="absolute left-4 top-4 z-10 rounded-full bg-primary/85 px-4 py-2 text-sm font-semibold text-canvas"
      >
        ← {backLabel}
      </Link>
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-border-rule sm:aspect-[16/10]">
        {current.type === "video" ? (
          <video
            key={current.url}
            src={current.url}
            controls
            playsInline
            preload="metadata"
            onError={() => markFailed(current.url)}
            className="size-full object-cover"
            aria-label={`Video of ${title}`}
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element -- real <img> needed so load failures fire onError; next/image would need remotePatterns config
          <img
            key={current.url}
            src={current.url}
            alt={title ? `Photo of ${title}` : "Property photo"}
            onError={() => markFailed(current.url)}
            className="size-full object-cover"
          />
        )}

        {canNavigate && (
          <>
            <button
              type="button"
              onClick={() => moveBy(-1)}
              aria-label="Previous property media"
              className="absolute left-4 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-primary/80 text-xl text-canvas"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => moveBy(1)}
              aria-label="Next property media"
              className="absolute right-4 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-primary/80 text-xl text-canvas"
            >
              ›
            </button>
          </>
        )}

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-primary/75 px-3 py-1 text-xs font-semibold text-canvas">
          {index + 1} / {available.length}
        </div>
      </div>
      {canNavigate && (
        <div className="mt-3 flex justify-center gap-1.5" aria-label="Media pages">
          {available.map((item, itemIndex) => (
            <button
              key={item.url}
              type="button"
              onClick={() => setActiveIndex(itemIndex)}
              aria-label={`Show media ${itemIndex + 1}`}
              aria-current={itemIndex === index ? "true" : undefined}
              className={`h-1.5 rounded-full transition-[width,background-color] ${
                itemIndex === index
                  ? "w-6 bg-verified"
                  : "w-1.5 bg-border-rule"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
