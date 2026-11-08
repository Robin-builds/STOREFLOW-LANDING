import { landing } from "@/content/landing";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

/**
 * Header fijo y translúcido (.header-glass en globals.css).
 * - Bajo 640px solo caben marca + "Pruébala gratis" (clarificación Q1): "Ingresar" está en el
 *   hero y en el footer, y el selector de tema en el footer.
 * - Desde 640px: marca · Ingresar (ghost, secundario) · selector · Pruébala gratis (primario).
 */
export function Navbar() {
  const { nav, a11y } = landing;

  return (
    <header className="header-glass sticky top-0 z-50 border-b border-line">
      <Container className="flex h-15 items-center justify-between gap-3 sm:h-16">
        <a href="#inicio" aria-label={a11y.home} className="rounded-md">
          <Logo size="header" />
        </a>
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Envoltorio para ocultar en móvil sin pelear con el display propio de cada botón */}
          <div className="hidden items-center gap-2 sm:flex">
            <Button href={nav.login.href} variant="ghost" size="sm">
              {nav.login.label}
            </Button>
            <ThemeToggle />
          </div>
          <Button href={nav.cta.href} size="sm">
            {nav.cta.label}
          </Button>
        </div>
      </Container>
    </header>
  );
}
