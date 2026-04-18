import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SignatureBall from "@/components/SignatureBall";

export const metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main
        id="main"
        className="relative flex min-h-[100svh] flex-1 items-center justify-center overflow-hidden px-6 md:px-12"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 50% at 50% 40%, hsl(262 52% 32% / 0.45) 0%, transparent 70%)",
          }}
        />
        <SignatureBall
          size={320}
          position="top-[10%] right-[-100px]"
          withRing={true}
        />

        <div className="relative z-10 mx-auto max-w-[640px] text-center">
          <div className="mb-6 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-mint/70" />
            <span className="eyebrow">Out of bounds</span>
            <span className="h-px w-10 bg-mint/70" />
          </div>
          <h1
            className="mb-4 font-display uppercase text-fg"
            style={{
              fontSize: "var(--text-step-5)",
              fontWeight: 700,
              lineHeight: 0.88,
              letterSpacing: "-0.005em",
            }}
          >
            That shot{" "}
            <span
              className="font-editorial italic text-mint"
              style={{ fontWeight: 500 }}
            >
              missed the tin.
            </span>
          </h1>
          <p className="mx-auto mb-10 max-w-[460px] text-fg/75 leading-relaxed">
            The page you&rsquo;re looking for isn&rsquo;t on the court.
            Let&rsquo;s get you back in the rally.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="/"
              className="group inline-flex items-center gap-2 rounded-md bg-mint px-8 py-4 font-sans text-xs font-bold uppercase tracking-[0.2em] text-mint-ink transition-all duration-base ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-glow-mint)]"
            >
              Back home
              <span
                aria-hidden="true"
                className="transition-transform duration-base ease-[var(--ease-spring)] group-hover:translate-x-1"
              >
                →
              </span>
            </a>
            <a
              href="/gallery"
              className="group inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-[0.2em] text-fg/70 transition-colors duration-base hover:text-mint"
            >
              Explore the gallery
              <span
                aria-hidden="true"
                className="transition-transform duration-base ease-[var(--ease-spring)] group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
