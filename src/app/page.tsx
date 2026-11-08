import { landing } from "@/content/landing";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Credibility } from "@/components/sections/Credibility";
import { Problems } from "@/components/sections/Problems";
import { Benefits } from "@/components/sections/Benefits";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { UseCases } from "@/components/sections/UseCases";
import { Accountants } from "@/components/sections/Accountants";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";

/** Landing completa en el orden obligatorio de la spec (FR-004). Todo es Server Component. */
export default function Home() {
  return (
    <>
      {/* Enlace de salto: primer elemento enfocable, visible solo al recibir foco */}
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-button focus:bg-primary focus:px-4 focus:py-2 focus:text-on-primary"
      >
        {landing.a11y.skip}
      </a>
      <Navbar />
      <main id="contenido">
        <Hero />
        <Credibility />
        <Problems />
        <Benefits />
        <HowItWorks />
        <UseCases />
        <Accountants />
        <Testimonials />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
