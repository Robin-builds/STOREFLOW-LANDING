# Modelo de estados: spec 004

No hay datos nuevos ni cambios en `src/content/landing.ts`. Lo que se modela son los **estados
visuales** de tres elementos de interfaz y qué los dispara.

## Tarjeta (`.card-hover`, opcionalmente `.card-ghost`)

| Estado | Disparador | Apariencia |
|--------|------------|------------|
| Reposo | — | Igual que hoy (las `.card-ghost`, sin caja visible) |
| Resaltada | puntero encima (solo dispositivos con hover fino) **o** un descendiente con foco visible | borde `primary`, sombra `card-hover`, elevación −3 px (solo con movimiento permitido); `.card-ghost` además fondo `--card-lit-bg` |

Transiciones: Reposo ⇄ Resaltada, 200 ms `ease-out` (≈ 0 ms con movimiento reducido).

Instancias:

| Sección | Elemento | Clases | Ícono principal (`.card-icon`) |
|---------|----------|--------|-------------------------------|
| Problemas | `li` | `card-hover` | sí (pasa de acento a primario) |
| Beneficios | `li` | `card-hover card-ghost` + `--card-lit-bg: surface-2` | sí |
| Cómo funciona | `li` | `card-hover card-ghost` | sí (no el número de paso) |
| Casos de uso | `li` | `card-hover` | sí |
| Contadores | panel principal | `card-hover` | no (los checks no cambian) |
| Credibilidad | `li` | `card-hover card-ghost` | sí |
| Testimonios | `figure` | `card-hover` | no tiene ícono |

## Ícono principal (`.card-icon`)

Depende por completo del estado de su tarjeta: si la tarjeta está Resaltada, fondo `primary`, ícono
`on-primary` y escala 1.1 (solo con movimiento permitido); si no, como hoy.

## Botón "+" de FAQ (`.faq-toggle`)

| Estado | Disparador | Apariencia |
|--------|------------|------------|
| Cerrado | `details` sin `open` | fondo `surface`, signo `primary`, sin giro (como hoy) |
| Señal leve | Cerrado **y** (puntero sobre el `summary` con hover fino **o** `summary` con foco visible) | fondo tinte 20 % de `primary` sobre `surface`, signo `primary` |
| Abierto | `details[open]` (prevalece sobre la señal leve) | fondo `primary`, signo `on-primary`, girado 45° |

Transiciones: Cerrado ⇄ Señal leve ⇄ Abierto, 200 ms; giro instantáneo con movimiento reducido.
