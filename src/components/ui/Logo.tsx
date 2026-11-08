import { landing } from "@/content/landing";
import { BrandIcon } from "./BrandIcon";

type LogoProps = {
  size?: "header" | "footer";
};

/**
 * Logo de marca: ícono de la app sobre su tile oscuro (#0D1519, en ambos temas, como en el
 * teléfono) + wordmark "STORE"/"FLOW" en texto real.
 * El wordmark visible es aria-hidden y se anuncia "StoreFlow" para que el lector no deletree.
 */
export function Logo({ size = "header" }: LogoProps) {
  const { first, second, accessibleName } = landing.brand.wordmark;

  // Header: ícono 32/36px y texto 20/24px (móvil / ≥640px), según FR-003
  const tile = size === "header" ? "size-8 sm:size-9" : "size-8";
  const text = size === "header" ? "text-xl sm:text-2xl" : "text-xl";

  return (
    <span className="inline-flex items-center gap-2.5">
      {/* Radio ≈22% imita la máscara del ícono adaptativo de Android */}
      <span className={`grid shrink-0 place-items-center rounded-[22%] bg-brand-ink ${tile}`}>
        <BrandIcon className="size-[64%]" />
      </span>
      <span className="sr-only">{accessibleName}</span>
      <span aria-hidden="true" className={`leading-none font-extrabold tracking-tight ${text}`}>
        <span className="text-wordmark-store">{first}</span>
        <span className="text-brand-orange">{second}</span>
      </span>
    </span>
  );
}
