import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import OlympicBand from "@/components/OlympicBand";
import RoadToLA from "@/components/RoadToLA";
import Cities from "@/components/Cities";
import History from "@/components/History";
import Faq from "@/components/Faq";
import Partner from "@/components/Partner";
import Footer from "@/components/Footer";
import { SITE_URL } from "@/lib/constants";
import { HOMEPAGE_FAQ } from "@/lib/content";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  jsonLdScriptProps,
  organizationJsonLd,
  venueJsonLd,
} from "@/lib/seo";

const homeBreadcrumbs = breadcrumbJsonLd([
  { name: "Home", url: `${SITE_URL}/` },
]);

const homeFaq = faqJsonLd(HOMEPAGE_FAQ);

const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsEvent",
  name: "The Road to LA: Final Olympic Qualification Event for Squash",
  description:
    "The final Olympic qualification event for squash. The world's top players come to Bellevue and Seattle, Washington in June 2028 for one last chance to earn their place at the Los Angeles Olympic Games.",
  startDate: "2028-06",
  sport: "Squash",
  eventStatus: "https://schema.org/EventScheduled",
  location: {
    "@type": "Place",
    name: "Bellevue and Seattle, Washington",
    address: {
      "@type": "PostalAddress",
      addressRegion: "WA",
      addressCountry: "US",
    },
  },
  organizer: {
    "@type": "NGO",
    name: "YSK Events",
    url: SITE_URL,
    nonprofitStatus: "501(c)(3)",
    foundingDate: "2013",
  },
};

export default function Home() {
  return (
    <>
      <script {...jsonLdScriptProps(organizationJsonLd)} />
      <script {...jsonLdScriptProps(venueJsonLd)} />
      <script {...jsonLdScriptProps(homeBreadcrumbs)} />
      <script {...jsonLdScriptProps(homeFaq)} />
      <script {...jsonLdScriptProps(eventJsonLd)} />
      <Navbar />
      <main id="main" className="flex-1">
        <Hero />
        <Marquee />
        <OlympicBand />
        <RoadToLA />
        <Cities />
        <History />
        <Faq />
        <Partner />
      </main>
      <Footer />
    </>
  );
}
