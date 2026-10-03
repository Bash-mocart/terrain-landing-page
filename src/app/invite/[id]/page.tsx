import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { TerrainLogo } from "@/components/TerrainLogo";
import { StoreButtons } from "@/components/StoreButtons";

// Where a team invite email's "Open Terrain" button lands. On a phone with
// the app installed, iOS opens the app straight to the invite instead (the
// apple-app-site-association file claims /invite/*), so this page is only
// seen by someone without the app, or on a computer.

export const metadata: Metadata = {
  title: "You're invited to a team on Terrain",
  description:
    "Open the Terrain app and sign in with the email this invite was sent to.",
  robots: { index: false },
};

export default function InvitePage() {
  return (
    <main className="flex min-h-dvh flex-col items-center bg-canvas px-6 py-10">
      <Link href="/" aria-label="Terrain home">
        <TerrainLogo />
      </Link>
      <div className="mt-10 flex w-full max-w-md flex-col items-center text-center">
        <Image
          src="/illustrations/team-invite.webp"
          alt=""
          width={280}
          height={277}
          priority
        />
        <h1
          className="mt-6 text-4xl leading-tight text-primary"
          style={{ fontFamily: "var(--font-display)" }}
        >
          You&apos;re invited to a team on Terrain
        </h1>
        <p
          className="mt-3 text-lg leading-relaxed text-secondary"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Get the Terrain app, then sign in with the email this invite was
          sent to. The invite will be waiting, and joining takes one tap.
        </p>
        <div className="mt-8">
          <StoreButtons />
        </div>
        <p
          className="mt-6 text-sm text-secondary"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Already have the app? Open this link on your phone.
        </p>
      </div>
    </main>
  );
}
