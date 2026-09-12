import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import OlympicBand from "@/components/OlympicBand";
import Ribbon from "@/components/Ribbon";
import RoadToLA from "@/components/RoadToLA";
import Cities from "@/components/Cities";
import History from "@/components/History";
import Faq from "@/components/Faq";
import Partner from "@/components/Partner";
import Footer from "@/components/Footer";
import { SITE_URL, EVENT_DEFINITION } from "@/lib/constants";
import { HOMEPAGE_FAQ } from "@/lib/content";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  jsonLdScriptProps,
  venueJsonLd,
} from "@/lib/seo";

const homeBreadcrumbs = breadcrumbJsonLd([
  { name: "Home", url: `${SITE_URL}/` },
]);

const homeFaq = faqJsonLd(HOMEPAGE_FAQ);

const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsEvent",
  "@id": `${SITE_URL}/#event`,
  name: "The Final Olympic Qualifier for Squash",
  alternateName: "Squash Olympic Final Qualification Event, Los Angeles 2028",
  description: EVENT_DEFINITION,
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image`,
  startDate: "2028-06",
  sport: "Squash",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  // Venue not yet announced: locate at city level, never invent a venue.
  location: [
    { "@type": "City", name: "Bellevue", address: { "@type": "PostalAddress", addressLocality: "Bellevue", addressRegion: "WA", addressCountry: "US" } },
    { "@type": "City", name: "Seattle", address: { "@type": "PostalAddress", addressLocality: "Seattle", addressRegion: "WA", addressCountry: "US" } },
  ],
  organizer: { "@id": `${SITE_URL}/#organization` },
};

export default function Home() {
  return (
    <>
      <script {...jsonLdScriptProps(venueJsonLd)} />
      <script {...jsonLdScriptProps(homeBreadcrumbs)} />
      <script {...jsonLdScriptProps(homeFaq)} />
      <script {...jsonLdScriptProps(eventJsonLd)} />
      <Navbar />
      <main id="main" className="flex-1">
        <Hero />
        <Ribbon />
        <OlympicBand />
        <Ribbon />
        <Marquee />
        <RoadToLA />
        <Cities />
        <History />
        <Faq />
        <Partner />
        <Ribbon />
      </main>
      <Footer />
    </>
  );
}
