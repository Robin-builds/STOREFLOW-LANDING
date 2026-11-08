---

description: "Task list for StoreFlow landing page"
---

# Tasks: Landing page de StoreFlow

**Input**: Design documents from `/specs/001-storeflow-landing/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/landing-content.md, quickstart.md

**Tests**: no se piden tests automatizados (Principio IV). La verificación usa los escenarios V1–V13 de
[quickstart.md](quickstart.md).

**Organization**: tareas agrupadas por historia de usuario. Todas las secciones son Server Components;
**ningún archivo lleva `"use client"`** (research R6).

## Format: `[ID] [P?] [Story] Description`

- **[P]**: puede correr en paralelo (archivos distintos, sin dependencias pendientes)
- **[Story]**: US1, US2, US3 según spec.md

## Reglas transversales (aplican a TODAS las tareas)

- Copy y URLs SOLO desde `src/content/landing.ts`; ningún string visible ni URL literal en componentes.
- Colores, radios, sombras, fuente y espaciado SOLO vía tokens de `@theme` en `src/app/globals.css`.
- Naranjo/rojo/verde solo como acento no textual (research R4).
- Enlaces externos: `target="_blank"` + `rel="noopener noreferrer"`.
- Comentarios inline en bloques no obvios (qué hace y por qué).
- Antes de usar una API de Next 16 / Tailwind 4 no verificada en research.md, consultarla en Context7.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: crear el proyecto. **Requiere confirmación explícita del owner antes de T001 y T003.**

- [X] T001 Pedir confirmación al owner y ejecutar en la raíz: `npx create-next-app@16.4.5 _scaffold --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --no-react-compiler --no-cache-components --disable-git --no-agent-feedback --yes`
- [X] T002 Mover el contenido de `_scaffold/` a la raíz (`Get-ChildItem -Force _scaffold | Move-Item -Destination .`), borrar `_scaffold/` y verificar que `.specify/`, `.claude/` y `specs/` siguen intactos
- [X] T003 Pedir confirmación y ejecutar `git init -b main` y `git checkout -b 001-storeflow-landing`; agregar `.claude/settings.local.json` al `.gitignore` (aviso de seguridad de Spec Kit)
- [X] T004 Verificar en `package.json` versiones instaladas de `next`, `react`, `tailwindcss` y `eslint-config-next`; confirmar que `tsconfig.json` tiene `"strict": true`; si las versiones difieren de research R1, revisar sintaxis en Context7 antes de seguir
- [X] T005 Limpiar el demo del scaffold: borrar `public/next.svg`, `public/vercel.svg`, `public/file.svg`, `public/globe.svg`, `public/window.svg`; crear `public/screens/.gitkeep`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: tokens, layout, contenido y componentes base que usan todas las historias.

**⚠️ CRITICAL**: ninguna historia empieza antes de terminar esta fase.

- [X] T006 Reescribir `src/app/globals.css`: `@import "tailwindcss";` + bloque `@theme` con `--color-primary #2563EB`, `--color-primary-hover #1D4ED8`, `--color-warning #F97316`, `--color-danger #EF4444`, `--color-ok #16A34A`, `--color-ink #0F172A`, `--color-muted #64748B`, `--color-surface #FFFFFF`, `--color-surface-alt #F8FAFC`, `--color-border #E2E8F0`, `--font-sans: var(--font-work-sans), ui-sans-serif, system-ui, sans-serif`, radios (`--radius-card`, `--radius-button`), sombras (`--shadow-card`, `--shadow-phone`) y `--spacing-section`; estilos base: `body` con `bg-surface text-ink font-sans antialiased`, `:focus-visible` con anillo de 2px `--color-primary` y offset; `html { scroll-behavior: smooth }` SOLO dentro de `@media (prefers-reduced-motion: no-preference)`; dentro de `@media (prefers-reduced-motion: reduce)` anular transiciones y animaciones; SIN `overflow-x` oculto en `body` (los desbordes se corrigen en su origen para que V4 sea fiable)
- [X] T007 Crear `src/content/landing.ts` siguiendo EXACTAMENTE la forma de `contracts/landing-content.md`: tipos exportados, constante `URLS` (`site: "https://storeflow.vercel.app"`, `googlePlay: "https://play.google.com/apps/testing/cl.storeflow.app"`, `whatsappNumber: "56900000000"` marcador, `whatsappContador` derivada como `https://wa.me/${whatsappNumber}?text=` + `encodeURIComponent("Hola, soy contador y quiero saber más de StoreFlow")`, `whatsappGeneral` derivada igual con el mensaje "Hola, quiero saber más de StoreFlow", `privacyPolicy: "https://chileapps.cl/privacidad"` marcador, `chileapps: "https://chileapps.cl"`) y objeto `landing` con TODO el copy: meta; nav (CTA "Pruébala gratis"); hero (titular de beneficio corto, subtítulo con la propuesta de valor, CTA primario "Pruébala gratis" → `URLS.googlePlay`, secundario "Ver cómo funciona" → `#como-funciona`, screenshot `{ src: "/screens/inicio.png", width: 1080, height: 2400, alt }`); credibility 4 hechos ("Funciona sin internet", "Historial que no se puede editar", "Hecho en Chile", "Datos aislados por empresa"); problems 6 (FR-005); benefits 5 en lenguaje de resultado; howItWorks `id: "como-funciona"` con 3 pasos (crea tu bodega → carga productos escaneando → registra entradas y salidas); useCases 4 (minimarket, ferretería, distribuidora, bodega); accountants (título, cuerpo, 3–4 razones, CTA "Soy contador" → `URLS.whatsappContador`); testimonials `items: []`; faq 6 (FR-007; precio según FR-014 sin montos; datos según FR-015; iPhone y boletas/facturas: "hoy no está disponible"); finalCta; footer ("StoreFlow by chileapps.cl"). Copy en español de Chile con tuteo, sin jerga ni clichés, y SOLO con funcionalidades de FR-011
- [X] T008 Revisar el copy de `src/content/landing.ts` con la búsqueda V13 de quickstart.md y corregir cualquier coincidencia fuera de las FAQ honestas y del canal de contacto WhatsApp; verificar que ningún texto sugiera que la app envía avisos por WhatsApp
- [X] T009 Reescribir `src/app/layout.tsx`: Work Sans con `next/font/google` (`subsets: ["latin"]`, `display: "swap"`, `variable: "--font-work-sans"`); `<html lang="es-CL">` con la clase de variable; `export const metadata` con `metadataBase: new URL(URLS.site)`, `title`, `description`, `alternates.canonical: "/"`, `openGraph` (`locale: "es_CL"`, `type: "website"`, `siteName: "StoreFlow"`) leyendo `landing.meta`
- [X] T010 [P] Crear `src/components/ui/Container.tsx`: `max-w-6xl mx-auto px-4 sm:px-6 lg:px-8`, acepta `className` y `children`
- [X] T011 [P] Crear `src/components/ui/Section.tsx`: `<section>` con `id` opcional, fondo `surface` | `surface-alt`, padding vertical `--spacing-section`, `aria-labelledby` al H2 si recibe `title`, envuelve en `Container`
- [X] T012 [P] Crear `src/components/ui/Button.tsx`: renderiza `<a>`; props `href`, `variant: "primary" | "secondary"`, `size: "sm" | "md" | "lg"`, `external?: boolean` (agrega `target`/`rel`); primary = fondo `primary`, texto blanco, hover `primary-hover`, sombra; secondary = borde `border`, texto `ink`, fondo transparente; área táctil mínima 44px; transición de color solo con CSS
- [X] T013 [P] Crear `src/components/ui/Icon.tsx`: SVG inline con `stroke="currentColor"`, `aria-hidden="true"`, para los nombres de `IconName` del contrato (`warehouse`, `scan`, `history`, `alert`, `calendar`, `offline`, `users`, `monitor`, `shield`, `flag`, `store`, `tool`, `truck`, `notebook`, `check`, `trend-down`)
- [X] T014 Reescribir `src/app/page.tsx` como esqueleto que importa y compone las secciones en el orden de FR-004 (ir agregando cada import a medida que se crea cada sección)

