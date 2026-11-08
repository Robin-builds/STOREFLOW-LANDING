import { landing } from "@/content/landing";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";

/**
 * Franja de credibilidad bajo el hero. Usa hechos verificables del producto,
 * nunca métricas de tracción ni logos de clientes (Principio I).
 */
export function Credibility() {
  const { credibility } = landing;

  return (
    <section aria-labelledby="credibilidad-title" className="border-y border-border bg-surface-alt">
      <Container className="py-10 sm:py-12">
        <h2 id="credibilidad-title" className="sr-only">
          {credibility.title}
        </h2>
        <ul className="grid grid-cols-1 gap-6 min-[420px]:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {credibility.items.map((item) => (
            <li key={item.title} className="flex items-start gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white text-primary shadow-card">
                <Icon name={item.icon} className="size-5" />
              </span>
              <div>
                <p className="font-semibold text-ink">{item.title}</p>
                <p className="mt-0.5 text-sm text-muted">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
