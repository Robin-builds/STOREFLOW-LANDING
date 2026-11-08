import { landing } from "@/content/landing";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

/**
 * Cierre de conversión: panel azul con el CTA principal invertido (blanco sobre azul).
 * Todo el texto es blanco puro para mantener contraste AA sobre #2563EB (≈5.2:1).
 */
export function FinalCta() {
  const { finalCta } = landing;

  return (
    <section aria-labelledby="cta-final-title" className="bg-surface py-section">
      <Container>
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-primary px-6 py-14 text-center sm:px-12 sm:py-20">
          {/* Halos decorativos para dar profundidad sin imágenes */}
          <div
            aria-hidden="true"
            className="absolute -top-24 -right-24 -z-10 size-72 rounded-full bg-white/10 blur-2xl"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-32 -left-20 -z-10 size-80 rounded-full bg-ink/20 blur-3xl"
          />

          <h2
            id="cta-final-title"
            className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-5xl"
          >
            {finalCta.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white">{finalCta.subtitle}</p>
          <div className="mt-9 flex justify-center">
            <Button href={finalCta.cta.href} variant="inverse" size="lg">
              {finalCta.cta.label}
            </Button>
          </div>
          <p className="mt-5 text-sm font-medium text-white">{finalCta.note}</p>
        </div>
      </Container>
    </section>
  );
}
