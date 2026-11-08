# Research: Identidad de marca, acceso "Ingresar" y modo oscuro

Fecha: 2026-11-08. Stack sin cambios: Next.js 16.4.5, React 19.3, Tailwind 4.3.5 (loader Turbopack),
TypeScript strict. **Sin dependencias nuevas.**

## R1. Mecanismo de tema sin parpadeo

- **Decision**: atributo `data-theme="dark|light"` en `<html>`, fijado por un `<script>` inline en
  `<head>` (vía `dangerouslySetInnerHTML`) que corre durante el parseo del HTML, antes del primer
  pintado. `<html>` lleva `suppressHydrationWarning`. Patrón del guía oficial de Next 16
  `node_modules/next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md` (sección Themes).
- **Lógica del script** (≈300 bytes): `try { t = localStorage.getItem("storeflow-theme") } catch {}`;
  si `t` es `dark|light` se usa; si no, `matchMedia("(prefers-color-scheme: light)").matches ?
  "light" : "dark"`. Además registra un listener de `change` del media query que actualiza el
  atributo **solo si no hay elección guardada** (spec: seguir al sistema mientras no haya elección).
- **Sin JavaScript**: el servidor NO emite `data-theme`. El CSS define tokens oscuros en
  `:root` y tokens claros en `@media (prefers-color-scheme: light) { :root:not([data-theme]) }`, y
  los selectores `[data-theme=dark]` / `[data-theme=light]` ganan cuando el script corre. Así, sin JS
  la página sigue al sistema y por defecto es oscura (edge case de la spec).
- **Desarrollo (Strict Mode)**: React resetea los atributos de `<html>` en el remount de dev; el
  `ThemeToggle` re-aplica el atributo en `useLayoutEffect` (no-op en producción), según la misma guía.
- **Alternatives considered**: `next-themes` (dependencia innecesaria, Principio IV); cookie leída en
  el servidor (vuelve dinámica la página, pierde el prerender estático); solo `prefers-color-scheme`
  (no permite elección manual).

## R2. Tailwind v4 y temas

- **Decision**: **tematizar solo con CSS variables**, sin usar la variante `dark:`. Las utilidades
  (`bg-surface`, `text-fg`, `bg-primary`…) se mapean en `@theme inline` a variables (`--surface`,
  `--text-1`…) cuyo valor cambia según `data-theme`. Un componente nunca necesita saber el tema.
- **Verificado en Context7** (tailwindcss.com, dark-mode.mdx): en v4 la variante por atributo es
  `@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));`. **No se declara**
  porque ningún componente la necesita (Principio IV); queda documentada por si una iteración futura
  la requiere.
- **Rationale**: un solo lugar para los valores por tema (Principio III); `@theme inline` hace que la
  utilidad referencie la variable en tiempo de uso, no el valor resuelto en `:root`.
- **Bloque con tema fijo**: el CTA final y el tile del logo usan siempre los tokens oscuros
  envolviéndolos en `data-theme="dark"` (los tokens se definen sobre el selector `[data-theme=dark]`,
  no solo `:root`, por lo que funcionan anidados).

## R3. Tokens (fuente: owner + app Android)

Tabla entregada por el owner en `/speckit-plan`, derivada de `ThemeModels.kt` (Búnker + Nocturno) e
`ic_launcher_foreground.xml`. Contrastes recalculados (fórmula WCAG 2.x):

| Par | Oscuro | Claro |
|-----|--------|-------|
| on-primary / primary | 8.97 | 5.36 |
| text-1 / bg-top | 16.56 | 17.85 |
| text-2 / surface o bg-mid | 11.06 | 7.24 |
| text-3 / bg-top | 7.11 | 4.76 |
| text-3 / surface-2 o bg-bottom | 6.04 | **4.34 ✗** |
| link / bg-top · surface-2 | 8.77 · 7.92 | 5.36 · 4.89 |
| accent-text / bg-top · surface-2 | 7.60 · 6.86 | 5.02 · 4.58 |
| text-1 #F5F5F5 / brand-ink | 16.92 | (bloque fijo oscuro) |

