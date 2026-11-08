# Implementation Plan: Estados de interacción (hover, foco y FAQ abierta)

**Branch**: `004-hover-interaction-states` (pendiente de crear; hoy se trabaja sobre `main`) | **Date**: 2026-11-08 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/004-hover-interaction-states/spec.md`

## Summary

Se agregan estados visuales de interacción sin tocar contenido ni JavaScript. Un bloque CSS global
define 4 clases (`.card-hover`, `.card-ghost`, `.card-icon`, `.faq-toggle`) y un token de sombra
nuevo (`--elev-card-hover`). Las 7 secciones solo agregan esas clases. El hover se limita a punteros
finos con hover, el foco de teclado resalta vía `:has(:focus-visible)`, el movimiento (`translate`,
`scale`) solo existe sin movimiento reducido, y la FAQ cambia de color por `details[open]`, sin JS.

## Technical Context

**Language/Version**: TypeScript 5 (strict), React 19.3, CSS

**Primary Dependencies**: Next.js 16.4.5 (App Router), Tailwind CSS 4.3.5. Sin dependencias nuevas.

**Storage**: N/A

**Testing**: sin suite automatizada; `npm run build` (typecheck + lint) y [quickstart.md](./quickstart.md) en navegador

**Target Platform**: navegadores modernos (soporte de `:has()`, `color-mix()`, propiedades `translate`/`scale`/`rotate`), 360 px a 1440 px

**Project Type**: landing estática (web)

**Performance Goals**: sin JS nuevo; transiciones solo en propiedades de composición y pintura; Lighthouse móvil Performance ≥ 90

**Constraints**: CLS 0; AA en claro y oscuro; `prefers-reduced-motion`; sin hover pegado en táctil; solo tokens existentes

**Scale/Scope**: 1 archivo CSS + 8 componentes de sección con cambios de una o dos clases

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principio | Evaluación | Estado |
|-----------|------------|--------|
| I. Veracidad | No cambia ningún texto ni dato. | ✅ |
| II. Una conversión | No agrega CTA; el resaltado del panel de Contadores no compite con "Pruébala gratis" (es un estado transitorio de hover/foco). | ✅ |
| III. Contenido separado | `landing.ts` intacto; estados y token nuevo definidos en un solo lugar (`globals.css`), derivados de tokens de la spec 002. | ✅ |
| IV. Simplicidad | Sin dependencias, sin JS, sin componente nuevo; 4 clases CSS. | ✅ |
| V. Mobile-first y accesible | AA medido en ambos temas (research R7); foco visible intacto y además resalta la tarjeta; reduced-motion sin movimiento; FAQ nativa operable por teclado; sin scroll horizontal a 360 px. | ✅ |
| VI. Performance | Cero JS; animaciones en `translate`/`scale`/`rotate`/sombra/color; sin `"use client"` nuevo. | ✅ |
| VII. Español de Chile | Sin copy nuevo. | ✅ |
| Restricción técnica: APIs verificadas | Tailwind 4.3.5: `hover:` usa `@media (hover: hover)` y `rotate-*` usa la propiedad `rotate` (verificado en `node_modules/tailwindcss`). Ver research R2, R4. | ✅ |

**Post-diseño**: sin cambios; no hay violaciones que justificar.

## Project Structure

### Documentation (this feature)

```text
specs/004-hover-interaction-states/
├── plan.md
├── research.md
├── data-model.md                  # estados visuales (no hay datos nuevos)
├── quickstart.md
├── contracts/interaction-states.md
├── checklists/requirements.md
└── tasks.md                       # /speckit-tasks
```

### Source Code (repository root)

```text
src/
├── app/globals.css                    # + --elev-card-hover (3 bloques de tema), --shadow-card-hover,
│                                      #   bloque "Estados de interacción (spec 004)"
└── components/sections/
    ├── Problems.tsx                   # li: card-hover · ícono: card-icon
    ├── Benefits.tsx                   # li: card-hover card-ghost [--card-lit-bg:var(--surface-2)] · card-icon
    ├── HowItWorks.tsx                 # li: card-hover card-ghost · card-icon (no el número)
    ├── UseCases.tsx                   # li: card-hover · card-icon
    ├── Accountants.tsx                # panel: card-hover (checks sin cambio)
    ├── Credibility.tsx                # li: card-hover card-ghost · card-icon
    ├── Testimonials.tsx               # figure: card-hover
    └── Faq.tsx                        # span "+": faq-toggle, sin transition-transform/duration-200
```

**Structure Decision**: se mantiene la estructura de las specs 001 a 003; ningún archivo nuevo en `src/`.

## Riesgos y verificaciones clave

- **Capas de CSS**: las reglas van sin `@layer` para ganar a las utilidades; en reposo no deben declarar borde/fondo/sombra (research R1).
- **Ítems sin caja**: el margen negativo de `.card-ghost` exige que esos elementos no tengan márgenes/rellenos propios; comparar capturas antes/después en reposo (quickstart #3).
- **Cómo funciona**: la línea entre pasos queda tapada dentro de la caja resaltada; validar que se vea intencional (quickstart #4).

## Complexity Tracking

Sin violaciones.
