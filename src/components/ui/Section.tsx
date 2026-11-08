import { Container } from "./Container";

type SectionProps = {
  /** id del H2; también sirve para aria-labelledby */
  titleId: string;
  title: string;
  intro?: string;
  /** Ancla de navegación (ej. "como-funciona") */
  id?: string;
  tone?: "surface" | "surface-alt";
  children: React.ReactNode;
};

/**
 * Bloque de sección estándar: padding vertical del token --spacing-section,
 * fondo alterno y encabezado H2 + bajada. La región queda nombrada por su H2
 * para lectores de pantalla.
 */
export function Section({ titleId, title, intro, id, tone = "surface", children }: SectionProps) {
  const bg = tone === "surface-alt" ? "bg-surface-alt" : "bg-surface";

  return (
    // scroll-mt compensa la barra sticky al llegar por ancla
    <section id={id} aria-labelledby={titleId} className={`${bg} scroll-mt-16 py-section`}>
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 id={titleId} className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {title}
          </h2>
          {intro && <p className="mt-4 text-lg text-muted">{intro}</p>}
        </div>
        <div className="mt-12 sm:mt-16">{children}</div>
      </Container>
    </section>
  );
}
