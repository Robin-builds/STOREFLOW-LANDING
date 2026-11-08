import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { URLS, landing } from "@/content/landing";
import { THEME_STORAGE_KEY } from "@/components/ui/theme";
import "./globals.css";

// Tipografía de la app (Type.kt). next/font la autoaloja: sin peticiones a Google en runtime.
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  metadataBase: new URL(URLS.site),
  title: landing.meta.title,
  description: landing.meta.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_CL",
    siteName: "StoreFlow",
    title: landing.meta.title,
    description: landing.meta.description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: landing.meta.title,
    description: landing.meta.description,
  },
};

// Color de la barra del navegador móvil según el tema del sistema (fondos de cada tema)
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#131620" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

/*
 * Fija data-theme en <html> ANTES del primer pintado, así nunca se ve el tema equivocado
 * (patrón de la guía de Next 16 "preventing-flash-before-hydration").
 * Prioridad: elección guardada > preferencia del sistema (claro) > oscuro.
 * Mientras no haya elección guardada, sigue los cambios de preferencia del sistema.
 * Todo va en try/catch: sin localStorage o matchMedia la página igual se muestra.
 */
const themeScript = `(function(){var d=document.documentElement,k=${JSON.stringify(THEME_STORAGE_KEY)};function saved(){try{var t=localStorage.getItem(k);return t==="dark"||t==="light"?t:null}catch(e){return null}}try{var m=window.matchMedia("(prefers-color-scheme: light)");d.setAttribute("data-theme",saved()||(m.matches?"light":"dark"));m.addEventListener("change",function(e){if(!saved())d.setAttribute("data-theme",e.matches?"light":"dark")})}catch(e){d.setAttribute("data-theme",saved()||"dark")}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: el script cambia data-theme antes de que React hidrate
    <html lang="es-CL" className={jakarta.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
