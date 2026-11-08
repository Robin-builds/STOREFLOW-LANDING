import { landing } from "@/content/landing";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "inverse";
  size?: "sm" | "md" | "lg";
  className?: string;
};

// Las variantes son la jerarquía de conversión (Principio II):
// primary = único objetivo (Google Play); secondary = acciones subordinadas;
// inverse = primario sobre fondo de color (bloque de cierre).
const variants = {
  primary: "bg-primary text-white shadow-button hover:bg-primary-hover",
  secondary: "border border-border bg-surface text-ink hover:border-ink/30 hover:bg-surface-alt",
  inverse: "bg-white text-primary shadow-card hover:bg-primary-soft",
} as const;

// min-h-11 = 44px: área táctil mínima recomendada en móvil
const sizes = {
  sm: "min-h-11 px-4 text-sm",
  md: "min-h-12 px-5 text-base",
  lg: "min-h-13 px-7 text-base sm:text-lg",
} as const;

/** Enlace con apariencia de botón. Los destinos externos se abren en pestaña nueva. */
export function Button({ href, children, variant = "primary", size = "md", className = "" }: ButtonProps) {
  const external = href.startsWith("http");

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`inline-flex items-center justify-center gap-2 rounded-button font-semibold transition-colors duration-150 ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
      {/* Aviso solo para lectores de pantalla: el enlace abre otra pestaña */}
      {external && <span className="sr-only"> {landing.a11y.newTab}</span>}
    </a>
  );
}
