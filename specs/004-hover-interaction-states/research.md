# Research: estados de interacción (spec 004)

Sin marcadores NEEDS CLARIFICATION en el contexto técnico. Cada punto registra una decisión de diseño
verificada contra el código actual y Tailwind 4.3.5 instalado.

## R1. Dónde viven los estilos: un bloque CSS global, no utilidades por componente

- **Decision**: un bloque comentado en `src/app/globals.css` con 4 clases semánticas (`.card-hover`,
  `.card-ghost`, `.card-icon`, `.faq-toggle`) y reglas **sin capa** (fuera de `@layer`). Los componentes
  solo agregan la clase.
- **Rationale**: el mismo efecto se repite en 7 secciones y debe ser idéntico (FR-002). Un solo lugar
  garantiza duración, curva y distancia comunes (Principio III). Las reglas sin capa ganan a las
  utilidades de Tailwind (que viven en `@layer utilities`) sin `!important`; así el borde primario
  reemplaza a `border-line` / `border-accent/40` y el fondo primario a `bg-accent/12` al resaltar.
  Mismo patrón que las reglas del carrusel de la spec 003.
- **Regla derivada**: en reposo, estas clases MUST NOT declarar propiedades que los componentes ya
  fijan con utilidades (borde, fondo, sombra), porque las pisarían siempre. En reposo solo declaran
  `transition` (y, en `.card-ghost`, el borde transparente y el relleno que esos ítems no tienen).
- **Alternatives considered**:
  - Utilidades `group-hover:` / `has-focus-visible:` en cada componente: repetiría ~8 clases en 7
    archivos y el orden entre `group-open:` y `group-hover:` en la FAQ es frágil.
  - `@custom-variant` de Tailwind: menos explícito que CSS plano y no aporta para 4 clases.
  - Componente `<Card>`: las tarjetas tienen marcados distintos (`li`, `figure`, panel); una clase basta (Principio IV).

## R2. Hover solo con puntero que permite hover

- **Decision**: reglas de `:hover` dentro de `@media (hover: hover) and (pointer: fine)`.
- **Rationale**: en táctil, `:hover` queda pegado tras tocar (FR-014). `hover: hover` es lo mismo que
  usa la variante `hover:` de Tailwind 4 (verificado en `node_modules/tailwindcss/dist/lib.js`);
  `pointer: fine` descarta equipos táctiles que informan hover de forma errónea.
- **Alternatives considered**: JS para detectar toque (innecesario y contrario a Principio IV).

## R3. Resaltado por teclado con `:has(:focus-visible)`

- **Decision**: `.card-hover:has(:focus-visible)` aplica el mismo estado que el hover. Las tarjetas no
  reciben `tabindex`.
- **Rationale**: FR-003. Solo reacciona al foco de teclado (no al clic), y no agrega paradas de Tab
  vacías. Hoy la única tarjeta con elemento enfocable es el panel de Contadores (botón "Soy contador").
- **Fallback**: navegadores sin `:has()` (muy antiguos) siguen mostrando el contorno de foco propio del
  elemento; solo pierden el resaltado de la tarjeta. Aceptable.

## R4. Movimiento: propiedades individuales y `prefers-reduced-motion`

- **Decision**:
  - Elevación con `translate: 0 -3px` y escala de ícono con `scale: 1.1`, declaradas **solo** dentro de
    `@media (prefers-reduced-motion: no-preference)`.
  - Transición: `translate, scale, rotate, box-shadow, border-color, background-color, color` a
    `200ms ease-out`, misma declaración para tarjetas, íconos y botón "+".
- **Rationale**: Tailwind 4 implementa `rotate-45` con la propiedad CSS `rotate` (no `transform`), así
  que la transición del botón "+" MUST incluir `rotate`; por coherencia se usan también `translate` y
  `scale`. Son propiedades de composición, igual de baratas que `transform`, y no provocan layout
  (FR-015). Con movimiento reducido no hay desplazamiento ni escala (FR-013) y la regla global
  existente deja toda transición en ~0 ms: los colores cambian al instante.
- **Botón "+" con movimiento reducido**: sigue quedando girado 45° al abrir (como hoy), sin animación;
  el giro es parte del estado (+ → ×), no un efecto. Cumple FR-013 ("giro animado").
- **Alternatives considered**: `transform: translateY()` — chocaría con el `rotate` de Tailwind en el mismo elemento.

## R5. Sombra resaltada: un token nuevo derivado, no un color nuevo

