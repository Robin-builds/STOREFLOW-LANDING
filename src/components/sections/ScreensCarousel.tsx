"use client";

import { useEffect, useState, useSyncExternalStore, type FocusEvent, type ReactNode } from "react";
import { landing } from "@/content/landing";

/*
 * Control mínimo del recorrido de capturas del hero (spec 003), patrón "Carousel" de WAI-ARIA APG.
 *
 * Las diapositivas llegan ya renderizadas desde el servidor (children). Este componente solo
 * publica qué pantalla se ve (data-active) y si las demás ya pueden cargarse (data-armed);
 * globals.css hace el fundido y oculta las inactivas, también para lectores de pantalla.
 * Sin JavaScript, data-active="0" viene en el HTML: se ve la primera pantalla completa.
 */

// 2,5 s por pantalla (pedido del owner, 2026-11-08); el fundido de 500 ms va incluido
const INTERVAL_MS = 2500;
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

// Movimiento reducido. En el servidor se asume "reducido": nada se mueve antes de hidratar.
function subscribeReducedMotion(onChange: () => void) {
  const media = window.matchMedia(REDUCED_MOTION);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}
const readReducedMotion = () => window.matchMedia(REDUCED_MOTION).matches;

// Pestaña visible: en segundo plano no se avanza (no se acumulan saltos al volver).
function subscribeVisibility(onChange: () => void) {
  document.addEventListener("visibilitychange", onChange);
  return () => document.removeEventListener("visibilitychange", onChange);
}
const readVisible = () => document.visibilityState === "visible";

// Página cargada: recién ahí se "arman" las pantallas 2..N, fuera de la ruta crítica del LCP.
function subscribeLoaded(onChange: () => void) {
  window.addEventListener("load", onChange);
  return () => window.removeEventListener("load", onChange);
}
const readLoaded = () => document.readyState === "complete";

export function ScreensCarousel({ captions, children }: { captions: string[]; children: ReactNode }) {
  const copy = landing.hero.carousel;
  const total = captions.length;

  const [index, setIndex] = useState(0);
  // false = pausado por el visitante (botón o indicador); solo "Reanudar" lo vuelve a true
  const [playing, setPlaying] = useState(true);
  const [hovering, setHovering] = useState(false);
  const [keyboardFocus, setKeyboardFocus] = useState(false);
  // Si el visitante elige una pantalla antes del `load`, se arma igual para poder mostrarla
  const [userArmed, setUserArmed] = useState(false);
  // Solo se rellena en cambios hechos por el visitante; vacío = el avance automático no se anuncia
  const [announcement, setAnnouncement] = useState("");

  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, readReducedMotion, () => true);
  const visible = useSyncExternalStore(subscribeVisibility, readVisible, () => false);
  const loaded = useSyncExternalStore(subscribeLoaded, readLoaded, () => false);
  const armed = loaded || userArmed;

  const running = playing && armed && visible && !hovering && !keyboardFocus && !reducedMotion;

  // Un timeout por pantalla (no setInterval): cada cambio, manual o automático, reinicia la cuenta
  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => setIndex((i) => (i + 1) % total), INTERVAL_MS);
    return () => window.clearTimeout(timer);
  }, [running, index, total]);

  function goTo(i: number) {
    setIndex(i);
    setPlaying(false); // el visitante tomó el control
    setUserArmed(true);
    setAnnouncement(copy.announce(i + 1, total, captions[i]));
  }

  function togglePlaying() {
    if (playing) {
      setPlaying(false);
      setAnnouncement(copy.announce(index + 1, total, captions[index]));
    } else {
      setPlaying(true);
      // Reanudar desde el teclado debe avanzar aunque el foco siga en el botón
      setKeyboardFocus(false);
      setAnnouncement("");
    }
  }

  // Solo el foco de teclado pausa (:focus-visible); un clic ya decide con su propio botón
  function handleFocus(e: FocusEvent<HTMLElement>) {
    if (e.target.matches(":focus-visible")) setKeyboardFocus(true);
  }
  function handleBlur(e: FocusEvent<HTMLElement>) {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setKeyboardFocus(false);
  }

  return (
    <section
      data-carousel=""
      data-active={index}
      data-armed={armed ? "" : undefined}
      aria-roledescription={copy.roleDescription}
      aria-label={copy.regionLabel}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHovering(true)}
      onPointerLeave={() => setHovering(false)}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className="relative mx-auto w-[248px] sm:w-[280px] lg:w-[300px]"
    >
      {children}

      {/* Leyenda fuera de la pantalla; altura fija de 2 líneas para no mover el layout */}
      <p className="mt-4 flex h-14 items-start justify-center text-center text-base leading-7 font-semibold text-fg">
        <span key={index} className="carousel-caption-in">
          <span className="text-primary">{index + 1}.</span> {captions[index]}
        </span>
      </p>

      <div className="mt-1 flex items-center justify-center gap-1">
        {/* Pausa primero en el orden de foco (APG). Con movimiento reducido no hay nada que pausar. */}
        <button
          type="button"
          onClick={togglePlaying}
          aria-label={playing ? copy.pause : copy.play}
          className="mr-1 inline-grid size-9 place-items-center rounded-full text-fg-2 transition-colors hover:bg-surface-2 hover:text-fg motion-reduce:hidden"
        >
          {playing ? (
            <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="size-4">
              <rect x="5" y="4" width="3.5" height="12" rx="1" />
              <rect x="11.5" y="4" width="3.5" height="12" rx="1" />
            </svg>
          ) : (
            <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="size-4">
              <path d="M6 4.6v10.8a1 1 0 0 0 1.5.86l8.6-5.4a1 1 0 0 0 0-1.72L7.5 3.74A1 1 0 0 0 6 4.6Z" />
            </svg>
          )}
        </button>

        {captions.map((caption, i) => {
          const current = i === index;
          return (
            <button
              key={caption}
              type="button"
              onClick={() => goTo(i)}
              aria-label={copy.goTo(i + 1, total, caption)}
              aria-current={current ? "true" : undefined}
              // Objetivo táctil de 28 px; el activo es más ancho (no depende solo del color)
              className="group inline-grid h-7 min-w-7 place-items-center rounded-full px-1"
            >
              <span
                aria-hidden="true"
                className={`block h-2 rounded-full transition-all duration-300 ${
                  current ? "w-6 bg-primary" : "w-2 bg-fg-3 group-hover:bg-fg-2"
                }`}
              />
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </p>
    </section>
  );
}
