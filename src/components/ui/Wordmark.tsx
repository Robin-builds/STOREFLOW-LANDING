type WordmarkProps = {
  text: string;
  className?: string;
};

/**
 * Logotipo tipográfico: el nombre viene del contenido. Se reutiliza en navbar y footer.
 * El cuadrado de color es un acento neutro, no un logo oficial; reemplazar cuando exista.
 */
export function Wordmark({ text, className = "" }: WordmarkProps) {
  return (
    <span className={`inline-flex items-center gap-2 text-lg font-bold tracking-tight text-ink ${className}`}>
      <span aria-hidden="true" className="grid size-7 place-items-center rounded-lg bg-primary">
        {/* Tres barras = stock apilado; puramente decorativo */}
        <span className="flex h-3.5 items-end gap-0.5">
          <span className="h-1.5 w-1 rounded-sm bg-white/70" />
          <span className="h-2.5 w-1 rounded-sm bg-white/85" />
          <span className="h-3.5 w-1 rounded-sm bg-white" />
        </span>
      </span>
      {text}
    </span>
  );
}
