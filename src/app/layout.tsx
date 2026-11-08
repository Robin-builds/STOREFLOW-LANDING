import type { Metadata, Viewport } from "next";
import { Work_Sans } from "next/font/google";
import { URLS, landing } from "@/content/landing";
import "./globals.css";

// next/font autoaloja la fuente en el build: sin peticiones a Google en runtime (Principio VI).
// Se expone como variable CSS que globals.css mapea a --font-sans.
const workSans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-work-sans",
});

export const metadata: Metadata = {
  // Base para resolver URLs relativas (canonical, imagen OG); cambia con URLS.site.
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

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CL" className={workSans.variable}>
      <body>{children}</body>
    </html>
  );
}
