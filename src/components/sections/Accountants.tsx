import { landing } from "@/content/landing";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";

/**
 * Bloque para contadores (canal secundario): superficie elevada con borde/acento naranja.
 * El CTA es `secondary` a propósito: subordinado a "Pruébala gratis" (Principio II).
 */
export function Accountants() {
  const { accountants } = landing;

  return (
    <section aria-labelledby="contadores-title" className="bg-canvas py-section">
      <Container>
        <div className="grid gap-10 rounded-[2rem] border border-accent/40 bg-surface-2 p-6 sm:p-10 lg:grid-cols-2 lg:gap-16 lg:p-14">
          <div>
            {/* accent-text: naranja legible como texto (en claro es #B45309) */}
            <p className="text-sm font-bold tracking-wide text-accent-text uppercase">{accountants.eyebrow}</p>
            <h2 id="contadores-title" className="mt-3 text-3xl font-bold tracking-tight text-fg sm:text-4xl">
              {accountants.title}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-fg-2">{accountants.body}</p>
          </div>

          <div className="flex flex-col justify-center">
            <ul className="space-y-4">
              {accountants.reasons.map((reason) => (
                <li key={reason} className="flex gap-3">
                  {/* on-ok: contraste del check sobre el verde en cada tema */}
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-ok text-on-ok">
                    <Icon name="check" className="size-4" />
                  </span>
                  <span className="text-fg">{reason}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href={accountants.cta.href} variant="secondary" size="md">
                {accountants.cta.label}
              </Button>
              <p className="text-sm text-muted-2">{accountants.ctaNote}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
