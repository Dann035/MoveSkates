"use client";

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { Check, Minus } from "lucide-react";
import * as React from "react";

import { ANILLO_FOCO } from "@/lib/foco";
import { cn } from "@/lib/utils";

/**
 * Casilla · tablero 02. Caja de 20 con radio 5, hueco 10, etiqueta 14.
 *
 * Controlada y no controlada: `checked` la controla, `defaultChecked` la deja
 * gestionarse sola. Admite el tercer estado `indeterminate`, que es el que
 * necesita la cabecera de un grupo de facetas cuando solo algunas están
 * marcadas.
 */
export interface CasillaProps extends CheckboxPrimitive.Root.Props {
  /** Texto a la derecha. Si se omite, hace falta `aria-label`. */
  etiqueta?: React.ReactNode;
  /** Recuento de la faceta (BUS-04). */
  recuento?: number;
  className?: string;
}

export function Casilla({
  etiqueta,
  recuento,
  className,
  id,
  disabled,
  ...props
}: CasillaProps) {
  const idGenerado = React.useId();
  const controlId = id ?? idGenerado;

  const caja = (
    <CheckboxPrimitive.Root
      id={controlId}
      data-slot="casilla"
      disabled={disabled}
      className={cn(
        "peer flex size-5 shrink-0 items-center justify-center",
        "rounded-[5px] border transition-colors",
        "border-border-strong bg-surface",
        "data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground",
        "data-indeterminate:border-primary data-indeterminate:bg-primary data-indeterminate:text-primary-foreground",
        "data-disabled:border-border data-disabled:bg-surface-sunken data-disabled:text-border-strong",
        ANILLO_FOCO,
        !etiqueta && className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className="grid place-content-center text-current"
        render={(indicadorProps, estado) => (
          <span {...indicadorProps}>
            {estado.indeterminate ? (
              <Minus className="size-3.5" aria-hidden />
            ) : (
              <Check className="size-3.5" aria-hidden />
            )}
          </span>
        )}
      />
    </CheckboxPrimitive.Root>
  );

  if (!etiqueta) return caja;

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      {caja}
      <label
        htmlFor={controlId}
        className={cn(
          "flex flex-1 items-center justify-between gap-2 text-sm select-none",
          disabled
            ? "text-border-strong cursor-not-allowed"
            : "text-foreground cursor-pointer",
        )}
      >
        <span>{etiqueta}</span>
        {recuento !== undefined && (
          <span className="cifras text-xs text-muted-foreground">
            {recuento}
          </span>
        )}
      </label>
    </div>
  );
}
