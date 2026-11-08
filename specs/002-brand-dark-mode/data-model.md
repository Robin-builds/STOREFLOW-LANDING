# Data Model: Identidad de marca y temas

Sin base de datos. Los "datos" son tokens de diseño (CSS), estado de tema en el navegador y copy
nuevo en `src/content/landing.ts`.

## Tokens de diseño (`src/app/globals.css`, único lugar)

### Marca (iguales en ambos temas)
| Token | Valor | Uso |
|-------|-------|-----|
| `--brand-cyan` | #2EC6DA | ícono, "STORE" (oscuro), brillo del hero |
| `--brand-orange` | #F0921E | ícono, "FLOW" |
| `--brand-ink` | #0D1519 | tile del logo, bloque CTA final, "STORE" (claro) |

### Por tema
| Token | Oscuro | Claro | Notas |
|-------|--------|-------|-------|
| `--bg-top` | #131620 | #FFFFFF | inicio del gradiente / fondo base |
| `--bg-mid` | #171B25 | #F8FAFC | |
| `--bg-bottom` | #0F1219 | #F1F5F9 | footer (tono más profundo) |
| `--surface` | #1C2029 | #FFFFFF | tarjetas, secciones alternas, header 75% |
| `--surface-2` | #21252F | #F1F5F9 | FAQ, superficie elevada |
| `--border` | rgb(255 255 255 / .07) | #E2E8F0 | |
| `--text-1` | #F5F5F5 | #0F172A | títulos y texto principal |
| `--text-2` | #D1D5DB | #475569 | párrafos |
| `--text-3` | #9CA3AF | #64748B | texto auxiliar; en claro NO sobre surface-2/bg-bottom |
| `--text-muted-on-2` | = text-3 | = text-2 | texto auxiliar sobre surface-2/bg-bottom (AA en ambos) |
| `--primary` | #2EC6DA | #0E7490 | botón principal, foco, números de paso |
| `--on-primary` | #0D1519 | #FFFFFF | texto sobre primary |
| `--link` | #2EC6DA | #0E7490 | enlaces ("Ingresar") |
| `--accent` | #F0921E | #F0921E | solo rellenos/íconos/bordes |
| `--accent-text` | #F0921E | #B45309 | texto naranja (eyebrow contadores) |
| `--danger` | #EF4444 | #DC2626 | ícono crítico |
| `--ok` | #5DCAA5 | #047857 | checks |
| `--wordmark-store` | = brand-cyan | = brand-ink | "STORE" |
| `color-scheme` | dark | light | |

Fuente: `--font-sans` → Plus Jakarta Sans (`next/font`).
Se mantienen de la spec 001: `--radius-*`, `--shadow-*` (ajustadas a fondo oscuro), `--spacing-section`.

**Selectores**: `:root, [data-theme=dark]` → oscuro; `[data-theme=light]` y
`@media (prefers-color-scheme: light) { :root:not([data-theme]) }` → claro.

## Estado de tema (navegador)

| Campo | Dónde | Valores | Regla |
|-------|-------|---------|-------|
| `data-theme` | atributo de `<html>` | `dark` \| `light` \| ausente (sin JS) | lo fija el script inline antes del pintado |
| `storeflow-theme` | `localStorage` | `dark` \| `light` \| ausente | solo existe tras una elección manual; prevalece sobre el sistema |

Transiciones:
```
primera visita ── sistema light ──▶ light
               └─ sistema dark / sin preferencia ──▶ dark
toggle ──▶ invierte data-theme y guarda storeflow-theme
cambio de preferencia del sistema ──▶ aplica solo si storeflow-theme está ausente
localStorage bloqueado ──▶ toggle funciona en la visita, no persiste
```

## Contenido nuevo (`src/content/landing.ts`)

| Clave | Valor |
|-------|-------|
| `URLS.webAppLogin` | `https://stockflow-web-eight.vercel.app/login` |
| `nav.login` | `{ label: "Ingresar", href: URLS.webAppLogin }` |
| `hero.loginLine` | `{ text: "¿Ya usas StoreFlow?", link: "Ingresa a la versión web" }` |
| `footer.loginLabel` | "Ingresar a la versión web" |
| `brand.wordmark` | `{ first: "STORE", second: "FLOW", accessibleName: "StoreFlow" }` |
| `a11y.themeToggle` | "Modo oscuro" (etiqueta del botón; `aria-pressed` indica si está activo) |
| `footer.themeLabel` | "Tema" (texto visible junto al toggle del footer) |
