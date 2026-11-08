# Feature Specification: Landing page de StoreFlow

**Feature Branch**: `001-storeflow-landing`

**Created**: 2026-11-07

**Status**: Draft

**Input**: User description: "Landing page moderna, orientada a conversión, para StoreFlow, app Android de control de inventario para pymes chilenas. CTA principal 'Pruébala gratis' → Google Play; bloque y CTA para contadores; 12 secciones obligatorias; regla de veracidad estricta (ver constitución v1.0.0)."

## Clarifications

### Session 2026-11-07

- Q: ¿Qué debe responder la FAQ "¿Cuánto cuesta?"? → A: Existen 3 niveles (gratis, base y profesional), pero la landing no muestra montos: la FAQ dice que hay un plan gratis y planes pagados para necesidades mayores, sin cifras.
- Q: ¿Qué debe responder la FAQ "¿Dónde quedan mis datos?"? → A: Se guardan en tu celular y, cuando hay conexión, se respaldan en servidores seguros; los datos de tu empresa están separados de los de cualquier otra y solo los ven los usuarios que tú invitas.
- Q: ¿Qué canal debe abrir el botón "Soy contador"? → A: WhatsApp con mensaje predefinido ("Hola, soy contador y quiero saber más de StoreFlow"); número marcador hasta que el owner lo entregue.
- Q: ¿La barra superior lleva enlaces a secciones con menú móvil, o solo nombre y botón principal? → A: Solo el nombre StoreFlow + "Pruébala gratis"; sin enlaces ni menú desplegable. El acordeón de FAQ es el único elemento interactivo.
- Q: ¿En qué dominio va a vivir la landing? → A: Dominio provisorio de Vercel (`https://storeflow.vercel.app` o el que asigne Vercel), definido en la constante de URLs para cambiarlo al dominio final después.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Dueño de pyme entiende el valor e instala la app (Priority: P1)

Un dueño o encargado de minimarket, ferretería, botillería, distribuidora o bodega llega a la página
desde su celular. En los primeros segundos entiende qué hace StoreFlow (controlar el stock desde el
celular, aunque no haya internet) y toca "Pruébala gratis", que lo lleva a la ficha de Google Play.

**Why this priority**: es la única conversión principal de la página (Principio II). Sin esto, la
landing no cumple su objetivo.

**Independent Test**: abrir la página en un celular de 360px de ancho, leer solo la primera pantalla
y tocar el botón principal; debe abrir la URL de Google Play configurada.

**Acceptance Scenarios**:

1. **Given** un visitante en un celular, **When** carga la página, **Then** ve en la primera pantalla,
   sin hacer scroll, el titular de beneficio, el subtítulo y el botón "Pruébala gratis".
2. **Given** el visitante en cualquier punto de la página, **When** mira la barra superior fija,
   **Then** ve el nombre StoreFlow y el botón principal disponible.
3. **Given** el visitante, **When** toca cualquier botón "Pruébala gratis" (barra, hero o cierre),
   **Then** se abre la misma URL de Google Play definida en un único lugar del contenido.
4. **Given** el visitante, **When** toca "Ver cómo funciona", **Then** la página se desplaza a la
   sección "Cómo funciona" (sin animación si el visitante pidió reducir el movimiento).

---

### User Story 2 - Dueño de pyme se convence leyendo el detalle (Priority: P2)

Un visitante que no instala de inmediato recorre la página: se reconoce en los problemas, ve los
beneficios, entiende los 3 pasos, encuentra su rubro y resuelve dudas en las preguntas frecuentes
antes de instalar.

**Why this priority**: la mayoría de los visitantes necesita más contexto antes de decidir; estas
secciones sostienen la conversión del P1.

**Independent Test**: recorrer la página completa en 360px, 768px y 1440px verificando que todas las
secciones obligatorias están presentes, en orden, legibles y sin scroll horizontal.

**Acceptance Scenarios**:

1. **Given** el visitante, **When** recorre la página, **Then** encuentra en este orden: barra
   superior, hero, credibilidad, problemas, beneficios, cómo funciona, casos por rubro, bloque para
   contadores, (testimonios solo si hay), preguntas frecuentes, llamado final y pie de página.
2. **Given** el visitante usa solo teclado, **When** navega a las preguntas frecuentes, **Then** puede
   abrir y cerrar cada pregunta con Enter o Espacio y ve siempre dónde está el foco.
3. **Given** el visitante abre la pregunta "¿Sirve en iPhone?" o "¿Emite boletas o facturas?",
   **When** lee la respuesta, **Then** esta dice con honestidad que hoy no está disponible.
4. **Given** la lista de testimonios está vacía, **When** se carga la página, **Then** la sección de
   testimonios no aparece y no deja espacio vacío.

---

### User Story 3 - Contador evalúa recomendar StoreFlow (Priority: P3)

Un contador que asesora a 20–50 pymes llega a la página, encuentra un bloque dirigido a él con
razones concretas para recomendar StoreFlow a sus clientes, y toca "Soy contador" para contactar al
equipo.

