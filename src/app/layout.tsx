import type { Metadata } from "next";
import { Outfit, Caveat, IBM_Plex_Sans_Arabic, Heebo } from "next/font/google";
import "./tokens.css";
import "./design.css";
import { content } from "@/lib/content";

/* Self-hosted Google fonts via next/font — Next downloads at build time,
   inlines optimized CSS, and serves from our own origin. No external
   requests to fonts.googleapis.com / fonts.gstatic.com at runtime. */
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});
const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-caveat",
  display: "swap",
});
const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-arabic",
  display: "swap",
});
const heebo = Heebo({
  subsets: ["hebrew"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heebo",
  display: "swap",
});

const meta = content.meta.en;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  openGraph: {
    title: meta.title,
    description: meta.description,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const fontVars = `${outfit.variable} ${caveat.variable} ${plexArabic.variable} ${heebo.variable}`;
  return (
    <html lang="en" dir="ltr" className={fontVars}>
      <body>{children}</body>
    </html>
  );
}
