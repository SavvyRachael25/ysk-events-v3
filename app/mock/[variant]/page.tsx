import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Fraunces } from "next/font/google";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import OlympicBand from "@/components/OlympicBand";
import Ribbon from "@/components/Ribbon";
import RoadToLA from "@/components/RoadToLA";
import Cities from "@/components/Cities";
import History from "@/components/History";
import Faq from "@/components/Faq";
import Partner from "@/components/Partner";
import Footer from "@/components/Footer";

/**
 * Design mockups, 2026-09-16. Three points on the dial between the live
 * Olympic version and Brandon Palma's Pacific Motion build, with the LA28
 * pink as the action colour in all three. Not linked from the site, not
 * indexed. Remove this route once a direction is chosen.
 */

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Design options",
  robots: { index: false, follow: false },
};

const VARIANTS = {
  v1: {
    label: "1 · Olympic, Pacific surfaces",
    ribbon: undefined,
    pacificHero: false,
  },
  v2: {
    label: "2 · Evergreen Olympic",
    ribbon: ["#1b5b70", "#d8ee63", "#e87953", "#ff018f"],
    pacificHero: false,
  },
  v3: {
    label: "3 · Pacific Motion",
    ribbon: ["#1b5b70", "#d8ee63", "#e87953", "#ff018f"],
    pacificHero: true,
  },
} as const;

export function generateStaticParams() {
  return Object.keys(VARIANTS).map((variant) => ({ variant }));
}

export default async function MockPage({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const v = VARIANTS[variant as keyof typeof VARIANTS];
  if (!v) notFound();

  return (
    <div data-variant={variant} className={fraunces.variable}>
      <Navbar />
      <main id="main" className="flex-1">
        <Hero
          single={
            v.pacificHero
              ? {
                  src: "/pacific/seattle-court-real.jpg",
                  alt: "Seattle skyline with the Space Needle and Mount Rainier seen through the glass back wall of a squash court",
                  credit: "Skyline photo: Sajad Mohamad, CC BY-SA 4.0, court added",
                }
              : undefined
          }
        />
        <Ribbon colors={v.ribbon ? [...v.ribbon] : undefined} />
        <OlympicBand />
        <Marquee />
        <RoadToLA />
        <Cities />
        <History icons />
        <Faq />
        <Partner />
        <Ribbon colors={v.ribbon ? [...v.ribbon] : undefined} />
      </main>
      <Footer backdrop="/pacific/bellevue-dusk.jpg" />
      <div className="fixed bottom-3 left-3 z-[60] border border-black bg-white px-3 py-1.5 font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-black">
        {v.label}
      </div>
    </div>
  );
}
