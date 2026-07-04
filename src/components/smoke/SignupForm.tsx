"use client";

import { useEffect, useMemo, useState } from "react";

// Smoke-test signup + the fake-door "request an independent check" rider
// (terra-backend docs/product_validation_field_kit.md). Three states:
//   form -> offer (randomized price) -> done
// Every event also reaches Meta via fbq when the pixel is loaded, tagged
// with the variant so ad-set results can be read per promise.

const API_BASE =
  process.env.NEXT_PUBLIC_TERRAIN_API_URL ?? "https://api.lunor.money";

// Randomized per visitor (not rotated weekly): kills the time confound.
const CHECK_PRICES = [50_000, 75_000, 150_000];

type FbqFn = (...args: unknown[]) => void;
function track(event: string, params: Record<string, unknown>) {
  const fbq = (window as { fbq?: FbqFn }).fbq;
  if (!fbq) return;
  if (event === "Lead") fbq("track", "Lead", params);
  else fbq("trackCustom", event, params);
}

export function SignupForm({
  variant,
  cta,
}: {
  variant: "verified" | "plans" | "abroad";
  cta: string;
}) {
  const [stage, setStage] = useState<"form" | "offer" | "done">("form");
  const [contact, setContact] = useState("");
  const [intent, setIntent] = useState("");
  const [details, setDetails] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [signupId, setSignupId] = useState("");
  const [checkRequested, setCheckRequested] = useState(false);

  // One price per visitor, stable across re-renders.
  const price = useMemo(
    () => CHECK_PRICES[Math.floor(Math.random() * CHECK_PRICES.length)],
    [],
  );

  const [source, setSource] = useState("");
  useEffect(() => {
    setSource(window.location.search.slice(0, 400));
  }, []);

  async function submitSignup(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setError("");
    if (contact.trim().length < 5) {
      setError("Enter your WhatsApp number or email.");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch(`${API_BASE}/v1/waitlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact: contact.trim(), intent, variant, source }),
      });
      if (!res.ok) throw new Error(await res.text());
      const { id } = (await res.json()) as { id: string };
      setSignupId(id);
      track("Lead", { variant, intent });
      setStage("offer");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function submitCheckRequest(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setError("");
    if (details.trim().length === 0) {
      setError("Tell us a little about the property.");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch(
        `${API_BASE}/v1/waitlist/${signupId}/check-request`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            price_naira: price,
            property_details: details.trim(),
          }),
        },
      );
      if (!res.ok) throw new Error(await res.text());
      track("CheckRequested", { variant, price_naira: price });
      setCheckRequested(true);
      setStage("done");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  if (stage === "done") {
    return (
      <div className="max-w-md rounded-2xl border border-border-rule bg-canvas p-6">
        <p className="text-lg font-bold text-primary">
          {checkRequested ? "Request received." : "You’re on the list."}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-secondary">
          {checkRequested
            ? "A member of the Terrain team will message you within 24 hours to talk through the check."
            : "We’ll message you as early access opens in your area."}
        </p>
      </div>
    );
  }

  if (stage === "offer") {
    return (
      <form
        onSubmit={submitCheckRequest}
        className="max-w-md rounded-2xl border border-border-rule bg-canvas p-6"
      >
        <p className="text-lg font-bold text-primary">You’re on the list.</p>
        <p className="mt-3 text-sm leading-relaxed text-secondary">
          Considering a specific property right now? A Terrain-accredited
          lawyer and surveyor can independently check it — title at the land
          registry, boundary beacons on the ground, photo evidence — for{" "}
          <span className="font-bold text-primary">
            ₦{price.toLocaleString("en-NG")}
          </span>
          .
        </p>
        <textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="The property: where it is, what the seller says about the title…"
          rows={3}
          className="mt-4 w-full rounded-xl border border-border-rule bg-white px-4 py-3 text-sm text-primary placeholder:text-secondary/70 focus:border-verified focus:outline-none"
        />
        {error && <p className="mt-2 text-sm text-red-700">{error}</p>}
        <div className="mt-4 flex items-center gap-4">
          <button
            type="submit"
            disabled={busy}
            className="rounded-full bg-verified px-6 py-3 text-sm font-bold text-white disabled:opacity-60"
          >
            {busy ? "Sending…" : "Request the check"}
          </button>
          <button
            type="button"
            onClick={() => setStage("done")}
            className="text-sm font-semibold text-secondary underline-offset-2 hover:underline"
          >
            Not now
          </button>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={submitSignup} className="max-w-md">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="WhatsApp number or email"
          inputMode="email"
          className="w-full rounded-full border border-border-rule bg-white px-5 py-3.5 text-sm text-primary placeholder:text-secondary/70 focus:border-verified focus:outline-none"
        />
        <button
          type="submit"
          disabled={busy}
          className="shrink-0 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-white disabled:opacity-60"
        >
          {busy ? "Sending…" : cta}
        </button>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {(
          [
            ["buy_soon", "Buying soon"],
            ["looking", "Just looking"],
            ["sell", "Selling"],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => setIntent(intent === value ? "" : value)}
            className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${
              intent === value
                ? "border-primary bg-primary text-white"
                : "border-border-rule bg-white text-secondary"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      {error && <p className="mt-2 text-sm text-red-700">{error}</p>}
    </form>
  );
}
