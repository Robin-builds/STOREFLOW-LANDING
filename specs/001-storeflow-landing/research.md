# Research: Landing page de StoreFlow

Fecha: 2026-11-07. Versiones verificadas con `npm view` y Context7 (Principio "verificar antes de usar").

## R1. Versiones del stack

- **Decision**: Next.js 16.4.5 (App Router), React 19 (la que trae Next 16), TypeScript strict,
  Tailwind CSS 4.3.5, Node 22.19 (instalado localmente).
- **Rationale**: son las versiones estables actuales; Node 22 cumple el mínimo de Next 16.
- **Alternatives considered**: fijar Next 15 / Tailwind 3 → rechazado, no hay razón para empezar en
  versiones anteriores.

## R2. Scaffolding

- **Decision**: `create-next-app@16.4.5` en una carpeta temporal `_scaffold/` y mover el contenido
  a la raíz, con flags explícitos:
  `npx create-next-app@16.4.5 _scaffold --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --no-react-compiler --no-cache-components --disable-git --no-agent-feedback`
- **Rationale**: la raíz ya contiene `.specify/`, `.claude/` y `specs/`; `create-next-app` se niega a
  escribir en carpetas con archivos que no reconoce. Los flags evitan cualquier prompt.
  - `--no-cache-components`: la página es 100% estática y no usa caché por petición; con Cache
    Components activo, `new Date()` (año del footer) en un Server Component prerenderizado falla.
  - `--eslint`: el criterio exige build sin warnings de ESLint; en Next 16 `next lint` ya no existe,
    se usa `eslint` directo con `eslint.config.mjs` (flat config) y el script `npm run lint`.
  - `--disable-git`: el repo se inicializa aparte con la rama `001-storeflow-landing`.
- **Alternatives considered**: `--yes` (defaults no deseados: sin `src/`, cache components activo);
  crear archivos a mano (más propenso a errores que el scaffold oficial).

## R3. Tailwind v4: tokens de diseño

- **Decision**: tokens en `src/app/globals.css` dentro de `@theme { ... }` tras
  `@import "tailwindcss";`. Sin `tailwind.config.js`.
- **Rationale**: en v4 las variables de `@theme` generan utilidades (`bg-primary`, `text-ink`) y además
  quedan como CSS variables en `:root`. Un solo lugar editable (Principio III).
- **Tokens**: `--color-primary #2563EB`, `--color-primary-hover #1D4ED8`, `--color-warning #F97316`,
  `--color-danger #EF4444`, `--color-ok #16A34A`, `--color-ink #0F172A`, `--color-muted #64748B`,
  `--color-surface #FFFFFF`, `--color-surface-alt #F8FAFC`, `--color-border #E2E8F0`,
  `--font-sans` (desde `next/font`), radios `--radius-card`, `--radius-button`, sombras
  `--shadow-card`, `--shadow-phone`, y `--spacing-section` para el padding vertical de secciones.

## R4. Contraste (Principio V)

- **Decision**: `#2563EB` se usa para fondo de botones con texto blanco (≈5.2:1, AA) y para enlaces.
  `#64748B` solo como texto secundario sobre `#FFFFFF`/`#F8FAFC` (≈4.6–4.8:1, AA). Naranjo, rojo y
  verde se usan **solo como acentos no textuales** (íconos, puntos, bordes), nunca como color de
  texto sobre blanco (naranjo ≈2.8:1 falla AA).
- **Rationale**: cumplir AA sin cambiar la paleta entregada.

## R5. Tipografía

- **Decision**: Work Sans vía `next/font/google`, variable, subsets `latin`, `display: swap`,
  expuesta como CSS variable y mapeada a `--font-sans` en `@theme`.
- **Rationale**: es más geométrica que Inter (pedido explícito) y se diferencia de la estética de
  plantilla. `next/font` la autoaloja: sin peticiones a Google en runtime (Principio VI).
- **Alternatives considered**: Inter (muy usada, menos carácter geométrico).

## R6. Interactividad sin JavaScript de cliente

- **Decision**: **cero componentes `"use client"`**.
  - FAQ: `<details>`/`<summary>` nativos, operables con Enter/Espacio y anunciados por lectores de
    pantalla; estilos de apertura con CSS.
  - "Ver cómo funciona": ancla `#como-funciona`; `scroll-behavior: smooth` solo dentro de
    `@media (prefers-reduced-motion: no-preference)`.
  - Navbar sticky con CSS (`position: sticky`); sin menú (clarificación Q4).
- **Rationale**: Principios IV y VI: menos JS, mejor rendimiento y funciona sin JavaScript.
- **Alternatives considered**: acordeón con estado React (requiere cliente, más código, mismo
  resultado).

## R7. Metadata y SEO

- **Decision**: `export const metadata` en `layout.tsx` con `metadataBase` = `SITE_URL` de
  `landing.ts`, `title`, `description`, `openGraph` (locale `es_CL`), `alternates.canonical: "/"`.
  `<html lang="es-CL">`. Imagen OG generada en build con `src/app/opengraph-image.tsx`
  (`ImageResponse` de `next/og`, incluido en Next; sin dependencias nuevas). `robots.ts` y
  `sitemap.ts` para SEO ≥ 95.
- **Rationale**: el dominio provisorio de Vercel vive en una constante (clarificación Q5).

## R8. Screenshots y mockup

- **Decision**: el mockup del teléfono es un marco CSS neutro. Para cada screenshot declarado en
  `landing.ts` (ruta, ancho, alto, alt), el componente verifica en build con `fs.existsSync` si el
  archivo existe en `public/screens/`; si existe, usa `next/image` con `priority` en el hero; si no,
  muestra un placeholder gris con el nombre esperado (`/screens/inicio.png`).
- **Rationale**: el owner solo deja el archivo y redeploya; nunca se dibuja UI ficticia (Principio I).

## R9. Íconos

- **Decision**: un componente `Icon` con un set mínimo de SVG inline (≈10 íconos de trazo simple),
  referenciados por nombre desde `landing.ts`.
- **Rationale**: se reutiliza en credibilidad, problemas, beneficios, rubros y pasos (5 lugares);
  evita agregar una librería de íconos (Principio IV).

## R10. Validación

- **Decision**: sin framework de tests (no lo pide ningún requisito, Principio IV). Validación:
  `npm run build`, `npm run lint`, `npx tsc --noEmit`, Lighthouse móvil desde Chrome DevTools sobre
  `npm run start`, revisión de anchos 360/768/1440 en DevTools, y búsqueda de términos prohibidos
  en `landing.ts` (ver quickstart).
- **Alternatives considered**: Playwright/Vitest → dependencias extra sin requisito que las pida.
