# Feature Specification: Identidad de marca, acceso "Ingresar" y modo oscuro

**Feature Branch**: `002-brand-dark-mode`

**Created**: 2026-11-08

**Status**: Draft

**Input**: User description: "Iteración visual de la landing de StoreFlow: alinear identidad con la app, mejorar navegación para usuarios existentes y agregar modo oscuro."

## Contexto

La landing (spec 001) usa una paleta y un logo genéricos que no coinciden con la app publicada.
La constitución v1.1.0 exige ahora que los tokens de marca se deriven del tema de la app Android
(Principio III), que el contraste AA se cumpla en tema claro y oscuro (Principio V) y que un acceso
"Ingresar" sea visualmente secundario (Principio II).

**Fuente de verdad de la marca** (app Android `StockFlowv00`, tema por defecto = paleta "Búnker" +
nivel de oscuridad "Nocturno"):

| Rol | Valor | Origen en la app |
|-----|-------|------------------|
| Tile del ícono / tinta de marca | #0D1519 | `ic_launcher_background` |
| Cian del ícono y del wordmark ("STORE") | #2EC6DA | `ic_launcher_foreground`, Dashboard |
| Naranja del ícono y del wordmark ("FLOW") | #F0921E | `ic_launcher_foreground`, Dashboard |
| Primario / primario claro / suave | #0891B2 / #22D3EE / #67E8F9 | `PaletaBunker` |
| Neutro / claro / oscuro | #6B7280 / #9CA3AF / #374151 | `PaletaBunker` |
| Alerta (rojo) | #DC2626 / #EF4444 / #FCA5A5 | `PaletaBunker` |
| Fondo (gradiente) | #131620 → #171B25 → #0F1219 | `Nocturno` |
| Superficie / variante | #1C2029 / #21252F | `Nocturno` |
| Texto primario / secundario / terciario | #F5F5F5 / #D1D5DB / #6B7280 | `Nocturno` |
| Semáforo de stock: ok / bajo / crítico | #5DCAA5 / #EF9F27 / #E24B4A | `Color.kt` |
| Tipografía | Plus Jakarta Sans | `Type.kt` |
| Radios | 6 / 10 / 16 / 50 | `Shape.kt` |

## Clarifications

### Session 2026-11-08

- Q: ¿A qué URL pública lleva "Ingresar"? → A: `https://stockflow-web-eight.vercel.app/login` (definida por el owner en el plan; misma app que `storeflow-dashboard-bice`, pública, verificada 200).
- Q: ¿El wordmark va en mayúsculas como en la app? → A: Sí, "STOREFLOW" ("STORE" cian + "FLOW" naranja), igual que el dashboard de la app.
- Q: ¿Se cambia la tipografía a la de la app? → A: Sí, Plus Jakarta Sans reemplaza a Work Sans.
- Q: En 360px, ¿qué sale del header si no caben los 4 elementos? → A: Bajo 640px el header muestra solo marca + "Pruébala gratis"; "Ingresar" queda en la línea del hero y en el footer, y el selector de tema va al footer. Desde 640px el header tiene los 4.
- Q: ¿De qué color es el botón principal "Pruébala gratis"? → A: (Enmendado por el owner en el plan) Oscuro: fondo #2EC6DA con texto #0D1519 (8.97:1); claro: fondo #0E7490 con texto blanco (5.36:1).
- Q: ¿El selector alterna solo claro/oscuro o incluye "usar la del sistema"? → A: Un botón que alterna claro ↔ oscuro; la elección manual se guarda y prevalece sobre el sistema (sin opción "automático").

## User Scenarios & Testing *(mandatory)*

### User Story 1 - El visitante reconoce la misma marca que la app (Priority: P1)

Un dueño de pyme ve la landing y luego instala la app. Al abrirla reconoce el mismo ícono, los
mismos colores y el mismo nombre: no duda de que es el mismo producto.

**Why this priority**: la coherencia de marca entre landing y app es el motivo principal de esta
iteración y es condición del Principio III.

**Independent Test**: comparar lado a lado la landing en modo oscuro con el ícono y la pantalla de
inicio de la app: mismo ícono, mismos colores de marca, mismo wordmark bicolor.

**Acceptance Scenarios**:

