import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BlogBlocks } from "@/components/blog/BlogBlocks";
import { BLOG_POSTS, getPostBySlug } from "@/lib/blog";
import { CONTACT_EMAIL, SITE_URL } from "@/lib/constants";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  jsonLdScriptProps,
} from "@/lib/seo";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const url = `/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified ?? post.datePublished,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

const categoryAccent: Record<string, string> = {
  "Youth Programs": "text-mint",
  "Olympic Pathway": "text-gold",
  "Brand Story": "text-coral",
};

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const url = `${SITE_URL}/blog/${post.slug}`;
  const imageUrl = `${url}/opengraph-image`;

  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", url: `${SITE_URL}/` },
    { name: "Blog", url: `${SITE_URL}/blog` },
    { name: post.title, url },
  ]);

  const article = articleJsonLd({
    title: post.title,
    description: post.description,
    slug: post.slug,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    author: post.author,
    imageUrl,
  });

  const faq = faqJsonLd(post.faq);

  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <script {...jsonLdScriptProps(breadcrumbs)} />
      <script {...jsonLdScriptProps(article)} />
      <script {...jsonLdScriptProps(faq)} />
      <Navbar />
      <main id="main" className="flex-1">
        <article className="relative overflow-hidden px-6 py-20 md:px-12 lg:px-20 lg:py-28">
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(
                  ellipse 60% 50% at 90% 0%,
                  hsl(262 52% 32% / 0.4) 0%,
                  transparent 65%
                ),
                radial-gradient(
                  ellipse 60% 60% at 0% 100%,
                  hsl(292 70% 28% / 0.3) 0%,
                  transparent 65%
                )
              `,
            }}
          />
          <div className="relative z-10 mx-auto max-w-[760px]">
            <nav
              aria-label="Breadcrumb"
              className="mb-10 flex flex-wrap items-center gap-2 font-sans text-[11px] uppercase tracking-[0.2em] text-fg-faint"
            >
              <Link href="/" className="hover:text-mint">
                Home
              </Link>
              <span aria-hidden="true">/</span>
              <Link href="/blog" className="hover:text-mint">
                Blog
              </Link>
              <span aria-hidden="true">/</span>
              <span className={categoryAccent[post.category] ?? "text-mint"}>
                {post.category}
              </span>
            </nav>

            <header className="mb-12">
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-8 bg-mint/70" />
                <span className="eyebrow">{post.heroEyebrow}</span>
              </div>
              <h1
                className="font-display uppercase text-fg"
                style={{
                  fontSize: "var(--text-step-4)",
                  fontWeight: 700,
                  lineHeight: 0.95,
                  letterSpacing: "-0.005em",
                }}
              >
                {post.title}
              </h1>
              <p
                className="mt-6 font-editorial italic text-fg/75 leading-relaxed"
                style={{ fontSize: "var(--text-step-1)" }}
              >
                {post.heroSubtitle}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 font-sans text-[11px] uppercase tracking-[0.2em] text-fg-faint">
                <span>By {post.author}</span>
                <span aria-hidden="true">·</span>
                <time dateTime={post.datePublished}>
                  {dateFormatter.format(new Date(post.datePublished))}
                </time>
                <span aria-hidden="true">·</span>
                <span>{post.readingMinutes} min read</span>
              </div>
            </header>

            <BlogBlocks blocks={post.body} />

            {post.faq.length > 0 && (
              <section className="mt-16 border-t border-border pt-12">
                <div className="mb-8 flex items-center gap-3">
                  <span className="h-px w-8 bg-mint/70" />
                  <span className="eyebrow">Frequently asked</span>
                </div>
                <h2
                  className="mb-8 font-display uppercase text-fg"
                  style={{
                    fontSize: "var(--text-step-3)",
                    fontWeight: 700,
                    lineHeight: 1,
                    letterSpacing: "-0.005em",
                  }}
                >
                  Common questions
                </h2>
                <ul className="space-y-5">
                  {post.faq.map((qa) => (
                    <li
                      key={qa.question}
                      className="rounded-lg border border-border bg-fg/[0.04] p-6"
                    >
                      <h3
                        className="mb-2 font-display uppercase text-fg"
                        style={{
                          fontSize: "1.05rem",
                          fontWeight: 700,
                          letterSpacing: "0.01em",
                          lineHeight: 1.2,
                        }}
                      >
                        {qa.question}
                      </h3>
                      <p
                        className="text-fg/80 leading-relaxed"
                        style={{ fontSize: "1rem" }}
                      >
                        {qa.answer}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section className="mt-16 border-t border-border pt-12">
              <div
                className="glass rounded-lg p-7 md:p-8"
                style={{ borderTop: "2px solid hsl(var(--color-mint))" }}
              >
                <p className="eyebrow mb-4 !text-mint">Get involved</p>
                <p
                  className="mb-6 font-editorial italic text-fg/85 leading-relaxed"
                  style={{ fontSize: "var(--text-step-1)" }}
                >
                  Whether you&rsquo;re a parent, sponsor, or just curious about
                  the road to LA28 — we want to hear from you.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href={`mailto:${CONTACT_EMAIL}?subject=I%20read%20your%20blog%20—%20want%20to%20connect`}
                    className="group inline-flex items-center gap-2 rounded-md bg-mint px-7 py-3.5 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-mint-ink transition-all duration-base ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-glow-mint)]"
                  >
                    Email YSK Events
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-base ease-[var(--ease-spring)] group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </a>
                  <Link
                    href="/#programs"
                    className="group inline-flex items-center gap-2 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-fg/80 transition-colors duration-base hover:text-mint"
                  >
                    Explore programs
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-base ease-[var(--ease-spring)] group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </section>

            {related.length > 0 && (
              <section className="mt-16 border-t border-border pt-12">
                <div className="mb-8 flex items-center gap-3">
                  <span className="h-px w-8 bg-mint/70" />
                  <span className="eyebrow">More from the blog</span>
                </div>
                <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {related.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/blog/${p.slug}`}
                        className="group flex h-full flex-col rounded-lg border border-border bg-fg/[0.04] p-6 transition-all duration-base ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:border-mint/40 hover:bg-fg/[0.08]"
                      >
                        <span
                          className={`eyebrow mb-3 ${
                            categoryAccent[p.category] ?? "text-mint"
                          }`}
                        >
                          {p.category}
                        </span>
                        <h3
                          className="mb-2 font-display uppercase text-fg transition-colors duration-base group-hover:text-mint"
                          style={{
                            fontSize: "1.15rem",
                            fontWeight: 700,
                            lineHeight: 1.1,
                            letterSpacing: "0.005em",
                          }}
                        >
                          {p.title}
                        </h3>
                        <p className="text-[13.5px] leading-relaxed text-fg/65">
                          {p.excerpt}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
