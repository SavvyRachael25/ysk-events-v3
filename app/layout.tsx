import type { Metadata } from "next";
import { Antonio, Fraunces, Sora } from "next/font/google";
import "./globals.css";

const antonio = Antonio({
  variable: "--font-unbounded",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["italic", "normal"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const SITE_URL = "https://www.yskevents.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "YSK Events — Pacific Northwest Youth Squash Nonprofit | LA28 Olympic Pathway",
    template: "%s · YSK Events",
  },
  description:
    "YSK Events is a 501(c)(3) nonprofit building futures through squash. Youth development programs, community clinics, competitive training, and LA2028 Olympic pathway in the Pacific Northwest.",
  keywords: [
    "youth squash",
    "Pacific Northwest squash",
    "LA28 Olympic squash",
    "youth development nonprofit",
    "junior squash training",
    "Seattle squash",
  ],
  authors: [{ name: "YSK Events" }],
  creator: "YSK Events",
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "YSK Events",
    title: "YSK Events — Raising Champions On & Off the Court",
    description:
      "501(c)(3) nonprofit building futures through squash in the Pacific Northwest. LA28 Olympic pathway.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "YSK Events — Raising Champions On & Off the Court",
    description:
      "501(c)(3) nonprofit building futures through squash. LA28 Olympic pathway.",
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
      className={`${antonio.variable} ${fraunces.variable} ${sora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-fg">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
