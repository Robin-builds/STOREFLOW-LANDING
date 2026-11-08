# Data Model: Secuencia guiada de capturas

Todo vive en `src/content/landing.ts` (Principio III). No hay datos en tiempo de ejecución.

## HeroScreen

| Campo | Tipo | Regla |
|-------|------|-------|
| `src` | `` `/screens/${string}` `` | Captura clara (o única). Debe existir en `public/` para mostrarse; si no, placeholder con la ruta. |
| `alt` | `string` | Describe lo que muestra la captura real; revisarlo al subir el archivo. |
| `width` / `height` | `number` | Dimensiones reales del archivo (capturas actuales: 1080 × 2340, 9:19,5). La variante oscura MUST tener las mismas. |
| `caption` | `string` | Leyenda sin número; el número ("1. ") lo agrega el orden de la lista. Máx. ~32 caracteres para caber en 2 líneas a 248 px. |

Variante oscura: derivada, no declarada. `src` `"/screens/bodega.png"` → `"/screens/bodega-oscuro.png"`.

`HeroScreens` = tupla de 4, 5 o 6 `HeroScreen` (R6).

## HeroCarouselCopy (textos de control)

| Campo | Ejemplo |
|-------|---------|
| `regionLabel` | "Recorrido por las pantallas de StoreFlow" |
| `roleDescription` | "carrusel" |
| `slideRoleDescription` | "pantalla" |
| `slideLabel(n, total)` | "2 de 5" |
| `goTo(n, total, caption)` | "Mostrar pantalla 2 de 5: Escanea tus productos" |
| `announce(n, total, caption)` | "Pantalla 2 de 5: Escanea tus productos" |
| `pause` / `play` | "Pausar recorrido" / "Reanudar recorrido" |
| `pending` | reutiliza `hero.screenshotPending` ("Captura pendiente") |

Las plantillas son funciones puras del archivo de contenido; las usa el componente cliente importando
`landing` directamente (como `ThemeToggle`), así no se pasan funciones del servidor al cliente.

## Estado del carrusel (cliente)

| Estado | Inicial | Cambia con |
|--------|---------|------------|
| `index` | 0 | timeout (avance), indicador |
| `playing` | `true` | botón Pausar/Reanudar; `false` al usar un indicador |
| `hovering` | `false` | `pointerenter` / `pointerleave` (solo puntero `mouse`) |
| `focusWithin` | `false` | `focus` / `blur` con `relatedTarget` fuera de la región |
| `armed` | `false` | `true` tras `window.load` (o de inmediato si ya cargó) |
| `announcement` | `""` | texto de la pantalla al cambiar por acción del visitante |
| `reducedMotion` | `true` en servidor | `matchMedia` (`useSyncExternalStore`) |

Avanza solo si: `playing && !hovering && !focusWithin && !reducedMotion && pestaña visible`.
Siguiente índice: `(index + 1) % total`.