**Checkpoint**: `npm run build` pasa con la página vacía y los tokens aplicados.

---

## Phase 3: User Story 1 - Dueño de pyme entiende el valor e instala la app (Priority: P1) 🎯 MVP

**Goal**: primera pantalla clara con CTA principal; todos los "Pruébala gratis" a Google Play; "Ver cómo funciona" baja a los 3 pasos. **Secciones pulidas** (prioridad del owner: hero, CTA, jerarquía).

**Independent Test**: escenarios V3, V5, V6, V9, V11 de quickstart.md en 360px.

- [X] T015 [P] [US1] Crear `src/components/sections/Navbar.tsx`: `<header>` `sticky top-0 z-50` con fondo blanco semitransparente + `backdrop-blur` y borde inferior; wordmark StoreFlow (texto, peso bold) + `Button` primary `size="sm"` externo a `URLS.googlePlay`; altura compacta en móvil (≈56px); SIN enlaces ni menú (clarificación Q4)
- [X] T016 [P] [US1] Crear `src/components/sections/PhoneMockup.tsx`: marco Android neutro solo con CSS (bordes redondeados grandes, bisel oscuro, perforación de cámara centrada, sombra `--shadow-phone`), proporción 9:20; verificar en build con `fs.existsSync(path.join(process.cwd(), "public", screenshot.src))`: si existe, `next/image` con `priority`, `sizes` adecuados y `alt`; si no, placeholder gris `surface-alt` con el texto del nombre del archivo esperado. Comentar por qué nunca se dibuja UI ficticia (Principio I)
- [X] T017 [US1] Crear `src/components/sections/Hero.tsx`: grilla 1 columna en móvil / 2 en `lg`; H1 único (≈`text-4xl` móvil → `text-6xl` desktop, `tracking-tight`, `text-balance`), subtítulo `text-muted` `text-lg`, CTA primario `size="lg"` + secundario a `#como-funciona`, en columna en móvil y fila en `sm`; `PhoneMockup` a la derecha (debajo en móvil) con fondo decorativo sutil (degradado radial con `primary` a baja opacidad); verificar que H1 + subtítulo + CTA primario caben en 360×740 sin scroll (SC-001)
- [X] T018 [P] [US1] Crear `src/components/sections/HowItWorks.tsx`: `Section` con `id="como-funciona"` y `scroll-margin-top` igual a la altura del navbar; 3 pasos numerados (círculo con número en `primary`), conectados visualmente en desktop; en lista ordenada `<ol>`
- [X] T019 [P] [US1] Crear `src/components/sections/FinalCta.tsx`: bloque de alto contraste (fondo `ink` o `primary`, texto blanco con contraste AA), título, subtítulo y `Button` primary `size="lg"` a `URLS.googlePlay` (en fondo `primary` usar variante invertida: fondo blanco, texto `primary`)
- [X] T020 [US1] Agregar Navbar, Hero, HowItWorks y FinalCta a `src/app/page.tsx` en sus posiciones de FR-004 y ejecutar V3, V5, V6, V9, V11

