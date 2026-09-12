import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import { EVENT_DEFINITION } from "@/lib/constants";
import { jsonLdScriptProps, organizationJsonLd } from "@/lib/seo";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800", "900"],
  display: "swap",
});

const SITE_URL = "https://www.yskevents.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "The Final Olympic Qualifier for Squash | Bellevue and Seattle, June 2028 | YSK Events",
    template: "%s · YSK Events",
  },
  description: EVENT_DEFINITION,
  keywords: [
    "Olympic squash",
    "LA28 squash",
    "squash Olympic qualification",
    "Bellevue squash event",
    "Seattle squash",
    "YSK Events",
    "Olympic squash qualifier",
    "squash LA28 qualifier",
  ],
  authors: [{ name: "YSK Events" }],
  creator: "YSK Events",
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "YSK Events",
    title: "The Final Olympic Qualifier for Squash | Bellevue and Seattle, June 2028",
    description: EVENT_DEFINITION,
    images: ["/opengraph-image"],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Final Olympic Qualifier for Squash | Bellevue and Seattle, June 2028",
    description: EVENT_DEFINITION,
    images: ["/opengraph-image"],
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
      className={`${archivo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <script {...jsonLdScriptProps(organizationJsonLd)} />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
