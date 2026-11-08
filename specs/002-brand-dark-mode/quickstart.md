# Quickstart / Validación: identidad, "Ingresar" y modo oscuro

## Levantar

```bash
npm run dev                     # desarrollo
npm run build && npm run start  # para medir (Lighthouse, parpadeo)
```

## Escenarios

| # | Escenario | Cómo | Esperado |
|---|-----------|------|----------|
| W1 | Build limpio | `npm run build`, `npm run lint`, `npx tsc --noEmit` | 0 errores, 0 warnings |
| W2 | Logo | Header, footer y pestaña | ícono de 4 bloques sobre tile #0D1519; "STORE" + "FLOW" bicolor |
| W3 | Tamaño de marca | DevTools 360 y 1440 px | ícono 32/36px, wordmark ≈20/24px |
| W4 | Primera visita, sistema oscuro | DevTools → Rendering → `prefers-color-scheme: dark`, `localStorage.clear()` | tema oscuro |
| W5 | Primera visita, sistema claro | igual con `light` | tema claro |
| W6 | Sin JS | DevTools → deshabilitar JavaScript | sigue al sistema (oscuro por defecto); contenido y enlaces funcionan |
| W7 | Toggle y persistencia | tocar toggle, recargar | cambia de inmediato; tras recargar se mantiene; `localStorage["storeflow-theme"]` presente |
| W8 | Sin parpadeo | con elección "light" y sistema "dark", recargar con CPU 6× más lenta y red "Slow 4G" | nunca se pinta el tema oscuro |
| W9 | Sigue al sistema | sin elección guardada, cambiar emulación del sistema | la página cambia; con elección guardada, no |
| W10 | Toggle accesible | Tab hasta el toggle, Enter/Espacio | cambia tema; lector anuncia "Modo oscuro, presionado/no presionado" |
| W11 | Header móvil | 360 px | solo Logo + "Pruébala gratis"; toggle en footer; "Ingresar" en la línea del hero |
| W12 | Header escritorio | ≥ 640 px | Logo + Ingresar + toggle + CTA; Ingresar claramente secundario |
| W13 | Header translúcido | hacer scroll sobre el hero | contenido difuminado detrás; logo y botones legibles |
| W14 | Ingresar | clic en los 3 puntos | abren `https://stockflow-web-eight.vercel.app/login` |
| W15 | Contraste | Lighthouse Accessibility en ambos temas + revisión de tabla de research R3 | 0 fallas AA |
| W16 | Sin scroll horizontal | script de medición (360/768/1440) en ambos temas | `scrollWidth === clientWidth` |
| W17 | Lighthouse móvil | en ambos temas | Perf ≥ 90, A11y ≥ 95, SEO ≥ 95 |
| W18 | Movimiento reducido | emular `reduce` y usar toggle | cambio instantáneo |
| W19 | Veracidad | búsqueda V13 de la spec 001 sobre `landing.ts` | solo coincidencias honestas |

Para W16/W17 en tema claro: fijar `localStorage["storeflow-theme"]="light"` antes de medir, o
emular `prefers-color-scheme: light` en una sesión limpia.
