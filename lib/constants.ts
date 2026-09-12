/**
 * YSK Events — site-wide constants.
 * Change values here; components read from this file.
 */

// ——— Hero video loop window ———
// Source: YouTube "Meet PRO Club Squash Pro, Shabana"
export const HERO_VIDEO_ID = "ptSZft3sBqc";
export const HERO_START_TIME = 60; // seconds
export const HERO_END_TIME = 80;   // seconds

// ——— Organization ———
export const ORG_NAME = "YSK Events";
export const ORG_TAGLINE = "The Final Olympic Qualifier for Squash";

// One sentence, used verbatim in meta description, SportsEvent description, and on the page.
// Keeping them identical is what lets an answer engine trust the claim.
export const EVENT_DEFINITION =
  "The Final Olympic Qualifier for Squash is the last qualification event before squash makes its Olympic debut at the Los Angeles 2028 Games. It is held in Bellevue and Seattle, Washington, in June 2028, and presented by YSK Events, a 501(c)(3) nonprofit.";
export const ORG_FOUNDED = 2013;
export const ORG_STATUS = "501(c)(3) Nonprofit";

// ——— Contact ———
export const CONTACT_EMAIL = "hello@yskevents.com";

// ——— Site ———
export const SITE_URL = "https://www.yskevents.com";

// ——— Location (training facility, not mailing address) ———
// YSK programs train at PRO Club Bellevue under Azam Khan's direction.
export const VENUE = {
  name: "PRO Club Bellevue",
  streetAddress: "4455 148th Ave NE",
  addressLocality: "Bellevue",
  addressRegion: "WA",
  postalCode: "98007",
  addressCountry: "US",
  // Approximate coordinates for Pro Club Bellevue (Crossroads).
  latitude: 47.6363,
  longitude: -122.1438,
} as const;

// ——— Social ———
export const SOCIAL = {
  instagram: "https://www.instagram.com/yskevents",
  facebook: "https://www.facebook.com/yskevents",
  youtube: "https://www.youtube.com/@yskevents",
} as const;