1. **Given** la landing en cualquier tema, **When** se mira el header, **Then** aparece el ícono
   original (4 bloques: 2 cian, 2 naranja) sobre su tile #0D1519 y el wordmark con "STORE" en cian
   y "FLOW" en naranja.
2. **Given** un celular de 360px, **When** carga la página, **Then** el wordmark mide ≈20px de alto
   de letra y el ícono 32px, y se lee a primera vista; en 1440px, ≈24px y 36px.
3. **Given** la pestaña del navegador, **When** carga la página, **Then** el favicon es el ícono
   original de la app.
4. **Given** el footer, **When** se llega al final de la página, **Then** también muestra el ícono
   original y el wordmark bicolor.
5. **Given** el tema oscuro, **When** se recorre la página, **Then** cada sección usa los colores
   asignados en FR-012 y el semáforo conserva su significado (naranja = alerta, cian = acción/marca,
   verde = ok).

---

### User Story 2 - Un usuario existente llega a la versión web (Priority: P2)

Alguien que ya usa StoreFlow entra a la landing buscando revisar su stock desde el computador.
Encuentra "Ingresar" en el header (o en el hero o el footer) y llega al inicio de sesión de la
versión web.

**Why this priority**: hoy no hay camino desde la landing a la versión web; afecta a clientes
actuales, no a la conversión principal.

**Independent Test**: tocar "Ingresar" en el header, en la línea bajo los CTA del hero y en el
footer; los tres abren la misma URL de inicio de sesión.

**Acceptance Scenarios**:

1. **Given** el header en un ancho menor a 640px, **When** se mira, **Then** muestra solo la marca y
   "Pruébala gratis", sin desbordar; "Ingresar" está a la vista en la línea bajo los CTA del hero.
   **Given** un ancho de 640px o más, **Then** el header muestra marca, "Ingresar", selector de tema
   y "Pruébala gratis".
2. **Given** el header, **When** se comparan "Ingresar" y "Pruébala gratis", **Then** "Pruébala
   gratis" es claramente la acción principal (relleno de color) e "Ingresar" es secundaria (contorno,
   fantasma o enlace).
3. **Given** el hero, **When** se mira bajo los CTA, **Then** aparece "¿Ya usas StoreFlow? Ingresa
   a la versión web" con enlace a la misma URL.
4. **Given** el footer, **When** se mira, **Then** aparece "Ingresar a la versión web".

---

### User Story 3 - El visitante elige tema claro u oscuro (Priority: P3)

Un visitante con el celular en modo claro ve la landing en claro; uno sin preferencia la ve en
oscuro. Cualquiera puede cambiar el tema desde el header y, al volver otro día, lo encuentra como
lo dejó.

**Why this priority**: mejora la comodidad y cumple el Principio V, pero la identidad (US1) ya se
entrega con el tema oscuro por defecto.

**Independent Test**: abrir la página con el sistema en claro, en oscuro y sin preferencia; usar el
selector (header en escritorio, footer en móvil); recargar; verificar que no hay destello del tema
equivocado.

**Acceptance Scenarios**:

1. **Given** primera visita con el sistema en modo claro, **When** carga la página, **Then** se
   muestra en tema claro.
2. **Given** primera visita con el sistema en oscuro o sin preferencia declarada, **When** carga la
   página, **Then** se muestra en tema oscuro.
3. **Given** el visitante usa el selector, **When** cambia el tema, **Then** toda la página cambia
   de inmediato y el selector anuncia el tema activo a lectores de pantalla.
4. **Given** el visitante eligió un tema, **When** recarga o vuelve otro día en el mismo navegador,
   **Then** se muestra el tema elegido, sin un destello del otro tema durante la carga.
5. **Given** cualquiera de los dos temas, **When** se revisa el contraste, **Then** textos, botones,
   enlaces e indicador de foco cumplen WCAG AA.

---

### Edge Cases

- El navegador no soporta desenfoque de fondo: el header usa un fondo casi opaco (≥ 95%) para que el
  texto que pasa por debajo no compita con el logo ni los botones.
- El navegador bloquea el almacenamiento local (modo privado estricto): el selector funciona durante
  la visita y la página vuelve a la preferencia del sistema en la siguiente.
- JavaScript deshabilitado: la página se muestra en el tema según la preferencia del sistema (oscuro
  si no hay) y todo el contenido y enlaces funcionan; solo el selector queda inactivo.
