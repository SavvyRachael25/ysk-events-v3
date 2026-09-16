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
      <a href="/options" className="fixed bottom-4 left-4 z-[70] flex items-center gap-2 border-2 border-black bg-white px-3.5 py-2 font-sans text-[11px] font-extrabold uppercase tracking-[0.14em] text-black shadow-[0_12px_30px_-12px_rgb(0_0_0/0.5)] transition-transform hover:-translate-y-0.5">
        <span aria-hidden="true">←</span> Option {variant.slice(1)} · all three
      </a>
    </div>
  );
}
