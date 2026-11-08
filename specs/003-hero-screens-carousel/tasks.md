# Tasks: Secuencia guiada de capturas en el mockup del hero

**Input**: Design documents from `specs/003-hero-screens-carousel/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/hero-carousel.md, quickstart.md

**Tests**: no solicitados; la validación es `npm run build` + escenarios de [quickstart.md](./quickstart.md).

## Format: `[ID] [P?] [Story] Description`

---

## Phase 1: Setup

- [X] T001 Verificar en `node_modules/next/dist/docs/01-app/03-api-reference/02-components/image.md` las props `preload`, `loading`, `fetchPriority` y el ejemplo "Theme detection" antes de tocar `src/components/sections/PhoneMockup.tsx` (AGENTS.md; research R1/R5)

---

## Phase 2: Foundational (bloquea todas las historias)

- [X] T002 En `src/content/landing.ts`: agregar tipos `HeroScreen` (`src`, `alt`, `width`, `height`, `caption` — "Leyenda sin número; el número lo agrega el orden", "Máx. ~32 caracteres") y `HeroScreens` como tupla de 4, 5 o 6 (research R6); reemplazar `hero.screenshot` por `hero.screens` con las 6 capturas reales (`inicio.png` "Ve tu bodega de un vistazo", `bodega.png` "Crea tus bodegas", `escanear.png` "Escanea tus productos", `movimiento.png` "Registra entradas y salidas", `alerta-stock.png` "Revisa qué está por acabarse", `historial.png` "Cada movimiento queda registrado"; 1080×2340) aplicadas con `satisfies HeroScreens`
- [X] T003 En `src/content/landing.ts`: agregar `hero.carousel` con `regionLabel`, `roleDescription` ("carrusel"), `slideRoleDescription` ("pantalla"), `slideLabel(n,total)`, `goTo(n,total,caption)`, `announce(n,total,caption)`, `pause`, `play` (data-model.md)
- [X] T004 En `src/components/sections/Hero.tsx`: pasar `hero.screens` a `PhoneMockup` en lugar de `hero.screenshot`

**Checkpoint**: el contenido compila con la nueva forma.

---

## Phase 3: User Story 1 - Ver el recorrido de la app en el hero (P1) 🎯 MVP

**Goal**: el teléfono recorre las 5 pantallas solo, con fundido y leyenda debajo; placeholders si falta el archivo.

**Independent Test**: quickstart escenarios 1, 9 y 10.

- [X] T005 [P] [US1] En `src/app/globals.css`: reglas `[data-slide]` (apiladas, `opacity:0; visibility:hidden`, transición 500 ms de opacity/visibility), `[data-carousel][data-active="k"] [data-slide="k"]` para k=0..5, y `[data-carousel]:not([data-armed]) [data-slide]:not([data-slide="0"]) { display:none }` (contracts/hero-carousel.md)
- [X] T006 [US1] Reescribir `src/components/sections/PhoneMockup.tsx` (servidor): props `screens: HeroScreens`, `pendingLabel`; por pantalla, `fs.existsSync` de la clara; diapositiva `div[data-slide=i][role=group][aria-roledescription][aria-label]` con `<Image>` (primera: `preload`; resto: lazy) o el placeholder actual con `public/screens/…`; mantener el marco; envolver todo en `ScreensCarousel` pasando las leyendas
- [X] T007 [US1] Crear `src/components/sections/ScreensCarousel.tsx` (`"use client"`): `section[data-carousel][data-active][data-armed]` con `aria-roledescription` y `aria-label`; `index`, timeout de 4000 ms reprogramado por índice que solo corre con pestaña visible; `armed` tras `window.load`; leyenda numerada (`${n}. ${caption}`) debajo del marco con altura reservada de 2 líneas

**Checkpoint**: US1 funciona sola (avance y leyenda), aún sin controles.

---

## Phase 4: User Story 2 - Ir directo a una pantalla y pausar (P2)

**Goal**: indicadores clicables, botón Pausar/Reanudar y pausa por hover/foco.

**Independent Test**: quickstart escenarios 2–5.

- [X] T008 [US2] En `src/components/sections/ScreensCarousel.tsx`: botón Pausar/Reanudar (primero en orden de foco, `aria-label` desde `hero.carousel`, ícono SVG inline, `motion-reduce:hidden`) y un indicador `<button>` por pantalla (`aria-label` = `goTo`, `aria-current` en el activo, activo más ancho para no depender del color, objetivo ≥ 24×24 px); activar un indicador fija `playing=false`
- [X] T009 [US2] En `src/components/sections/ScreensCarousel.tsx`: pausa mientras `hovering` (pointerenter/leave con `pointerType === "mouse"`) o `focusWithin` (onFocus/onBlur con `relatedTarget` fuera de la región)

---

## Phase 5: User Story 3 - Movimiento reducido y lectores de pantalla (P2)

**Goal**: sin avance ni fundido con movimiento reducido; anuncios solo por acción del visitante.

**Independent Test**: quickstart escenarios 6 y 7.

- [X] T010 [US3] En `src/components/sections/ScreensCarousel.tsx`: leer `prefers-reduced-motion` con `useSyncExternalStore` (servidor = reducido) y no programar el timeout si está activo; `<p className="sr-only" aria-live="polite">` que se rellena con `announce(...)` solo al usar indicador o pausa/reanudar, y se vacía al avanzar solo
- [X] T011 [P] [US3] En `src/app/globals.css`: confirmar que `[data-slide]` usa `motion-reduce` vía la regla global existente (transición 0.01 ms) y que las diapositivas inactivas quedan fuera del árbol de accesibilidad por `visibility:hidden`

---

## Phase 6: User Story 4 - Capturas según el tema (P3)

**Goal**: usar `-oscuro` en tema oscuro cuando exista.

**Independent Test**: quickstart escenario 8.

- [X] T012 [P] [US4] En `src/app/globals.css`: `.screen-dark { display:none }`; en `[data-theme="dark"]` y en `:root:not([data-theme])` sin `prefers-color-scheme: light`, ocultar `.screen-light` y mostrar `.screen-dark`
- [X] T013 [US4] En `src/components/sections/PhoneMockup.tsx`: derivar la ruta `-oscuro` (antes de la extensión), detectar con `fs.existsSync`; si existe, renderizar clara (o placeholder) con `.screen-light` y oscura con `.screen-dark`; en la primera pantalla con par usar `fetchPriority="high"` sin `preload` (doc "Theme detection")

---

## Phase 7: Polish & Cross-Cutting

- [X] T014 Revisar comentarios inline en `src/components/sections/ScreensCarousel.tsx` y `src/components/sections/PhoneMockup.tsx` (constitución: explicar qué y por qué)
- [X] T015 `npm run build` sin errores ni advertencias nuevas
- [X] T016 Revisión visual a 360 px y 1440 px, tema claro y oscuro, y escenarios de `specs/003-hero-screens-carousel/quickstart.md` (incluye prueba temporal con PNG de prueba, borrado después)
- [X] T017 Actualizar spec, data-model, quickstart y memoria con las capturas reales (orden con `inicio.png` primera, confirmado por el owner) y confirmar con Lighthouse que `escanear.png` (2,6 MB, original sin recomprimir) no afecta el LCP

---

## Dependencies & Execution Order

- Phase 1 → Phase 2 → US1 (Phase 3) → US2, US3, US4 → Polish.
- US2 y US3 tocan `ScreensCarousel.tsx`: secuenciales entre sí. US4 toca `PhoneMockup.tsx` y `globals.css`: puede ir en paralelo a US2/US3.
- Tareas [P]: T005 (CSS) en paralelo a T006/T007; T011 y T012 (CSS) en paralelo a tareas de componentes.

### Parallel Example: User Story 1

```text
T005 globals.css  ‖  T006 PhoneMockup.tsx  → luego T007 ScreensCarousel.tsx
```

## Implementation Strategy

MVP = Phases 1–3 (recorrido automático con leyenda). Luego US2+US3 (obligatorias por Principio V antes
de entregar) y US4. No se hace commit ni deploy sin revisión del owner.