**Checkpoint**: MVP funcional: se entiende el producto y se puede instalar.

---

## Phase 4: User Story 2 - Dueño de pyme se convence leyendo el detalle (Priority: P2)

**Goal**: todas las secciones de contexto presentes, en orden, legibles y accesibles.

**Independent Test**: V4, V8, V10 de quickstart.md en 360/768/1440 px; orden de secciones según FR-004.

- [X] T021 [P] [US2] Crear `src/components/sections/Credibility.tsx`: franja bajo el hero con 4 hechos (ícono en `ok` o `primary` + texto), 2×2 en móvil, 4 en fila en `md`
- [X] T022 [P] [US2] Crear `src/components/sections/Problems.tsx`: `Section` fondo `surface-alt`, H2, grilla de 6 tarjetas (1 col móvil, 2 `sm`, 3 `lg`) con ícono acento `warning`/`danger` (solo ícono, nunca texto de ese color)
- [X] T023 [P] [US2] Crear `src/components/sections/Benefits.tsx`: H2 y grilla de 5 tarjetas con ícono `primary`/`ok`, título de resultado y descripción
- [X] T024 [P] [US2] Crear `src/components/sections/UseCases.tsx`: H2 y 4 tarjetas por rubro (minimarket, ferretería, distribuidora, bodega), 1 col móvil / 2 `sm` / 4 `lg`
- [X] T025 [P] [US2] Crear `src/components/sections/Testimonials.tsx`: devuelve `null` si `landing.testimonials.items.length === 0` (FR-008); si hay datos, `<figure>`/`<blockquote>`/`<figcaption>` por testimonio
- [X] T026 [P] [US2] Crear `src/components/sections/Faq.tsx`: H2 y una lista de `<details>`/`<summary>` nativos (sin JS); `summary` con `list-style: none`, ícono +/− que rota con CSS solo si no hay reduced-motion; foco visible; respuestas en `text-muted`
- [X] T027 [P] [US2] Crear `src/components/sections/Footer.tsx`: "StoreFlow by chileapps.cl" (enlace a `URLS.chileapps`), contacto (`URLS.whatsappGeneral`), enlace a `URLS.privacyPolicy` y `© {new Date().getFullYear()}` (año de build; comentar por qué funciona con `--no-cache-components`)
- [X] T028 [US2] Agregar Credibility, Problems, Benefits, UseCases, Testimonials, Faq y Footer a `src/app/page.tsx` en el orden de FR-004 y ejecutar V4, V8, V10

