import { URLS, landing } from "@/content/landing";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PhoneMockup } from "./PhoneMockup";

/**
 * Hero: el beneficio debe entenderse en 3 segundos. En 360px el H1, la bajada y el
 * CTA principal caben sin scroll (SC-001 de la spec 001).
 * Fondo: gradiente de la app (bg-top → bg-mid → bg-bottom) con brillo cian tras el teléfono.
 */
export function Hero() {
  const { hero, a11y } = landing;

  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-[linear-gradient(180deg,var(--bg-top),var(--bg-mid)_60%,var(--bg-bottom))]"
    >
      <Container className="grid items-center gap-14 pt-10 pb-20 sm:pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:pt-24 lg:pb-28">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-sm font-medium text-fg-2">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-ok" />
            {hero.eyebrow}
          </p>

          <h1
            id="hero-title"
            className="mt-5 text-[2.25rem] leading-[1.08] font-extrabold tracking-tight text-fg sm:text-5xl lg:text-6xl"
          >
            {hero.title}
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-fg-2 sm:text-xl">{hero.subtitle}</p>

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

          <p className="mt-4 text-sm text-fg-3">{hero.note}</p>

          {/* Acceso para usuarios existentes: utilitario, bajo los CTA (FR-010) */}
          <p className="mt-2 text-sm text-fg-3">
            {hero.loginLine.text}{" "}
            <a
              href={URLS.webAppLogin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm font-semibold text-link underline underline-offset-4 hover:no-underline"
            >
              {hero.loginLine.link}
              <span className="sr-only"> {a11y.newTab}</span>
            </a>
          </p>
        </div>

        <div className="relative">
          {/* Brillo cian sutil detrás del teléfono (color de marca, decorativo) */}
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -z-10 size-[min(30rem,90vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-cyan/15 blur-3xl"
          />
          <PhoneMockup screenshot={hero.screenshot} pendingLabel={hero.screenshotPending} />
        </div>
      </Container>
    </section>
  );
}
