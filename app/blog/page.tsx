import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BLOG_POSTS } from "@/lib/blog";
import { SITE_URL } from "@/lib/constants";
import { breadcrumbJsonLd, jsonLdScriptProps } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Blog — Youth Squash, the Khan Family, and the LA28 Pathway",
  description:
    "Long-form writing from YSK Events on Pacific Northwest youth squash, the LA28 Olympic pathway, and the Khan family legacy that built American squash from Bellevue.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "YSK Events Blog",
    description:
      "Long-form writing on Pacific Northwest youth squash, the LA28 Olympic pathway, and the Khan family legacy.",
    url: "/blog",
    type: "website",
  },
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

const breadcrumbs = breadcrumbJsonLd([
  { name: "Home", url: `${SITE_URL}/` },
  { name: "Blog", url: `${SITE_URL}/blog` },
]);

const blogJsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "YSK Events Blog",
  url: `${SITE_URL}/blog`,
  description:
    "Long-form writing on Pacific Northwest youth squash, the LA28 Olympic pathway, and the Khan family legacy that built American squash from Bellevue.",
  blogPost: BLOG_POSTS.map((post) => ({
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url: `${SITE_URL}/blog/${post.slug}`,
    datePublished: post.datePublished,
    author: { "@type": "Organization", name: post.author },
  })),
};

const categoryAccent: Record<string, string> = {
  "Youth Programs": "text-mint",
  "Olympic Pathway": "text-gold",
  "Brand Story": "text-coral",
};

export default function BlogIndex() {
  const posts = [...BLOG_POSTS].sort((a, b) =>
    a.datePublished < b.datePublished ? 1 : -1,
  );

  return (
    <>
      <script {...jsonLdScriptProps(breadcrumbs)} />
      <script {...jsonLdScriptProps(blogJsonLd)} />
      <Navbar />
      <main id="main" className="flex-1">
        <section className="relative overflow-hidden px-6 py-24 md:px-12 lg:px-20 lg:py-32">
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(
                  ellipse 60% 50% at 80% 0%,
                  hsl(262 52% 32% / 0.45) 0%,
                  transparent 65%
                ),
                radial-gradient(
                  ellipse 60% 60% at 0% 100%,
                  hsl(292 70% 28% / 0.35) 0%,
                  transparent 65%
                )
              `,
            }}
          />
          <div className="relative z-10 mx-auto max-w-[1180px]">
            <header className="mb-14 max-w-[760px]">
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-8 bg-mint/70" />
                <span className="eyebrow">Blog</span>
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
                Notes from{" "}
                <span
                  className="font-editorial italic text-mint"
                  style={{ fontWeight: 500 }}
                >
                  the court.
                </span>
              </h1>
              <p
                className="mt-6 font-editorial italic text-fg/75 leading-relaxed"
                style={{ fontSize: "var(--text-step-1)" }}
              >
                Long-form writing on youth squash, the road to LA28, and the
                family that built Pacific Northwest squash from Bellevue.
              </p>
            </header>

            <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex h-full flex-col rounded-lg border border-border bg-fg/[0.04] p-7 transition-all duration-base ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:border-mint/40 hover:bg-fg/[0.08]"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <span
                        className={`eyebrow ${categoryAccent[post.category] ?? "text-mint"}`}
                      >
                        {post.category}
                      </span>
                      <span className="font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-fg-faint">
                        {post.readingMinutes} min read
                      </span>
                    </div>
                    <h2
                      className="mb-3 font-display uppercase text-fg transition-colors duration-base group-hover:text-mint"
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: 700,
                        lineHeight: 1.05,
                        letterSpacing: "0.005em",
                      }}
                    >
                      {post.title}
                    </h2>
                    <p className="mb-6 flex-1 text-[14px] leading-relaxed text-fg/65">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between border-t border-border pt-4">
                      <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-fg-faint">
                        {dateFormatter.format(new Date(post.datePublished))}
                      </span>
                      <span className="inline-flex items-center gap-1.5 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-mint">
                        Read
                        <span
                          aria-hidden="true"
                          className="transition-transform duration-base ease-[var(--ease-spring)] group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </span>
                    </div>
                  </Link>
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
