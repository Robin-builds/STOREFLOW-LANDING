import { landing } from "@/content/landing";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Wordmark } from "@/components/ui/Wordmark";

/**
 * Barra superior fija. Solo marca + CTA principal: sin enlaces ni menú para no
 * competir con la conversión (clarificación Q4). Fondo translúcido con blur para
 * que el contenido se intuya al hacer scroll sin perder legibilidad.
 */
export function Navbar() {
  const { nav, a11y } = landing;

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-white/90 backdrop-blur-md">
      <Container className="flex h-14 items-center justify-between gap-4 sm:h-16">
        <a href="#inicio" aria-label={a11y.home} className="rounded-md">
          <Wordmark text={nav.wordmark} />
        </a>
        <Button href={nav.cta.href} size="sm">
          {nav.cta.label}
        </Button>
      </Container>
    </header>
  );
}
