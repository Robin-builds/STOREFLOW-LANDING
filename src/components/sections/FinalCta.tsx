import { landing } from "@/content/landing";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

/**
 * Cierre de conversión: bloque con la tinta de marca (#0D1519) en AMBOS temas.
 * data-theme="dark" en el bloque fuerza los tokens oscuros dentro de él (globals.css los
 * declara también sobre [data-theme="dark"]), así texto y botón primario mantienen el
 * contraste del tema oscuro aunque la página esté en claro.
 * La sección externa usa bg-canvas para alternar con el FAQ (surface), FR-013.
 */
export function FinalCta() {
  const { finalCta } = landing;

  return (
    <section aria-labelledby="cta-final-title" className="bg-canvas py-section">
      <Container>
        <div
          data-theme="dark"
          className="relative isolate overflow-hidden rounded-[2rem] bg-brand-ink px-6 py-14 text-center sm:px-12 sm:py-20"
        >
          {/* Brillos de marca decorativos: cian arriba, naranja abajo */}
          <div
            aria-hidden="true"
            className="absolute -top-28 -right-24 -z-10 size-80 rounded-full bg-brand-cyan/20 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-32 -left-24 -z-10 size-80 rounded-full bg-brand-orange/10 blur-3xl"
          />

          <h2
            id="cta-final-title"
            className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight text-fg sm:text-5xl"
          >
            {finalCta.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-fg-2">{finalCta.subtitle}</p>
          <div className="mt-9 flex justify-center">
            <Button href={finalCta.cta.href} size="lg">
              {finalCta.cta.label}
            </Button>
          </div>
          <p className="mt-5 text-sm text-fg-3">{finalCta.note}</p>
        </div>
      </Container>
    </section>
  );
}
