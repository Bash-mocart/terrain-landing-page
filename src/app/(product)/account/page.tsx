"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ApiError } from "@/lib/api";
import { getCurrentUser, updateCurrentUser } from "@/lib/account";
import { logout } from "@/lib/auth";
import type { AccountUpdate, AuthUser } from "@/lib/types";
import { AccountProfile } from "@/components/account/AccountProfile";

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    getCurrentUser()
      .then((currentUser) => {
        if (active) setUser(currentUser);
      })
      .catch((requestError) => {
        if (!active) return;
        if (requestError instanceof ApiError && requestError.status === 401) {
          router.replace("/login");
          return;
        }
        setError("We couldn't load your profile.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [router]);

  async function save(changes: AccountUpdate) {
    if (Object.keys(changes).length === 0) return;
    setSaving(true);
    setError("");
    try {
      setUser(await updateCurrentUser(changes));
    } catch (requestError) {
      if (requestError instanceof ApiError && requestError.status === 401) {
        router.replace("/login");
        return;
      }
      setError("We couldn't save your changes.");
    } finally {
      setSaving(false);
    }
  }

  async function signOut() {
    try {
      await logout();
    } catch (logoutError) {
      console.warn("account: logout request unavailable", logoutError);
    } finally {
      window.location.href = "/login";
    }
  }

  if (loading) {
    return (
      <main className="bg-canvas" aria-busy="true" aria-label="Loading account">
        <div className="mx-auto max-w-3xl px-6 py-10 sm:px-8 sm:py-14">
          <div className="h-10 w-48 animate-pulse rounded bg-border-rule/70" />
          <div className="mt-8 h-[520px] animate-pulse rounded-3xl bg-border-rule/60" />
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-canvas px-6">
        <p className="text-secondary">{error || "Your profile is unavailable."}</p>
      </main>
    );
  }

  return (
    <>
      {error && (
        <div className="border-b border-border-rule bg-canvas px-6 py-3 text-center text-sm text-red-700">
          {error}
        </div>
      )}
      <AccountProfile
        user={user}
        saving={saving}
        onSave={save}
        onLogout={signOut}
      />
    </>
  );
}
