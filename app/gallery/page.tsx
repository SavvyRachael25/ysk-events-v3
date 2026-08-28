import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { GALLERY } from "@/lib/gallery";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photos from YSK Events squash championships, junior tournaments, and community events across the Pacific Northwest.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "Gallery · YSK Events",
    description:
      "Championship action, junior tournaments, and community moments across the Pacific Northwest.",
    url: "/gallery",
    type: "website",
  },
};

const galleryJsonLd = {
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  name: "YSK Events Photo Gallery",
  description:
    "Photos from YSK Events squash championships, junior tournaments, and community events across the Pacific Northwest.",
  url: "https://www.yskevents.com/gallery",
  image: GALLERY.map((img) => ({
    "@type": "ImageObject",
    url: `https://www.yskevents.com${img.src}`,
    description: img.alt,
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.yskevents.com/" },
    { "@type": "ListItem", position: 2, name: "Gallery", item: "https://www.yskevents.com/gallery" },
  ],
};

export default function GalleryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(galleryJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <Navbar />

      <main
        id="main"
        className="paper-grain relative flex-1 bg-paper px-6 pt-32 pb-20 md:px-12 md:pt-40 lg:px-20"
      >
        <div className="relative z-10 mx-auto max-w-[1280px]">
          <header className="mb-12">
            <p className="eyebrow">Gallery</p>
            <h1
              className="mt-5 font-display text-ink"
              style={{ fontSize: "var(--text-step-4)" }}
            >
              Scenes from <span className="text-gold">the court.</span>
            </h1>
            <span aria-hidden="true" className="rule-gold mt-7 block w-14" />
            <p className="body-copy mt-6 max-w-[640px]">
              Championship days, junior tournaments, and community moments
              captured across Pacific Northwest courts.
            </p>
          </header>

          {/* Bento grid */}
          <div
            className="grid gap-3 md:gap-4"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gridAutoRows: "220px",
              gridAutoFlow: "dense",
            }}
          >
            {GALLERY.map((img, i) => (
              <figure
                key={img.src}
                className={cn(
                  "group relative overflow-hidden rounded-lg border border-border bg-paper-3 shadow-[var(--shadow-paper)]",
                  img.span === "wide" && "md:col-span-2",
                  img.span === "tall" && "md:row-span-2",
                )}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 1280px) 420px, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                  priority={i < 4}
                />
                {/* Hover wash */}
                <figcaption className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/80 via-ink/15 to-transparent p-5 opacity-0 transition-opacity duration-300 ease-[var(--ease-out-expo)] group-hover:opacity-100">
                  <span className="font-sans text-xs leading-snug text-paper/95">
                    {img.alt}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
