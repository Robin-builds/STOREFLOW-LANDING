# Feature Specification: Estados de interacción (hover, foco y FAQ abierta) en la landing

**Feature Branch**: `004-hover-interaction-states`

**Created**: 2026-11-08

**Status**: Draft

**Input**: User description: "Mejoras visuales de interacción (hover y estados) en la landing de StoreFlow. Objetivo: que la página se sienta más viva y responda visualmente cuando el usuario pasa el mouse o interactúa, sin cambiar contenido, estructura ni textos. 1) Hover en tarjetas de Problemas, Beneficios, Cómo funciona, Casos de uso, Contadores, Credibilidad y Testimonios: elevación leve, sombra más marcada y borde con el color primario, transición ~200 ms igual en todas, mismo efecto con foco de teclado. 2) Íconos que reaccionan al hover de su tarjeta: escala ~1.1 y/o fondo primario con ícono en contraste. 3) Botón + de Preguntas frecuentes: al abrir, fondo primario e ícono en contraste; al cerrar vuelve; señal leve al pasar el mouse sobre una pregunta cerrada; mantener acordeón nativo. Transversal: AA en claro y oscuro, prefers-reduced-motion sin movimiento, sin hover pegado en táctil, sin CLS, animar solo transform/opacity/color/sombra, solo tokens existentes (spec 002). Fuera de alcance: contenido, nuevas secciones, carrusel del hero (spec 003)."

## Contexto

Hoy la landing es correcta pero estática: las tarjetas y los íconos no responden al puntero y el
botón "+" de Preguntas frecuentes solo gira al abrir. Esta spec agrega estados visuales de
interacción para que la página se sienta viva y para que el visitante perciba con claridad qué está
mirando o qué pregunta tiene abierta. No cambia ningún texto, sección ni orden (Principios I y III),
no agrega dependencias (Principio IV) y respeta accesibilidad y movimiento reducido (Principio V).

Estado actual relevante (para delimitar alcance):

- **Problemas**, **Casos de uso** y **Testimonios** ya se ven como tarjetas (fondo, borde y esquinas redondeadas).
- **Beneficios**, **Cómo funciona** y **Credibilidad** son listas de ítems con ícono, sin caja visible.
- **Contadores** es un único panel grande con una lista de motivos (con ícono de check) y un botón.
- **Testimonios** hoy no se muestra porque no hay testimonios reales cargados (Principio I); los estados aplican cuando se muestre.

## Clarifications

### Session 2026-11-08

- Q: Beneficios, Cómo funciona y Credibilidad no tienen forma de tarjeta y Contadores es un único panel; ¿cómo se les aplica el resaltado? → A: Esos ítems reciben borde y fondo invisibles en reposo que aparecen al resaltarse (mismo efecto que las tarjetas visibles, sin cambiar la apariencia en reposo); el panel de Contadores se trata como una sola tarjeta.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Las tarjetas responden al mouse y al teclado (Priority: P1)

Un dueño de minimarket revisa la landing en el computador. Al pasar el mouse sobre una tarjeta de
"Problemas" o "Casos de uso", la tarjeta sube levemente, su sombra se marca más y su borde toma el
color de la marca. Al sacar el mouse, vuelve suavemente a su estado normal. Un visitante que navega con
teclado ve el mismo resaltado cuando el foco está dentro de una tarjeta.

**Why this priority**: las tarjetas son la mayor superficie de la página; su respuesta es lo que más
aporta a la sensación de página "viva" y ayuda a seguir la lectura bloque a bloque.

**Independent Test**: en escritorio, pasar el mouse por cada tarjeta de cada sección incluida y
comprobar elevación, sombra y borde de marca con la misma duración; repetir con Tab en la tarjeta que
contiene un elemento enfocable (panel de Contadores) y comprobar el mismo resaltado.

**Acceptance Scenarios**:

