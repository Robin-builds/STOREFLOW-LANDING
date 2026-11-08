# Feature Specification: Secuencia guiada de capturas en el mockup del hero

**Feature Branch**: `003-hero-screens-carousel`

**Created**: 2026-11-08

**Status**: Draft

**Input**: User description: "Secuencia guiada de capturas en el mockup del hero. El PhoneMockup del hero pasa de 1 captura a una lista ordenada (4 a 6) declarada en el archivo de contenido, cada una con imagen, texto alternativo, dimensiones y una leyenda corta que conecta con el paso o beneficio. Avance automático cada ~4 s con transición suave, puntos o pasos clicables, pausa al pasar el mouse o al enfocar, leyenda visible fuera de la pantalla. Sin avance ni transición con movimiento reducido. Accesible y sin ruido para lectores de pantalla. La primera captura carga con prioridad y el resto en diferido. Si falta un archivo, placeholder con su ruta. Versiones -oscuro en tema oscuro."

## Contexto

Hoy el teléfono del hero muestra una sola captura (`/screens/inicio.png`, aún pendiente). Una sola
pantalla no alcanza para contar cómo se usa StoreFlow. Esta spec convierte el mockup en un recorrido
corto por las pantallas reales de la app, cada una con una leyenda que la conecta con un paso de
"Cómo funciona" o con un beneficio, sin agregar texto que la app no respalde (Principio I).

Durante la implementación el owner subió 6 capturas reales (tema oscuro de la app, 1080×2340) a
`public/screens/`. Si alguna falta, esa pantalla muestra el placeholder con la ruta esperada (nunca UI inventada).

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Ver el recorrido de la app en el hero (Priority: P1)

Un dueño de minimarket entra a la landing desde el celular. Junto al titular ve el teléfono mostrando
una pantalla de la app con una leyenda breve debajo ("1. Crea tu bodega"). Cada pocos segundos la
pantalla cambia sola, con un fundido suave, a la siguiente del recorrido, y la leyenda cambia con ella.

**Why this priority**: es el valor central: entender en segundos cómo se usa la app sin bajar a otras secciones.

**Independent Test**: abrir la landing a 360 px y a 1440 px, esperar sin interactuar y comprobar que
las pantallas avanzan en orden, con leyenda visible y en bucle.

**Acceptance Scenarios**:

1. **Given** la landing recién cargada, **When** el visitante no interactúa, **Then** la primera pantalla y su leyenda se ven de inmediato y cada ~2 s se pasa a la siguiente con un fundido suave.
2. **Given** la última pantalla visible, **When** se cumple el intervalo, **Then** el recorrido vuelve a la primera.
3. **Given** una pantalla cuyo archivo aún no existe, **When** le toca mostrarse, **Then** se ve el placeholder "Captura pendiente" con su ruta esperada, y la leyenda igual se muestra.

---

### User Story 2 - Ir directo a una pantalla y pausar (Priority: P2)

El visitante quiere detenerse en una pantalla ("4. Revisa qué está por acabarse") o saltar a ella.
Bajo el teléfono hay un indicador por pantalla que se puede tocar o activar con teclado, y un botón
para pausar o reanudar el avance. Al pasar el mouse sobre el recorrido o enfocar uno de sus controles,
el avance se detiene mientras dure.

**Why this priority**: sin control, el movimiento automático molesta o impide leer; además es requisito de accesibilidad (poder pausar contenido que se mueve solo).

**Independent Test**: con mouse, teclado y toque, saltar a cada pantalla, pausar/reanudar y comprobar que el avance se detiene al pasar el mouse o al enfocar.

**Acceptance Scenarios**:

1. **Given** el recorrido avanzando, **When** el visitante activa el indicador de la pantalla 3, **Then** se muestra la pantalla 3 con su leyenda y el avance automático queda detenido (el visitante tomó el control).
2. **Given** el recorrido avanzando, **When** el puntero entra en el área del recorrido o un control recibe foco, **Then** el avance se detiene; **When** el puntero sale y el foco abandona el recorrido, **Then** se reanuda (salvo que se haya pausado con el botón o tomado control con un indicador).
3. **Given** el recorrido avanzando, **When** el visitante activa "Pausar", **Then** el avance se detiene y el botón pasa a "Reanudar"; al activarlo se reanuda.
4. **Given** solo teclado, **When** el visitante recorre la página con Tab, **Then** llega al botón de pausa y a cada indicador, con foco visible, y los activa con Enter o Espacio.

---

### User Story 3 - Movimiento reducido y lectores de pantalla (Priority: P2)

Una persona con "reducir movimiento" activado en su sistema ve la primera pantalla quieta, sin avance
automático ni fundidos; puede cambiar de pantalla con los indicadores y el cambio es instantáneo.
Una persona con lector de pantalla oye la región como "carrusel", con un nombre que la describe; los
controles tienen nombres claros ("Mostrar pantalla 2 de 5: Escanea tus productos") y la pantalla
activa se anuncia solo cuando la elige ella, no cada 2 segundos.

