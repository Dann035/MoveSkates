"use client";

import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import * as React from "react";

import { ANILLO_FOCO } from "@/lib/foco";
import { cn } from "@/lib/utils";

/**
 * Interruptor · tablero 02. Pista 46×26 con padding 3, pulgar de 20.
 *
 * Un interruptor aplica el cambio al momento; una casilla espera a que se
 * envíe el formulario. Si el cambio necesita un botón de guardar, el control
 * correcto es la casilla, no este.
 */
export interface InterruptorProps extends SwitchPrimitive.Root.Props {
  etiqueta?: React.ReactNode;
  /** Explicación bajo la etiqueta. */
  descripcion?: React.ReactNode;
  className?: string;
}

export function Interruptor({
  etiqueta,
  descripcion,
  className,
  id,
  disabled,
  ...props
}: InterruptorProps) {
  const idGenerado = React.useId();
  const controlId = id ?? idGenerado;

  const pista = (
    <SwitchPrimitive.Root
      id={controlId}
      data-slot="interruptor"
      disabled={disabled}
      className={cn(
        "inline-flex h-[26px] w-[46px] shrink-0 items-center",
        "rounded-pill p-[3px] transition-colors",
        "data-unchecked:bg-border-strong",
        "data-checked:bg-primary",
        "data-disabled:bg-surface-sunken data-disabled:cursor-not-allowed",
        ANILLO_FOCO,
        !etiqueta && className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "pointer-events-none block size-5 rounded-pill bg-surface",
          "shadow-rest transition-transform",
          "data-unchecked:translate-x-0 data-checked:translate-x-5",
        )}
      />
    </SwitchPrimitive.Root>
  );

  if (!etiqueta) return pista;

  return (
    <div className={cn("flex items-start justify-between gap-4", className)}>
      <div className="flex flex-col gap-0.5">
        <label
          htmlFor={controlId}
          className={cn(
            "text-sm font-medium select-none",
            disabled
              ? "text-border-strong cursor-not-allowed"
              : "text-foreground cursor-pointer",
          )}
        >
          {etiqueta}
        </label>
        {descripcion && (
          <p className="text-xs text-muted-foreground">{descripcion}</p>
        )}
      </div>
      {pista}
    </div>
  );
}
