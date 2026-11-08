import { URLS, landing } from "@/content/landing";
import { Container } from "@/components/ui/Container";
import { Wordmark } from "@/components/ui/Wordmark";

// Año calculado al construir la página (es estática). Se evalúa fuera del render para
// mantener el componente puro; se actualiza en cada deploy.
const BUILD_YEAR = new Date().getFullYear();

const linkClass = "rounded-sm text-muted transition-colors hover:text-ink";

export function Footer() {
  const { footer, a11y } = landing;

  // Enlaces externos del pie; todos salen de URLS (Principio II)
  const links = [
    { label: footer.contactLabel, href: URLS.whatsappGeneral },
    { label: footer.privacyLabel, href: URLS.privacyPolicy },
  ];

  return (
    <footer className="border-t border-border bg-surface-alt">
      <Container className="flex flex-col gap-8 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Wordmark text={footer.brand} />
          <p className="mt-3 max-w-xs text-sm text-muted">{footer.tagline}</p>
        </div>

        <nav aria-label={footer.brand}>
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
      </Container>

      <div className="border-t border-border">
        <Container className="flex flex-col gap-2 py-6 text-sm text-muted sm:flex-row sm:justify-between">
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
