import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main
        id="main"
        className="paper-grain relative flex min-h-[100svh] flex-1 items-center justify-center bg-paper px-6 md:px-12"
      >
        <div className="relative z-10 mx-auto max-w-[640px] text-center">
          <div className="mb-6 flex items-center justify-center gap-3">
            <span className="rule-gold h-px w-10" />
            <span className="eyebrow">Out of bounds</span>
            <span className="rule-gold h-px w-10" />
          </div>
          <h1
            className="mb-4 font-display text-ink"
            style={{ fontSize: "var(--text-step-4)" }}
          >
            That shot <span className="text-gold">missed the tin.</span>
          </h1>
          <p className="body-copy mx-auto mb-10 max-w-[460px]">
            The page you&rsquo;re looking for isn&rsquo;t on the court.
            Let&rsquo;s get you back in the rally.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="/" className="btn-gold">
              Back home
            </a>
            <a href="/gallery" className="btn-outline">
              Explore the gallery
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
