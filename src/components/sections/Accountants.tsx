import { landing } from "@/content/landing";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";

/**
 * Bloque para contadores (canal secundario). El CTA es `secondary` a propósito:
 * debe verse subordinado al "Pruébala gratis" (Principio II).
 */
export function Accountants() {
  const { accountants } = landing;

  return (
    <section aria-labelledby="contadores-title" className="bg-surface py-section">
      <Container>
        <div className="grid gap-10 rounded-[2rem] border border-primary/15 bg-primary-soft p-6 sm:p-10 lg:grid-cols-2 lg:gap-16 lg:p-14">
          <div>
            <p className="text-sm font-semibold tracking-wide text-primary-hover uppercase">
              {accountants.eyebrow}
            </p>
            <h2 id="contadores-title" className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              {accountants.title}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">{accountants.body}</p>
          </div>

          <div className="flex flex-col justify-center">
            <ul className="space-y-4">
              {accountants.reasons.map((reason) => (
                <li key={reason} className="flex gap-3">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-ok text-white">
                    <Icon name="check" className="size-4" />
                  </span>
                  <span className="text-ink">{reason}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href={accountants.cta.href} variant="secondary" size="md">
                {accountants.cta.label}
              </Button>
              {/* ink/70 y no muted: muted sobre primary-soft queda bajo AA (≈4.4:1) */}
              <p className="text-sm text-ink/70">{accountants.ctaNote}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
