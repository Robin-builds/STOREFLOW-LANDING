import { URLS, landing } from "@/content/landing";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

// Año calculado al construir la página (es estática). Fuera del render para mantener
// el componente puro; se actualiza en cada deploy.
const BUILD_YEAR = new Date().getFullYear();

// muted-2: el footer usa el fondo más profundo (bg-bottom) y text-3 no alcanza AA ahí en claro
const linkClass = "rounded-sm text-muted-2 transition-colors hover:text-fg";

export function Footer() {
  const { footer, a11y } = landing;

  // Enlaces externos del pie; todos salen de URLS (Principio II)
  const links = [
    { label: footer.loginLabel, href: URLS.webAppLogin },
    { label: footer.contactLabel, href: URLS.whatsappGeneral },
    { label: footer.privacyLabel, href: URLS.privacyPolicy },
  ];

  return (
    <footer className="bg-deep">
      <Container className="flex flex-col gap-8 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Logo size="footer" />
          <p className="mt-3 max-w-xs text-sm text-muted-2">{footer.tagline}</p>
        </div>

        <div className="flex flex-col gap-6 sm:items-end">
          <nav aria-label={footer.navLabel}>
            <ul className="flex flex-col gap-3 text-sm sm:items-end">
              {links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    {link.label}
                    <span className="sr-only"> {a11y.newTab}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Selector de tema: en móvil es el único acceso (el header lo oculta bajo 640px) */}
          <div className="flex items-center gap-3 text-sm text-muted-2">
            <span aria-hidden="true">{footer.themeLabel}</span>
            <ThemeToggle />
          </div>
        </div>
      </Container>

      <div className="border-t border-line">
        <Container className="flex flex-col gap-2 py-6 text-sm text-muted-2 sm:flex-row sm:justify-between">
          <a href={URLS.chileapps} target="_blank" rel="noopener noreferrer" className={linkClass}>
            {footer.byline}
            <span className="sr-only"> {a11y.newTab}</span>
          </a>
          <p>© {BUILD_YEAR}</p>
        </Container>
      </div>
    </footer>
  );
}
