# Implementation Plan: Identidad de marca, acceso "Ingresar" y modo oscuro

**Branch**: `002-brand-dark-mode` | **Date**: 2026-11-08 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/002-brand-dark-mode/spec.md`

## Summary

Alinear la landing con la marca de la app Android (ícono vectorial, wordmark bicolor STORE/FLOW,
Plus Jakarta Sans, paleta Búnker + Nocturno), agregar "Ingresar" hacia la versión web en header
(≥640px), hero y footer, y ofrecer tema oscuro (por defecto) y claro. El tema se aplica con
`data-theme` en `<html>` fijado por un script inline antes del pintado (patrón oficial de Next 16) y
se tematiza **solo con CSS variables**; el único Client Component nuevo es `ThemeToggle`.

## Technical Context

**Language/Version**: TypeScript 5 strict, Node 22.19
**Primary Dependencies**: next 16.4.5, react 19.3, tailwindcss 4.3.5 — **sin dependencias nuevas**
**Storage**: `localStorage["storeflow-theme"]` en el navegador (solo preferencia de tema)
**Testing**: sin framework; escenarios W1–W19 de [quickstart.md](quickstart.md)
**Target Platform**: navegadores modernos; deploy estático en Vercel (`storeflow-landing`)
**Project Type**: sitio estático de una página (sin cambios de estructura)
**Performance Goals**: Lighthouse móvil Perf ≥ 90, A11y ≥ 95, SEO ≥ 95 en ambos temas
**Constraints**: sin parpadeo de tema; AA en ambos temas; sin scroll horizontal 360/768/1440
**Scale/Scope**: ~20 archivos modificados, 4 creados, 2 eliminados

## Constitution Check (v1.1.0)

| Principio | Cumplimiento | Estado |
|-----------|--------------|--------|
| I. Veracidad | Sin copy nuevo salvo "Ingresar"/selector; la versión web existe (login verificado 200) | ✅ |
| II. Una conversión | "Pruébala gratis" sigue siendo el único `primary`; "Ingresar" es `ghost` (enlace) y no aparece en el header móvil | ✅ |
| III. Contenido separado / tokens desde `ui/theme/` | Todo token en `globals.css`, valores tomados de `ThemeModels.kt` + ícono; textos y URL en `landing.ts` | ✅ |
| IV. Simplicidad | Sin `next-themes`; sin variante `dark:` (no se necesita); 1 Client Component | ✅ |
| V. Mobile-first, AA en claro y oscuro | Tabla de contraste en research R3; regla `--text-muted-on-2` corrige el único par < AA | ✅ |
| VI. Performance | Fuente con `next/font`; script inline ≈300 B; ícono SVG inline; `"use client"` solo en el toggle | ✅ |
| VII. Español de Chile | Textos nuevos con tuteo ("Ingresa a la versión web") | ✅ |
| Restricciones técnicas | APIs verificadas: Tailwind `@custom-variant` (Context7), guía Next 16 "preventing flash" (docs locales) | ✅ |
| Flujo | Rama `002-brand-dark-mode` a partir de la 001 commiteada; sin instalaciones | ⚠️ requiere commit de la 001 (ver abajo) |

**Re-check post-diseño**: sin violaciones. Complexity Tracking no aplica.

## Diferencias respecto del pedido del owner (resueltas)

1. **URL "Ingresar"**: se usa `stockflow-web-eight.vercel.app/login` (la del pedido); spec actualizada.
2. **Botón principal**: se adopta la tabla del owner (oscuro #2EC6DA/#0D1519, claro #0E7490/blanco),
   que reemplaza la clarificación previa (#22D3EE en ambos). Spec FR-012b enmendada.
3. **Header**: 75% de opacidad (pedido) en vez de 80–85%. Spec FR-006 enmendada.
4. **Wordmark**: "STOREFLOW" en mayúsculas ("STORE" + "FLOW"), confirmado por el owner el 2026-11-08.
5. **`public/brand/storeflow-icon.svg` no existe** en el repo: se genera desde el vector de la app.
6. **`app/icon.png`**: el proyecto usa `src/app/`, así que va en `src/app/icon.png`.
7. **Contraste no cubierto en la tabla**: claro `text-3` sobre `surface-2`/`bg-bottom` = 4.34:1 → se
   usa `text-2` ahí (token `--text-muted-on-2`).

## Archivos

### Crear
| Archivo | Propósito |
|---------|-----------|
| `public/brand/storeflow-icon.svg` | Ícono de la app (viewBox 32 32 44 44, fondo transparente) |
| `src/app/icon.png` | Favicon = copia de `StockFlowv00/play-store/ic_launcher_512.png` |
| `src/components/ui/BrandIcon.tsx` | 4 bloques SVG inline (Logo + OG) |
| `src/components/ui/Logo.tsx` | Tile + BrandIcon + wordmark STORE/FLOW |
| `src/components/ui/ThemeToggle.tsx` | `"use client"`: botón sol/luna, `aria-pressed`, persistencia |

### Modificar
| Archivo | Cambio |
|---------|--------|
| `src/app/globals.css` | Tokens de marca y por tema, mapeo `@theme inline`, `color-scheme`, header translúcido con `@supports` |
| `src/app/layout.tsx` | Plus Jakarta Sans, script inline en `<head>`, `suppressHydrationWarning`, `themeColor` por tema |
| `src/app/opengraph-image.tsx` | Colores y logo de marca |
| `src/content/landing.ts` | `URLS.webAppLogin`, `nav.login`, `hero.loginLine`, `footer.loginLabel`, `footer.themeLabel`, `brand.wordmark`, `a11y.themeToggle` |
| `src/components/ui/Button.tsx` | Variantes por tokens (`primary`, `secondary`, `ghost`); se elimina `inverse` |
| `src/components/ui/Section.tsx` | Tonos `base` / `surface` / `surface-2` con tokens nuevos |
| `src/components/sections/Navbar.tsx` | Logo nuevo, Ingresar + toggle desde `sm`, fondo translúcido |
| `src/components/sections/Hero.tsx` | Gradiente de la app, brillo cian, línea "¿Ya usas StoreFlow?" |
| `src/components/sections/PhoneMockup.tsx` | Colores de bisel/placeholder por token |
| `src/components/sections/Credibility.tsx` · `Problems.tsx` · `Benefits.tsx` · `HowItWorks.tsx` · `UseCases.tsx` · `Accountants.tsx` · `Faq.tsx` · `Testimonials.tsx` | Clases a tokens nuevos según mapa de [contracts](contracts/theme-and-brand.md) §3 |
| `src/components/sections/FinalCta.tsx` | Bloque `--brand-ink` con `data-theme="dark"` |
| `src/components/sections/Footer.tsx` | Logo, "Ingresar a la versión web", ThemeToggle, fondo `bg-bottom` |

### Eliminar
`src/app/favicon.ico`, `src/components/ui/Wordmark.tsx`.

### Documentación
```text
specs/002-brand-dark-mode/
├── spec.md · plan.md · research.md · data-model.md · quickstart.md
├── contracts/theme-and-brand.md
├── checklists/requirements.md
└── tasks.md   (/speckit-tasks)
```

## Orden de tareas

0. **(Requiere OK)** Commit de la 001 en `001-storeflow-landing` y crear rama `002-brand-dark-mode`.
1. Assets: `storeflow-icon.svg`, `icon.png`; borrar `favicon.ico`.
2. Tokens en `globals.css` + layout (fuente, script inline, metadata de tema).
3. `landing.ts` (URL y textos nuevos).
4. `BrandIcon`, `Logo`, `ThemeToggle`, `Button`, `Section`.
5. **US1 + US3 núcleo**: Navbar, Hero, FinalCta, Footer (prioridad: identidad y header).
6. Resto de secciones con el mapa de colores.
7. Imagen OG.
8. Validación W1–W19 en ambos temas; deploy a Vercel con tu OK.

**Instalaciones**: ninguna. Todos los cambios usan dependencias ya presentes.
