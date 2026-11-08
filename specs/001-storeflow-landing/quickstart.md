# Quickstart / Validación: Landing page de StoreFlow

## Requisitos

- Node 22+ y npm 11 (verificado: Node 22.19.0, npm 11.6.0).
- Chrome para Lighthouse y vista responsive.

## Levantar en local

```bash
npm install        # solo la primera vez
npm run dev        # http://localhost:3000
```

Para medir rendimiento real usar el build de producción:

```bash
npm run build && npm run start
```

## Escenarios de validación

| # | Escenario | Cómo | Resultado esperado |
|---|-----------|------|--------------------|
| V1 | Build limpio | `npm run build` | Sin errores ni warnings |
| V2 | Lint y tipos | `npm run lint` y `npx tsc --noEmit` | 0 problemas |
| V3 | Primera pantalla (SC-001) | DevTools → 360×740 | H1, subtítulo y "Pruébala gratis" visibles sin scroll |
| V4 | Sin scroll horizontal (SC-004) | DevTools a 360, 768 y 1440 px; en consola: `document.documentElement.scrollWidth > innerWidth` | `false` en los 3 anchos |
| V5 | CTA principal (SC-006) | Clic en los 3 "Pruébala gratis" | Todos abren `URLS.googlePlay` |
| V6 | CTA secundaria | Clic en "Ver cómo funciona" | Baja a `#como-funciona` |
| V7 | Contadores | Clic en "Soy contador" | Abre `wa.me/<número>?text=...` con el mensaje predefinido |
| V8 | FAQ con teclado (SC-007) | Tab hasta cada pregunta, Enter/Espacio | Abre/cierra; foco visible |
| V9 | Movimiento reducido | DevTools → Rendering → `prefers-reduced-motion: reduce` | Sin desplazamiento suave ni transiciones |
| V10 | Testimonios ocultos | `testimonials.items = []` | La sección no aparece |
| V11 | Placeholder de screenshot | Sin archivo en `public/screens/` | Marco con el nombre del archivo esperado |
| V12 | Lighthouse (SC-003) | DevTools → Lighthouse → Mobile, sobre `npm run start` | Perf ≥ 90, A11y ≥ 95, SEO ≥ 95 |
| V13 | Veracidad (SC-005) | Búsqueda abajo | Coincidencias solo en las FAQ honestas |

### V13: búsqueda de términos prohibidos

```bash
grep -inE "orden(es)? de compra|factur|boleta|\bDTE\b|\bSII\b|iphone|\biOS\b|whatsapp|excel|integraci|\\$ ?[0-9]|offline|\bsync|\bsaas\b|\bcloud\b|multi-tenant|revoluciona|siguiente nivel|soluci[oó]n integral|\bvos\b|\btenés\b|\bpodés\b|\bquerés\b" src/content/landing.ts
```

Resultado esperado: solo aparecen "iPhone" y "boletas/facturas" dentro de las respuestas FAQ que
dicen que hoy no está disponible, y "WhatsApp" solo en la URL/etiqueta de contacto de contadores
(es el canal de contacto, no una funcionalidad de alertas).

## Placeholders a reemplazar

Todos en `src/content/landing.ts` salvo los screenshots:

- `URLS.site`: dominio final (hoy, el provisorio de Vercel: https://storeflow-landing-eight.vercel.app).
- `URLS.googlePlay`: ficha de producción cuando salga de prueba cerrada.
- `URLS.whatsappNumber`: número real de contacto.
- `URLS.privacyPolicy`: URL real de la política de privacidad.
- `public/screens/inicio.png` (y los que declare `landing.ts`): capturas reales de la app.
- `src/app/favicon.ico`: el del scaffold es el de Next; reemplazar por el ícono de StoreFlow.
