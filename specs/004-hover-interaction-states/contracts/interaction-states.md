# Contrato UI: clases de estados de interacción

Interfaz entre `src/app/globals.css` (define) y los componentes de sección (consumen). Un componente
solo agrega la clase; nunca reimplementa el efecto con utilidades.

## `.card-hover`

- **Aplicar a**: el elemento que se ve como tarjeta (o la caja que aparecerá en un ítem sin caja).
- **Requiere**: nada más. Si la tarjeta ya tiene borde, MUST ser de 1 px (se recolorea, no cambia de grosor).
- **Garantiza**: estado Resaltado con hover fino o con `:has(:focus-visible)`; borde `--primary`,
  sombra `--elev-card-hover`, `translate: 0 -3px` solo sin movimiento reducido; transición común de 200 ms.
- **No hace**: no vuelve enfocable la tarjeta; no cambia layout.

## `.card-ghost` (siempre junto a `.card-hover`)

- **Aplicar a**: ítems sin caja visible hoy (Beneficios, Cómo funciona, Credibilidad).
- **Garantiza**: borde transparente de 1 px, radio de tarjeta y `padding: 0.75rem` compensado con
  `margin: calc(-0.75rem - 1px)` (compensa relleno y borde: el contenido no se mueve); fondo `var(--card-lit-bg, var(--surface))` solo al resaltarse.
- **Parámetro opcional**: `--card-lit-bg` en el elemento, cuando el fondo de la sección ya es `surface`
  (Beneficios: `[--card-lit-bg:var(--surface-2)]`).
- **Restricción**: el elemento MUST NOT tener utilidades de margen o relleno propias.

## `.card-icon`

- **Aplicar a**: el contenedor del ícono principal, descendiente de un `.card-hover`.
- **Garantiza**: con la tarjeta resaltada, fondo `--primary`, color `--on-primary`, `scale: 1.1` solo sin
  movimiento reducido; misma transición que la tarjeta.
- **No aplicar a**: checks de Contadores, número de paso de Cómo funciona.

## `.faq-toggle`

- **Aplicar a**: el `<span aria-hidden>` del signo "+" dentro de `<summary>`, en un `<details class="group">`.
- **Requiere**: conservar `group-open:rotate-45`; quitar `transition-transform duration-200` (la
  transición la define la clase e incluye `rotate`).
- **Garantiza**: Cerrado / Señal leve / Abierto según [data-model.md](../data-model.md); sin JavaScript.

## Tokens agregados

| Token | Dónde | Uso |
|-------|-------|-----|
| `--elev-card-hover` | 3 bloques de tema (oscuro, claro, claro sin JS) | sombra resaltada |
| `--shadow-card-hover` | `@theme inline` | expone el token como utilidad `shadow-card-hover` |

Ningún color nuevo: todo deriva de `--primary`, `--on-primary`, `--surface`, `--surface-2`.