**Why this priority**: Principio V de la constitución; un carrusel mal hecho es una de las peores barreras de accesibilidad.

**Independent Test**: emular `prefers-reduced-motion: reduce` y comprobar ausencia de avance y transición; recorrer con lector de pantalla y verificar nombres y anuncios.

**Acceptance Scenarios**:

1. **Given** reducir movimiento activado, **When** carga la landing, **Then** no hay avance automático, no hay botón de pausa (nada que pausar) y los cambios de pantalla son instantáneos.
2. **Given** un lector de pantalla y avance automático en curso, **When** cambia la pantalla sola, **Then** no se anuncia nada.
3. **Given** un lector de pantalla, **When** el visitante activa un indicador o pausa, **Then** se anuncia la pantalla activa (posición, leyenda) una sola vez.
4. **Given** el recorrido, **When** se inspecciona su estructura, **Then** las pantallas no visibles no son alcanzables por el lector de pantalla ni por teclado.

---

### User Story 4 - Capturas según el tema (Priority: P3)

Si el owner sube, además de una captura, su versión en tema oscuro (mismo nombre con sufijo
`-oscuro`), la landing la muestra cuando el visitante está en tema oscuro y la clara en tema claro,
incluso al cambiar de tema con el botón sin recargar.

**Why this priority**: coherencia visual con el modo oscuro de la spec 002; sin capturas oscuras la funcionalidad igual se cumple con la clara.

**Independent Test**: agregar `x.png` y `x-oscuro.png`, alternar el tema y comprobar que cambia la imagen; con solo `x.png`, comprobar que se usa en ambos temas.

**Acceptance Scenarios**:

1. **Given** existen `x.png` y `x-oscuro.png`, **When** el tema es oscuro, **Then** se ve `x-oscuro.png`; **When** es claro, **Then** se ve `x.png`.
2. **Given** existe solo `x.png`, **When** el tema es oscuro, **Then** se ve `x.png`.
3. **Given** existe solo `x-oscuro.png` (falta la clara), **When** el tema es claro, **Then** se ve el placeholder con la ruta de la clara; en tema oscuro se ve la oscura.

---

### Edge Cases

- **Faltan todos los archivos** (estado actual): el recorrido funciona igual mostrando placeholders, cada uno con su ruta.
- **Lista con menos de 4 o más de 6**: el build falla con un mensaje claro (la lista es parte del contenido y se valida al construir).
- **Pestaña en segundo plano**: el avance no acumula saltos; al volver sigue desde donde estaba.
- **Sin JavaScript** o antes de hidratar: se ve la primera pantalla con su leyenda, completa y estable (sin saltos de layout).
- **Leyendas de distinto largo**: el área de la leyenda reserva espacio para que el resto del hero no salte al cambiar de pantalla.
- **Cambio de tema en medio del recorrido**: no reinicia el recorrido ni la pantalla activa.

## Requirements *(mandatory)*

### Functional Requirements

**Contenido**

- **FR-001**: La lista ordenada de pantallas del hero (entre 4 y 6) MUST declararse en el archivo de contenido de la landing; cada pantalla tiene ruta de imagen bajo `/screens/`, texto alternativo, ancho, alto y una leyenda corta.
- **FR-002**: Cada leyenda MUST conectar con un paso de "Cómo funciona" o un beneficio ya declarado en la landing, numerada ("1. …"), y MUST NOT afirmar algo que la app no haga hoy (Principio I).
- **FR-003**: Todos los textos del recorrido (nombre de la región, "Pausar", "Reanudar", nombres de los indicadores, plantilla del anuncio) MUST vivir en el archivo de contenido (Principio III).

**Comportamiento**

- **FR-004**: Al cargar, MUST verse la primera pantalla y su leyenda; el recorrido MUST avanzar solo cada ~2 s, en bucle, con un fundido suave entre pantallas.
- **FR-005**: MUST existir un indicador por pantalla, operable con puntero, toque y teclado, que muestra esa pantalla; el indicador activo MUST distinguirse visualmente sin depender solo del color.
- **FR-006**: Activar un indicador MUST detener el avance automático de forma persistente para esa visita (hasta que el visitante active "Reanudar").
- **FR-007**: MUST existir un botón visible de pausar/reanudar mientras haya avance automático.
- **FR-008**: El avance MUST detenerse mientras el puntero esté sobre el recorrido o el foco esté dentro de él, y reanudarse al salir si no fue pausado explícitamente.
- **FR-009**: La leyenda MUST mostrarse fuera de la pantalla del teléfono (debajo del marco) y MUST reservar su espacio para evitar saltos de layout.
- **FR-010**: Con `prefers-reduced-motion: reduce` MUST NOT haber avance automático ni transición animada; los cambios por indicador son instantáneos y no se muestra el botón de pausa.

