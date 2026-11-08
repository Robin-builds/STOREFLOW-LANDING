import { landing } from "@/content/landing";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";

/** Dolores actuales del cliente. El naranjo marca "alerta" solo en el ícono, nunca en texto. */
export function Problems() {
  const { problems } = landing;

  return (
    <Section titleId="problemas-title" title={problems.title} intro={problems.intro} tone="surface-alt">
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {problems.items.map((item) => (
          <li key={item.title} className="rounded-card border border-border bg-surface p-6 shadow-card">
            <span className="grid size-11 place-items-center rounded-xl bg-warning/10 text-warning">
              <Icon name={item.icon} />
            </span>
            <h3 className="mt-4 text-lg font-semibold text-ink">{item.title}</h3>
            <p className="mt-2 text-muted">{item.description}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
