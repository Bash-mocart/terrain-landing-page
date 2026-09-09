"use client";

import Link from "next/link";
import { useState, useSyncExternalStore, type FormEvent } from "react";
import { ApiError, saveSession } from "@/lib/api";
import { requestOtp, verifyOtp } from "@/lib/auth";

function subscribeToDevCode() {
  return () => {};
}

function readDevCode() {
  if (process.env.NODE_ENV === "production" || typeof window === "undefined") {
    return "";
  }
  return window.sessionStorage.getItem("terra_dev_otp") ?? "";
}

function readServerDevCode() {
  return "";
}

export function OtpForm({ phone }: { phone: string }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [devCodeOverride, setDevCodeOverride] = useState("");
  const storedDevCode = useSyncExternalStore(
    subscribeToDevCode,
    readDevCode,
    readServerDevCode,
  );
  const devCode = devCodeOverride || storedDevCode;

  if (!phone) {
    return (
      <main className="flex min-h-[calc(100dvh-5rem)] items-center justify-center bg-canvas px-6 py-12">
        <div className="max-w-md text-center">
          <h1 className="font-display text-4xl font-bold text-primary">
            Start with your phone number
          </h1>
          <Link
            href="/login"
            className="mt-8 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-canvas"
          >
            Go to sign in
          </Link>
        </div>
      </main>
    );
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!code.trim()) {
      setError("Enter the verification code.");
      return;
    }
    setPending(true);
    setError("");
    try {
      const session = await verifyOtp(phone, code.trim());
      saveSession(session);
      window.sessionStorage.removeItem("terra_dev_otp");
      window.location.href = "/browse";
    } catch (requestError) {
      setError(
        requestError instanceof ApiError
          ? requestError.message
          : "We couldn't verify that code. Try again.",
      );
    } finally {
      setPending(false);
    }
  }

  async function resend() {
    setPending(true);
    setError("");
    try {
      const response = await requestOtp(phone);
      if (process.env.NODE_ENV !== "production" && response.dev_code) {
        window.sessionStorage.setItem("terra_dev_otp", response.dev_code);
        setDevCodeOverride(response.dev_code);
        setCode(response.dev_code);
      }
    } catch (requestError) {
      setError(
        requestError instanceof ApiError
          ? requestError.message
          : "We couldn't resend the code. Try again.",
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="flex min-h-[calc(100dvh-5rem)] items-center justify-center bg-canvas px-6 py-12">
      <section className="w-full max-w-md rounded-3xl border border-border-rule bg-white p-6 shadow-sm sm:p-8">
        <Link href="/login" className="text-sm font-semibold text-verified">
          ← Change number
        </Link>
        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-verified">
          Verify your phone
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-primary">
          Enter your code
        </h1>
        <p className="mt-4 leading-relaxed text-secondary">
          We sent a one-time code to {phone}.
        </p>
        <form onSubmit={submit} className="mt-8 space-y-4">
          <label className="block text-sm font-semibold text-primary">
            Verification code
            <input
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              value={code}
              onChange={(event) => setCode(event.target.value)}
              disabled={pending}
              className="mt-2 w-full rounded-2xl border border-border-rule bg-canvas px-4 py-3 text-center text-2xl tracking-[0.35em] text-primary outline-none focus:border-verified disabled:opacity-60"
            />
          </label>
          {process.env.NODE_ENV !== "production" && devCode && (
            <p className="rounded-2xl bg-border-rule/50 px-4 py-3 text-sm text-secondary">
              Development code: <strong>{devCode}</strong>
            </p>
          )}
          {error && <p className="text-sm text-red-700">{error}</p>}
          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-full bg-primary px-5 py-3 text-sm font-semibold text-canvas disabled:opacity-50"
          >
            {pending ? "Checking…" : "Verify and continue"}
          </button>
          <button
            type="button"
            onClick={resend}
            disabled={pending}
            className="w-full text-sm font-semibold text-secondary disabled:opacity-50"
          >
            Resend code
          </button>
        </form>
      </section>
    </main>
  );
}
