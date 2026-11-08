import { landing } from "@/content/landing";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";

/** Beneficios en lenguaje de resultado; el verde "ok" refuerza el cambio positivo. */
export function Benefits() {
  const { benefits } = landing;

  return (
    <Section titleId="beneficios-title" title={benefits.title} intro={benefits.intro}>
      <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.items.map((item) => (
          <li key={item.title} className="flex gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
              <Icon name={item.icon} />
            </span>
            <div>
              <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
              <p className="mt-1.5 text-muted">{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
