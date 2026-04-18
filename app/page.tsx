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

const homeJsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: "YSK Events",
  alternateName: "YSK",
  url: "https://www.yskevents.com",
  description:
    "501(c)(3) nonprofit building futures through squash in the Pacific Northwest. Youth development, competitive training, and LA28 Olympic pathway.",
  foundingDate: "2013",
  nonprofitStatus: "501(c)(3)",
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Pacific Northwest",
  },
  sport: "Squash",
  sameAs: [
    "https://www.instagram.com/yskevents",
    "https://www.facebook.com/yskevents",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homeJsonLd).replace(/</g, "\\u003c"),
        }}
      />
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
