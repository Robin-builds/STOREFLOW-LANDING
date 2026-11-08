<!--
Sync Impact Report
- Versión: 1.0.0 → 1.1.0 (MINOR: se amplían materialmente reglas existentes)
- Principios modificados:
  - II. Una conversión principal: + regla para accesos utilitarios ("Ingresar")
  - III. Contenido separado de la presentación: + tokens de marca derivados de `ui/theme/` de la app Android
  - V. Mobile-first y accesible: contraste AA ahora exigido en tema claro Y oscuro
- Secciones añadidas: ninguna
- Secciones eliminadas: ninguna
- Impacto en specs existentes: 001-storeflow-landing no tiene tema oscuro (incumple V) y su paleta
  no se ha verificado contra `ui/theme/` (III). Requiere spec de seguimiento.
- TODOs: ninguno
-->

# StoreFlow Landing Constitution

## Core Principles

### I. Veracidad del contenido (NON-NEGOTIABLE)
- Todo lo que la landing afirma MUST existir hoy en la app publicada en Google Play.
- MUST NOT incluir métricas de tracción, testimonios, logos de clientes, sellos de prensa ni precios que no sean reales y verificables.
- La sección de testimonios MUST renderizarse solo si el array `testimonios` contiene datos reales.
- Funcionalidades fuera de alcance (órdenes de compra, facturación/boletas/DTE/SII, iPhone, alertas por WhatsApp, importación desde Excel, integraciones, precios con montos) MUST NOT mencionarse ni insinuarse. Si una FAQ las toca, la respuesta MUST decir con honestidad que hoy no están disponibles.

**Justificación:** el canal de crecimiento son los contadores, cuya confianza es el activo principal. Una afirmación falsa en la landing invalida toda la estrategia de canal.

### II. Una conversión principal
- La página MUST tener un solo objetivo primario: instalar la app desde Google Play ("Pruébala gratis").
- Las CTA secundarias ("Ver cómo funciona", "Soy contador") MUST ser visualmente subordinadas a la principal.
- Accesos utilitarios para usuarios existentes (Ingresar) no cuentan como conversión y MUST ser visualmente secundarios.
- Todas las URLs de destino MUST vivir en una sola constante en `src/content/landing.ts`; ningún componente MUST tener URLs hardcodeadas.

**Justificación:** el destino cambia (prueba cerrada → producción) y no debe requerir buscar enlaces en el código.

### III. Contenido separado de la presentación
- Todo el copy, listas, FAQs y URLs MUST vivir en `src/content/landing.ts`.
- Los componentes MUST recibir contenido por import o props; MUST NOT contener strings de copy visibles.
- Los tokens de diseño (colores, tipografía, radios, sombras, espaciado de secciones) MUST definirse en un solo lugar.
- Los tokens de marca se derivan del tema de la app Android (`ui/theme/`). Un cambio de paleta en la app MUST reflejarse en la landing.

**Justificación:** la landing se itera visualmente y en texto; cambiar una frase o un color no debe implicar tocar JSX.

### IV. Simplicidad
- La página MUST ser 100% estática: sin backend, sin Supabase, sin formularios que envíen datos.
- MUST NOT agregarse dependencias (UI kits, librerías de animación, iconos, analytics) sin aprobación explícita del owner, justificada en una línea.
- Componentes base (Button, Section, Container) solo se crean si se reutilizan en 2+ lugares.
- MUST NOT crearse abstracciones, parámetros ni capas que ningún requisito pida.

**Justificación:** es una página de marketing de un producto en etapa temprana; la complejidad no se paga sola.

### V. Mobile-first y accesible
- El diseño MUST partir de 360px y escalar a 768px y 1440px, sin scroll horizontal en ninguno.
- Textos y botones MUST cumplir contraste WCAG AA en tema claro y oscuro; el foco MUST ser visible; los elementos interactivos (FAQ, menú) MUST operar con teclado.
- Las animaciones MUST respetar `prefers-reduced-motion`.

**Justificación:** el público usa la app en el celular; la landing la ven en el mismo dispositivo.

### VI. Performance como requisito
- Lighthouse móvil MUST alcanzar Performance ≥ 90, Accessibility ≥ 95 y SEO ≥ 95.
- Las imágenes MUST servirse con `next/image` y las fuentes con `next/font`.
- `"use client"` MUST usarse solo en componentes con interacción real.
- `npm run build` sin errores es condición necesaria, NO suficiente, para dar algo por terminado.

**Justificación:** una landing lenta en 4G pierde la conversión antes de que se lea el titular.

### VII. Español de Chile, sin jerga
- El copy MUST estar en español de Chile, con tuteo; MUST NOT usar voseo ni modismos rioplatenses.
- El copy visible MUST NOT usar jerga técnica ("offline-first", "sync", "SaaS", "cloud", "multi-tenant"); se traduce a beneficio ("funciona sin internet", "tus datos se guardan solos").
- Se evitan clichés vacíos ("revoluciona", "siguiente nivel", "solución integral").

**Justificación:** el lector es un dueño de minimarket o un contador, no un desarrollador.

## Restricciones técnicas

- Stack: Next.js (App Router) + TypeScript (strict) + Tailwind CSS, deploy en Vercel.
- Proyecto independiente del dashboard `stockflow-web`; no comparten código ni dependencias.
- Server Components por defecto.
- Antes de usar una API de Next.js o Tailwind, su firma y sintaxis MUST verificarse contra la versión instalada (Context7 o docs oficiales). MUST NOT asumirse Tailwind v3 vs v4.
- Metadata obligatoria: title, description, Open Graph, `lang="es-CL"`.
- Los screenshots del producto MUST ser capturas reales de la versión publicada, en `/public/screens/`. MUST NOT dibujarse UI ficticia de la app.
- Comentarios inline en todo bloque no obvio, explicando qué hace y por qué.

## Flujo de desarrollo

- Spec-Driven Development con speckit: `specify` → `plan` → `tasks` → `implement`. Ningún cambio de alcance entra sin pasar por un spec.
- Cada sesión de implementación tiene un alcance atómico (una sección o una responsabilidad) con criterios de salida explícitos.
- El agente MUST pedir confirmación antes de ejecutar comandos que instalen o scaffoldeen (`create-next-app`, `npm install`, `npx ...`).
- Commits en Conventional Commits (`feat:`, `fix:`, `style:`, `content:`, `docs:`); una rama por spec, merge a `main` cuando cumple sus criterios de aceptación.
- Criterios de aceptación de cada spec: build limpio + Principios V y VI verificados + revisión del copy contra el Principio I.

## Gobernanza

- Esta constitución prevalece sobre cualquier spec, plan o instrucción de sesión. Un plan que la viole MUST declararlo en su Constitution Check y justificarlo, o rechazarse.
- Cuando se mergea una funcionalidad nueva en la app Android, la lista de funcionalidades permitidas/excluidas del Principio I MUST actualizarse antes de reflejarla en el copy.
- Las enmiendas requieren: cambio documentado, actualización del Sync Impact Report y bump de versión:
  - MAJOR: se elimina o redefine un principio.
  - MINOR: se agrega un principio o sección, o se amplía materialmente una regla.
  - PATCH: aclaraciones de redacción sin cambio de significado.

**Version**: 1.1.0 | **Ratified**: 2026-11-07 | **Last Amended**: 2026-11-08
