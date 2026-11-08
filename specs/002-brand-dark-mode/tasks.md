---

description: "Task list for brand identity, Ingresar access and dark mode"
---

# Tasks: Identidad de marca, acceso "Ingresar" y modo oscuro

**Input**: Design documents from `/specs/002-brand-dark-mode/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/theme-and-brand.md, quickstart.md

**Tests**: no se piden tests automatizados (Principio IV). Validación con escenarios W1–W19 de
[quickstart.md](quickstart.md).

**Organization**: por historia de usuario. Único `"use client"` permitido: `ThemeToggle` (research R6).

## Format: `[ID] [P?] [Story] Description`

- **[P]**: paralelizable (archivos distintos, sin dependencias pendientes)
- **[Story]**: US1 identidad · US2 Ingresar · US3 temas

## Reglas transversales

- Valores de color SOLO desde tokens de `src/app/globals.css` (tabla de data-model.md). Ningún hex
  en componentes, salvo `opengraph-image.tsx` (ImageResponse no lee CSS; comentar el origen).
- Copy y URLs SOLO desde `src/content/landing.ts`. Copy existente sin cambios.
- No usar la variante `dark:`: el tema cambia solo vía variables (research R2).
- Naranja = alerta o marca; nunca como texto en tema claro (usar `--accent-text`).
- Claro: `text-3` nunca sobre `surface-2`/`bg-bottom`; usar `text-muted-on-2`.
- Comentarios inline en bloques no obvios. Verificar en docs locales de Next 16 o Context7 cualquier API no cubierta en research.md.

---

## Phase 1: Setup

- [X] T001 Verificar rama `002-brand-dark-mode` y árbol limpio (`git status`)
- [X] T002 [P] Crear `public/brand/storeflow-icon.svg`: `viewBox="32 32 44 44"`, fondo transparente, los 4 `<path>` copiados literalmente de `StockFlowv00/app/src/main/res/drawable/ic_launcher_foreground.xml` (2 `fill="#2EC6DA"`, 2 `fill="#F0921E"`)
- [X] T003 [P] Copiar `C:\Users\Windows 11\AndroidStudioProjects\StockFlowv00\play-store\ic_launcher_512.png` a `src/app/icon.png` y eliminar `src/app/favicon.ico`

---

## Phase 2: Foundational (bloquea todas las historias)

- [X] T004 Reescribir tokens en `src/app/globals.css`: (a) marca `--brand-cyan #2EC6DA`, `--brand-orange #F0921E`, `--brand-ink #0D1519`; (b) tema oscuro en `:root, [data-theme=dark]` con TODOS los valores de la columna Oscuro de data-model.md (incluidos `--text-muted-on-2`, `--wordmark-store`) y `color-scheme: dark`; (c) `@theme inline` que mapee utilidades: `bg-base→--bg-top`, `bg-mid`, `bg-deep→--bg-bottom`, `bg-surface`, `bg-surface-2`, `border-line→--border`, `text-fg→--text-1`, `text-fg-2`, `text-fg-3`, `text-muted-2→--text-muted-on-2`, `bg-primary`/`text-primary`, `text-on-primary`, `text-link`, `accent`, `text-accent-text`, `danger`, `ok`, `brand-cyan`, `brand-orange`, `brand-ink`, `text-wordmark-store`, `--font-sans: var(--font-jakarta)`; (d) eliminar los tokens de la spec 001 (#2563EB, etc.); (e) foco `outline: 2px solid var(--primary)`; (f) sombras adaptadas a fondo oscuro; conservar `--spacing-section`, radios y reglas de reduced-motion
- [X] T005 Actualizar `src/app/layout.tsx`: `Plus_Jakarta_Sans` de `next/font/google` (`subsets: ["latin"]`, `display: "swap"`, `variable: "--font-jakarta"`) en lugar de Work Sans; `viewport.themeColor` = `[{ media: "(prefers-color-scheme: dark)", color: "#131620" }, { media: "(prefers-color-scheme: light)", color: "#FFFFFF" }]`
- [X] T006 Agregar a `src/content/landing.ts`: `URLS.webAppLogin = "https://stockflow-web-eight.vercel.app/login"`; `brand.wordmark = { first: "STORE", second: "FLOW", accessibleName: "StoreFlow" }`; `nav.login = { label: "Ingresar", href: URLS.webAppLogin }`; `hero.loginLine = { text: "¿Ya usas StoreFlow?", link: "Ingresa a la versión web" }`; `footer.loginLabel = "Ingresar a la versión web"`; `footer.themeLabel = "Tema"`; `a11y.themeToggle = "Modo oscuro"`
- [X] T007 [P] Crear `src/components/ui/BrandIcon.tsx`: SVG inline `viewBox="32 32 44 44"` con los 4 paths de T002 usando `var(--brand-cyan)` / `var(--brand-orange)`, `aria-hidden`, prop `className`
- [X] T008 Crear `src/components/ui/Logo.tsx` (depende de T007): tile `bg-brand-ink` con radio 22% y padding ≈18% conteniendo `BrandIcon`; wordmark de texto `font-extrabold tracking-tight` con `first` en `text-wordmark-store` y `second` en `text-brand-orange`; contenedor con `aria-label={brand.wordmark.accessibleName}` y texto interno `aria-hidden`; tamaños: ícono `size-8 sm:size-9`, texto `text-xl sm:text-2xl`; prop `size: "header" | "footer"`
- [X] T009 [P] Refactorizar `src/components/ui/Button.tsx`: variantes `primary` (`bg-primary text-on-primary`, hover con `brightness-110`), `secondary` (borde `border-line`, `text-fg`, fondo transparente, hover `bg-surface-2`), `ghost` (`text-link`, sin borde ni relleno, subrayado en hover); eliminar `inverse`; foco visible
- [X] T010 [P] Refactorizar `src/components/ui/Section.tsx`: prop `tone: "base" | "surface" | "surface-2"` (→ `bg-base`/`bg-surface`/`bg-surface-2`), títulos `text-fg`, bajada `text-fg-2`; sin bordes entre secciones