- **Decision**: agregar `--elev-card-hover` en los 3 bloques de tema (oscuro, claro, claro sin JS) con
  los mismos colores base que `--elev-card` y mayor desplazamiento/opacidad:
  - oscuro: `0 2px 4px rgb(0 0 0 / 0.35), 0 20px 40px -16px rgb(0 0 0 / 0.7)`
  - claro: `0 2px 4px rgb(15 23 42 / 0.06), 0 16px 32px -12px rgb(15 23 42 / 0.2)`
- **Rationale**: FR-016 prohíbe colores fuera del sistema y permite este único token de sombra; la sombra reutiliza los mismos tonos que
  `--elev-card`. Se expone como `--shadow-card-hover` en `@theme inline` por consistencia.
- **Alternatives considered**: reusar `--elev-phone` (demasiado profunda para tarjetas pequeñas).

## R6. Ítems sin caja (Beneficios, Cómo funciona, Credibilidad): `.card-ghost`

- **Decision**: `.card-ghost` agrega `border: 1px solid transparent`, `border-radius` de tarjeta,
  `padding: 0.75rem` y `margin: calc(-0.75rem - 1px)`. Al resaltarse, el borde pasa a primario y el fondo a
  `var(--card-lit-bg, var(--surface))`.
- **Rationale**: FR-001a. El margen negativo compensa el relleno: texto e íconos quedan en el mismo
  pixel que hoy y la caja aparece "alrededor". 13 px (relleno + borde) caben en el gutter móvil (16 px, `Container px-4`)
  sin scroll horizontal, y en los huecos de las grillas (Beneficios `gap-x-8`, Credibilidad `gap-6`)
  las cajas como mucho se tocan, y solo una se resalta a la vez.
- **Fondo según sección** (para que la caja se distinga del fondo de la sección):

  | Sección | Fondo de sección | Fondo resaltado |
  |---------|------------------|-----------------|
  | Beneficios | `surface` | `surface-2` (vía `[--card-lit-bg:var(--surface-2)]`) |
  | Cómo funciona | `canvas` | `surface` (por defecto) |
  | Credibilidad | `surface-2` | `surface` (por defecto) |

- **Cómo funciona**: la línea que une los pasos pasa por detrás de las tarjetas; con el fondo
  resaltado, el tramo dentro de la tarjeta se oculta y la línea "llega" al borde de la tarjeta. Se
  acepta como comportamiento esperado (caso borde de la spec) y se verifica visualmente en el quickstart.
- **Alternatives considered**: relleno sin margen negativo (desplaza el contenido 12 px: cambia el diseño en reposo).

## R7. Íconos: qué se resalta

- **Decision**: `.card-icon` se aplica al contenedor del ícono principal de cada tarjeta. Al resaltarse
  la tarjeta: fondo `--primary`, ícono `--on-primary`, `scale: 1.1` (solo con movimiento permitido).
  No se aplica a los checks de Contadores ni al número de paso de Cómo funciona (FR-007). El panel de
  Contadores no tiene ícono principal: solo se resalta la tarjeta.
- **Contraste medido** (WCAG, gráficos ≥ 3:1):

  | Par | Oscuro | Claro |
  |-----|--------|-------|
  | `on-primary` sobre `primary` (ícono resaltado, "+" abierto) | 8.97 | 5.36 |
  | `primary` sobre `surface` (borde resaltado) | 7.92 | 5.36 |
  | `primary` sobre `surface-2` | 7.45 | 4.89 |
  | `primary` sobre `canvas` | 8.77 | 5.36 |
  | `primary` sobre tinte 20% (señal leve del "+") | 5.31 | 4.04 |
  | referencia: `accent` sobre blanco | — | 2.38 ✗ |

  El último par justifica que el ícono naranja de Problemas pase al primario al resaltarse.

## R8. Botón "+" de Preguntas frecuentes

- **Decision**: `.faq-toggle` reemplaza `transition-transform duration-200` del `<span>` (se conserva
  `group-open:rotate-45`). Estados por selector, sin JS:
  - abierto: `details[open] .faq-toggle` → fondo `--primary`, color `--on-primary`.
  - señal leve: `details:not([open]) > summary:hover .faq-toggle` (dentro de la media de hover) y
    `details:not([open]) > summary:focus-visible .faq-toggle` → fondo
    `color-mix(in srgb, var(--primary) 20%, var(--surface))`, color `--primary`.
- **Rationale**: FR-008 a FR-011. `:not([open])` hace que el estado abierto prevalezca sobre el hover
  sin depender del orden de reglas. `color-mix` deriva el tono del token existente (FR-016); el
  proyecto ya usa `color-mix` en `.header-glass`.
- **Alternatives considered**: `bg-primary/20` de Tailwind (mismo resultado, pero mezclado con el
  estado abierto en utilidades es frágil por el orden de variantes).
