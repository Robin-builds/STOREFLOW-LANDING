import { landing } from "@/content/landing";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
};

// Jerarquía de acciones (Principio II):
// primary   = única conversión ("Pruébala gratis"), relleno con el primario del tema.
// secondary = acciones subordinadas ("Ver cómo funciona", "Soy contador"), solo contorno.
// ghost     = acceso utilitario ("Ingresar"), texto de enlace sin borde ni relleno.
const variants = {
  primary: "bg-primary text-on-primary shadow-card hover:bg-primary-hover",
  secondary: "border border-line text-fg hover:bg-surface-2",
  ghost: "text-link underline-offset-4 hover:underline",
} as const;

// min-h-11 = 44px: área táctil mínima en móvil
const sizes = {
  sm: "min-h-11 px-4 text-sm",
  md: "min-h-12 px-5 text-base",
  lg: "min-h-13 px-7 text-base sm:text-lg",
} as const;

/** Enlace con apariencia de botón. Los destinos externos se abren en pestaña nueva. */
export function Button({ href, children, variant = "primary", size = "md", className = "" }: ButtonProps) {
  const external = href.startsWith("http");
  // ghost no lleva padding horizontal grande: se lee como enlace
  const sizeClass = variant === "ghost" ? sizes[size].replace(/px-\d+/, "px-2") : sizes[size];

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`inline-flex items-center justify-center gap-2 rounded-button font-semibold transition-colors duration-150 ${variants[variant]} ${sizeClass} ${className}`}
    >
      {children}
      {/* Aviso solo para lectores de pantalla: el enlace abre otra pestaña */}
      {external && <span className="sr-only"> {landing.a11y.newTab}</span>}
    </a>
  );
}
