import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
 * The two directions not chosen on 2026-09-16, kept for comparison.
 * v1: the Olympic version with Pacific surfaces. v2: Evergreen Olympic.
 * The chosen direction (Pacific Motion) is the site itself. Not indexed.
 */

export const metadata: Metadata = {
  title: "Design options",
  robots: { index: false, follow: false },
};

const VARIANTS = {
  v1: { label: "1 · Olympic, Pacific surfaces", ribbon: undefined },
  v2: { label: "2 · Evergreen Olympic", ribbon: ["#1b5b70", "#d8ee63", "#e87953", "#ff018f"] },
} as const;

export function generateStaticParams() {
  return Object.keys(VARIANTS).map((variant) => ({ variant }));
}

export default async function MockPage({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const v = VARIANTS[variant as keyof typeof VARIANTS];
  if (!v) notFound();
  const colors = v.ribbon ? [...v.ribbon] : undefined;

  return (
    <div data-variant={variant} className="flex min-h-full flex-1 flex-col">
      <Navbar />
      <main id="main" className="flex-1">
        <Hero mode="diptych" />
        <Ribbon colors={colors} />
        <OlympicBand />
        <Marquee />
        <RoadToLA />
        <Cities />
        <History />
        <Faq />
        <Partner />
        <Ribbon colors={colors} />
      </main>
      <Footer />
      <div className="fixed bottom-3 left-3 z-[60] border border-black bg-white px-3 py-1.5 font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-black">
        {v.label}
      </div>
    </div>
  );
}
