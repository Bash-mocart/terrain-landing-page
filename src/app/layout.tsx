import type { Metadata } from "next";
import { Inter, Nunito, Zain } from "next/font/google";
import "./globals.css";

// Brand type system mirrors the Terrain Flutter app (DESIGN.md):
//   Zain    display, headlines, wordmark
//   Nunito  body copy
//   Inter   interactive labels, caps, numerals
// next/font self-hosts each weight and emits a CSS variable on <html>.
// globals.css re-publishes those as semantic role tokens.
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
  title: "Terrain. Verified land on record in Nigeria.",
  description:
    "Browse verified plots across Abuja, Lagos, and beyond. Every title confirmed before funds move. Reviewed on the ground.",
  metadataBase: new URL("https://terrain.ng"),
  openGraph: {
    title: "Terrain. Verified land on record in Nigeria.",
    description:
      "Browse verified plots across Abuja, Lagos, and beyond. Every title confirmed before funds move.",
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
      <body className="min-h-full" style={{ fontFamily: "var(--font-body)" }}>
        {children}
      </body>
    </html>
  );
}