1. **Given** una tarjeta en reposo, **When** el puntero entra en ella, **Then** en ~200 ms sube unos pocos píxeles, su sombra se intensifica y su borde pasa al color primario de la marca.
2. **Given** una tarjeta resaltada, **When** el puntero sale, **Then** vuelve a su estado de reposo con la misma transición.
3. **Given** navegación con teclado, **When** el foco visible queda en un elemento dentro de una tarjeta, **Then** la tarjeta muestra el mismo resaltado que con el mouse, además del indicador de foco propio del elemento.
4. **Given** cualquier tarjeta de cualquier sección incluida, **When** se resalta, **Then** la duración, la distancia de elevación y el estilo del borde son idénticos a los de las demás.
5. **Given** una tarjeta resaltada, **When** se mide la página, **Then** ningún elemento vecino cambia de posición ni de tamaño.

---

### User Story 2 - Los íconos acompañan el resaltado de su tarjeta (Priority: P2)

Al pasar el mouse sobre una tarjeta, su ícono crece levemente y su contenedor se llena con el color
primario, con el ícono en el color de contraste. El efecto ocurre al pasar sobre cualquier parte de la
tarjeta, no solo sobre el ícono, y va sincronizado con la tarjeta.

**Why this priority**: refuerza el resaltado de la tarjeta y lleva la mirada al ícono, pero depende de
que exista el resaltado de tarjeta (US1).

**Independent Test**: pasar el mouse por el texto de una tarjeta (lejos del ícono) y comprobar que el
ícono escala y cambia de fondo al mismo tiempo que la tarjeta se eleva, en tema claro y oscuro.

**Acceptance Scenarios**:

1. **Given** una tarjeta con ícono en reposo, **When** el puntero entra en cualquier punto de la tarjeta, **Then** el ícono escala a ~1.1 y su contenedor toma el color primario con el ícono en el color de contraste, en la misma transición que la tarjeta.
2. **Given** el ícono resaltado, **When** el puntero sale de la tarjeta, **Then** el ícono y su contenedor vuelven a su estado original.
3. **Given** tema claro o tema oscuro, **When** el ícono está resaltado, **Then** el ícono se distingue de su fondo con contraste suficiente para elementos gráficos (≥ 3:1).
4. **Given** un ícono que en reposo usa el color de acento (naranja, sección Problemas), **When** se resalta, **Then** pasa al mismo tratamiento primario que el resto, para mantener consistencia y contraste.

---

### User Story 3 - El botón "+" de Preguntas frecuentes indica qué pregunta está abierta (Priority: P2)

El visitante abre una pregunta frecuente. Además de girar, el botón "+" se llena con el color primario
y el signo pasa al color de contraste, de modo que se distingue de un vistazo qué preguntas están
abiertas. Al cerrarla, el botón vuelve a su estado original. Al pasar el mouse sobre una pregunta
cerrada, el botón toma un tono intermedio del primario como señal de que se puede abrir.

**Why this priority**: mejora la orientación en una sección muy consultada, pero es independiente de
las tarjetas y puede entregarse por separado.

**Independent Test**: abrir y cerrar varias preguntas con mouse, teclado (Enter/Espacio) y toque;
comprobar el color del botón en cada estado y que el acordeón sigue funcionando con JavaScript desactivado.

**Acceptance Scenarios**:

1. **Given** una pregunta cerrada, **When** el visitante la abre, **Then** el botón gira como hoy y además su fondo pasa al color primario con el signo en el color de contraste.
2. **Given** una pregunta abierta, **When** el visitante la cierra, **Then** el botón vuelve a su rotación y colores originales.
3. **Given** una pregunta cerrada, **When** el puntero pasa sobre la fila de la pregunta, **Then** el botón muestra un tono intermedio del primario, claramente más leve que el estado abierto.
4. **Given** solo teclado, **When** el foco visible está en una pregunta cerrada, **Then** el botón muestra la misma señal leve que con el mouse.
5. **Given** JavaScript desactivado, **When** el visitante abre y cierra preguntas, **Then** el acordeón funciona y los estados de color se aplican igual.
6. **Given** varias preguntas abiertas a la vez, **When** se observa la lista, **Then** cada botón refleja su propio estado (abierto/cerrado) de forma independiente.

---

### Edge Cases