**Why this priority**: es el canal de crecimiento secundario; importante pero subordinado a la
conversión principal.

**Independent Test**: ubicar el bloque para contadores y tocar "Soy contador"; debe abrir WhatsApp
con el mensaje predefinido.

**Acceptance Scenarios**:

1. **Given** un contador en la página, **When** llega al bloque para contadores, **Then** ve razones
   específicas para recomendar la app a sus clientes, basadas solo en funcionalidades existentes.
2. **Given** el contador, **When** toca "Soy contador", **Then** se abre WhatsApp con el mensaje
   predefinido "Hola, soy contador y quiero saber más de StoreFlow", usando el número definido en el
   único lugar de configuración de URLs.
3. **Given** el bloque de contadores, **When** se compara visualmente con el botón principal, **Then**
   "Soy contador" se ve claramente secundario.

---

### Edge Cases

- Los screenshots reales aún no existen: el mockup del teléfono muestra un marcador neutro con el
  nombre de archivo esperado, nunca una interfaz inventada.
- El visitante tiene activado "reducir movimiento": no hay animaciones ni desplazamiento suave.
- Pantallas muy angostas (360px) con titulares largos: el texto se ajusta sin cortar palabras ni
  generar scroll horizontal.
- JavaScript deshabilitado o lento: todo el contenido y los enlaces siguen visibles y funcionan; solo
  el acordeón de preguntas frecuentes depende de interacción.
- Cambio de URL de Google Play (prueba cerrada → producción): se cambia en un solo lugar y afecta
  todos los botones.
- La URL de política de privacidad o el contacto aún no están definidos: se usan valores marcadores
  claramente identificables para reemplazar.

## Requirements *(mandatory)*

### Functional Requirements

**Conversión y enlaces**

- **FR-001**: La página MUST tener un único objetivo principal, "Pruébala gratis", que lleva a Google
  Play (hoy `https://play.google.com/apps/testing/cl.storeflow.app`).
- **FR-002**: La página MUST ofrecer "Ver cómo funciona" (desplaza a la sección Cómo funciona) y
  "Soy contador" (abre el contacto), ambas visualmente subordinadas a la principal.
- **FR-003**: Todas las URLs de destino (Google Play, contacto de contadores, contacto general,
  política de privacidad) MUST definirse en un único lugar del contenido.

**Estructura**

- **FR-004**: La página MUST contener, en este orden: (1) barra superior fija con solo el nombre
  StoreFlow y el CTA principal (sin enlaces a secciones ni menú desplegable), compacta en móvil; (2) hero con titular de beneficio, subtítulo, CTA principal,
  CTA secundaria y mockup de teléfono Android; (3) credibilidad con 3–4 hechos del producto;
  (4) problemas actuales del cliente; (5) 4–6 beneficios en lenguaje de resultado; (6) cómo funciona
  en 3 pasos; (7) casos de uso para minimarket, ferretería, distribuidora y bodega; (8) bloque para
  contadores con CTA; (9) testimonios condicionales; (10) preguntas frecuentes en acordeón;
  (11) llamado final; (12) pie de página.
- **FR-005**: La sección de problemas MUST cubrir: no saber cuánto se tiene, enterarse del quiebre
  cuando el cliente pide, productos vencidos, mermas sin explicación, dependencia del cuaderno o de
  una persona, internet que falla en la bodega.
- **FR-006**: "Cómo funciona" MUST presentar 3 pasos: crea tu bodega → carga productos escaneando →
  registra entradas y salidas (el stock se actualiza solo).
- **FR-007**: Las preguntas frecuentes MUST incluir al menos: ¿funciona sin internet?, ¿cuánto cuesta?,
  ¿sirve en iPhone?, ¿puedo tener varias bodegas y usuarios?, ¿dónde quedan mis datos?,
  ¿emite boletas o facturas?
- **FR-008**: La sección de testimonios MUST mostrarse solo si la lista de testimonios tiene
  elementos; se entrega vacía.
- **FR-009**: El pie de página MUST mostrar "StoreFlow by chileapps.cl", contacto, enlace a política de
  privacidad y el año actual.
- **FR-010**: El mockup del hero MUST mostrar screenshots reales cuando existan; mientras no existan,
  un marcador neutro con el nombre esperado del archivo.

**Veracidad (Principio I)**

- **FR-011**: El copy MUST mencionar solo funcionalidades existentes: múltiples bodegas por empresa;
  entradas y salidas con stock calculado; historial inmutable con usuario y fecha; escáner de código
  de barras y QR con linterna; alertas de stock bajo y crítico; lotes y vencimientos (primero vence,
  primero sale); funcionamiento sin internet con sincronización posterior; varios usuarios por
  empresa; reporte web de consulta.
- **FR-012**: El copy MUST NOT mencionar ni insinuar: órdenes de compra, facturación/boletas/DTE/SII,
  versión iPhone, alertas por WhatsApp, importación desde Excel, integraciones, precios o planes con
  montos — salvo en una FAQ que responda honestamente que hoy no está disponible.
