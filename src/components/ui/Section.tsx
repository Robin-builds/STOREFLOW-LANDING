import { Container } from "./Container";

type SectionProps = {
  /** id del H2; también sirve para aria-labelledby */
  titleId: string;
  title: string;
  intro?: string;
  /** Ancla de navegación (ej. "como-funciona") */
  id?: string;
  /** Fondo de la sección; las consecutivas alternan canvas/surface para marcar ritmo (FR-013) */
  tone?: "canvas" | "surface" | "surface-2";
  children: React.ReactNode;
};

const tones = {
  canvas: "bg-canvas",
  surface: "bg-surface",
  "surface-2": "bg-surface-2",
} as const;

/**
 * Bloque de sección estándar: padding vertical del token --spacing-section y encabezado
 * H2 + bajada. Sin bordes: el cambio de fondo separa las secciones.
 */
export function Section({ titleId, title, intro, id, tone = "canvas", children }: SectionProps) {
  return (
    // scroll-mt compensa la barra sticky al llegar por ancla
    <section id={id} aria-labelledby={titleId} className={`${tones[tone]} scroll-mt-16 py-section`}>
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 id={titleId} className="text-3xl font-bold tracking-tight text-fg sm:text-4xl">
            {title}
          </h2>
          {intro && <p className="mt-4 text-lg text-fg-2">{intro}</p>}
        </div>
        <div className="mt-12 sm:mt-16">{children}</div>
      </Container>
    </section>
  );
}