**Checkpoint**: `npm run build` pasa (las secciones aún usan clases viejas; se corrigen en US1).

---

## Phase 3: User Story 1 - El visitante reconoce la misma marca que la app (P1) 🎯 MVP

**Goal**: logo original, wordmark STOREFLOW, Plus Jakarta Sans y colores de la app por sección, en tema oscuro (por defecto).

**Independent Test**: W1, W2, W3 en tema oscuro; comparar con el ícono y el dashboard de la app.

- [X] T011 [US1] Reescribir `src/components/sections/Navbar.tsx` con `Logo` y agregar en `src/app/globals.css` la clase `.header-glass` (fondo `color-mix(in srgb, var(--surface) 75%, transparent)` + `backdrop-filter: blur(12px)`; `@supports not (backdrop-filter: blur(1px))` → 95%); borde inferior `border-line`; alto `h-15 sm:h-16`; CTA `primary size="sm"`
- [X] T012 [US1] Actualizar `src/components/sections/Hero.tsx`: fondo `linear-gradient(var(--bg-top), var(--bg-mid), var(--bg-bottom))`; brillo radial `--brand-cyan` ~15% detrás del `PhoneMockup`; eyebrow, H1 `text-fg`, subtítulo `text-fg-2`, nota `text-fg-3`; quitar la grilla decorativa azul
- [X] T013 [P] [US1] Actualizar `src/components/sections/PhoneMockup.tsx`: bisel `bg-brand-ink`, pantalla y placeholder con `bg-surface-2`, borde `border-line`, textos `text-fg-3`
- [X] T014 [P] [US1] `src/components/sections/Credibility.tsx`: fondo `bg-surface-2`, íconos `text-primary` sobre `bg-surface`, título `text-fg`, descripción `text-muted-2`
- [X] T015 [P] [US1] `src/components/sections/Problems.tsx`: `Section tone="base"`, tarjetas `bg-surface border-line`, íconos `text-accent` sobre `bg-accent/12`
- [X] T016 [P] [US1] `src/components/sections/Benefits.tsx`: `Section tone="surface"`, íconos `text-primary` sobre `bg-primary/12`
- [X] T017 [P] [US1] `src/components/sections/HowItWorks.tsx`: `Section tone="base"`; números de paso 56px (`size-14`), `bg-primary text-on-primary`, `text-2xl font-extrabold`; línea conectora `bg-line`
- [X] T018 [P] [US1] `src/components/sections/UseCases.tsx`: `Section tone="surface"`, tarjetas `bg-surface-2`, íconos `text-primary`
- [X] T019 [P] [US1] `src/components/sections/Accountants.tsx`: fondo `bg-base`; bloque `bg-surface-2` con borde `border-accent/40`; eyebrow `text-accent-text`; checks `bg-ok text-brand-ink`; nota `text-muted-2`; CTA `secondary`
- [X] T020 [P] [US1] `src/components/sections/Faq.tsx`: `Section tone="surface"`, tarjeta `bg-surface-2`, preguntas `text-fg`, respuestas `text-muted-2`, ícono `text-primary`
- [X] T021 [P] [US1] `src/components/sections/Testimonials.tsx`: clases a tokens nuevos (sigue oculta con array vacío)
- [X] T022 [P] [US1] `src/components/sections/FinalCta.tsx`: contenedor con `data-theme="dark"` (tokens oscuros fijos en ambos temas, comentar por qué), fondo `bg-brand-ink`, textos `text-fg`, CTA `primary size="lg"`; brillo cian sutil
- [X] T023 [US1] `src/components/sections/Footer.tsx`: fondo `bg-deep`, `Logo size="footer"`, textos y enlaces `text-muted-2` con hover `text-fg`
- [X] T024 [US1] Eliminar `src/components/ui/Wordmark.tsx` y confirmar que no quedan referencias (`grep -rn Wordmark src`)
- [X] T025 [US1] Actualizar `src/app/opengraph-image.tsx`: gradiente #131620→#0F1219, tile #0D1519 con los 4 bloques (SVG inline), wordmark "STORE" #2EC6DA + "FLOW" #F0921E, titular `#F5F5F5`, nota `#9CA3AF` (comentar que son los tokens oscuros)
- [X] T026 [US1] Ejecutar W1, W2, W3 en tema oscuro y capturas a 360/1440 px

