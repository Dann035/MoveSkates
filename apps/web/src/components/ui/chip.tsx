"use client";

import { X } from "lucide-react";
import type * as React from "react";

import { ANILLO_FOCO } from "@/lib/foco";
import { tv, type VariantProps } from "@/lib/tv";
import { cn } from "@/lib/utils";

/**
 * Chip de filtro · tablero 02. Alto 32, hueco 8, padding 14.
 *
 * Dos usos distintos que comparten forma:
 * - **Selector** (`onToggle`): activa o desactiva una faceta.
 * - **Filtro activo** (`onQuitar`): muestra un filtro puesto y lo quita con el
 *   aspa. Es lo que exige BUS-05 — los filtros se quitan uno a uno.
 */
const chipVariants = tv({
  base: [
    "inline-flex h-8 shrink-0 items-center gap-2",
    "rounded-pill border px-3.5",
    "font-sans text-[13px] font-medium whitespace-nowrap",
    "transition-colors",
    ANILLO_FOCO,
  ],
  variants: {
    activo: {
      false: "bg-surface border-border-strong text-foreground",
      true: "bg-primary-surface border-primary-border text-primary-on-surface",
    },
    interactivo: {
      true: "cursor-pointer",
      false: "cursor-default",
    },
  },
  compoundVariants: [
    { activo: false, interactivo: true, class: "hover:bg-surface-sunken" },
    { activo: true, interactivo: true, class: "hover:bg-primary-border" },
  ],
  defaultVariants: { activo: false, interactivo: true },
});

export interface ChipProps
  extends Omit<React.ComponentProps<"button">, "onToggle">,
    Omit<VariantProps<typeof chipVariants>, "interactivo"> {
  /** Recuento de la faceta. BUS-04: cuántos productos quedarían al aplicarla. */
  recuento?: number;
  /** Si se pasa, el chip muestra el aspa de quitar en lugar de alternar. */
  onQuitar?: () => void;
}

export function Chip({
  className,
  activo,
  recuento,
  onQuitar,
  children,
  type = "button",
  ...props
}: ChipProps) {
  const contenido = (
    <>
      <span>{children}</span>
      {recuento !== undefined && (
        <span className="cifras text-muted-foreground">{recuento}</span>
      )}
    </>
  );

  /* Con aspa: el chip entero no es el botón, porque entonces el aspa sería un
     botón dentro de otro botón. El texto queda inerte y solo el aspa actúa. */
  if (onQuitar) {
    return (
      <span
        data-slot="chip"
        className={cn(chipVariants({ activo, interactivo: false, className }))}
      >
        {contenido}
        <button
          type="button"
          onClick={onQuitar}
          aria-label={`Quitar filtro ${typeof children === "string" ? children : ""}`.trim()}
          className={cn(
            "-mr-1 inline-flex size-4 items-center justify-center rounded-pill",
            "text-muted-foreground hover:text-foreground transition-colors",
            ANILLO_FOCO,
          )}
        >
          <X className="size-3.5" aria-hidden />
        </button>
      </span>
    );
  }

  return (
    <button
      data-slot="chip"
      type={type}
      aria-pressed={activo ?? false}
      className={cn(chipVariants({ activo, interactivo: true, className }))}
      {...props}
    >
      {contenido}
    </button>
  );
}

export { chipVariants };
