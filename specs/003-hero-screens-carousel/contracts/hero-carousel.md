# Contrato UI: carrusel de capturas del hero

## Componentes

| Componente | Tipo | Responsabilidad |
|------------|------|-----------------|
| `PhoneMockup` (`src/components/sections/PhoneMockup.tsx`) | Servidor | Recibe `screens` y `pendingLabel`. Detecta en build qué archivos existen (claro y `-oscuro`), arma una diapositiva por pantalla dentro del marco y lo pasa como `children` a `ScreensCarousel` junto con las leyendas. |
| `ScreensCarousel` (`src/components/sections/ScreensCarousel.tsx`) | Cliente (`"use client"`, único nuevo) | Estado, temporizador, pausa, indicadores, leyenda, anuncios. Props: `captions: string[]`, `children: ReactNode`. |

## Estructura DOM esperada

```html
<section data-carousel data-active="0" [data-armed]
         aria-roledescription="carrusel" aria-label="Recorrido por las pantallas de StoreFlow">
  <!-- marco del teléfono (servidor) -->
  <div data-slide="0" role="group" aria-roledescription="pantalla" aria-label="1 de 5">
    <img …> | placeholder
  </div>
  … data-slide="1..N-1"
  <!-- cliente -->
  <p class="leyenda">1. Crea tu bodega</p>          <!-- altura reservada, fuera de la pantalla -->
  <div class="controles">
    <button aria-label="Pausar recorrido">…</button>  <!-- motion-reduce:hidden -->
    <button aria-label="Mostrar pantalla 1 de 5: Crea tu bodega" aria-current="true">…</button> …
  </div>
  <p class="sr-only" aria-live="polite">{anuncio}</p>
</section>
```

Orden de foco: botón de pausa → indicadores (APG: el control de rotación va primero).

## Reglas CSS (globals.css)

- `[data-slide]`: apiladas (absolute inset-0), `opacity:0; visibility:hidden`, transición 500 ms de `opacity` y `visibility`.
- `[data-carousel][data-active="k"] [data-slide="k"]` (k = 0..5): `opacity:1; visibility:visible`.
- `[data-carousel]:not([data-armed]) [data-slide]:not([data-slide="0"])`: `display:none` (no descarga antes de `load`).
- `.screen-dark` oculto por defecto; en tema oscuro se oculta `.screen-light` y se muestra `.screen-dark`
  (`[data-theme="dark"]`, y `:root:not([data-theme])` sin `prefers-color-scheme: light`).

## Imágenes

| Caso | Primera pantalla | Pantallas 2..N |
|------|------------------|----------------|
| Solo clara | `preload` | `loading` lazy (por defecto) |
| Clara + oscura | ambas `fetchPriority="high"`, lazy | ambas lazy |
| Solo oscura | placeholder (`.screen-light`) + oscura (`.screen-dark`) | igual |
| Ninguna | placeholder con `public/screens/…` | igual |

`sizes="(min-width: 1024px) 300px, (min-width: 640px) 280px, 248px"` (sin cambios).
