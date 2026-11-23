import type { MetadataRoute } from "next";

const SITE = "https://www.yskevents.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/kit/", "/funding"],
    },
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
