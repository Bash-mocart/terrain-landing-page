"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ApiError } from "@/lib/api";
import {
  getSavedFavorites,
  saveListing,
  unsaveListing,
} from "@/lib/saved";

type Props = {
  listingId: string;
  initialSaved?: boolean;
  onSavedChange?: (saved: boolean) => void;
};

export function SaveButton({
  listingId,
  initialSaved,
  onSavedChange,
}: Props) {
  const router = useRouter();
  const [saved, setSaved] = useState(initialSaved ?? false);
  const [checking, setChecking] = useState(initialSaved === undefined);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialSaved !== undefined) return;
    let active = true;
    getSavedFavorites()
      .then((favorites) => {
        if (active) setSaved(favorites.some((favorite) => favorite.listing_id === listingId));
      })
      .catch((requestError) => {
        if (!active) return;
        if (!(requestError instanceof ApiError && requestError.status === 401)) {
          setError("Could not check saved status.");
        }
      })
      .finally(() => {
        if (active) setChecking(false);
      });
    return () => {
      active = false;
    };
  }, [initialSaved, listingId]);

  async function toggle() {
    setPending(true);
    setError("");
    try {
      if (saved) {
        await unsaveListing(listingId);
      } else {
        await saveListing(listingId);
      }
      const nextSaved = !saved;
      setSaved(nextSaved);
      onSavedChange?.(nextSaved);
    } catch (requestError) {
      if (requestError instanceof ApiError && requestError.status === 401) {
        router.replace("/login");
        return;
      }
      setError("We couldn't update your saved properties.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => void toggle()}
        disabled={checking || pending}
        aria-pressed={saved}
        className="rounded-full border border-border-rule px-5 py-2.5 text-sm font-semibold text-primary disabled:opacity-50"
      >
        {pending || checking ? "Saving…" : saved ? "Saved" : "Save property"}
      </button>
      {error && <p className="mt-2 text-xs text-red-700">{error}</p>}
    </div>
  );
}
