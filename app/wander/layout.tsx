import type { Metadata, Viewport } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import "./wander.css";

/**
 * Wanderboard lives at /wander with its own look and its own fonts, outside
 * the (site) route group so none of the YSK chrome (nav, footer, Pacific
 * Motion tokens) leaks in. It is a personal app for Christine, so it asks
 * search engines not to index it.
 */
const display = Instrument_Serif({
  variable: "--font-w-display",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const sans = DM_Sans({
  variable: "--font-w-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: { absolute: "Wanderboard" },
  description:
    "A travel vision board that sorts by category and by what is near you, never by time. Save the cafés, shops and corners you want, then see which ones are a short walk from wherever you are today.",
  robots: { index: false, follow: false },
  manifest: "/wander/manifest.webmanifest",
  appleWebApp: { capable: true, title: "Wanderboard", statusBarStyle: "default" },
  openGraph: { title: "Wanderboard", description: "Maximise wandering time. No itinerary.", type: "website" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f1e8" },
    { media: "(prefers-color-scheme: dark)", color: "#171412" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function WanderLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`wander ${display.variable} ${sans.variable} flex min-h-full flex-1 flex-col`}>
      {children}
    </div>
  );
}
