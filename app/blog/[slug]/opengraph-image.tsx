import { ImageResponse } from "next/og";
import { BLOG_POSTS, getPostBySlug } from "@/lib/blog";

export const alt = "YSK Events blog post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

const categoryColor: Record<string, string> = {
  "Youth Programs": "#7befc4",
  "Olympic Pathway": "#f6c560",
  "Brand Story": "#ff8a73",
};

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  const title = post?.title ?? "YSK Events";
  const eyebrow = post?.heroEyebrow ?? "YSK Events";
  const accent = post ? (categoryColor[post.category] ?? "#7befc4") : "#7befc4";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "radial-gradient(ellipse 80% 60% at 80% 0%, #4a2570 0%, transparent 65%), radial-gradient(ellipse 70% 70% at 0% 100%, #6b2d8e 0%, transparent 65%), #1a0f2e",
          color: "#f5efe6",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
          <span
            style={{
              fontSize: 40,
              fontWeight: 800,
              letterSpacing: "0.04em",
              color: "#f5efe6",
            }}
          >
            YSK
          </span>
          <span
            style={{
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: accent,
            }}
          >
            Events · Blog
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: accent,
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.005em",
              color: "#f5efe6",
              maxWidth: 1040,
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 16,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(245, 239, 230, 0.65)",
            fontWeight: 700,
          }}
        >
          <span>Pacific Northwest · Youth Squash · LA28 Pathway</span>
          <span>yskevents.com/blog</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
