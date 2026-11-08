# Tasks: Estados de interacción (hover, foco y FAQ abierta)

**Input**: Design documents from `specs/004-hover-interaction-states/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/interaction-states.md, quickstart.md

**Tests**: no solicitados; la validación es `npm run build` + escenarios de [quickstart.md](./quickstart.md).

## Format: `[ID] [P?] [Story] Description`

Reglas comunes a todas las tareas de CSS (research R1, R4):

- Todo va en **un solo bloque** comentado `/* ---------- Estados de interacción (spec 004) ---------- */` en `src/app/globals.css`, **fuera de `@layer`** (para ganar a las utilidades de Tailwind sin `!important`), ubicado antes del bloque `@media (prefers-reduced-motion: no-preference)` del final.
- En reposo las clases MUST NOT declarar `border-color`, `background-color` ni `box-shadow` (salvo `.card-ghost`, que no tiene utilidades de borde/fondo).
- Hover siempre dentro de `@media (hover: hover) and (pointer: fine)`; movimiento (`translate`, `scale`) siempre dentro de `@media (prefers-reduced-motion: no-preference)`.
- Transición común: `transition-property: translate, scale, rotate, box-shadow, border-color, background-color, color; transition-duration: 200ms; transition-timing-function: ease-out;`
- Comentario inline en cada regla no obvia (constitución, restricciones técnicas).

---

## Phase 1: Setup

- [X] T001 Crear la rama `004-hover-interaction-states` desde `main` (`git switch -c 004-hover-interaction-states`) y confirmar con `git status` que solo están sin seguimiento `specs/004-hover-interaction-states/` y `prompt-capturas-hero.md`
- [X] T002 Tomar capturas de referencia en reposo (360 px y 1440 px, tema claro y oscuro) de Credibilidad, Problemas, Beneficios, Cómo funciona, Casos de uso, Contadores y FAQ con `npm run build && npm run start`, para comparar en quickstart #3; guardarlas fuera del repo (scratchpad) — **Reemplazada**: sin la extensión de Chrome, se comprobó automáticamente (Chrome headless) que quitar `.card-ghost` no mueve el contenido (0 px) en ambos temas

---

## Phase 2: Foundational (bloquea todas las historias)

- [X] T003 En `src/app/globals.css`: agregar `--elev-card-hover` junto a `--elev-card` en los **3** bloques de tema — oscuro (`:root, [data-theme="dark"]`): `0 2px 4px rgb(0 0 0 / 0.35), 0 20px 40px -16px rgb(0 0 0 / 0.7)`; claro (`[data-theme="light"]`) y claro sin JS (`@media (prefers-color-scheme: light) :root:not([data-theme])`): `0 2px 4px rgb(15 23 42 / 0.06), 0 16px 32px -12px rgb(15 23 42 / 0.2)`; y en `@theme inline` agregar `--shadow-card-hover: var(--elev-card-hover);` (research R5)
- [X] T004 En `src/app/globals.css`: crear el bloque vacío "Estados de interacción (spec 004)" fuera de `@layer`, con un comentario de cabecera que resuma: clases `.card-hover`, `.card-ghost`, `.card-icon`, `.faq-toggle`; por qué van sin capa; hover solo con puntero fino; movimiento solo sin reduced-motion (contracts/interaction-states.md)

**Checkpoint**: `npm run build` sin errores; la página se ve idéntica.

---

## Phase 3: User Story 1 - Las tarjetas responden al mouse y al teclado (P1) 🎯 MVP

**Goal**: todas las tarjetas incluidas se elevan, marcan sombra y toman borde primario con hover fino o foco de teclado interno; los ítems sin caja muestran una caja que aparece sin mover el contenido.

**Independent Test**: quickstart escenarios 1, 3, 4, 5, 6, 13 y 15.

- [X] T005 [US1] En el bloque spec 004 de `src/app/globals.css`, definir `.card-hover`: en reposo solo la transición común; estado resaltado con selectores `@media (hover: hover) and (pointer: fine) { .card-hover:hover {…} }` y `.card-hover:has(:focus-visible) {…}` → `border-color: var(--primary); box-shadow: var(--elev-card-hover);`; y dentro de `@media (prefers-reduced-motion: no-preference)` los mismos dos selectores con `translate: 0 -3px;` (FR-001 a FR-004)
- [X] T006 [US1] En el mismo bloque de `src/app/globals.css`, definir `.card-ghost`: `border: 1px solid transparent; border-radius: var(--radius-card); padding: 0.75rem; margin: calc(-0.75rem - 1px);` (comentario: el margen negativo compensa relleno + borde, el contenido no se mueve; 13 px cabe en el gutter de 16 px) y, en los selectores resaltados de `.card-hover.card-ghost` (hover fino y `:has(:focus-visible)`), `background-color: var(--card-lit-bg, var(--surface));` (FR-001a, research R6)
- [X] T007 [P] [US1] En `src/components/sections/Problems.tsx`: agregar `card-hover` al `<li>` de cada tarjeta (ya tiene `border border-line` de 1 px)
- [X] T008 [P] [US1] En `src/components/sections/Benefits.tsx`: agregar `card-hover card-ghost [--card-lit-bg:var(--surface-2)]` al `<li>` (la sección es `tone="surface"`, por eso el fondo resaltado es surface-2); verificar que el `<li>` no tenga utilidades de margen ni relleno
- [X] T009 [P] [US1] En `src/components/sections/HowItWorks.tsx`: agregar `card-hover card-ghost` al `<li>` de cada paso (fondo resaltado por defecto: surface sobre canvas); no tocar la línea `aria-hidden` que une los pasos
- [X] T010 [P] [US1] En `src/components/sections/UseCases.tsx`: agregar `card-hover` al `<li>` de cada tarjeta (ya tiene `border border-line`)
- [X] T011 [P] [US1] En `src/components/sections/Accountants.tsx`: agregar `card-hover` al `<div>` del panel (`rounded-[2rem] border border-accent/40 bg-surface-2 …`); el borde acento se recolorea a primario al resaltar; no tocar los checks (FR-001b, FR-007)
- [X] T012 [P] [US1] En `src/components/sections/Credibility.tsx`: agregar `card-hover card-ghost` al `<li>` de cada ítem (fondo resaltado por defecto: surface sobre surface-2)
- [X] T013 [P] [US1] En `src/components/sections/Testimonials.tsx`: agregar `card-hover` a la `<figure>` de cada testimonio (la sección hoy no se renderiza; solo se verifica que compile)
- [X] T014 [US1] Validar US1 con quickstart #1, #3 (comparar contra capturas de T002), #4 (línea de Cómo funciona), #5, #6, #13 (360 px sin scroll horizontal) y #15 (CLS 0); ajustar solo `src/app/globals.css` si algo falla

**Checkpoint**: US1 funciona sola: tarjetas resaltan con mouse y foco, sin mover nada en reposo.

---

## Phase 4: User Story 2 - Los íconos acompañan el resaltado de su tarjeta (P2)

**Goal**: el ícono principal se llena de primario, toma color de contraste y escala 1.1 cuando su tarjeta está resaltada.

**Independent Test**: quickstart escenario 2 (en claro y oscuro).

**Depends on**: US1 (`.card-hover` y su estado resaltado).

- [X] T015 [US2] En el bloque spec 004 de `src/app/globals.css`, definir `.card-icon`: en reposo solo la transición común; con `.card-hover` resaltado (`@media (hover: hover) and (pointer: fine) { .card-hover:hover .card-icon }` y `.card-hover:has(:focus-visible) .card-icon`) → `background-color: var(--primary); color: var(--on-primary);`; y dentro de `@media (prefers-reduced-motion: no-preference)` los mismos selectores con `scale: 1.1;` (FR-005, FR-006; comentario: el naranja de Problemas pasa a primario porque acento sobre blanco da 2.38:1)
- [X] T016 [P] [US2] En `src/components/sections/Problems.tsx`: agregar `card-icon` al `<span>` contenedor del ícono (`bg-accent/12 text-accent`)
- [X] T017 [P] [US2] En `src/components/sections/Benefits.tsx`: agregar `card-icon` al `<span>` contenedor del ícono (`bg-primary/12 text-primary`)
- [X] T018 [P] [US2] En `src/components/sections/HowItWorks.tsx`: agregar `card-icon` al `<span>` del ícono (`size-11 … bg-primary/12`), **no** al círculo del número de paso (`size-14 … bg-primary`) (FR-007)
- [X] T019 [P] [US2] En `src/components/sections/UseCases.tsx`: agregar `card-icon` al `<span>` contenedor del ícono (`size-12 … bg-primary/12`)
- [X] T020 [P] [US2] En `src/components/sections/Credibility.tsx`: agregar `card-icon` al `<span>` contenedor del ícono (`size-10 … bg-surface text-primary shadow-card`)
- [X] T021 [US2] Validar US2 con quickstart #2 en tema claro y oscuro, pasando el mouse por el texto lejos del ícono; confirmar que los checks de Contadores y los números de paso no cambian

**Checkpoint**: íconos sincronizados con sus tarjetas.

---

## Phase 5: User Story 3 - El botón "+" de Preguntas frecuentes indica qué pregunta está abierta (P2)

**Goal**: el "+" se llena de primario al abrir, da una señal leve en hover/foco con la pregunta cerrada y vuelve al cerrar; sin JS.

**Independent Test**: quickstart escenarios 7 a 10 y 14.

**Independiente de US1 y US2** (solo requiere Phase 2).

- [X] T022 [US3] En el bloque spec 004 de `src/app/globals.css`, definir `.faq-toggle`: en reposo solo la transición común (incluye `rotate`, porque Tailwind 4 aplica `rotate-45` con la propiedad `rotate`); señal leve con `@media (hover: hover) and (pointer: fine) { details:not([open]) > summary:hover .faq-toggle }` y `details:not([open]) > summary:focus-visible .faq-toggle` → `background-color: color-mix(in srgb, var(--primary) 20%, var(--surface));`; abierto con `details[open] .faq-toggle` → `background-color: var(--primary); color: var(--on-primary);` (comentario: `:not([open])` hace que el estado abierto prevalezca sobre el hover) (FR-008 a FR-010, research R8)
- [X] T023 [US3] En `src/components/sections/Faq.tsx`: en el `<span aria-hidden>` del signo, quitar `transition-transform duration-200`, agregar `faq-toggle` y conservar `bg-surface text-primary group-open:rotate-45`; no cambiar `<details>`/`<summary>` ni agregar JS (FR-011)
- [X] T024 [US3] Validar US3 con quickstart #7, #8, #9, #10 y #14 (JS deshabilitado); con varias preguntas abiertas, cada botón refleja su propio estado

**Checkpoint**: FAQ completa.

---

## Phase 6: Polish & Cross-Cutting Concerns

- [X] T025 Validar quickstart #11 (DevTools → `prefers-reduced-motion: reduce`: nada sube, crece ni gira animado; colores al instante) y #12 (modo táctil: sin hover pegado tras tocar y hacer scroll)
- [X] T026 Verificar contrastes en pantalla (quickstart #16) contra la tabla de research R7 en ambos temas, incluido el panel de Contadores con borde primario sobre canvas
- [X] T027 Validar quickstart #19 (alto contraste de Windows: Configuración → Accesibilidad → Temas de contraste): en reposo, Beneficios, Cómo funciona y Credibilidad no deben mostrar cajas; si el borde transparente de `.card-ghost` se pinta, agregar en el bloque spec 004 de `src/app/globals.css` una regla `@media (forced-colors: active) { .card-ghost { border-color: Canvas; } }` limitada al reposo, y confirmar que textos y bordes de las tarjetas siguen legibles (caso borde "alto contraste")
- [ ] T028 `npm run build` sin errores ni advertencias nuevas; Lighthouse móvil (quickstart #17): Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95
- [X] T029 Revisión de alcance (quickstart #18): `git diff --stat` solo toca `src/app/globals.css`, las 8 secciones listadas en plan.md y `specs/004-hover-interaction-states/`; `src/content/landing.ts`, `Hero.tsx`, `PhoneMockup.tsx` y `ScreensCarousel.tsx` sin cambios
- [X] T030 Commit en Conventional Commits (`style: estados de hover, foco y FAQ abierta (spec 004)`) en la rama `004-hover-interaction-states`, previa confirmación del owner

---

## Dependencies & Execution Order

- **Phase 1 → Phase 2 → historias.**
- **US1 (P1)**: depende de Phase 2. T005 y T006 (mismo archivo) antes de validar; T007–T013 en paralelo entre sí.
- **US2 (P2)**: depende de US1 (los íconos reaccionan al estado de `.card-hover`). T016–T020 en paralelo; tocan los mismos archivos que T007–T012, así que se hacen después de esas tareas.
- **US3 (P2)**: depende solo de Phase 2; puede hacerse antes, después o en paralelo con US1/US2 (archivo `Faq.tsx` propio; su CSS va en el mismo bloque, así que T022 no corre a la vez que T005/T006/T015).
- **Polish**: después de las historias que se entreguen.

## Parallel Example

```text
# US1, tras T005–T006:
T007 Problems.tsx · T008 Benefits.tsx · T009 HowItWorks.tsx · T010 UseCases.tsx
T011 Accountants.tsx · T012 Credibility.tsx · T013 Testimonials.tsx

# US2, tras T015:
T016 Problems.tsx · T017 Benefits.tsx · T018 HowItWorks.tsx · T019 UseCases.tsx · T020 Credibility.tsx

# US3 en paralelo con US1 (otra persona/sesión): T023 Faq.tsx
```

## Implementation Strategy

1. **MVP**: Phase 1 + Phase 2 + US1 → validar T014 → se puede desplegar solo.
2. **Incremento 2**: US2 (íconos) sobre US1.
3. **Incremento 3**: US3 (FAQ), independiente.
4. Polish y commit con confirmación del owner.
