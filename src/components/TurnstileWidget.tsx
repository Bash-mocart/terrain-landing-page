"use client";

import { useEffect, useRef } from "react";

const TURNSTILE_SCRIPT = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
const TURNSTILE_ACTION = "join_waitlist"; // the backend rejects any other action

type Turnstile = {
  render(el: HTMLElement, options: Record<string, unknown>): string;
  remove(widgetId: string): void;
};

// One load shared by every widget. next/script's onReady skips widgets that
// mount while the script is still loading.
let turnstileLoad: Promise<Turnstile> | null = null;

function loadTurnstile(): Promise<Turnstile> {
  turnstileLoad ??= new Promise((resolve, reject) => {
    const script = document.createElement("script");
    const fail = (message: string) => {
      turnstileLoad = null;
      script.remove();
      reject(new Error(message));
    };
    script.src = TURNSTILE_SCRIPT;
    script.async = true;
    script.onload = () => {
      const turnstile = (window as { turnstile?: Turnstile }).turnstile;
      if (turnstile) resolve(turnstile);
      else fail("Turnstile script loaded without window.turnstile");
    };
    script.onerror = () => fail("Turnstile script failed to load");
    document.head.appendChild(script);
  });
  return turnstileLoad;
}

// Each token works once: remount (change the key) for a fresh one.
export function TurnstileWidget({ onToken }: { onToken: (token: string | null) => void }) {
  const box = useRef<HTMLDivElement>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    if (!siteKey) return;
    let cancelled = false;
    let turnstile: Turnstile | null = null;
    let widgetId: string | null = null;
    loadTurnstile()
      .then((loaded) => {
        if (cancelled || !box.current) return;
        turnstile = loaded;
        widgetId = loaded.render(box.current, {
          sitekey: siteKey,
          action: TURNSTILE_ACTION,
          appearance: "interaction-only",
          callback: (token: string) => onToken(token),
          "expired-callback": () => onToken(null),
          "error-callback": (code: string) => {
            console.error("Turnstile error:", code);
            onToken(null);
          },
        });
      })
      .catch((error) => console.error("Turnstile failed to load:", error));
    return () => {
      cancelled = true;
      if (turnstile && widgetId) turnstile.remove(widgetId);
    };
  }, [siteKey, onToken]);

  return siteKey ? <div ref={box} /> : null;
}
