import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SquashBallCanvas from "@/components/SquashBallCanvas";
import { GALLERY } from "@/lib/gallery";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photos from YSK Events squash tournaments, youth clinics, and community events across the Pacific Northwest.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "Gallery · YSK Events",
    description:
      "Tournament action, junior training, and community clinics across the Pacific Northwest.",
    url: "/gallery",
    type: "website",
  },
};

const galleryJsonLd = {
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  name: "YSK Events Photo Gallery",
  description:
    "Photos from YSK Events squash tournaments, youth clinics, and community events across the Pacific Northwest.",
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
        className="relative flex-1 overflow-hidden px-6 pt-32 pb-20 md:px-12 md:pt-40 lg:px-20"
      >
        {/* Ambient purple wash */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(
                ellipse 60% 50% at 80% 10%,
                hsl(262 52% 32% / 0.4) 0%,
                transparent 65%
              ),
              radial-gradient(
                ellipse 60% 70% at 5% 90%,
                hsl(292 70% 28% / 0.3) 0%,
                transparent 65%
              )
            `,
          }}
        />
        <SquashBallCanvas
          balls={[
            { size: 160, position: "top-[5%] right-[4%]",    animation: "animate-ball-2", speed: "pro", depth: "back" },
            { size: 100, position: "top-[35%] left-[6%]",    animation: "animate-ball-1", speed: "junior", depth: "mid", delay: "-3s" },
            { size: 120, position: "bottom-[10%] right-[12%]", animation: "animate-ball-3", speed: "progress", depth: "back", delay: "-5s" },
          ]}
        />

        <div className="relative z-10 mx-auto max-w-[1280px]">
          <header className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-mint/70" />
              <span className="eyebrow">Gallery</span>
            </div>
            <h1
              className="font-display uppercase text-fg"
              style={{
                fontSize: "var(--text-step-4)",
                fontWeight: 700,
                lineHeight: 0.9,
                letterSpacing: "-0.005em",
              }}
            >
              Scenes from{" "}
              <span
                className="font-editorial italic text-mint"
                style={{ fontWeight: 500 }}
              >
                the court.
              </span>
            </h1>
            <p className="mt-5 max-w-[640px] text-fg/75 leading-relaxed">
              Tournament days, junior clinics, and community moments captured
              across Pacific Northwest courts.
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
                  "group relative overflow-hidden rounded-lg border border-border bg-ink-3",
                  img.span === "wide" && "md:col-span-2",
                  img.span === "tall" && "md:row-span-2",
                )}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 1280px) 420px, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-slow ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                  priority={i < 4}
                />
                {/* Hover wash */}
                <figcaption
                  className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/85 via-ink/20 to-transparent p-5 opacity-0 transition-opacity duration-base ease-[var(--ease-out-expo)] group-hover:opacity-100"
                >
                  <span className="font-sans text-xs leading-snug text-fg/90">
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