**Checkpoint**: página completa salvo el bloque de contadores.

---

## Phase 5: User Story 3 - Contador evalúa recomendar StoreFlow (Priority: P3)

**Goal**: bloque propio para contadores con CTA a WhatsApp, visualmente subordinado al CTA principal.

**Independent Test**: V7 de quickstart.md.

- [X] T029 [US3] Crear `src/components/sections/Accountants.tsx`: bloque destacado (tarjeta con borde `primary` suave o fondo `surface-alt`), título, cuerpo, lista de razones con check `ok`, y `Button` secondary externo a `URLS.whatsappContador`; insertarlo en `src/app/page.tsx` entre UseCases y Testimonials; ejecutar V7

**Checkpoint**: las 3 historias funcionan.

---

## Phase 6: Polish & Cross-Cutting Concerns

- [X] T030 [P] Crear `src/app/opengraph-image.tsx` con `ImageResponse` de `next/og`: 1200×630, fondo blanco, wordmark StoreFlow y titular del hero desde `landing.ts`; exportar `alt` (de `landing.meta.ogImageAlt`), `size` y `contentType = "image/png"`
- [X] T031 [P] Crear `src/app/robots.ts` (permitir todo, `sitemap: ${URLS.site}/sitemap.xml`) y `src/app/sitemap.ts` (una entrada `URLS.site`)
- [X] T032 Ejecutar V1 (`npm run build`) y V2 (`npm run lint`, `npx tsc --noEmit`); corregir hasta 0 errores y 0 warnings
- [X] T033 Ejecutar V4 en 360/768/1440 px y revisar jerarquía visual del hero y CTA; ajustar espaciados vía tokens en `src/app/globals.css`
- [X] T034 Ejecutar V12 (Lighthouse móvil sobre `npm run start`); corregir hasta Perf ≥ 90, A11y ≥ 95, SEO ≥ 95
- [X] T035 Ejecutar V13 final sobre `src/content/landing.ts` y revisar que ningún componente contenga strings de copy ni URLs (`grep -rn "http" src/components`)
- [X] T037 (Opcional, con confirmación del owner) Desplegar en Vercel y actualizar `URLS.site` en `src/content/landing.ts` con el dominio provisorio real asignado
- [X] T036 Informar al owner: cómo levantar en local y lista de placeholders (sección "Placeholders a reemplazar" de quickstart.md)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: sin dependencias; T001 y T003 esperan confirmación del owner.
- **Foundational (Phase 2)**: depende de Setup; bloquea todas las historias. T007 → T008; T009 depende de T006 y T007; T010–T013 en paralelo; T014 al final.
- **US1 (Phase 3)**: depende de Phase 2. T017 depende de T016. T020 cierra la fase.
- **US2 (Phase 4)**: depende de Phase 2; independiente de US1 (solo comparte `page.tsx`).
- **US3 (Phase 5)**: depende de Phase 2; independiente de US1/US2.
- **Polish (Phase 6)**: después de las historias.

### User Story Dependencies

- US1, US2 y US3 solo dependen de Foundational. Las tareas que tocan `src/app/page.tsx` (T020, T028, T029) son secuenciales entre sí.

### Parallel Opportunities

- Phase 2: T010, T011, T012, T013.
- US1: T015, T016, T018, T019 en paralelo; luego T017; luego T020.
- US2: T021–T027 en paralelo; luego T028.
- Polish: T030 y T031 en paralelo.

## Parallel Example: User Story 2

```text
T021 Credibility.tsx · T022 Problems.tsx · T023 Benefits.tsx · T024 UseCases.tsx
T025 Testimonials.tsx · T026 Faq.tsx · T027 Footer.tsx
→ luego T028 (page.tsx)
```

## Implementation Strategy

### MVP First (User Story 1)

1. Phase 1 (con confirmación) → Phase 2.
2. Phase 3 (US1) pulida → validar V3/V5/V6/V9/V11. **Parar y mostrar al owner.**

### Incremental Delivery

1. + US2 → validar V4/V8/V10.
2. + US3 → validar V7.
3. Polish → V1, V2, V12, V13 → merge a `main` cuando cumpla los criterios de aceptación de la constitución.

## Notes

- Un commit por fase con Conventional Commits (`feat:`, `style:`, `content:`, `docs:`), solo si el owner lo pide.
- Si el tiempo no alcanza: US1 pulida, resto funcional (pedido del owner).
