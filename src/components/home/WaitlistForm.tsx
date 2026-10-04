"use client";

import { useRef, useState } from "react";
import { api } from "@/lib/api";

// The home page's one action. Posts to the same waitlist as the ad pages
// (variant "verified" is the closest promise; `source` marks it as home so
// the two read apart).
export function WaitlistForm({ id, onDark = false }: { id?: string; onDark?: boolean }) {
  const [contact, setContact] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const sourceRef = useRef<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    const value = contact.trim();
    if (value.length < 5) {
      setError("Enter your email or WhatsApp number.");
      return;
    }
    setError("");
    setBusy(true);
    sourceRef.current ??= ("home" + window.location.search).slice(0, 400);
    try {
      await api.post("/v1/waitlist", {
        contact: value,
        intent: "",
        variant: "verified",
        source: sourceRef.current,
      });
      setDone(true);
    } catch (err) {
      console.error("Waitlist signup failed:", err);
      setError("That didn’t go through. Try again in a moment.");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <p role="status" className={`text-base ${onDark ? "text-white" : "text-primary"}`} style={{ fontFamily: "var(--font-body)" }}>
        <span className="font-bold">You’re on the list.</span>{" "}
        <span className={onDark ? "text-white/80" : "text-secondary"}>We’ll message you when Terrain opens.</span>
      </p>
    );
  }

  return (
    <form id={id} onSubmit={submit} noValidate className="w-full max-w-md">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-0 sm:rounded-full sm:border sm:border-border-rule sm:bg-white sm:p-1.5 sm:shadow-[0_6px_20px_rgba(9,5,3,0.06)]">
        <label htmlFor={`${id ?? "waitlist"}-contact`} className="sr-only">
          Email or WhatsApp number
        </label>
        <input
          id={`${id ?? "waitlist"}-contact`}
          type="text"
          inputMode="email"
          autoComplete="email"
          value={contact}
          onChange={(e) => {
            setContact(e.target.value);
            if (error) setError("");
          }}
          placeholder="Email or WhatsApp number"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id ?? "waitlist"}-error` : undefined}
          className="h-12 w-full min-w-0 rounded-full border border-border-rule bg-white px-5 text-[15px] text-primary placeholder:text-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-verified sm:h-11 sm:flex-1 sm:border-0 sm:bg-transparent sm:focus-visible:ring-0"
          style={{ fontFamily: "var(--font-body)" }}
        />
        <button
          type="submit"
          disabled={busy}
          className="h-12 shrink-0 rounded-full bg-primary px-6 text-[15px] text-canvas transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-verified focus-visible:ring-offset-2 disabled:opacity-60 sm:h-11"
          style={{ fontFamily: "var(--font-interactive)", fontWeight: 600 }}
        >
          {busy ? "Joining…" : "Join the waitlist"}
        </button>
      </div>
      {error && (
        <p id={`${id ?? "waitlist"}-error`} role="alert" className={`mt-2 pl-5 text-sm ${onDark ? "text-white" : "text-[#c92a2a]"}`}>
          {error}
        </p>
      )}
    </form>
  );
}
