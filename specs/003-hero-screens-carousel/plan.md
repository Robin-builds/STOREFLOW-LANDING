# Implementation Plan: Secuencia guiada de capturas en el mockup del hero

**Branch**: `003-hero-screens-carousel` | **Date**: 2026-11-08 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/003-hero-screens-carousel/spec.md`

## Summary

El teléfono del hero pasa de una captura a un recorrido de 5 pantallas declarado en `landing.ts`.
El marco, las imágenes (`next/image`) y la detección de archivos (claro / `-oscuro`) siguen en el
servidor; un único componente cliente nuevo, `ScreensCarousel`, maneja índice, temporizador, pausa,
indicadores, leyenda y anuncios, y publica el estado en `data-active` / `data-armed`. El CSS global
hace el fundido y oculta lo inactivo (también para tecnologías de asistencia, vía `visibility`).

## Technical Context

**Language/Version**: TypeScript 5 (strict), React 19.3

**Primary Dependencies**: Next.js 16.4.5 (App Router), Tailwind CSS 4. Sin dependencias nuevas.

**Storage**: N/A (contenido estático en `src/content/landing.ts`, capturas en `public/screens/`)

**Testing**: sin suite automatizada en el proyecto; validación por `npm run build` (typecheck + lint de Next) y [quickstart.md](./quickstart.md) en navegador

**Target Platform**: navegadores modernos, móvil primero (360 px) a escritorio (1440 px)

**Project Type**: landing estática (web)

**Performance Goals**: Lighthouse móvil Performance ≥ 90; solo la primera captura en la ruta crítica

**Constraints**: CLS 0 al cambiar de pantalla; JS cliente mínimo; funciona sin JS (primera pantalla)

**Scale/Scope**: 1 sección (hero), 2 componentes (1 modificado, 1 nuevo), contenido y CSS global

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principio | Evaluación | Estado |
|-----------|------------|--------|
| I. Veracidad | Leyendas derivadas de "Cómo funciona" y beneficios ya publicados; placeholders con ruta si falta la captura; nunca UI dibujada. Los `alt` deben revisarse contra cada captura real al subirla. | ✅ |
| II. Una conversión | El carrusel no agrega CTA; los CTA del hero no cambian. | ✅ |
| III. Contenido separado | Lista de pantallas, leyendas y textos de control en `landing.ts`; estilos con tokens existentes (`fg-2`, `line`, `primary`). | ✅ |
| IV. Simplicidad | Sin dependencias; un componente cliente; sin swipe ni flechas (fuera de alcance). | ✅ |
| V. Accesible | APG Carousel, pausa visible (WCAG 2.2.2), `prefers-reduced-motion`, foco visible, AA en ambos temas, objetivos ≥ 24 px. | ✅ |
| VI. Performance | `next/image`; `preload` solo en la primera (o `fetchPriority` si hay par de temas, según doc); resto diferido; `"use client"` solo en `ScreensCarousel`. | ✅ |
| VII. Español de Chile | Copy con tuteo, sin jerga. | ✅ |
| Restricción técnica: APIs verificadas | `preload`, `loading`, `fetchPriority`, "Theme detection" verificados en `node_modules/next/dist/docs` (ver research R1, R5). | ✅ |

**Post-diseño**: sin cambios; no hay violaciones que justificar.

## Project Structure

### Documentation (this feature)

```text
specs/003-hero-screens-carousel/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/hero-carousel.md
├── checklists/requirements.md
└── tasks.md            # /speckit-tasks
```

### Source Code (repository root)

```text
src/
├── content/landing.ts                     # + HeroScreen, HeroScreens, hero.screens, hero.carousel; − hero.screenshot
├── app/globals.css                        # + reglas [data-carousel]/[data-slide], .screen-light/.screen-dark
└── components/sections/
    ├── Hero.tsx                           # pasa hero.screens a PhoneMockup
    ├── PhoneMockup.tsx                    # servidor: diapositivas + detección claro/oscuro
    └── ScreensCarousel.tsx                # NUEVO, "use client"
public/screens/                            # capturas reales (las sube el owner)
```

**Structure Decision**: se mantiene la estructura de la spec 001/002; un solo archivo nuevo.

## Complexity Tracking

Sin violaciones.
