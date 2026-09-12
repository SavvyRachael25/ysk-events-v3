import {
  CONTACT_EMAIL,
  ORG_FOUNDED,
  ORG_NAME,
  SITE_URL,
  SOCIAL,
  VENUE,
} from "./constants";

const ORG_ID = `${SITE_URL}/#organization`;
const VENUE_ID = `${SITE_URL}/#venue`;

const venueAddress = {
  "@type": "PostalAddress",
  streetAddress: VENUE.streetAddress,
  addressLocality: VENUE.addressLocality,
  addressRegion: VENUE.addressRegion,
  postalCode: VENUE.postalCode,
  addressCountry: VENUE.addressCountry,
};

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["NGO", "SportsOrganization"],
  "@id": ORG_ID,
  name: ORG_NAME,
  alternateName: "YSK",
  url: SITE_URL,
  logo: `${SITE_URL}/ysk-logo.png`,
  image: `${SITE_URL}/opengraph-image`,
  description:
    "501(c)(3) nonprofit and presenter of the Final Olympic Qualifier for Squash, June 2028, Bellevue and Seattle, Washington. Host of the 2015 Men's World Squash Championship, the first on U.S. soil, and the 2024 PSA World Tour Finals in Bellevue. Runs youth squash programs at PRO Club Bellevue.",
  foundingDate: String(ORG_FOUNDED),
  founder: {
    "@type": "Person",
    name: "Shabana Khan",
    jobTitle: "Founder & CEO",
  },
  nonprofitStatus: "https://schema.org/Nonprofit501c3",
  sport: "Squash",
  areaServed: [
    { "@type": "AdministrativeArea", name: "Pacific Northwest" },
    { "@type": "City", name: "Bellevue" },
    { "@type": "City", name: "Seattle" },
    { "@type": "State", name: "Washington" },
  ],
  address: venueAddress,
  location: { "@id": VENUE_ID },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "general inquiries",
      email: CONTACT_EMAIL,
      areaServed: "US",
      availableLanguage: ["English"],
    },
  ],
  sameAs: [SOCIAL.instagram, SOCIAL.facebook, SOCIAL.youtube],
};

export const venueJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Place", "SportsActivityLocation"],
  "@id": VENUE_ID,
  name: `${ORG_NAME} at ${VENUE.name}`,
  description:
    "Home base of YSK Events in Bellevue, Washington, and the training venue for its youth squash programs. The venue for the June 2028 Olympic qualifier will be announced separately.",
  url: SITE_URL,
  address: venueAddress,
  geo: {
    "@type": "GeoCoordinates",
    latitude: VENUE.latitude,
    longitude: VENUE.longitude,
  },
  containedInPlace: {
    "@type": "SportsActivityLocation",
    name: VENUE.name,
  },
};

export type BreadcrumbItem = { name: string; url: string };

export function breadcrumbJsonLd(items: readonly BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export type FaqEntry = { question: string; answer: string };

export function faqJsonLd(entries: readonly FaqEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map((qa) => ({
      "@type": "Question",
      name: qa.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: qa.answer,
      },
    })),
  };
}

export type ArticleMeta = {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  imageUrl: string;
};

export function articleJsonLd(meta: ArticleMeta) {
  const url = `${SITE_URL}/blog/${meta.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: meta.title,
    description: meta.description,
    image: meta.imageUrl,
    author: {
      "@type": "Organization",
      name: meta.author,
      url: SITE_URL,
    },
    publisher: {
      "@id": ORG_ID,
    },
    datePublished: meta.datePublished,
    dateModified: meta.dateModified ?? meta.datePublished,
    url,
    inLanguage: "en-US",
  };
}

/**
 * Inline a JSON-LD object into a <script type="application/ld+json"> tag.
 * Escapes `<` to keep the JSON valid inside HTML.
 */
export function jsonLdScriptProps(data: unknown) {
  return {
    type: "application/ld+json" as const,
    dangerouslySetInnerHTML: {
      __html: JSON.stringify(data).replace(/</g, "\\u003c"),
    },
  };
}
