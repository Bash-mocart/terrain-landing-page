"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { ApiError } from "@/lib/api";
import { checkPhone, requestOtp, startSignup } from "@/lib/auth";

function storeDevCode(code?: string) {
  if (process.env.NODE_ENV !== "production" && code) {
    window.sessionStorage.setItem("terra_dev_otp", code);
  }
}

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [needsName, setNeedsName] = useState(false);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function sendOtp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedPhone = phone.trim();
    if (!normalizedPhone) {
      setError("Enter your phone number.");
      return;
    }

    setPending(true);
    setError("");
    try {
      const result = await checkPhone(normalizedPhone);
      if (result.status === "new") {
        setNeedsName(true);
        return;
      }
      const otp = await requestOtp(normalizedPhone);
      storeDevCode(otp.dev_code);
      window.location.href = `/auth/otp?phone=${encodeURIComponent(normalizedPhone)}`;
    } catch (requestError) {
      setError(
        requestError instanceof ApiError
          ? requestError.message
          : "We couldn't start sign in. Try again.",
      );
    } finally {
      setPending(false);
    }
  }

  async function startNewSignup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedPhone = phone.trim();
    if (!firstName.trim() || !lastName.trim()) {
      setError("Enter your first and last name.");
      return;
    }

    setPending(true);
    setError("");
    try {
      const otp = await startSignup(
        normalizedPhone,
        firstName.trim(),
        lastName.trim(),
      );
      storeDevCode(otp.dev_code);
      window.location.href = `/auth/otp?phone=${encodeURIComponent(normalizedPhone)}`;
    } catch (requestError) {
      setError(
        requestError instanceof ApiError
          ? requestError.message
          : "We couldn't start your account. Try again.",
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="flex min-h-[calc(100dvh-5rem)] items-center justify-center bg-canvas px-6 py-12">
      <section className="w-full max-w-md rounded-3xl border border-border-rule bg-white p-6 shadow-sm sm:p-8">
        <Link href="/browse" className="text-sm font-semibold text-verified">
          ← Browse properties
        </Link>
        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-verified">
          Terrain account
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-primary">
          {needsName ? "Create your account" : "Sign in to Terrain"}
        </h1>
        <p className="mt-4 leading-relaxed text-secondary">
          {needsName
            ? "Tell us your name and we’ll send a verification code to your phone."
            : "Use your phone number to continue with a secure one-time code."}
        </p>

        <form
          onSubmit={needsName ? startNewSignup : sendOtp}
          className="mt-8 space-y-4"
        >
          <label className="block text-sm font-semibold text-primary">
            Phone number
            <input
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              disabled={needsName || pending}
              autoComplete="tel"
              placeholder="+234 800 000 0000"
              className="mt-2 w-full rounded-2xl border border-border-rule bg-canvas px-4 py-3 text-base font-normal text-primary outline-none focus:border-verified disabled:opacity-60"
            />
          </label>

          {needsName && (
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-semibold text-primary">
                First name
                <input
                  type="text"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  disabled={pending}
                  autoComplete="given-name"
                  className="mt-2 w-full rounded-2xl border border-border-rule bg-canvas px-4 py-3 text-base font-normal text-primary outline-none focus:border-verified disabled:opacity-60"
                />
              </label>
              <label className="block text-sm font-semibold text-primary">
                Last name
                <input
                  type="text"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                  disabled={pending}
                  autoComplete="family-name"
                  className="mt-2 w-full rounded-2xl border border-border-rule bg-canvas px-4 py-3 text-base font-normal text-primary outline-none focus:border-verified disabled:opacity-60"
                />
              </label>
            </div>
          )}

          {error && <p className="text-sm text-red-700">{error}</p>}
          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-full bg-primary px-5 py-3 text-sm font-semibold text-canvas disabled:opacity-50"
          >
            {pending ? "Please wait…" : needsName ? "Create account" : "Continue"}
          </button>
          {needsName && (
            <button
              type="button"
              onClick={() => {
                setNeedsName(false);
                setError("");
              }}
              className="w-full text-sm font-semibold text-secondary"
            >
              Use a different number
            </button>
          )}
        </form>
      </section>
    </main>
  );
}