- **Pantallas táctiles**: al tocar una tarjeta o una pregunta y seguir haciendo scroll, no queda ninguna tarjeta elevada ni botón "+" en tono de hover; los efectos de "pasar el mouse" solo se aplican en dispositivos con puntero que permite hover. El estado "abierta" de la FAQ sí se ve en táctil, porque no depende del hover.
- **Movimiento reducido**: con la preferencia del sistema activada, no hay elevación, escala ni giro; solo cambian colores, borde y sombra, de forma inmediata o con un fundido de color.
- **Tema forzado oscuro dentro de la página** (bloque que siempre se ve oscuro): si contiene tarjetas o íconos incluidos, usan los colores del tema oscuro.
- **Pregunta abierta y con mouse encima**: prevalece el estado "abierta" (no se mezcla con el tono intermedio).
- **Clic en una pregunta con el mouse**: no se muestra el indicador de foco de teclado; sí el de estado abierto.
- **Sección Testimonios vacía**: no se muestra; no hay nada que verificar hasta que existan testimonios reales.
- **Ítems sin caja (Beneficios, Cómo funciona, Credibilidad)**: en reposo se ven exactamente como hoy; al resaltarse aparece la caja sin que el texto ni el ícono se muevan de lugar (salvo la elevación común). En Cómo funciona, la línea que une los pasos no debe quedar tapada de forma extraña por el fondo de la tarjeta resaltada.
- **Ventana estrecha (360 px)**: la elevación y la escala del ícono no generan scroll horizontal ni se recortan contra el borde de la sección.
- **Modo de alto contraste del sistema**: los estados no deben ocultar textos ni bordes; si el sistema reemplaza colores, el contenido sigue legible.

## Requirements *(mandatory)*

### Functional Requirements

**Tarjetas**

- **FR-001**: Las tarjetas de las secciones Problemas, Beneficios, Cómo funciona, Casos de uso, Contadores, Credibilidad y Testimonios MUST mostrar un estado resaltado al pasar el puntero, compuesto por: elevación de unos pocos píxeles (entre 2 y 4 px), sombra más marcada que en reposo y borde en el color primario de la marca.
- **FR-001a**: Los ítems de Beneficios, Cómo funciona y Credibilidad, que hoy no tienen forma de tarjeta, MUST verse igual que hoy en reposo (borde y fondo invisibles) y MUST mostrar al resaltarse el mismo borde de marca, fondo de tarjeta, sombra y elevación que las tarjetas visibles. El espacio interior necesario para ese borde y fondo MUST existir ya en reposo, de modo que aparecer el resaltado no mueva el contenido.
- **FR-001b**: El panel de Contadores MUST tratarse como una sola tarjeta: se resalta completo al pasar el puntero sobre él o al tener foco visible su botón.
- **FR-002**: La transición entre reposo y resaltado MUST durar ~200 ms y MUST ser la misma (duración y curva) en todas las tarjetas incluidas.
- **FR-003**: Una tarjeta MUST mostrar el mismo resaltado cuando un elemento dentro de ella tenga foco visible de teclado. Las tarjetas sin elementos interactivos MUST NOT volverse enfocables solo para recibir este efecto.
- **FR-004**: El resaltado MUST NOT cambiar la posición ni el tamaño de ningún elemento de la página (el borde de marca reemplaza al borde existente sin cambiar su grosor).

**Íconos**

- **FR-005**: El ícono principal de cada tarjeta incluida MUST, mientras la tarjeta esté resaltada (por puntero o foco), escalar a ~1.1 y su contenedor MUST tomar el color primario con el ícono en el color de contraste del primario.
- **FR-006**: El resaltado del ícono MUST activarse al pasar sobre cualquier parte de la tarjeta (no solo sobre el ícono) y MUST sincronizarse con la transición de la tarjeta.
- **FR-007**: Los íconos que no son el ícono principal de una tarjeta (p. ej. los checks de la lista de Contadores, el número de paso de Cómo funciona) MUST NOT cambiar.

**Preguntas frecuentes**

- **FR-008**: Al abrir una pregunta, su botón "+" MUST, además de girar como hoy, pasar a fondo primario con el signo en el color de contraste del primario.
- **FR-009**: Al cerrar una pregunta, su botón MUST volver a su estado original (rotación y colores).
- **FR-010**: Con una pregunta cerrada, al pasar el puntero sobre su fila o al tener foco visible de teclado, el botón MUST mostrar un tono intermedio del primario, visiblemente más leve que el estado abierto.
- **FR-011**: El acordeón MUST seguir siendo el nativo del navegador: se abre y cierra con mouse, toque, Enter y Espacio, y funciona con JavaScript desactivado. Los estados de color MUST funcionar también sin JavaScript.

