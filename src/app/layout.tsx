import type { Metadata } from "next";
import { Inter, Nunito, Zain } from "next/font/google";
import "./globals.css";

// Brand type system mirrors the Terrain Flutter app (DESIGN.md):
//   Zain    — display / wordmark / hero headings
//   Nunito  — body copy
//   Inter   — interactive labels, numerals, caps
// next/font self-hosts each file and adds a CSS variable we can
// reference from Tailwind (config: see `@theme` block in globals.css)
// so the cascade stays predictable across server-rendered HTML.
const zain = Zain({
  variable: "--font-zain",
  subsets: ["latin"],
  weight: ["300", "400", "700", "800", "900"],
  display: "swap",
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Terrain — Verified land + property records in Nigeria",
  description:
    "Buy, sell, and verify Nigerian land and property records. Every plot validated on the ground by a Terrain reviewer before it reaches you.",
  metadataBase: new URL("https://terrain.ng"),
  openGraph: {
    title: "Terrain — Verified land + property records in Nigeria",
    description:
      "Every plot validated on the ground by a Terrain reviewer before it reaches you.",
    url: "https://terrain.ng",
    siteName: "Terrain",
    locale: "en_NG",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${zain.variable} ${nunito.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body bg-canvas text-primary">
        {children}
      </body>
    </html>
  );
}
