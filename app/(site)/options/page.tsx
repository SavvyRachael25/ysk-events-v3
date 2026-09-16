import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/**
 * Design review hub, 2026-09-16. Lives on the mockups branch only. Shabana
 * and John click into each direction and come back here with the pill in
 * the corner of every page. Not indexed.
 */
export const metadata: Metadata = {
  title: "Three directions",
  robots: { index: false, follow: false },
};

const OPTIONS = [
  {
    n: "1",
    name: "Olympic, Pacific surfaces",
    href: "/mock/v1",
    image: "/options/option-1.jpg",
    what: "The site as approved on September 14, with Brandon's surfaces underneath it. Black stays black. Archivo stays. The ribbon stays. Added: his mist and sandstone section backgrounds, his wave patterns, his timeline icons, and a real Bellevue photo above the footer.",
    why: "The smallest step from what was approved. If \"an extension of la28.org\" matters above everything else, this is the safest reading of it.",
    short: "It does not say Pacific Northwest until you scroll.",
  },
  {
    n: "2",
    name: "Evergreen Olympic",
    href: "/mock/v2",
    image: "/options/option-2.jpg",
    what: "Same bones and type, but black becomes deep ink and evergreen. Nav and footer go evergreen. The second headline line goes citron, eyebrows go coral, the accent words in every headline go Pacific blue. The ribbon recolors to Brandon's palette plus our pink.",
    why: "It reads as both things at once: the Olympic structure is intact, and the color says where you are.",
    short: "It still leads with the court, so the region is a color rather than a place.",
  },
  {
    n: "3",
    name: "Pacific Motion",
    href: "/",
    image: "/options/option-3.jpg",
    recommended: true,
    what: "Closest to Brandon's build, rebuilt on our structure. Serif headlines. Evergreen nav. A real Seattle photograph in the hero (Space Needle, Mount Rainier, the trees) with a squash court floor in front of it. Hania El Hammamy and Ali Farag sit on that court as named cards. His icons run as a strip of milestones under the nav, 2014 to 2028. Sponsors, gallery, and blog carry the same look.",
    why: "The only one that answers both notes: John's \"extension of LA28\" (the mark, the countdown, the structure, the athletes) and Shabana's \"Pacific Northwest\" (the photo, the palette, the icons, the serif). It also looks like nothing else in squash.",
    short: "Brandon's original hero image was AI-generated, so it was replaced with a licensed photograph. The court floor in front of it is rendered, and the credit line says so.",
  },
];

const CHANGES = [
  "LA28 mark rebuilt from the official basic emblem with a solid A, at the top of the first screen, the way la28.org places it",
  "Both athletes on the first screen on phones, nothing covering either of them",
  "The stray figure behind Hania removed from the glass; every real face in the frame is the original photo",
  "Three review passes applied: headline measure, page rhythm, mobile length (phone home page 1,150px shorter), sticky sponsor inquiry on phones, faster load (the LA28 clip no longer downloads until you reach it)",
  "Real, licensed photography for Bellevue and Seattle in place of the placeholder city images",
  "Brandon's color system, patterns, and icons integrated where they earn a place",
  "Credits for The Savvy Digital Co. and 8th Day Create in the footer",
];

export default function OptionsPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="flex-1 pt-16 md:pt-[76px]">
        <section className="px-6 pb-12 pt-16 md:px-12 md:pt-20 lg:px-20">
          <div className="mx-auto max-w-[1280px]">
            <p className="eyebrow">Design review · September 16, 2026</p>
            <h1 className="mt-4 max-w-[16ch] font-display text-ink" style={{ fontSize: "var(--text-step-4)" }}>
              Three directions for <span className="text-gold">the site.</span>
            </h1>
            <p className="body-copy mt-6 max-w-[62ch]">
              All three are built on the version John approved on September 14. Same structure, same copy,
              same LA28 mark, same athletes. What changes is the skin. Our pink is the button color in all
              three, and every photo is one we hold the rights to. Open each one, and use the pill in the corner
              to come back here.
            </p>
          </div>
        </section>

        <section className="px-6 pb-20 md:px-12 lg:px-20">
          <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-8">
            {OPTIONS.map((o) => (
              <article key={o.n} className="flex flex-col border-2 border-black bg-white">
                <a href={o.href} className="group relative block aspect-[16/10] overflow-hidden border-b-2 border-black">
                  <Image src={o.image} alt="" fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover object-top transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]" />
                </a>
                <div className="flex flex-1 flex-col p-7">
                  <div className="flex items-baseline justify-between gap-4">
                    <h2 className="font-display text-ink" style={{ fontSize: "var(--text-step-2)" }}>
                      {o.n}. {o.name}
                    </h2>
                    {o.recommended && (
                      <span className="shrink-0 px-2.5 py-1 font-sans text-[10px] font-extrabold uppercase tracking-[0.16em]" style={{ background: "var(--color-cta)", color: "#fff" }}>
                        Recommended
                      </span>
                    )}
                  </div>
                  <p className="body-copy mt-4 text-[15px]">{o.what}</p>
                  <p className="mt-4 font-sans text-[11px] font-extrabold uppercase tracking-[0.14em]" style={{ color: "#e87953" }}>Why it is here</p>
                  <p className="body-copy mt-1 text-[15px]">{o.why}</p>
                  <p className="mt-4 font-sans text-[11px] font-extrabold uppercase tracking-[0.14em]" style={{ color: "#e87953" }}>Where it falls short</p>
                  <p className="body-copy mt-1 text-[15px]">{o.short}</p>
                  <a href={o.href} className="btn-gold mt-8 w-fit">Open option {o.n}</a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="px-6 pb-24 md:px-12 lg:px-20" style={{ background: "var(--color-paper-2)" }}>
          <div className="mx-auto max-w-[1280px] py-16">
            <p className="eyebrow">Since September 14</p>
            <h2 className="mt-4 font-display text-ink" style={{ fontSize: "var(--text-step-3)" }}>
              What changed under <span className="text-gold">all three.</span>
            </h2>
            <ul className="mt-8 grid max-w-[900px] grid-cols-1 gap-4">
              {CHANGES.map((c) => (
                <li key={c} className="flex gap-4 font-sans text-[15px] leading-relaxed text-ink-soft">
                  <span aria-hidden="true" className="mt-[11px] h-[3px] w-5 shrink-0" style={{ background: "#e87953" }} />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