**Transversales**

- **FR-012**: Todos los estados (reposo, resaltado, abierto, señal leve) MUST cumplir contraste WCAG AA en tema claro y oscuro: texto ≥ 4.5:1 y elementos gráficos (íconos, signo "+", borde de marca contra el fondo) ≥ 3:1.
- **FR-013**: Con movimiento reducido activado, MUST NOT haber elevación, escala ni giro animados; solo se aplican cambios de color, borde y sombra.
- **FR-014**: Los efectos de "pasar el puntero" MUST aplicarse solo en dispositivos cuyo puntero permite hover; en pantallas táctiles MUST NOT quedar estados de hover persistentes tras tocar.
- **FR-015**: Las transiciones MUST limitarse a propiedades de desplazamiento/escala, opacidad, color y sombra; MUST NOT animarse propiedades que provoquen recálculo de layout.
- **FR-016**: Todos los colores usados MUST provenir de los tokens de tema existentes (spec 002); MUST NOT introducirse colores nuevos fuera del sistema. Se permite un token de sombra nuevo para el estado resaltado, siempre que use los mismos tonos base que la sombra de tarjeta existente y se defina en ambos temas. Un tono intermedio del primario MUST obtenerse mezclando el token primario con el fondo de su superficie (sin valores hexadecimales nuevos).
- **FR-017**: El contenido, el orden de las secciones, los textos y el carrusel del hero MUST permanecer sin cambios.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: El 100% de las tarjetas incluidas muestran el resaltado al pasar el mouse y al tener foco interno, con la misma duración (~200 ms ± 20 ms) en una revisión sección por sección.
- **SC-002**: El desplazamiento acumulado del layout (CLS) de la página sigue en 0 al recorrer con el mouse todas las tarjetas y abrir/cerrar todas las preguntas.
- **SC-003**: El 100% de los pares de color de los estados nuevos cumplen AA (4.5:1 texto, 3:1 gráficos) en tema claro y oscuro, verificados con una herramienta de contraste.
- **SC-004**: Con movimiento reducido activado, 0 elementos se desplazan, escalan o giran al interactuar.
- **SC-005**: En un dispositivo táctil, tras tocar cualquier tarjeta o pregunta y hacer scroll, 0 elementos quedan en estado de hover.
- **SC-006**: La auditoría móvil de rendimiento y accesibilidad mantiene Performance ≥ 90 y Accessibility ≥ 95 (sin bajar respecto de antes del cambio).
- **SC-007**: Las preguntas frecuentes se abren y cierran correctamente con JavaScript desactivado, mostrando el estado de color abierto/cerrado.
- **SC-008**: Una persona que mira la lista de preguntas identifica en menos de 2 segundos cuáles están abiertas solo por el color del botón.

## Assumptions

- Las tarjetas no se vuelven enfocables por sí mismas: hoy no contienen enlaces salvo el panel de Contadores (botón "Soy contador"). El resaltado por teclado aplica cuando un elemento interno tiene foco visible; en tarjetas sin elementos interactivos solo existe el resaltado por puntero.
- En la sección Problemas, el ícono pasa del naranja de acento al primario al resaltarse: el naranja con ícono en blanco no alcanza 3:1, y usar el primario mantiene un solo lenguaje de resaltado en toda la página.
- La elevación se fija en el rango de 2 a 4 px; el valor exacto se decide en el plan, igual para todas las tarjetas.
- El "tono intermedio del primario" del botón "+" es el primario mezclado con la superficie (mismo token), no un color nuevo.
- La señal leve del botón "+" también aparece con foco visible de teclado (no solo con mouse), por coherencia con el requisito de foco de las tarjetas.
- El bloque de CTA final y el hero quedan fuera de alcance (no tienen tarjetas incluidas en la lista del usuario).
- No se agregan dependencias: los estados se resuelven con los estilos del proyecto.
- Depende de los tokens de tema de la spec 002 (primario, contraste del primario, superficie, borde, sombra de tarjeta) en claro y oscuro.