- El visitante cambia la preferencia del sistema con la página abierta y no ha elegido tema
  manualmente: la página sigue el cambio.
- Movimiento reducido: el cambio de tema es instantáneo, sin transiciones de color.
- Header bajo 640px: solo marca + "Pruébala gratis"; sin scroll horizontal ni elementos cortados.
- La URL de "Ingresar" cambia (dominio final): se edita en un solo lugar.

## Requirements *(mandatory)*

### Functional Requirements

**Logo y wordmark**

- **FR-001**: Header, footer y favicon MUST usar el ícono original de la app: 4 bloques redondeados
  (2 cian #2EC6DA arriba-izquierda, 2 naranja #F0921E abajo-derecha) sobre un tile #0D1519 con
  esquinas redondeadas, en ambos temas, reproducido fielmente desde el vector de la app.
- **FR-002**: Junto al ícono MUST ir el wordmark bicolor en mayúsculas, "STORE" en cian y "FLOW" en
  naranja, con el mismo peso y estilo que en la app. El nombre accesible sigue siendo "StoreFlow".
- **FR-003**: En el header, el wordmark MUST medir ≈20px en móvil y ≈24px desde escritorio, y el
  ícono 32px y 36px respectivamente.
- **FR-004**: El logotipo provisorio de la spec 001 MUST eliminarse.
- **FR-005**: La imagen para compartir en redes MUST usar el ícono original y los colores de marca.

**Header**

- **FR-006**: El header MUST permanecer fijo arriba con fondo levemente translúcido (75% de opacidad
  del color de superficie del tema) y desenfoque del contenido que pasa por detrás.
- **FR-007**: Si el navegador no soporta desenfoque, el fondo del header MUST ser casi opaco (≥ 95%).
- **FR-008**: El header MUST tener una línea inferior sutil que lo separe del contenido, visible en
  ambos temas.
- **FR-009**: Desde 640px, el header MUST contener, de izquierda a derecha: logo + wordmark; y a la
  derecha "Ingresar" (secundaria), selector de tema y "Pruébala gratis" (principal). Bajo 640px MUST
  mostrar solo logo + wordmark y "Pruébala gratis".

**Acceso "Ingresar"**

- **FR-010**: "Ingresar" MUST llevar al inicio de sesión de la versión web de StoreFlow desde tres
  puntos: header, línea bajo los CTA del hero ("¿Ya usas StoreFlow? Ingresa a la versión web") y
  footer ("Ingresar a la versión web"). Destino: `https://stockflow-web-eight.vercel.app/login`.
  La URL MUST vivir en la constante única de URLs.
- **FR-011**: "Ingresar" MUST ser visualmente secundaria frente a "Pruébala gratis" en todo tamaño de
  pantalla (Principio II). Bajo 640px no aparece en el header; su acceso móvil es la línea del hero
  (visible en la primera pantalla) y el footer.

**Colores por sección**

- **FR-012**: Cada sección MUST usar la paleta de la app así:

  | Sección | Fondo | Acento |
  |---------|-------|--------|
  | Hero | gradiente de fondo de la app | brillo cian sutil detrás del teléfono |
  | Credibilidad | superficie elevada | íconos cian |
  | Problemas ("¿Te suena conocido?") | fondo base | acento naranja (alerta) |
  | Beneficios | superficie | acento cian |
  | Cómo funciona | fondo base | números de paso en cian, más grandes y con más peso que hoy |
  | Casos de uso | superficie neutra | íconos cian |
  | Contadores | fondo base, bloque con superficie y borde/acento naranja | naranja |
  | FAQ | superficie neutra | — |
  | CTA final | bloque #0D1519 en ambos temas | botón primario destacado |
  | Footer | el tono más profundo del fondo del tema | — |

- **FR-012b**: El botón principal "Pruébala gratis" MUST usar el token primario del tema: oscuro
  #2EC6DA con texto #0D1519; claro #0E7490 con texto blanco; en todas sus apariciones (header, hero,
  CTA final). El bloque del CTA final usa siempre los colores del tema oscuro. Las acciones
  secundarias MUST NOT usar fondo primario relleno.
- **FR-013**: Las secciones consecutivas MUST alternar fondo base y superficie para marcar ritmo,
  sin bordes duros entre secciones.
