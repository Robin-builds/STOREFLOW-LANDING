# Contrato: contenido de la landing (`src/content/landing.ts`)

Interfaz entre el contenido (editable por el owner) y los componentes de sección. Cambiar texto o
URLs MUST requerir editar solo este archivo.

## Forma exportada (TypeScript)

```ts
export type IconName =
  | "warehouse" | "scan" | "history" | "alert" | "calendar"
  | "offline" | "users" | "monitor" | "shield" | "flag"
  | "store" | "tool" | "truck" | "notebook" | "check" | "trend-down";

export type Cta = { label: string; href: string };
export type Item = { icon: IconName; title: string; description: string };
export type Faq = { question: string; answer: string };
export type Testimonio = { quote: string; name: string; business: string };
export type Screenshot = { src: `/screens/${string}`; alt: string; width: number; height: number };

export const URLS: {
  site: string;
  googlePlay: string;
  whatsappNumber: string;
  whatsappContador: string;
  whatsappGeneral: string;
  privacyPolicy: string;
  chileapps: string;
};

export const landing: {
  meta: { title: string; description: string; ogImageAlt: string };
  nav: { wordmark: string; cta: Cta };
  hero: { eyebrow?: string; title: string; subtitle: string; primary: Cta; secondary: Cta; screenshot: Screenshot };
  credibility: { items: Item[] };                       // 3–4
  problems: { title: string; intro?: string; items: Item[] };   // 6
  benefits: { title: string; items: Item[] };           // 4–6
  howItWorks: { id: "como-funciona"; title: string; steps: Item[] }; // 3
  useCases: { title: string; items: Item[] };           // 4
  accountants: { title: string; body: string; reasons: string[]; cta: Cta };
  testimonials: { title: string; items: Testimonio[] }; // [] al entregar
  faq: { title: string; items: Faq[] };                 // ≥ 6
  finalCta: { title: string; subtitle: string; cta: Cta };
  footer: { brand: string; byline: string; contactLabel: string; privacyLabel: string };
};
```

### Campos agregados durante la implementación

- `a11y`: `{ newTab, step, home, skip }`, textos para lectores de pantalla (también son copy).
- `hero.note`, `hero.screenshotPending`, `finalCta.note`, `accountants.eyebrow`,
  `accountants.ctaNote`, `footer.tagline`, `credibility.title` (H2 oculto visualmente) e
  `intro` opcional en problemas, beneficios, cómo funciona y rubros.
- Componente base adicional `Wordmark` (navbar + footer).

## Garantías de los componentes

| Sección | Consume | Comportamiento |
|---------|---------|----------------|
| Navbar | `nav` | Sticky; wordmark + 1 botón primario; sin enlaces ni menú |
| Hero | `hero` | H1 único de la página; CTA primario + secundario; mockup con screenshot o placeholder |
| Credibility | `credibility` | Fila de 3–4 hechos con ícono |
| Problems | `problems` | Grilla de 6 tarjetas |
| Benefits | `benefits` | Grilla de 4–6 tarjetas |
| HowItWorks | `howItWorks` | `id="como-funciona"`; 3 pasos numerados |
| UseCases | `useCases` | 4 tarjetas por rubro |
| Accountants | `accountants` | Bloque destacado; CTA secundario a WhatsApp (`target="_blank"`, `rel="noopener"`) |
| Testimonials | `testimonials` | Devuelve `null` si `items.length === 0` |
| Faq | `faq` | `<details>/<summary>` nativos; teclado y foco visible |
| FinalCta | `finalCta` | CTA primario a Google Play |
| Footer | `footer`, `URLS` | Byline, contacto, privacidad, año de build |

Enlaces externos (Google Play, WhatsApp, chileapps, privacidad) abren en pestaña nueva con
`rel="noopener noreferrer"`.
