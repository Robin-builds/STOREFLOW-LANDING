"use client";

import { useLayoutEffect, useSyncExternalStore } from "react";
import { landing } from "@/content/landing";
import { THEME_STORAGE_KEY, type Theme } from "./theme";

/*
 * Único componente de cliente de la landing: botón que alterna claro ↔ oscuro.
 *
 * - La fuente de verdad es el atributo data-theme de <html> (lo fija el script del <head>).
 * - useSyncExternalStore lo observa: en el servidor devuelve null (sin desajuste al hidratar)
 *   y mantiene sincronizados los dos botones (header y footer).
 * - Los íconos sol/luna se muestran por CSS (globals.css), no por estado de React.
 */

function readTheme(): Theme {
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

function readSaved(): Theme | null {
  try {
    const t = localStorage.getItem(THEME_STORAGE_KEY);
    return t === "dark" || t === "light" ? t : null;
  } catch {
    // localStorage bloqueado (modo privado estricto): sin persistencia
    return null;
  }
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore<Theme | null>(subscribe, readTheme, () => null);

  // En desarrollo, Strict Mode remonta <html> y borra el atributo que puso el script.
  // Se re-aplica antes del pintado; en producción no hace nada porque ya existe.
  useLayoutEffect(() => {
    const root = document.documentElement;
    if (!root.hasAttribute("data-theme")) {
      const system = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
      root.setAttribute("data-theme", readSaved() ?? system);
    }
  }, []);

  function toggle() {
    const next: Theme = readTheme() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Sin almacenamiento el cambio vale solo para esta visita
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={landing.a11y.themeToggle}
      // Presionado = modo oscuro activo. Undefined en el servidor hasta conocer el tema real.
      aria-pressed={theme === null ? undefined : theme === "dark"}
      className={`inline-grid size-10 shrink-0 place-items-center rounded-button border border-line text-fg-2 transition-colors hover:bg-surface-2 hover:text-fg ${className}`}
    >
      {/* Sol: visible en oscuro (lleva a claro) */}
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" className="theme-icon-sun size-5">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
      {/* Luna: visible en claro (lleva a oscuro) */}
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="theme-icon-moon size-5">
        <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z" />
      </svg>
    </button>
  );
}