**Accesibilidad**

- **FR-011**: El recorrido MUST ser una región con rol de carrusel descrito ("carrusel") y nombre accesible propio.
- **FR-012**: Cada pantalla MUST exponerse como diapositiva con su posición ("2 de 5"); las no activas MUST quedar ocultas a tecnologías de asistencia y fuera del orden de tabulación.
- **FR-013**: Botones e indicadores MUST tener nombre accesible; los indicadores MUST indicar cuál es el actual.
- **FR-014**: Los cambios de pantalla automáticos MUST NOT anunciarse; los provocados por el visitante (indicador, pausa) MUST anunciarse una vez de forma no intrusiva.
- **FR-015**: Contraste AA y foco visible en tema claro y oscuro para leyenda, indicadores y botón (Principio V); objetivos táctiles de al menos 24×24 px.

**Imágenes y rendimiento**

- **FR-016**: Si el archivo de una pantalla no existe, esa pantalla MUST mostrar el placeholder actual ("Captura pendiente" + ruta esperada); MUST NOT dibujarse UI ficticia.
- **FR-017**: Si existe una variante `-oscuro` de una captura, MUST mostrarse en tema oscuro, y la normal en claro; el cambio MUST seguir al cambio de tema en vivo.
- **FR-018**: La primera captura MUST cargarse con prioridad (es el elemento más grande del primer pantallazo); las demás MUST cargarse de forma diferida.
- **FR-019**: La interactividad MUST limitarse al componente mínimo que controla el recorrido; marco, imágenes y detección de archivos MUST resolverse en el servidor/build.
- **FR-020**: MUST NOT agregarse dependencias nuevas (Principio IV).

### Key Entities

- **Pantalla del recorrido**: ruta de la captura (y opcionalmente su variante oscura, derivada por convención de nombre), texto alternativo, dimensiones, leyenda numerada.
- **Recorrido**: lista ordenada de 4 a 6 pantallas + textos de control (nombre de región, pausar, reanudar, nombre de indicador, anuncio).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A 360 px, el titular, la bajada y el CTA principal siguen viéndose sin scroll, igual que antes de esta spec (SC-001 de la spec 001).
- **SC-002**: Al cambiar de pantalla, el desplazamiento de layout del hero es 0 (nada se mueve fuera del teléfono y la leyenda).
- **SC-003**: Un visitante que no interactúa ve todas las pantallas del recorrido en menos de 30 s.
- **SC-004**: El 100 % de los controles del recorrido es operable solo con teclado, con foco visible, en ambos temas.
- **SC-005**: Con movimiento reducido, 0 cambios automáticos de pantalla tras 30 s de espera.
- **SC-006**: Lighthouse móvil se mantiene en Performance ≥ 90, Accessibility ≥ 95 y SEO ≥ 95, y la carga inicial solo descarga con prioridad la primera captura.
- **SC-007**: Revisión visual aprobada a 360 px y 1440 px, en tema claro y oscuro, y build de producción sin errores ni advertencias nuevas.

## Assumptions

- Recorrido de 6 pantallas sobre las capturas reales, con `inicio.png` primera (decisión del owner: es la imagen principal y la que se ve sin JavaScript): 1. Ve tu bodega de un vistazo (`inicio.png`) · 2. Crea tus bodegas (`bodega.png`) · 3. Escanea tus productos (`escanear.png`) · 4. Registra entradas y salidas (`movimiento.png`) · 5. Revisa qué está por acabarse (`alerta-stock.png`) · 6. Cada movimiento queda registrado (`historial.png`). Orden y textos se ajustan en el contenido sin tocar componentes.
- Veracidad: la app no muestra quién hizo cada movimiento, así que ninguna leyenda ni alt de `historial.png` dice "quién movió qué"; la tarjeta "próximos a vencer" de `inicio.png` tiene datos de prueba y no se menciona. La app solo tiene tema oscuro: no hay variantes `-oscuro` y el mecanismo queda listo sin uso.
- Las capturas miden 1080×2340 (9:19,5); el marco del teléfono usa esa misma proporción para no recortarlas.
- La variante oscura se detecta por convención: mismo nombre con `-oscuro` antes de la extensión (`bodega.png` → `bodega-oscuro.png`) y mismas dimensiones.
- Tomar el control con un indicador detiene el avance para esa visita (patrón recomendado de carruseles accesibles); no se persiste entre visitas.
- Intervalo de 2 s (ajustado desde 4 s el 2026-11-08 a pedido del owner) y fundido de ~400 ms; ambos ajustables.
- Fuera de alcance: gestos de deslizar (swipe), flechas anterior/siguiente, capturas en otras secciones, video.