- **FR-014**: Naranja MUST usarse solo con significado de alerta o como color de marca ("FLOW",
  ícono); verde solo para "ok"; rojo solo para crítico. Ningún color se usa como texto si no cumple
  AA sobre su fondo.
- **FR-015**: La tipografía MUST ser la de la app: Plus Jakarta Sans, reemplazando a Work Sans.

**Temas**

- **FR-016**: La landing MUST ofrecer tema oscuro y tema claro. El oscuro reproduce los colores de la
  app (paleta Búnker + Nocturno); el claro es un derivado con los mismos colores de marca sobre
  fondos claros.
- **FR-017**: En la primera visita el tema MUST seguir la preferencia del sistema; sin preferencia
  declarada, oscuro.
- **FR-018**: Un selector MUST permitir cambiar el tema: en el header desde 640px y en el footer en
  todos los anchos. MUST ser operable con teclado y anunciar su estado a lectores de pantalla.
- **FR-019**: El selector es un único botón que alterna claro ↔ oscuro (sin opción "automático").
  La elección manual MUST recordarse entre visitas en el mismo navegador y prevalecer sobre la
  preferencia del sistema; mientras no haya elección manual, la página sigue al sistema.
- **FR-020**: Al cargar, la página MUST mostrarse directamente en el tema correcto, sin destello del
  otro tema.
- **FR-021**: Textos, botones, enlaces e indicador de foco MUST cumplir contraste WCAG AA en ambos
  temas (Principio V).
- **FR-022**: Con movimiento reducido, el cambio de tema MUST ser instantáneo.

**Se mantiene de la spec 001**

- **FR-023**: Copy, estructura de secciones, placeholder del screenshot, veracidad (Principio I),
  rendimiento y accesibilidad de la spec 001 MUST mantenerse; solo se agregan los textos de
  "Ingresar" y del selector de tema.

### Key Entities

- **Tema**: claro u oscuro; origen = preferencia del sistema o elección manual guardada.
- **Tokens de marca**: colores, tipografía y radios derivados del tema de la app (tabla de Contexto),
  definidos en un solo lugar con valores para cada tema.
- **URL de ingreso**: destino de "Ingresar", en la constante única de URLs.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: El ícono de header, footer y favicon coincide con el de la app (mismas formas y
  colores) al compararlos lado a lado.
- **SC-002**: El wordmark se lee sin esfuerzo en 360px y 1440px (≈20px y ≈24px).
- **SC-003**: Los 3 enlaces "Ingresar" abren la misma URL de inicio de sesión, y ese inicio de
  sesión es accesible para un visitante sin cuenta de Vercel.
- **SC-004**: El tema se respeta en las 4 combinaciones (sistema claro / oscuro / sin preferencia /
  elección manual) y persiste tras recargar, sin destello visible del otro tema.
- **SC-005**: 0 fallas de contraste AA en ambos temas (texto, botones, enlaces, foco).
- **SC-006**: 0 casos de scroll horizontal en 360, 768 y 1440px, en ambos temas.
- **SC-007**: Auditoría móvil en ambos temas: rendimiento ≥ 90, accesibilidad ≥ 95, SEO ≥ 95.

## Assumptions

- El tema por defecto de la app (Búnker + Nocturno) es la referencia de marca; las otras paletas de
  la app (Forja, Planta) y niveles (Penumbra, Abismo) no se usan en la landing.
- La app solo define tema oscuro; el tema claro se deriva aquí y no hay equivalente en la app que
  copiar.
- Si un color de la app no alcanza AA como texto o fondo de botón (por ejemplo, texto blanco sobre
  #0891B2 ≈ 3.7:1), se usa la variante de la misma paleta que sí cumple o se ajusta el color del
  texto, sin introducir colores ajenos a la app (aplicado al botón principal en FR-012b).
- El selector de tema es la única interacción nueva en el navegador; la spec 001 no tenía ninguna.
- "Ingresar" cuenta solo como acceso utilitario, no como conversión (Principio II).
- Fuera de alcance: capturas reales, cambios de copy fuera de "Ingresar" y del selector, nuevas
  secciones.
- Rama de trabajo: `002-brand-dark-mode`, creada a partir de la 001 una vez commiteada.

- `storeflow-dashboard.vercel.app` pertenece a otra cuenta de Vercel. La URL de ingreso es
  `stockflow-web-eight.vercel.app/login` (misma app web, pública, verificada 2026-11-08).
