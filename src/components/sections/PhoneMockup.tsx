import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { landing, type HeroScreen, type HeroScreens } from "@/content/landing";
import { ScreensCarousel } from "./ScreensCarousel";

type PhoneMockupProps = {
  screens: HeroScreens;
  pendingLabel: string;
};

const SIZES = "(min-width: 1024px) 300px, (min-width: 640px) 280px, 248px";

/** "/screens/bodega.png" → "/screens/bodega-oscuro.png" (convención de la spec 003). */
function darkVariantOf(src: string) {
  return src.replace(/(\.[a-z0-9]+)$/i, "-oscuro$1");
}

/** ¿Existe el archivo en /public? Se evalúa al construir: la página es estática. */
function existsInPublic(src: string) {
  return fs.existsSync(path.join(process.cwd(), "public", src));
}

/**
 * Marco de teléfono Android genérico hecho solo con CSS (sin marca de fabricante), con un
 * recorrido de capturas reales de la app (spec 003).
 *
 * Todo lo pesado ocurre aquí, en el servidor: detectar qué capturas existen, armar cada
 * diapositiva con next/image y decidir cuál se carga con prioridad. ScreensCarousel (cliente)
 * solo decide cuál se ve, vía data-active; el CSS de globals.css hace el resto.
 *
 * Principio I: si falta un archivo, esa pantalla muestra un placeholder neutro con la ruta
 * esperada; nunca se dibuja una interfaz ficticia.
 */
export function PhoneMockup({ screens, pendingLabel }: PhoneMockupProps) {
  const { carousel } = landing.hero;
  const total = screens.length;

  return (
    <ScreensCarousel captions={screens.map((s) => s.caption)}>
      <div className="relative">
        {/* Botones laterales: volumen y encendido */}
        <span aria-hidden="true" className="absolute top-28 -right-[3px] h-14 w-[3px] rounded-r bg-brand-ink ring-1 ring-line" />
        <span aria-hidden="true" className="absolute top-46 -right-[3px] h-9 w-[3px] rounded-r bg-brand-ink ring-1 ring-line" />

        {/* Bisel */}
        <div className="rounded-[2.6rem] bg-brand-ink p-2.5 shadow-phone ring-1 ring-line">
          {/* Pantalla con proporción 9:19,5, la de las capturas reales (1080×2340) */}
          <div className="relative aspect-[9/19.5] overflow-hidden rounded-[2.1rem] bg-surface-2">
            {/* Cámara perforada */}
            <span
              aria-hidden="true"
              className="absolute top-3 left-1/2 z-10 size-2.5 -translate-x-1/2 rounded-full bg-brand-ink"
            />

            {screens.map((screen, i) => (
              // Diapositivas apiladas; globals.css muestra solo la de data-active
              <div
                key={screen.src}
                data-slide={i}
                role="group"
                aria-roledescription={carousel.slideRoleDescription}
                aria-label={carousel.slideLabel(i + 1, total)}
                className="absolute inset-0"
              >
                <Slide screen={screen} first={i === 0} pendingLabel={pendingLabel} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </ScreensCarousel>
  );
}

function Slide({ screen, first, pendingLabel }: { screen: HeroScreen; first: boolean; pendingLabel: string }) {
  const darkSrc = darkVariantOf(screen.src);
  const hasLight = existsInPublic(screen.src);
  const hasDark = existsInPublic(darkSrc);

  /*
   * Prioridad de carga (doc de next/image, "preload" y "Theme detection"):
   * - Primera pantalla con una sola versión: `preload` (es el LCP del hero).
   * - Primera pantalla con par claro/oscuro: `fetchPriority="high"` sin preload; con preload
   *   se descargarían ambas versiones. La oculta (display:none) no se descarga por ser lazy.
   * - Resto: lazy (por defecto) y además display:none hasta el `load` de la ventana.
   */
  const priority = first ? (hasDark ? { fetchPriority: "high" as const } : { preload: true }) : {};
  const common = { width: screen.width, height: screen.height, sizes: SIZES, ...priority };

  return (
    <>
      {hasLight ? (
        <Image
          {...common}
          alt={screen.alt}
          src={screen.src}
          className={`size-full object-cover ${hasDark ? "screen-light" : ""}`}
        />
      ) : (
        <div
          className={`flex size-full flex-col items-center justify-center gap-3 border-2 border-dashed border-line p-6 text-center ${hasDark ? "screen-light" : ""}`}
        >
          <span className="text-sm font-medium text-muted-2">{pendingLabel}</span>
          <code className="rounded bg-surface px-2 py-1 text-xs break-all text-fg-2">{`public${screen.src}`}</code>
        </div>
      )}
      {hasDark && <Image {...common} alt={screen.alt} src={darkSrc} className="screen-dark size-full object-cover" />}
    </>
  );
}
