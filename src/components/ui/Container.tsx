type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

/** Ancho máximo y márgenes laterales comunes a todas las secciones (16px en móvil). */
export function Container({ children, className = "" }: ContainerProps) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}
