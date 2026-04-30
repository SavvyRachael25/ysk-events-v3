import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Leadership from "@/components/Leadership";
import PartnersBar from "@/components/PartnersBar";
import Programs from "@/components/Programs";
import Donate from "@/components/Donate";
import Contact from "@/components/Contact";
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

export default function Home() {
  return (
    <>
      <script {...jsonLdScriptProps(organizationJsonLd)} />
      <script {...jsonLdScriptProps(venueJsonLd)} />
      <script {...jsonLdScriptProps(homeBreadcrumbs)} />
      <script {...jsonLdScriptProps(homeFaq)} />
      <Navbar />
      <main id="main" className="flex-1">
        <Hero />
        <Marquee />
        <About />
        <Leadership />
        <PartnersBar />
        <Programs />
        <Donate />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
