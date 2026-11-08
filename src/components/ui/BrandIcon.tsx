/**
 * Ícono original de la app: los 4 bloques de ic_launcher_foreground.xml (viewport 108),
 * recortados a la zona 32–76. Mismos paths que public/brand/storeflow-icon.svg.
 * Inline para no sumar una petición de red al header.
 */
export const BRAND_ICON_VIEWBOX = "32 32 44 44";

export const BRAND_ICON_PATHS = [
  {
    tone: "cyan",
    d: "M34.5,32 L58,32 A2.5,2.5 0 0 1 60.5,34.5 L60.5,42.5 A2.5,2.5 0 0 1 58,45 L34.5,45 A2.5,2.5 0 0 1 32,42.5 L32,34.5 A2.5,2.5 0 0 1 34.5,32 Z",
  },
  {
    tone: "cyan",
    d: "M34.5,47.5 L42.5,47.5 A2.5,2.5 0 0 1 45,50 L45,58 A2.5,2.5 0 0 1 42.5,60.5 L34.5,60.5 A2.5,2.5 0 0 1 32,58 L32,50 A2.5,2.5 0 0 1 34.5,47.5 Z",
  },
  {
    tone: "orange",
    d: "M65.5,47.5 L73.5,47.5 A2.5,2.5 0 0 1 76,50 L76,58 A2.5,2.5 0 0 1 73.5,60.5 L65.5,60.5 A2.5,2.5 0 0 1 63,58 L63,50 A2.5,2.5 0 0 1 65.5,47.5 Z",
  },
  {
    tone: "orange",
    d: "M50,63 L73.5,63 A2.5,2.5 0 0 1 76,65.5 L76,73.5 A2.5,2.5 0 0 1 73.5,76 L50,76 A2.5,2.5 0 0 1 47.5,73.5 L47.5,65.5 A2.5,2.5 0 0 1 50,63 Z",
  },
] as const;

export function BrandIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox={BRAND_ICON_VIEWBOX} aria-hidden="true" focusable="false" className={className}>
      {BRAND_ICON_PATHS.map((p) => (
        <path key={p.d} d={p.d} fill={p.tone === "cyan" ? "var(--brand-cyan)" : "var(--brand-orange)"} />
      ))}
    </svg>
  );
}