- **FR-013**: La página MUST NOT incluir métricas de tracción, testimonios inventados, logos de
  clientes ni sellos de prensa.
- **FR-014**: La respuesta a "¿Cuánto cuesta?" MUST decir que hay un plan gratis para empezar y
  planes pagados para negocios con más necesidades, sin mostrar montos, nombres de planes con
  precio ni límites por plan.
- **FR-015**: La respuesta a "¿Dónde quedan mis datos?" MUST decir que se guardan en tu celular y,
  cuando hay conexión, se respaldan en servidores seguros; que los datos de tu empresa están
  separados de los de cualquier otra; y que solo los ven los usuarios que tú invitas. MUST NOT
  nombrar proveedores, países ni certificaciones.

**Tono y lenguaje (Principio VII)**

- **FR-016**: Todo el copy MUST estar en español de Chile con tuteo, sin voseo ni modismos
  rioplatenses, sin jerga técnica ("offline-first", "sync", "SaaS", "cloud", "multi-tenant") y sin
  clichés ("revoluciona", "siguiente nivel", "solución integral").
- **FR-017**: Los titulares MUST ser cortos y orientados a resultados (saber qué hay, no quedarse sin
  stock, no perder mercadería, saber quién movió qué).

**Diseño, accesibilidad y rendimiento (Principios III, V, VI)**

- **FR-018**: Colores, tipografía, radios, sombras y espaciado de secciones MUST definirse en un solo
  lugar editable, con la paleta inicial: primario #2563EB, alerta #F97316, crítico #EF4444,
  OK #16A34A, texto #0F172A / #64748B, fondos #FFFFFF / #F8FAFC.
- **FR-019**: Todo el texto visible MUST vivir separado de la presentación, de modo que cambiar una
  frase no implique tocar los componentes visuales.
- **FR-020**: La página MUST verse correctamente a 360px, 768px y 1440px sin scroll horizontal.
- **FR-021**: Textos y botones MUST cumplir contraste WCAG AA, el foco MUST ser visible y el acordeón
  de preguntas frecuentes MUST operar con teclado.
- **FR-022**: Las animaciones y el desplazamiento suave MUST desactivarse si el visitante pide
  reducir el movimiento.
- **FR-023**: La página MUST incluir título, descripción, vista previa para redes sociales e idioma
  español de Chile declarados. La dirección pública del sitio (hoy el dominio provisorio de
  Vercel) MUST definirse en la misma constante de URLs, de modo que cambiar al dominio final
  implique editar un solo valor.
- **FR-024**: La página MUST ser completamente estática: sin envío de datos, formularios ni
  conexión a servicios propios.

### Key Entities

- **Contenido de la landing**: única fuente de textos, listas (problemas, beneficios, pasos, rubros,
  hechos de credibilidad, FAQs, testimonios) y URLs de destino.
- **Testimonio**: nombre, cargo/negocio, cita; solo datos reales. Lista vacía al inicio.
- **Pregunta frecuente**: pregunta y respuesta honesta.
- **Screenshot**: archivo esperado en la carpeta de pantallas, con texto alternativo descriptivo.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: En un celular de 360px, el titular, el subtítulo y "Pruébala gratis" son visibles sin
  scroll.
- **SC-002**: En una prueba de 5 segundos con 3–5 personas del público objetivo, al menos 4 de 5
  describen correctamente qué hace StoreFlow.
- **SC-003**: Auditoría móvil estándar: rendimiento ≥ 90, accesibilidad ≥ 95, SEO ≥ 95.
- **SC-004**: 0 casos de scroll horizontal en 360px, 768px y 1440px.
- **SC-005**: 100% de las afirmaciones del copy coinciden con la lista de funcionalidades permitidas;
  0 menciones de funcionalidades excluidas fuera de FAQs honestas.
- **SC-006**: Cambiar la URL de Google Play requiere editar exactamente 1 valor y se refleja en el
  100% de los botones principales; lo mismo aplica al dominio del sitio.
- **SC-007**: Todas las preguntas frecuentes se pueden abrir y cerrar usando solo el teclado.
- **SC-008**: El proyecto compila sin errores ni advertencias.

## Assumptions

- Stack definido por la constitución: Next.js (App Router) + TypeScript + Tailwind CSS en Vercel;
  los detalles se resuelven en `/speckit-plan`.
- El contacto para contadores es WhatsApp con un número marcador que el owner reemplaza en la
  constante de URLs. El contacto general del pie de página reutiliza ese mismo canal.
- La URL de política de privacidad parte como marcador en la constante de URLs.
- "Hecho en Chile" y "Datos aislados por empresa" son hechos verificables del producto (los entregó
  el owner como ejemplos de credibilidad).
- La app tiene un plan gratis vigente, lo que respalda "Pruébala gratis".
- El reporte web de consulta se menciona solo como "revisa tu stock desde el computador", sin enlace
  directo al dashboard.
- No se incluye analítica ni seguimiento de visitas (Principio IV); medir conversiones queda fuera de
  este alcance.
- Hay una sola página; la única navegación interna es el CTA "Ver cómo funciona".
