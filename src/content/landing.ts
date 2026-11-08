/**
 * CONTENIDO DE LA LANDING: única fuente de copy, listas, FAQs, testimonios y URLs.
 *
 * Reglas de la constitución que aplican a este archivo:
 * - Principio I (veracidad): solo funcionalidades que existen hoy en la app publicada.
 *   Nada de métricas inventadas, testimonios falsos, logos de clientes ni montos.
 * - Principio II: todas las URLs de destino viven en URLS; ningún componente tiene URLs.
 * - Principio VII: español de Chile, tuteo, sin jerga técnica ni clichés.
 */

/* ------------------------------------------------------------------ */
/* Tipos (contrato: specs/001-storeflow-landing/contracts/)            */
/* ------------------------------------------------------------------ */

export type IconName =
  | "warehouse"
  | "scan"
  | "history"
  | "alert"
  | "calendar"
  | "offline"
  | "users"
  | "monitor"
  | "shield"
  | "flag"
  | "store"
  | "tool"
  | "truck"
  | "notebook"
  | "check"
  | "trend-down";

export type Cta = { label: string; href: string };
export type Item = { icon: IconName; title: string; description: string };
export type Faq = { question: string; answer: string };
export type Testimonio = { quote: string; name: string; business: string };
export type Screenshot = {
  src: `/screens/${string}`;
  alt: string;
  width: number;
  height: number;
};

/* ------------------------------------------------------------------ */
/* URLs: cambiar aquí actualiza todos los botones y enlaces            */
/* ------------------------------------------------------------------ */

// PLACEHOLDER: número de WhatsApp real en formato internacional, sin "+" ni espacios.
const WHATSAPP_NUMBER = "56900000000";

// wa.me abre WhatsApp (app o web) con el mensaje ya escrito; el texto debe ir codificado.
const whatsappLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const URLS = {
  // PLACEHOLDER: dominio provisorio de Vercel; reemplazar por el dominio final.
  site: "https://storeflow-landing-eight.vercel.app",
  // Hoy apunta a la prueba cerrada; cambiar a la ficha de producción cuando esté publicada.
  googlePlay: "https://play.google.com/apps/testing/cl.storeflow.app",
  whatsappNumber: WHATSAPP_NUMBER,
  whatsappContador: whatsappLink("Hola, soy contador y quiero saber más de StoreFlow"),
  whatsappGeneral: whatsappLink("Hola, quiero saber más de StoreFlow"),
  // PLACEHOLDER: URL real de la política de privacidad.
  privacyPolicy: "https://chileapps.cl/privacidad",
  chileapps: "https://chileapps.cl",
  // Inicio de sesión de la versión web (dashboard) para usuarios existentes
  webAppLogin: "https://stockflow-web-eight.vercel.app/login",
} as const;

/* ------------------------------------------------------------------ */
/* Copy                                                                */
/* ------------------------------------------------------------------ */

const ctaPrincipal: Cta = { label: "Pruébala gratis", href: URLS.googlePlay };