**Checkpoint**: landing con la marca de la app en tema oscuro.

---

## Phase 4: User Story 2 - Un usuario existente llega a la versión web (P2)

**Goal**: "Ingresar" en header (≥640px), hero y footer, siempre secundario.

**Independent Test**: W11, W12, W14.

- [X] T027 [US2] `src/components/sections/Navbar.tsx`: agregar `Button variant="ghost"` con `nav.login`, clase `hidden sm:inline-flex`, a la izquierda del CTA
- [X] T028 [P] [US2] `src/components/sections/Hero.tsx`: bajo los CTA, línea `text-fg-3` con `hero.loginLine.text` + enlace `text-link` subrayado `hero.loginLine.link` → `URLS.webAppLogin` (externo, aviso sr-only)
- [X] T029 [P] [US2] `src/components/sections/Footer.tsx`: enlace `footer.loginLabel` → `URLS.webAppLogin` junto a Contacto y Privacidad
- [X] T030 [US2] Ejecutar W11, W12 (sin toggle aún) y W14

---

## Phase 5: User Story 3 - El visitante elige tema claro u oscuro (P3)

**Goal**: tema claro derivado, preferencia del sistema, toggle persistente, sin parpadeo.

**Independent Test**: W4–W10, W18.

- [X] T031 [US3] `src/app/globals.css`: tokens claros (columna Claro de data-model.md, `--text-muted-on-2 = #475569`, `--wordmark-store = var(--brand-ink)`, `color-scheme: light`) en `[data-theme=light]` y repetidos en `@media (prefers-color-scheme: light) { :root:not([data-theme]) { … } }` (sin JS)
- [X] T032 [US3] `src/app/layout.tsx`: `<html suppressHydrationWarning>` sin `data-theme` en el servidor; `<head>` con `<script dangerouslySetInnerHTML>` (patrón de `node_modules/next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md`): lee `localStorage["storeflow-theme"]` en try/catch; si es `dark|light` lo aplica; si no, `matchMedia("(prefers-color-scheme: light)")` → `light`, si no `dark`; registra listener `change` que actualiza solo si no hay valor guardado
- [X] T033 [US3] Crear `src/components/ui/ThemeToggle.tsx` (`"use client"`): botón 40×40 `aria-label={a11y.themeToggle}`, `aria-pressed` = oscuro activo leído con `useSyncExternalStore` (MutationObserver sobre `data-theme` de `<html>`, snapshot de servidor `null`); al hacer clic alterna, guarda en `localStorage` (try/catch) y fija el atributo; `useLayoutEffect` re-aplica el valor guardado (remount de Strict Mode en dev); íconos sol/luna conmutados por CSS según `[data-theme]` del `<html>`
- [X] T034 [US3] `src/components/sections/Navbar.tsx`: agregar `ThemeToggle` con `hidden sm:inline-flex` entre "Ingresar" y el CTA
- [X] T035 [US3] `src/components/sections/Footer.tsx`: `ThemeToggle` visible en todos los anchos con etiqueta visible `footer.themeLabel`
- [X] T036 [US3] Ejecutar W4–W10 y W18 (incluye prueba sin JS y parpadeo con CPU 6× y Slow 4G)

