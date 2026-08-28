import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const SITE_URL = "https://www.yskevents.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "YSK Events — The Road to LA Goes Through Washington | Olympic Squash Qualification",
    template: "%s · YSK Events",
  },
  description:
    "The final Olympic qualification event for squash. In June 2028, the world's top players come to Bellevue–Seattle, Washington for one last chance to earn their place at the Los Angeles Olympic Games. Presented by YSK Events, a 501(c)(3) nonprofit.",
  keywords: [
    "Olympic squash",
    "LA28 squash",
    "squash Olympic qualification",
    "Bellevue squash event",
    "Seattle squash",
    "YSK Events",
    "Road to LA",
  ],
  authors: [{ name: "YSK Events" }],
  creator: "YSK Events",
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "YSK Events",
    title: "The Road to LA Goes Through Washington",
    description:
      "The final Olympic qualification event for squash. Bellevue–Seattle, Washington. June 2028.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Road to LA Goes Through Washington",
    description:
      "The final Olympic qualification event for squash. Bellevue–Seattle, Washington. June 2028.",
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
      className={`${playfair.variable} ${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
