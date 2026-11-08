# Research: Secuencia guiada de capturas en el mockup del hero

Fuentes verificadas en la versión instalada (Next 16.4.5, AGENTS.md):
`node_modules/next/dist/docs/01-app/03-api-reference/02-components/image.md`
(secciones `preload`, `loading`, `getImageProps`, "Theme detection").

## R1. Carga de la primera captura (LCP) y del resto

- **Decision**: primera pantalla con `<Image preload>` cuando tiene una sola versión. Si tiene variante
  `-oscuro`, ambas versiones usan `fetchPriority="high"` con `loading` por defecto (`lazy`), sin `preload`.
  Pantallas 2..N: `loading="lazy"` (por defecto) y además `display:none` hasta que el carrusel se "arma"
  tras el evento `load` de la ventana.
- **Rationale**: la doc de `preload` dice no usarlo cuando hay varias imágenes candidatas a LCP; la de
  "Theme detection" dice explícitamente que con dos imágenes (claro/oscuro) no se puede usar `preload`
  ni `loading="eager"` porque cargaría ambas, y recomienda `fetchPriority="high"`. Las pantallas 2..N
  están apiladas en la misma posición que la 1: con solo `loading="lazy"` el navegador las considera
  visibles y las descargaría al inicio compitiendo con el LCP; `display:none` evita esa descarga
  hasta después del `load`.
- **Alternatives considered**: `priority` (deprecado en Next 16, reemplazado por `preload`);
  `<picture>` con `getImageProps` + `media` (no sirve: el tema lo decide `data-theme`, no una media query);
  montar las imágenes 2..N solo en el cliente (obligaría a mover `next/image` y la detección de archivos
  al componente cliente).

## R2. Mecánica del carrusel con el mínimo de cliente

- **Decision**: un único componente cliente `ScreensCarousel` que envuelve el marco (renderizado en el
  servidor y recibido como `children`) y publica el estado en atributos del contenedor:
  `data-active="<índice>"` y `data-armed`. El CSS (globals.css) muestra la diapositiva activa
  (`opacity` + `visibility`) y oculta las demás. El cliente renderiza leyenda, controles y estado anunciado.
- **Rationale**: `next/image`, `fs.existsSync` y el marco quedan en el servidor (Principio VI). Sin JS,
  `data-active="0"` viene del HTML: se ve la primera pantalla completa. `visibility:hidden` saca las
  diapositivas inactivas del árbol de accesibilidad y del orden de tabulación sin JS adicional, y
  transiciona de forma discreta junto a `opacity` para lograr el fundido.
- **Alternatives considered**: pasar `inert`/`aria-hidden` a cada diapositiva desde el cliente (exige
  mover las diapositivas al cliente o manipular el DOM); marco dentro del componente cliente (más JS sin
  necesidad).

## R3. Accesibilidad del carrusel

- **Decision**: patrón "Carousel" de WAI-ARIA APG con controles tipo botón:
  región `section` con `aria-roledescription="carrusel"` y `aria-label`; cada diapositiva
  `role="group"` + `aria-roledescription="pantalla"` + `aria-label="2 de 5"`; indicadores `<button>`
  con `aria-label` ("Mostrar pantalla 2 de 5: Escanea tus productos") y `aria-current` en el activo;
  botón Pausar/Reanudar primero en el orden de foco; anuncios mediante un `<p aria-live="polite">`
  visualmente oculto que solo se rellena en cambios provocados por el visitante (vacío durante el avance automático).
- **Rationale**: APG recomienda `aria-live="off"` mientras rota y que el control de rotación sea el primer
  elemento enfocable; un estado dedicado evita que el lector lea alt + leyenda + etiquetas en cada cambio.
  WCAG 2.2.2 exige un mecanismo de pausa para contenido que se mueve más de 5 s; pausar con hover/foco
  no alcanza en pantallas táctiles.
- **Alternatives considered**: tabs (`role="tablist"`) — válido, pero exige navegación con flechas y más
  código; `aria-live` sobre el contenedor de diapositivas — anuncia también el alt y repite.

## R4. Temporizador, pausa y movimiento reducido

- **Decision**: `setTimeout` de 2500 ms (originalmente 4000; bajado a 2,5 s el 2026-11-08) que se reprograma en cada cambio de índice (no `setInterval`);
  corre solo si `playing && !hovering && !focusWithin && !reducedMotion && document.visibilityState === "visible"`.
  Movimiento reducido leído con `matchMedia("(prefers-reduced-motion: reduce)")` vía `useSyncExternalStore`
  (servidor = "reducido" para no arrancar nada antes de hidratar). Fundido de 500 ms con
  `motion-reduce:transition-none` + la regla global existente. El botón de pausa se oculta con
  `motion-reduce:hidden` (CSS, sin saltos al hidratar).
- **Rationale**: el timeout por índice no acumula saltos en pestañas en segundo plano y reinicia el
  conteo al cambiar manualmente. El patrón `useSyncExternalStore` ya se usa en `ThemeToggle`.
- **Alternatives considered**: animaciones CSS puras con `animation-delay` (no permite pausa por foco ni
  anuncios); Intersection Observer para pausar fuera de pantalla (no lo pide ningún requisito, Principio IV).

## R5. Capturas por tema

- **Decision**: convención `nombre.png` ↔ `nombre-oscuro.png`, detectada en el servidor con `fs.existsSync`.
  Cuando hay par, se renderizan dos nodos con clases `screen-light` / `screen-dark`; el CSS muestra uno
  u otro según `data-theme` (y según `prefers-color-scheme` si `<html>` no tiene `data-theme`, igual que
  los tokens). Sin par, una sola imagen sin clases de tema.
- **Rationale**: es el patrón "Theme detection" de la doc, adaptado a `data-theme` (el tema puede elegirse
  manualmente). Al ser CSS, cambia en vivo con el `ThemeToggle` y no genera desajustes de hidratación.
  Con `loading="lazy"`, la versión oculta (`display:none`) no se descarga.
- **Alternatives considered**: elegir la imagen en el cliente según el tema (parpadeo y desajuste de hidratación).

## R6. Validación de la lista (4 a 6)

- **Decision**: tipo tupla en `landing.ts`:
  `[S, S, S, S] | [S, S, S, S, S] | [S, S, S, S, S, S]` aplicado con `satisfies`.
- **Rationale**: un largo fuera de rango rompe `next build` (typecheck) con un error que nombra el campo,
  sin código en tiempo de ejecución.
- **Alternatives considered**: `throw` en el componente al construir (error menos claro, código extra).