**Checkpoint**: las 3 historias funcionan en ambos temas.

---

## Phase 6: Polish & Cross-Cutting

- [X] T037 Ejecutar W1 (`npm run build`, `npm run lint`, `npx tsc --noEmit`): 0 errores, 0 warnings
- [X] T038 Ejecutar W16 (sin scroll horizontal 360/768/1440) en ambos temas con el script CDP de la spec 001
- [X] T039 Ejecutar W15 y W17 (Lighthouse móvil) en ambos temas; corregir hasta A11y ≥ 95, Perf ≥ 90, SEO ≥ 95 y 0 fallas de contraste
- [X] T040 Ejecutar W19 (búsqueda de veracidad) y verificar que componentes no tienen URLs ni copy literal (`grep -rnE "https?://" src/components`); único `"use client"` en `ThemeToggle.tsx`
- [X] T041 Actualizar `specs/001-storeflow-landing/quickstart.md` (placeholders: favicon y logo ya resueltos)
- [X] T042 (Con OK del owner) Commit `feat: identidad de marca, Ingresar y modo oscuro (spec 002)`, push de `002-brand-dark-mode` y deploy/preview en Vercel

---

## Dependencies & Execution Order

- **Setup → Foundational → US1 → US2 → US3 → Polish.** US2 y US3 dependen de US1 solo porque
  editan los mismos archivos (`Navbar.tsx`, `Hero.tsx`, `Footer.tsx`, `globals.css`).
- Foundational: T004 → T005; T006 independiente; T007 → T008; T009, T010 en paralelo.
- US1: T011 y T012 secuenciales (T011 toca `globals.css`); T013–T022 en paralelo; luego T023 → T024 → T025 → T026.
- US2: T027 primero (Navbar); T028 y T029 en paralelo; luego T030.
- US3: T031 → T032 → T033 → T034 → T035 → T036.

### Parallel Example: US1

```text
T013 PhoneMockup · T014 Credibility · T015 Problems · T016 Benefits · T017 HowItWorks
T018 UseCases · T019 Accountants · T020 Faq · T021 Testimonials · T022 FinalCta
```

## Implementation Strategy

1. Setup + Foundational + **US1** → validar en oscuro → mostrar al owner (MVP: marca alineada).
2. + US2 (Ingresar) → validar.
3. + US3 (claro + toggle) → validar ambos temas.
4. Polish → commit y preview en Vercel con OK del owner.
