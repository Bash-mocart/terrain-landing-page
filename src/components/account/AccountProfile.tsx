"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import type { AccountUpdate, AuthUser } from "@/lib/types";

type Props = {
  user: AuthUser;
  saving: boolean;
  onSave: (changes: AccountUpdate) => Promise<void>;
  onLogout: () => Promise<void>;
};

export function AccountProfile({ user, saving, onSave, onLogout }: Props) {
  const [fullName, setFullName] = useState(user.full_name);
  const [avatarUrl, setAvatarUrl] = useState(user.avatar_url ?? "");
  const [bio, setBio] = useState(user.bio ?? "");
  const [location, setLocation] = useState(user.location ?? "");
  const avatar = /^https?:\/\//.test(avatarUrl)
    ? avatarUrl
    : undefined;
  const hasChanges =
    fullName !== user.full_name ||
    avatarUrl !== (user.avatar_url ?? "") ||
    bio !== (user.bio ?? "") ||
    location !== (user.location ?? "");
  const [validationError, setValidationError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextFullName = fullName.trim();
    if (!nextFullName) {
      setValidationError("Full name cannot be empty.");
      return;
    }
    setValidationError("");
    const changes: AccountUpdate = {};
    if (nextFullName !== user.full_name) changes.full_name = nextFullName;
    if (avatarUrl !== (user.avatar_url ?? "")) changes.avatar_url = avatarUrl;
    if (bio !== (user.bio ?? "")) changes.bio = bio;
    if (location !== (user.location ?? "")) changes.location = location;
    await onSave(changes);
  }

  return (
    <main className="min-w-0 bg-canvas">
      <div className="mx-auto max-w-3xl px-6 py-10 sm:px-8 sm:py-14">
        <Link href="/browse" className="text-sm font-semibold text-verified">
          ← Browse properties
        </Link>
        <div className="mt-6 flex items-center gap-4">
          <div
            className="flex size-16 items-center justify-center rounded-2xl bg-border-rule bg-cover bg-center text-2xl font-bold text-primary"
            style={avatar ? { backgroundImage: `url(${JSON.stringify(avatar)})` } : undefined}
            role={avatar ? "img" : undefined}
            aria-label={avatar ? "Profile photo" : undefined}
          >
            {!avatar && (user.full_name || user.phone).charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-verified">
              Your account
            </p>
            <h1 className="mt-1 font-display text-4xl font-bold tracking-tight text-primary">
              Profile
            </h1>
          </div>
        </div>

        <section className="mt-8 rounded-3xl border border-border-rule bg-white p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-2xl font-bold text-primary">
              Personal details
            </h2>
            {user.kyc_verified && (
              <span className="rounded-full bg-verified px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
                Verified
              </span>
            )}
          </div>

          <form onSubmit={submit} className="mt-6 space-y-5">
            <label className="block text-sm font-semibold text-primary">
              Full name
              <input
                type="text"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                disabled={saving}
                className="mt-2 w-full rounded-2xl border border-border-rule bg-canvas px-4 py-3 text-base font-normal text-primary outline-none focus:border-verified disabled:opacity-60"
              />
            </label>
            {validationError && (
              <p className="text-sm text-red-700">{validationError}</p>
            )}
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm font-semibold text-primary">
                Phone
                <input
                  type="tel"
                  value={user.phone}
                  readOnly
                  className="mt-2 w-full rounded-2xl border border-border-rule bg-border-rule/30 px-4 py-3 text-base font-normal text-secondary"
                />
              </label>
              <label className="block text-sm font-semibold text-primary">
                Email
                <input
                  type="email"
                  value={user.email ?? "Not added"}
                  readOnly
                  className="mt-2 w-full rounded-2xl border border-border-rule bg-border-rule/30 px-4 py-3 text-base font-normal text-secondary"
                />
              </label>
            </div>
            <label className="block text-sm font-semibold text-primary">
              Avatar URL
              <input
                type="url"
                value={avatarUrl}
                onChange={(event) => setAvatarUrl(event.target.value)}
                disabled={saving}
                placeholder="https://…"
                className="mt-2 w-full rounded-2xl border border-border-rule bg-canvas px-4 py-3 text-base font-normal text-primary outline-none focus:border-verified disabled:opacity-60"
              />
            </label>
            <label className="block text-sm font-semibold text-primary">
              About you
              <textarea
                value={bio}
                onChange={(event) => setBio(event.target.value)}
                disabled={saving}
                rows={4}
                className="mt-2 w-full rounded-2xl border border-border-rule bg-canvas px-4 py-3 text-base font-normal text-primary outline-none focus:border-verified disabled:opacity-60"
              />
            </label>
            <label className="block text-sm font-semibold text-primary">
              Location
              <input
                type="text"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                disabled={saving}
                className="mt-2 w-full rounded-2xl border border-border-rule bg-canvas px-4 py-3 text-base font-normal text-primary outline-none focus:border-verified disabled:opacity-60"
              />
            </label>
            <button
              type="submit"
              disabled={saving || !hasChanges || !fullName.trim()}
              className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-canvas disabled:opacity-50"
            >
              {saving ? "Saving…" : hasChanges ? "Save changes" : "No changes"}
            </button>
          </form>
        </section>

        <button
          type="button"
          onClick={() => void onLogout()}
          disabled={saving}
          className="mt-6 rounded-full border border-border-rule px-6 py-3 text-sm font-semibold text-primary disabled:opacity-50"
        >
          Log out
        </button>
      </div>
    </main>
  );
}
