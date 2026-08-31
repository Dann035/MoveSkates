"use client";

import { Input as InputPrimitive } from "@base-ui/react/input";
import * as React from "react";

import { Campo } from "@/components/ui/campo";
import { ANILLO_FOCO } from "@/lib/foco";
import { tv } from "@/lib/tv";
import { cn } from "@/lib/utils";

/** Caja del control. Alto 40, padding 14, hueco 10, borde fuerte. */
const cajaVariants = tv({
  base: [
    "flex h-10 w-full items-center gap-2.5",
    "rounded-control border bg-surface px-3.5",
    "transition-colors",
    "text-sm text-foreground",
    "has-[input:disabled]:bg-surface-sunken has-[input:disabled]:text-border-strong",
  ],
  variants: {
    invalido: {
      false: "border-border-strong focus-within:border-primary",
      true: "border-destructive",
    },
  },
  defaultVariants: { invalido: false },
});

export interface CampoTextoProps
  extends Omit<React.ComponentProps<"input">, "className"> {
  etiqueta?: React.ReactNode;
  ayuda?: React.ReactNode;
  error?: React.ReactNode;
  obligatorio?: boolean;
  /** Icono a la izquierda del valor. 18 px, en texto secundario. */
  icono?: React.ReactNode;
  /** Adorno a la derecha: unidad, contador de caracteres, botón de limpiar. */
  sufijo?: React.ReactNode;
  className?: string;
  /** Clase para el `<input>` interno, no para el bloque completo. */
  inputClassName?: string;
}

export function CampoTexto({
  etiqueta,
  ayuda,
  error,
  obligatorio,
  icono,
  sufijo,
  className,
  inputClassName,
  id,
  disabled,
  ...props
}: CampoTextoProps) {
  const idGenerado = React.useId();
  const controlId = id ?? idGenerado;
  const invalido = Boolean(error);

  return (
    <Campo
      etiqueta={etiqueta}
      controlId={controlId}
      ayuda={ayuda}
      error={error}
      obligatorio={obligatorio}
      className={className}
    >
      <div className={cn(cajaVariants({ invalido }), ANILLO_FOCO, "focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-primary")}>
        {icono && (
          <span className="shrink-0 text-muted-foreground [&_svg]:size-[18px]">
            {icono}
          </span>
        )}

        <InputPrimitive
          id={controlId}
          disabled={disabled}
          aria-invalid={invalido || undefined}
          aria-describedby={`${controlId}-ayuda`}
          className={cn(
            "w-full min-w-0 bg-transparent outline-none",
            "placeholder:text-muted-foreground",
            "disabled:cursor-not-allowed",
            inputClassName,
          )}
          {...props}
        />

        {sufijo && (
          <span className="shrink-0 text-xs text-muted-foreground">
            {sufijo}
          </span>
        )}
      </div>
    </Campo>
  );
}

export { cajaVariants };