- **Hallazgo**: en tema claro `--text-3` (#64748B) sobre `--surface-2`/`--bg-bottom` (#F1F5F9) da
  4.34:1 (< AA). **Regla**: en claro, `text-3` solo sobre `bg-top`, `bg-mid` o `surface`; sobre
  `surface-2`/`bg-bottom` (FAQ, footer) se usa `text-2` (7.x:1). Se implementa con un token
  `--text-muted-on-2` = text-3 en oscuro, text-2 en claro, para no ramificar componentes.
- **Logotipo**: "FLOW" naranja sobre blanco (2.38:1) está exento de 1.4.3 (logotipos); el nombre
  accesible del logo es "StoreFlow" vía `aria-label`.
- **Foco**: anillo `--primary` (oscuro 8.77:1 sobre bg; claro 5.36:1) cumple 3:1 de 1.4.11.

## R4. Tipografía

- **Decision**: Plus Jakarta Sans vía `next/font/google` (variable, `latin`, `display: swap`),
  reemplaza a Work Sans. Pesos usados: 400, 500, 600, 700 (los de `Type.kt`).
- **Rationale**: tipografía de la app (Principio III, clarificación Q3). Sin costo extra de red:
  `next/font` la autoaloja.

## R5. Logo e ícono

- **Decision**: el vector de `ic_launcher_foreground.xml` (viewport 108) se recorta a `viewBox="32 32
  44 44"` (bloques entre 32 y 76) y se guarda como `public/brand/storeflow-icon.svg` (fondo
  transparente, asset de marca). El componente `BrandIcon` inlinea los mismos 4 `<path>` (sin petición
  de red extra; reutilizable en `Logo` y en la imagen OG). El tile #0D1519 lo aporta `Logo` con radio
  ≈22% y padding ≈18%, imitando la máscara adaptativa de Android.
- **Favicon**: `src/app/icon.png` = copia de `StockFlowv00/play-store/ic_launcher_512.png` (convención
  de archivo de metadata de Next). Se elimina `src/app/favicon.ico` (el de Next del scaffold).
- **Wordmark**: texto real (no imagen), "STORE" + "FLOW" en mayúsculas (clarificación Q2), bold.
  Oscuro: STORE `--brand-cyan`; claro: STORE `--brand-ink`; FLOW `--brand-orange` en ambos. Token
  `--wordmark-store` resuelve la diferencia sin `dark:`.

## R6. Selector de tema

- **Decision**: `ThemeToggle` como único Client Component (`"use client"`), botón con ícono sol/luna.
  - Estado leído con `useSyncExternalStore` (suscripción a un `MutationObserver` sobre
    `data-theme` de `<html>`; snapshot de servidor `null`) → sin desajuste de hidratación y los dos
    toggles (header y footer) quedan sincronizados.
  - `aria-pressed` = tema oscuro activo; `aria-label` desde `landing.ts` ("Modo oscuro").
  - Ícono sol/luna conmutado por CSS según `data-theme` (no depende del estado React → sin parpadeo).
  - Al tocar: alterna, escribe `localStorage` (con try/catch), fija el atributo.
- **Ubicación**: header desde 640px (`hidden sm:inline-flex`) y footer en todos los anchos
  (clarificación Q1).

## R7. Header translúcido

- **Decision**: fondo `color-mix(in srgb, var(--surface) 75%, transparent)` + `backdrop-blur-md`;
  `@supports not (backdrop-filter: blur(1px))` → 95%. Borde inferior `--border`. Alto 64px en `sm+`,
  60px en móvil (el ícono de 32px necesita aire).
- `color-mix` está soportado en todos los navegadores modernos objetivo.

## R8. `color-scheme` y `theme-color`

- **Decision**: `color-scheme: dark` / `light` dentro de cada bloque de tokens (scrollbars y controles
  nativos). `viewport.themeColor` con dos entradas por `media` (`#131620` oscuro, `#FFFFFF` claro).

## R9. Imagen OG

- **Decision**: fondo gradiente oscuro de la app, `BrandIcon` sobre tile, wordmark bicolor y titular.
  Plus Jakarta no se embebe (la fuente por defecto de `ImageResponse` basta; evita leer archivos).
