"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function BrowseError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error("Browse route failed:", error);
  }, [error]);

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-canvas px-6">
      <div className="max-w-md text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-verified">
          Marketplace unavailable
        </p>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-primary">
          We couldn’t load the properties.
        </h1>
        <p className="mt-4 leading-relaxed text-secondary">
          Check your connection and try again. Your filters have been
          preserved.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <button
            type="button"
            onClick={() => unstable_retry()}
            className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-canvas"
          >
            Try again
          </button>
          <Link
            href="/"
            className="rounded-full border border-border-rule px-6 py-3 text-sm font-semibold text-primary"
          >
            Go home
          </Link>
        </div>
      </div>
    </main>
  );
}
