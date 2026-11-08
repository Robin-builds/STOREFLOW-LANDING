# Contrato: tema, marca y acceso "Ingresar"

## 1. Contrato de tema (navegador)

| Elemento | Contrato |
|----------|----------|
| Atributo | `document.documentElement.dataset.theme ∈ {"dark","light"}` tras el script inline |
| Persistencia | `localStorage["storeflow-theme"] ∈ {"dark","light"}`; escrito solo por el toggle |
| Prioridad | elección guardada > `prefers-color-scheme: light` > oscuro |
| Sin JS | sin atributo; CSS aplica oscuro, o claro si el sistema lo pide |
| Script inline | en `<head>` antes de cualquier CSS dependiente de pintado; todo dentro de `try/catch`; no lanza errores aunque `localStorage` o `matchMedia` fallen |
| Hidratación | `<html suppressHydrationWarning>`; ningún otro elemento depende del tema en el render |

## 2. Componentes nuevos o modificados

| Componente | Tipo | Props | Garantías |
|------------|------|-------|-----------|
| `BrandIcon` | Server | `className?` | SVG inline de los 4 bloques (viewBox 32 32 44 44), `aria-hidden` |
| `Logo` | Server | `size: "header" \| "footer"` | tile `--brand-ink` (radio 22%) + `BrandIcon` + wordmark "STORE"/"FLOW"; `aria-label` "StoreFlow"; tamaños: ícono 32/36px, texto 20/24px (móvil/sm+) |
| `ThemeToggle` | **Client** | `className?` | botón 40×40, `aria-label` de `landing.a11y.themeToggle`, `aria-pressed` = oscuro activo; foco visible; funciona en header y footer a la vez |
| `Button` | Server | variantes `primary` \| `secondary` \| `ghost` | `primary` = `bg-primary text-on-primary`; `ghost` = texto `--link`, sin relleno (para "Ingresar") |
| `Navbar` | Server | — | `<640px`: Logo + CTA; `≥640px`: Logo + Ingresar (ghost) + ThemeToggle + CTA |
| `Hero` | Server | — | línea `hero.loginLine` bajo los CTA, enlace a `URLS.webAppLogin` |
| `Footer` | Server | — | Logo, "Ingresar a la versión web", ThemeToggle con etiqueta visible |
| `FinalCta` | Server | — | contenedor con `data-theme="dark"` (siempre oscuro) sobre `--brand-ink` |

Se elimina `Wordmark.tsx` (spec 001).

## 3. Mapa sección → tokens (FR-012/013)

| Sección | Fondo | Acento |
|---------|-------|--------|
| Hero | gradiente `bg-top → bg-mid → bg-bottom` | radial `--brand-cyan` ~15% detrás del teléfono |
| Credibilidad | `surface-2` (elevada) | íconos `--primary` |
| Problemas | `bg-top` | íconos `--accent` sobre `--accent`/12% |
| Beneficios | `surface` | íconos `--primary` |
| Cómo funciona | `bg-top` | números 56px `bg-primary text-on-primary`, peso 800 |
| Casos de uso | `surface` | íconos `--primary` |
| Contadores | `bg-top`; bloque `surface-2` con borde `--accent`/40 | eyebrow `--accent-text`, checks `--ok` |
| FAQ | `surface` (tarjeta `surface-2`) | — |
| CTA final | bloque `--brand-ink` (tema oscuro fijo) | botón `primary` |
| Footer | `bg-bottom` | texto `--text-muted-on-2` |

Alternancia base/superficie sin bordes duros entre secciones.

## 4. Enlaces "Ingresar"

| Punto | Texto | Destino | Visibilidad |
|-------|-------|---------|-------------|
| Header | `nav.login.label` | `URLS.webAppLogin` | solo `≥640px` |
| Hero | `hero.loginLine` | `URLS.webAppLogin` | siempre |
| Footer | `footer.loginLabel` | `URLS.webAppLogin` | siempre |

Externos: `target="_blank" rel="noopener noreferrer"` + aviso `sr-only` de pestaña nueva.
