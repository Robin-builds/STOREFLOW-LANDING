import { landing } from "@/content/landing";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";

/** 3 pasos numerados. Es el destino del CTA secundario "Ver cómo funciona". */
export function HowItWorks() {
  const { howItWorks, a11y } = landing;

  return (
    <Section id={howItWorks.id} titleId="como-funciona-title" title={howItWorks.title} intro={howItWorks.intro}>
      <ol className="relative grid gap-10 md:grid-cols-3 md:gap-8">
        {/* Línea que une los pasos en escritorio; atraviesa el centro de los círculos */}
        <span
          aria-hidden="true"
          className="absolute top-6 right-[16.66%] left-[16.66%] hidden h-px bg-border md:block"
        />

        {howItWorks.steps.map((step, i) => (
          <li key={step.title} className="relative flex flex-col items-center text-center">
            <span className="relative grid size-12 place-items-center rounded-full bg-primary text-lg font-bold text-white shadow-button">
              <span className="sr-only">{a11y.step} </span>
              {i + 1}
            </span>
            <span className="mt-6 grid size-11 place-items-center rounded-xl bg-primary-soft text-primary">
              <Icon name={step.icon} />
            </span>
            <h3 className="mt-4 text-xl font-semibold text-ink">{step.title}</h3>
            <p className="mt-2 max-w-xs text-muted">{step.description}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
