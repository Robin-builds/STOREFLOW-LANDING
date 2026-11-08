import { landing } from "@/content/landing";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";

/** Casos de uso por rubro: superficie neutra e íconos cian. */
export function UseCases() {
  const { useCases } = landing;

  return (
    <Section titleId="rubros-title" title={useCases.title} intro={useCases.intro} tone="surface">
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {useCases.items.map((item) => (
          <li key={item.title} className="flex flex-col rounded-card border border-line bg-surface-2 p-6">
            <span className="grid size-12 place-items-center rounded-2xl bg-primary/12 text-primary">
              <Icon name={item.icon} />
            </span>
            <h3 className="mt-5 text-xl font-semibold text-fg">{item.title}</h3>
            {/* Sobre surface-2: text-2 cumple AA en ambos temas */}
            <p className="mt-2 text-fg-2">{item.description}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
