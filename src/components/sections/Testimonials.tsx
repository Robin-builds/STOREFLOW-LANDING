import { landing } from "@/content/landing";
import { Section } from "@/components/ui/Section";

/**
 * Testimonios condicionales (FR-008, Principio I): si no hay testimonios reales en
 * landing.ts, la sección no se renderiza ni deja espacio vacío.
 */
export function Testimonials() {
  const { testimonials } = landing;

  if (testimonials.items.length === 0) return null;

  return (
    <Section titleId="testimonios-title" title={testimonials.title}>
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.items.map((t) => (
          <li key={t.name}>
            <figure className="h-full rounded-card border border-border bg-surface p-6 shadow-card">
              <blockquote className="text-ink">“{t.quote}”</blockquote>
              <figcaption className="mt-4 text-sm">
                <span className="font-semibold text-ink">{t.name}</span>
                <span className="text-muted"> · {t.business}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  );
}
