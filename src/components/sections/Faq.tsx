import { landing } from "@/content/landing";
import { Section } from "@/components/ui/Section";

/**
 * Acordeón con <details>/<summary> nativos: se abre con Enter/Espacio, los lectores de
 * pantalla anuncian expandido/colapsado y funciona sin JavaScript.
 */
export function Faq() {
  const { faq } = landing;

  return (
    <Section titleId="faq-title" title={faq.title} tone="surface">
      <div className="mx-auto max-w-3xl divide-y divide-line rounded-card border border-line bg-surface-2 px-5 sm:px-8">
        {faq.items.map((item) => (
          <details key={item.question} className="group">
            {/* list-none + marcador webkit oculto: se reemplaza por el ícono +/- propio */}
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-lg font-semibold text-fg [&::-webkit-details-marker]:hidden">
              {item.question}
              <span
                aria-hidden="true"
                className="grid size-8 shrink-0 place-items-center rounded-full bg-surface text-primary transition-transform duration-200 group-open:rotate-45"
              >
                <svg viewBox="0 0 20 20" fill="currentColor" className="size-4">
                  <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                </svg>
              </span>
            </summary>
            {/* muted-2 y no text-3: sobre surface-2 en claro text-3 queda bajo AA */}
            <p className="pr-12 pb-6 leading-relaxed text-muted-2">{item.answer}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
