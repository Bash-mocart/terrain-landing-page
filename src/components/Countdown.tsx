"use client";

import { useSyncExternalStore } from "react";

const UNITS = [
  ["days", 86_400],
  ["hours", 3_600],
  ["minutes", 60],
  ["seconds", 1],
] as const;

// A once-a-second clock, in whole seconds. null on the server so the first
// client render matches and then starts ticking.
const subscribe = (tick: () => void) => {
  const id = setInterval(tick, 1000);
  return () => clearInterval(id);
};
const nowSeconds = () => Math.floor(Date.now() / 1000);

// Split seconds into days / hours / minutes / seconds.
function split(left: number) {
  return UNITS.map(([, size]) => {
    const n = Math.floor(left / size);
    left -= n * size;
    return n;
  });
}

// Days / hours / minutes / seconds to `to`; dashes until mounted, stops at zero.
export function Countdown({ to }: { to: string }) {
  const now = useSyncExternalStore(subscribe, nowSeconds, () => null);
  const parts = now === null ? null : split(Math.max(0, Math.floor(Date.parse(to) / 1000) - now));

  return (
    <dl className="mx-auto grid max-w-md grid-cols-4" aria-label="Time until Terrain opens">
      {UNITS.map(([label], i) => {
        const value = parts === null ? "–" : i === 0 ? String(parts[i]) : String(parts[i]).padStart(2, "0");
        return (
          <div key={label} className="flex flex-col items-center border-l border-border-rule first:border-l-0">
            <dt className="order-last mt-1 text-sm text-secondary" style={{ fontFamily: "var(--font-body)" }}>
              {label}
            </dt>
            <dd
              className="overflow-hidden text-[clamp(40px,9vw,64px)] leading-[1.05] tracking-[-0.02em] text-primary tabular-nums"
              style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}
            >
              <span key={value} className="gate-tick inline-block">
                {value}
              </span>
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
