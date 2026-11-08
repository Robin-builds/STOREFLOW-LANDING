import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import type { Screenshot } from "@/content/landing";

type PhoneMockupProps = {
  screenshot: Screenshot;
  pendingLabel: string;
};

/**
 * Marco de teléfono Android genérico hecho solo con CSS (sin marca de fabricante).
 *
 * Principio I: dentro del marco va SOLO una captura real de la app. Si el archivo aún
 * no existe en /public/screens/, se muestra un placeholder neutro con el nombre esperado;
 * nunca se dibuja una interfaz ficticia.
 *
 * La verificación ocurre en el servidor durante el build (la página es estática):
 * al agregar la captura basta con volver a construir/desplegar.
 */
export function PhoneMockup({ screenshot, pendingLabel }: PhoneMockupProps) {
  const filePath = path.join(process.cwd(), "public", screenshot.src);
  const hasScreenshot = fs.existsSync(filePath);

  return (
    <div className="relative mx-auto w-[248px] sm:w-[280px] lg:w-[300px]">
      {/* Botones laterales: volumen y encendido */}
      <span aria-hidden="true" className="absolute top-28 -right-[3px] h-14 w-[3px] rounded-r bg-brand-ink ring-1 ring-line" />
      <span aria-hidden="true" className="absolute top-46 -right-[3px] h-9 w-[3px] rounded-r bg-brand-ink ring-1 ring-line" />

      {/* Bisel */}
      <div className="rounded-[2.6rem] bg-brand-ink p-2.5 shadow-phone ring-1 ring-line">
        {/* Pantalla con proporción 9:20, típica de Android actual */}
        <div className="relative aspect-[9/20] overflow-hidden rounded-[2.1rem] bg-surface-2">
          {/* Cámara perforada */}
          <span
            aria-hidden="true"
            className="absolute top-3 left-1/2 z-10 size-2.5 -translate-x-1/2 rounded-full bg-brand-ink"
          />

          {hasScreenshot ? (
            <Image
              src={screenshot.src}
              alt={screenshot.alt}
              width={screenshot.width}
              height={screenshot.height}
              // Next 16: `preload` reemplaza a `priority`. Es la imagen principal del hero (LCP).
              preload
              sizes="(min-width: 1024px) 300px, (min-width: 640px) 280px, 248px"
              className="size-full object-cover"
            />
          ) : (
            <div className="flex size-full flex-col items-center justify-center gap-3 border-2 border-dashed border-line p-6 text-center">
              <span className="text-sm font-medium text-muted-2">{pendingLabel}</span>
              <code className="rounded bg-surface px-2 py-1 text-xs break-all text-fg-2">
                {`public${screenshot.src}`}
              </code>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
