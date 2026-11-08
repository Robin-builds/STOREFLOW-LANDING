import { landing } from "@/content/landing";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PhoneMockup } from "./PhoneMockup";

/**
 * Hero: el beneficio debe entenderse en 3 segundos. En 360px el H1, la bajada y el
 * CTA principal caben sin scroll (SC-001); el mockup queda debajo en móvil.
 */
export function Hero() {
  const { hero } = landing;

  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      {/* Fondo decorativo: halo azul suave + grilla tenue que evoca orden/inventario */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(60rem_40rem_at_75%_-10%,var(--color-primary-soft),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] opacity-40 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]"
      />

      <Container className="grid items-center gap-14 pt-10 pb-20 sm:pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:pt-24 lg:pb-28">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary-soft px-3 py-1 text-sm font-medium text-primary-hover">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-ok" />
            {hero.eyebrow}
          </p>

          <h1
            id="hero-title"
            className="mt-5 text-[2.25rem] leading-[1.08] font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl"
          >
            {hero.title}
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">{hero.subtitle}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href={hero.primary.href} size="lg">
              {hero.primary.label}
              <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                <path
                  fillRule="evenodd"
                  d="M3 10a.75.75 0 0 1 .75-.75h10.64l-3.97-3.97a.75.75 0 1 1 1.06-1.06l5.25 5.25a.75.75 0 0 1 0 1.06l-5.25 5.25a.75.75 0 1 1-1.06-1.06l3.97-3.97H3.75A.75.75 0 0 1 3 10Z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
            <Button href={hero.secondary.href} variant="secondary" size="lg">
              {hero.secondary.label}
            </Button>
          </div>

          <p className="mt-4 text-sm text-muted">{hero.note}</p>
        </div>

        <PhoneMockup screenshot={hero.screenshot} pendingLabel={hero.screenshotPending} />
      </Container>
    </section>
  );
}