export const landing = {
  meta: {
    title: "StoreFlow · Control de inventario desde el celular para pymes",
    description:
      "Controla el stock de todas tus bodegas desde el celular, aunque no tengas internet. Cada entrada y salida queda registrada con quién la hizo y cuándo. Pruébala gratis en Android.",
    ogImageAlt: "StoreFlow: controla tu stock desde el celular, aunque no haya internet",
  },

  // Wordmark igual al de la app: "STORE" en cian y "FLOW" en naranja (DashboardScreen.kt)
  brand: {
    wordmark: { first: "STORE", second: "FLOW", accessibleName: "StoreFlow" },
  },

  // Textos de apoyo para accesibilidad (no visibles, pero también son copy)
  a11y: {
    newTab: "(se abre en una pestaña nueva)",
    step: "Paso",
    home: "StoreFlow, ir al inicio",
    skip: "Saltar al contenido",
    themeToggle: "Modo oscuro",
  },

  nav: {
    cta: ctaPrincipal,
    // Acceso utilitario para usuarios existentes: no es conversión (Principio II)
    login: { label: "Ingresar", href: URLS.webAppLogin } satisfies Cta,
  },

  hero: {
    eyebrow: "Control de inventario para pymes",
    title: "Controla tu stock desde el celular, aunque no haya internet",
    subtitle:
      "Registra cada entrada y salida y StoreFlow calcula el stock solo. Sabes qué tienes, en qué bodega y quién lo movió.",
    primary: ctaPrincipal,
    secondary: { label: "Ver cómo funciona", href: "#como-funciona" },
    note: "Gratis para empezar · App para Android",
    loginLine: { text: "¿Ya usas StoreFlow?", link: "Ingresa a la versión web" },
    screenshot: {
      src: "/screens/inicio.png",
      alt: "Pantalla de inicio de StoreFlow en un celular Android",
      width: 1080,
      height: 2400,
    } satisfies Screenshot,
    // Se muestra en el mockup mientras no exista la captura real en /public/screens/
    screenshotPending: "Captura pendiente",
  },

  // Hechos verificables del producto; nunca métricas de tracción (Principio I)
  credibility: {
    title: "Lo que puedes esperar de StoreFlow",
    items: [
      {
        icon: "offline",
        title: "Funciona sin internet",
        description: "Registra en la bodega aunque no haya señal.",
      },
      {
        icon: "history",
        title: "Historial que no se puede editar",
        description: "Cada movimiento queda con usuario y fecha.",
      },
      {
        icon: "flag",
        title: "Hecho en Chile",
        description: "Desarrollado por chileapps.cl.",
      },
      {
        icon: "shield",
        title: "Datos aislados por empresa",
        description: "Tu información no se mezcla con la de otros negocios.",
      },
    ] satisfies Item[],
  },

  problems: {
    title: "¿Te suena conocido?",
    intro: "Lo que pasa en muchas bodegas cuando el stock se lleva de memoria.",
    items: [
      {
        icon: "notebook",
        title: "No sabes cuánto tienes de verdad",
        description: "Planillas desactualizadas, un cuaderno y el clásico «creo que quedan».",
      },
      {
        icon: "alert",
        title: "Te enteras del quiebre cuando el cliente pide",
        description: "Recién cuando alguien pregunta por un producto descubres que se acabó.",
      },
      {
        icon: "calendar",
        title: "Productos que se vencen en la bodega",
        description: "Lo que llegó primero queda al fondo y se pierde antes de venderse.",
      },
      {
        icon: "trend-down",
        title: "Mermas que nadie sabe explicar",
        description: "Falta mercadería y no hay cómo saber cuándo salió ni quién la sacó.",
      },
      {
        icon: "users",
        title: "Todo depende de una persona",
        description: "Si el encargado no está, nadie sabe qué hay ni dónde está.",
      },
      {
        icon: "offline",
        title: "Internet que falla justo en la bodega",
        description: "La señal no llega al fondo y el registro queda «para después».",
      },
    ] satisfies Item[],
  },

  benefits: {
    title: "Lo que cambia con StoreFlow",
    intro: "Menos adivinar, más certeza sobre lo que tienes.",
    items: [
      {
        icon: "warehouse",
        title: "Sabes qué tienes y dónde",
        description: "Stock por producto y por bodega, al día, en tu celular.",
      },
      {
        icon: "alert",
        title: "No te quedas sin stock",
        description:
          "Ves de inmediato qué productos están en stock bajo o crítico, antes de que el cliente los pida.",
      },
      {
        icon: "calendar",
        title: "Pierdes menos por vencimiento",
        description:
          "Registra lotes y fechas de vencimiento, y saca primero lo que vence primero.",
      },
      {
        icon: "history",
        title: "Sabes quién movió qué",
        description:
          "Cada entrada y salida queda con usuario y fecha, y nadie la puede modificar.",
      },
      {
        icon: "offline",
        title: "Trabajas aunque no haya señal",
        description:
          "Registra sin internet; tus datos se guardan solos cuando vuelve la conexión.",
      },
      {
        icon: "monitor",
        title: "Revisas desde el computador",
        description: "Consulta tu stock en un reporte web, sin tener el celular a mano.",
      },
    ] satisfies Item[],
  },

  howItWorks: {
    id: "como-funciona",
    title: "Cómo funciona",
    intro: "Tres pasos y tu inventario queda al día.",
    steps: [
      {
        icon: "warehouse",
        title: "Crea tu bodega",
        description:
          "Descarga la app, crea tu empresa y agrega una o varias bodegas. Si trabajas con más personas, invítalas.",
      },
      {
        icon: "scan",
        title: "Carga tus productos escaneando",
        description:
          "La cámara del celular lee códigos de barras y QR. Con la linterna funciona incluso con poca luz.",
      },
      {
        icon: "history",
        title: "Registra entradas y salidas",
        description:
          "Cada vez que llega o sale mercadería, lo anotas en segundos. El stock se actualiza solo.",
      },
    ] satisfies Item[],
  },

  useCases: {
    title: "Hecho para negocios con bodega",
    intro: "Si mueves mercadería física, StoreFlow te sirve.",
    items: [
      {
        icon: "store",
        title: "Minimarket",
        description:
          "Muchos productos y reposición diaria. Controla vencimientos por lote y ve qué está por acabarse.",
      },
      {
        icon: "tool",
        title: "Ferretería",
        description:
          "Cientos de códigos parecidos. Escanea en vez de buscar en la lista y ten claro qué hay en bodega y qué en el local.",
      },
      {
        icon: "truck",
        title: "Distribuidora",
        description:
          "Mercadería que entra y sale todo el día. Cada despacho queda registrado con quién lo hizo y cuándo.",
      },
      {
        icon: "warehouse",
        title: "Bodega",
        description:
          "Varias personas moviendo stock en distintos turnos. Cada movimiento queda con usuario y fecha, aunque no haya señal.",
      },
    ] satisfies Item[],
  },

  accountants: {
    eyebrow: "Para contadores",
    title: "¿Asesoras pymes? Recomiéndales un inventario que sí van a llevar",
    body: "Cuando el inventario vive en un cuaderno, cerrar el mes es adivinar. Con StoreFlow cada movimiento queda registrado y el stock sale de los movimientos, no de la memoria.",
    reasons: [
      "Historial de entradas y salidas que no se puede modificar, con usuario y fecha.",
      "Stock por bodega calculado a partir de los movimientos, no anotado a mano.",
      "Reporte web para revisar el inventario desde el computador.",
      "Fácil de adoptar: funciona en el celular Android que ya tienen, aunque no haya internet.",
    ],
    cta: { label: "Soy contador", href: URLS.whatsappContador } satisfies Cta,
    ctaNote: "Te respondemos por WhatsApp.",
  },

  // Principio I: se deja vacío hasta tener testimonios reales; vacío = sección oculta.
  testimonials: {
    title: "Lo que dicen quienes ya lo usan",
    items: [] as Testimonio[],
  },

  faq: {
    title: "Preguntas frecuentes",
    items: [
      {
        question: "¿Funciona sin internet?",
        answer:
          "Sí. Puedes registrar entradas y salidas sin conexión. Todo queda guardado en el celular y se respalda solo cuando vuelve internet.",
      },
      {
        question: "¿Cuánto cuesta?",
        answer:
          "Puedes empezar gratis. También hay planes pagados para negocios con más necesidades.",
      },
      {
        question: "¿Sirve en iPhone?",
        answer:
          "Hoy no. StoreFlow está disponible solo para celulares Android, en Google Play.",
      },
      {
        question: "¿Puedo tener varias bodegas y usuarios?",
        answer:
          "Sí. Tu empresa puede tener varias bodegas y varios usuarios, y cada movimiento queda registrado con quién lo hizo y cuándo.",
      },
      {
        question: "¿Dónde quedan mis datos?",
        answer:
          "Se guardan en tu celular y, cuando hay conexión, se respaldan en servidores seguros. Los datos de tu empresa están separados de los de cualquier otra y solo los ven los usuarios que tú invitas.",
      },
      {
        question: "¿Emite boletas o facturas?",
        answer:
          "No. StoreFlow es para controlar tu inventario y hoy no emite boletas ni facturas.",
      },
      {
        question: "¿Necesito un lector de códigos de barras?",
        answer:
          "No. Usas la cámara del celular, que lee códigos de barras y QR. Incluye linterna para bodegas con poca luz.",
      },
    ] satisfies Faq[],
  },

  finalCta: {
    title: "Empieza hoy a saber cuánto stock tienes",
    subtitle:
      "Descarga StoreFlow en tu celular Android y crea tu primera bodega hoy mismo.",
    cta: ctaPrincipal,
    note: "Gratis para empezar · Disponible en Google Play",
  },

  footer: {
    navLabel: "Enlaces de StoreFlow",
    tagline: "Control de inventario para pymes chilenas.",
    byline: "StoreFlow by chileapps.cl",
    contactLabel: "Contacto",
    privacyLabel: "Política de privacidad",
    loginLabel: "Ingresar a la versión web",
    themeLabel: "Tema",
  },
};
