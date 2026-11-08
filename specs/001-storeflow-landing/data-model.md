# Data Model: Landing page de StoreFlow

No hay base de datos. El "modelo" es el contenido estático tipado en `src/content/landing.ts`,
única fuente de copy, listas y URLs (Principios II y III). El contrato exacto está en
[contracts/landing-content.md](contracts/landing-content.md).

## Entidades

### Urls (constante única)
| Campo | Descripción | Valor inicial |
|-------|-------------|---------------|
| `site` | Dominio público del sitio (metadataBase, OG, sitemap) | `https://storeflow.vercel.app` (provisorio) |
| `googlePlay` | Destino de todos los "Pruébala gratis" | `https://play.google.com/apps/testing/cl.storeflow.app` |
| `whatsappNumber` | Número en formato internacional sin `+` | `56900000000` (marcador) |
| `whatsappContador` | URL `wa.me` derivada con mensaje predefinido | derivada de `whatsappNumber` |
| `whatsappGeneral` | URL `wa.me` para contacto general (footer), mensaje sin "soy contador" | derivada de `whatsappNumber` |
| `privacyPolicy` | Política de privacidad | `https://chileapps.cl/privacidad` (marcador) |
| `chileapps` | Sitio de la empresa en el footer | `https://chileapps.cl` |

Regla: ningún componente contiene URLs literales; todas salen de aquí.

### Cta
`label` (texto), `href` (desde `Urls` o ancla `#como-funciona`), `variant` (`primary` | `secondary`).
Regla: solo una variante `primary` por bloque visual; "Ver cómo funciona" y "Soy contador" son
`secondary`.

### Item (hecho, problema, beneficio, paso, rubro)
`icon` (nombre del set de `Icon`), `title`, `description`.
Reglas: problemas = 6 (FR-005); beneficios = 4–6; pasos = 3 en orden fijo (FR-006); rubros = 4
(minimarket, ferretería, distribuidora, bodega); credibilidad = 3–4 hechos verificables.

### Faq
`question`, `answer`. Mínimo las 6 de FR-007. Respuestas de precio y datos según FR-014/FR-015;
iPhone y boletas/facturas responden honestamente "hoy no está disponible".

### Testimonio
`quote`, `name`, `business`. Lista **vacía** al entregar (FR-008). Si está vacía, la sección no se
renderiza.

### Screenshot
`src` (ruta bajo `/screens/`), `alt`, `width`, `height`. Si el archivo no existe en `public/`, se
muestra un placeholder con `src` como texto.

## Validaciones (en revisión, no en runtime)

- Ningún string contiene términos excluidos (Principio I) ni jerga (Principio VII); ver quickstart.
- Ningún número de tracción, porcentaje de ahorro ni monto en pesos.
