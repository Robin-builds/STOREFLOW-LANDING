import { landing } from "@/content/landing";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";

/** Beneficios en lenguaje de resultado, con acento cian (marca/acción). */
export function Benefits() {
  const { benefits } = landing;

  return (
    <Section titleId="beneficios-title" title={benefits.title} intro={benefits.intro} tone="surface">
      <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.items.map((item) => (
          <li key={item.title} className="card-hover card-ghost flex gap-4 [--card-lit-bg:var(--surface-2)]">
            <span className="card-icon grid size-11 shrink-0 place-items-center rounded-xl bg-primary/12 text-primary">
              <Icon name={item.icon} />
            </span>
            <div>
              <h3 className="text-lg font-semibold text-fg">{item.title}</h3>
              <p className="mt-1.5 text-fg-2">{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
