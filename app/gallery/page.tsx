import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GalleryGrid from "@/components/GalleryGrid";
import { GALLERY } from "@/lib/gallery";
import { SITE_URL } from "@/lib/constants";
import { breadcrumbJsonLd, jsonLdScriptProps } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photos from YSK Events squash championships and community events in the Pacific Northwest.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "Gallery · YSK Events",
    description:
      "Photos from YSK Events squash championships and community events in the Pacific Northwest.",
    url: "/gallery",
    type: "website",
  },
};

const galleryJsonLd = {
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  name: "YSK Events Photo Gallery",
  description:
    "Photos from YSK Events squash championships and community events in the Pacific Northwest.",
  url: `${SITE_URL}/gallery`,
  image: GALLERY.map((img) => ({
    "@type": "ImageObject",
    url: `${SITE_URL}${img.src}`,
  })),
};

const breadcrumbs = breadcrumbJsonLd([
  { name: "Home", url: `${SITE_URL}/` },
  { name: "Gallery", url: `${SITE_URL}/gallery` },
]);

export default function GalleryPage() {
  return (
    <>
      <script {...jsonLdScriptProps(galleryJsonLd)} />
      <script {...jsonLdScriptProps(breadcrumbs)} />

      <Navbar />

      <main
        id="main"
        className="paper-grain relative flex-1 bg-paper px-6 pt-32 pb-24 md:px-12 md:pt-40 lg:px-20"
      >
        <div className="relative z-10 mx-auto max-w-[1280px]">
          <header className="mb-14">
            <div className="flex items-center gap-4">
              <span className="section-no">Archive</span>
              <span aria-hidden="true" className="rule-gold h-px w-8" />
              <p className="eyebrow">Gallery</p>
            </div>
            <h1
              className="mt-5 font-display text-ink"
              style={{ fontSize: "var(--text-step-4)" }}
            >
              Scenes from <span className="text-gold">the court.</span>
            </h1>
            <span aria-hidden="true" className="rule-gold mt-7 block w-14" />
          </header>

          <GalleryGrid images={GALLERY} />
        </div>
      </main>

      <Footer />
    </>
  );
}
