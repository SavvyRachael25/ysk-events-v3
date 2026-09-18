import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Ribbon from "@/components/Ribbon";
import Reveal from "@/components/Reveal";
import GalleryGrid from "@/components/GalleryGrid";
import { SQUASH_ART, SQUASH_ART_GALLERY } from "@/lib/squash-art";
import { SITE_URL } from "@/lib/constants";
import { breadcrumbJsonLd, jsonLdScriptProps } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Squash Art",
  description:
    "Original squash art by Sharif Khan, displayed and auctioned at every YSK Events tournament. Paint-covered squash balls and rackets on canvas, including 555, made with 555 balls for Jahangir Khan's win streak.",
  alternates: { canonical: "/squash-art" },
  openGraph: {
    title: "Squash Art · YSK Events",
    description: "Original squash art by Sharif Khan, displayed and auctioned at every YSK event.",
    url: "/squash-art",
    type: "website",
    images: [{ url: "/squash-art/555.jpg", width: 2000, height: 1333 }],
  },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: "Home", url: `${SITE_URL}/` },
  { name: "Squash Art", url: `${SITE_URL}/squash-art` },
]);

export default function SquashArtPage() {
  const a = SQUASH_ART;
  return (
    <>
      <script {...jsonLdScriptProps(breadcrumbs)} />
      <Navbar />
      <main id="main" className="flex-1 pt-16 md:pt-[76px]">
        <section className="px-6 pb-16 pt-16 md:px-12 md:pb-20 md:pt-24 lg:px-20" style={{ background: "var(--color-paper)" }}>
          <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-end gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="eyebrow">{a.eyebrow}</p>
              <h1 className="mt-5 max-w-[18ch] font-display text-ink" style={{ fontSize: "var(--text-step-4)" }}>
                {a.headline} <span className="text-gold">{a.headlineAccent}</span>
              </h1>
              <span aria-hidden="true" className="rule-tricolor mt-8 block w-20" />
              <p className="body-copy mt-8 max-w-[58ch]">{a.body}</p>
              <p className="mt-8 font-sans text-[13px] font-extrabold uppercase tracking-[0.14em] text-ink">
                {a.artist}
              </p>
              <a href={`mailto:${a.contact}`} className="mt-2 inline-block font-sans text-[15px] text-gold underline-offset-4 hover:underline">
                {a.contact}
              </a>
            </div>
            <Reveal className="lg:col-span-5">
              <figure>
                <div className="relative aspect-[3/2] overflow-hidden border-2 border-black">
                  <Image src={a.feature.image} alt={a.feature.alt} fill priority sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
                </div>
                <figcaption className="mt-4">
                  <p className="font-display text-ink" style={{ fontSize: "var(--text-step-2)" }}>{a.feature.title}</p>
                  <p className="body-copy mt-2 text-[15px]">{a.feature.caption}</p>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </section>

        <Ribbon />

        <section className="px-6 py-16 md:px-12 md:py-20 lg:px-20" style={{ background: "var(--color-paper-2)" }}>
          <div className="mx-auto max-w-[1280px]">
            <p className="eyebrow">On show</p>
            <h2 className="mt-4 font-display text-ink" style={{ fontSize: "var(--text-step-3)" }}>
              The 2024 World Tour Finals <span className="text-gold">exhibition.</span>
            </h2>
            <div className="mt-10">
              <GalleryGrid images={SQUASH_ART_GALLERY} />
            </div>
            <p className="mt-10 max-w-[70ch] font-sans text-[12px] leading-relaxed text-ink-faint">{a.credit}</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
