# Implementation Plan: Landing page de StoreFlow

**Branch**: `001-storeflow-landing` | **Date**: 2026-11-07 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/001-storeflow-landing/spec.md`

## Summary

Landing de una sola página, 100% estática, para convertir dueños de pymes chilenas a instalar
StoreFlow desde Google Play, con un bloque secundario para contadores (WhatsApp). Se construye con
Next.js 16 (App Router) + TypeScript strict + Tailwind v4, con todo el copy y las URLs en
`src/content/landing.ts`, tokens de diseño en `@theme` de `globals.css`, y **cero componentes de
cliente**: el FAQ usa `<details>` nativo y el desplazamiento usa anclas + CSS.

## Technical Context

**Language/Version**: TypeScript 5 (strict), Node 22.19

**Primary Dependencies**: next 16.4.5, react/react-dom 19 (las de Next 16), tailwindcss 4.3.5 +
@tailwindcss/postcss, eslint + eslint-config-next (todas instaladas por `create-next-app`). **Ninguna
dependencia adicional.**

**Storage**: N/A (contenido estático en código)

**Testing**: sin framework; validación por build, lint, `tsc`, Lighthouse y revisión manual
(ver [quickstart.md](quickstart.md))

**Target Platform**: navegadores modernos móviles y de escritorio; deploy estático en Vercel

**Project Type**: sitio web estático de una página

**Performance Goals**: Lighthouse móvil Perf ≥ 90, A11y ≥ 95, SEO ≥ 95; 0 KB de JS propio de cliente

**Constraints**: sin backend ni formularios; sin scroll horizontal en 360/768/1440 px; contraste AA;
`prefers-reduced-motion`

**Scale/Scope**: 1 página, 12 secciones, ~20 archivos fuente

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principio | Cumplimiento en el plan | Estado |
|-----------|-------------------------|--------|
| I. Veracidad | Copy solo con funcionalidades de FR-011; FAQ honestas (FR-012/014/015); testimonios vacíos y condicionales; búsqueda V13 de términos prohibidos | ✅ |
| II. Una conversión | 3 CTA primarios idénticos a `URLS.googlePlay`; secundarios con estilo `secondary`; URLs solo en `landing.ts` | ✅ |
| III. Contenido separado | Copy/URLs en `landing.ts`; tokens en `@theme` de `globals.css`; componentes sin strings de copy (salvo `aria-*` genéricos derivados del contenido) | ✅ |
| IV. Simplicidad | Sin dependencias extra; sin backend; `Button`, `Container`, `Section`, `Icon` se reutilizan en 3+ lugares; nada de capas extra | ✅ |
| V. Mobile-first y accesible | Diseño desde 360 px; `<details>` nativo para FAQ; foco visible global; reduced-motion; contraste según research R4 | ✅ |
| VI. Performance | `next/font` (Work Sans), `next/image` para screenshots, 0 `"use client"`, OG generada en build | ✅ |
| VII. Español de Chile | Tuteo, sin jerga ni clichés; verificado con V13 | ✅ |
| Restricciones técnicas | Next App Router + TS strict + Tailwind; versiones verificadas en Context7 (research R1–R3); metadata + `lang="es-CL"`; screenshots reales o placeholder | ✅ |
| Flujo | Scaffold e instalación **solo tras confirmación del owner**; rama `001-storeflow-landing`; Conventional Commits | ✅ (pendiente confirmación) |

**Re-check post-diseño**: sin violaciones. No se requiere Complexity Tracking.

## Comandos que requieren confirmación del owner

Ninguno se ejecuta hasta que el owner apruebe (constitución, Flujo de desarrollo):

```powershell
# 1. Scaffold en carpeta temporal (la raíz ya tiene .specify/, .claude/, specs/)
npx create-next-app@16.4.5 _scaffold --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --no-react-compiler --no-cache-components --disable-git --no-agent-feedback

# 2. Mover el contenido a la raíz y borrar la carpeta temporal (incluye node_modules ya instalado)
Get-ChildItem -Force _scaffold | Move-Item -Destination . ; Remove-Item _scaffold

# 3. Repositorio git y rama de la spec
git init -b main ; git checkout -b 001-storeflow-landing
```

`create-next-app` ejecuta `npm install` internamente. No se instala nada más.

## Project Structure

### Documentation (this feature)

```text
specs/001-storeflow-landing/
├── plan.md              # Este archivo
├── research.md          # Fase 0
├── data-model.md        # Fase 1
├── quickstart.md        # Fase 1
├── contracts/
│   └── landing-content.md
├── checklists/
│   └── requirements.md
└── tasks.md             # Fase 2 (/speckit-tasks)
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── layout.tsx            # <html lang="es-CL">, Work Sans, metadata (metadataBase = URLS.site)
│   ├── page.tsx              # Compone las 12 secciones en orden
│   ├── globals.css           # @import "tailwindcss"; @theme con TODOS los tokens; foco y reduced-motion
│   ├── opengraph-image.tsx   # Imagen OG 1200×630 generada en build (next/og)
│   ├── robots.ts             # robots.txt
│   ├── sitemap.ts            # sitemap.xml
│   └── favicon.ico           # del scaffold (placeholder)
├── content/
│   └── landing.ts            # ÚNICA fuente de copy, listas, FAQs, testimonios y URLS
└── components/
    ├── ui/
    │   ├── Button.tsx        # <a> con variantes primary/secondary (navbar, hero, contadores, CTA final)
    │   ├── Container.tsx     # ancho máximo + gutters (todas las secciones)
    │   ├── Section.tsx       # padding vertical de sección + fondo + título H2 opcional
    │   └── Icon.tsx          # set mínimo de SVG inline por nombre
    └── sections/
        ├── Navbar.tsx
        ├── Hero.tsx
        ├── PhoneMockup.tsx   # marco CSS + next/image o placeholder (verifica archivo en build)
        ├── Credibility.tsx
        ├── Problems.tsx
        ├── Benefits.tsx
        ├── HowItWorks.tsx
        ├── UseCases.tsx
        ├── Accountants.tsx
        ├── Testimonials.tsx  # null si no hay testimonios
        ├── Faq.tsx           # <details>/<summary>
        ├── FinalCta.tsx
        └── Footer.tsx

public/
└── screens/                  # screenshots reales (los deja el owner); .gitkeep
```

Archivos del scaffold que se eliminan: `public/*.svg` de ejemplo (next, vercel, file, globe, window)
y el contenido demo de `page.tsx`/`globals.css`. Se conserva `AGENTS.md`/`CLAUDE.md` si el
scaffold los genera.

**Structure Decision**: proyecto único Next.js con `src/`. Secciones separadas por archivo
(pedido explícito); componentes base solo los reutilizados 3+ veces.

## Orden de implementación (prioridad)

1. Scaffold + limpieza + tokens + layout/metadata (base).
2. `landing.ts` completo (copy revisado contra Principios I y VII).
3. **Navbar, Hero, PhoneMockup, Button** — pulidos (prioridad del owner: hero, CTA y jerarquía).
4. FinalCta (segundo punto de conversión).
5. Resto de secciones en orden de página.
6. OG image, robots, sitemap.
7. Validación V1–V13 del quickstart.

## Complexity Tracking

Sin violaciones de la constitución; sección no aplica.
