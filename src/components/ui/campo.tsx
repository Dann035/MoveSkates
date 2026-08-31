import type * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Envoltorio de campo de formulario: etiqueta, control y texto de ayuda.
 *
 * Lo comparten Campo de texto y Desplegable, que en el .pen son el mismo
 * bloque con distinto control dentro (hueco 6, etiqueta 13/600, ayuda 12).
 *
 * LA REGLA QUE JUSTIFICA ESTE COMPONENTE (diseño/README.md §6): el texto de
 * ayuda **ocupa sitio siempre**, aunque esté vacío. Si solo se pintara cuando
 * hay error, el formulario daría un salto al validar y el resto de campos se
 * movería bajo el cursor. Por eso el hueco es `min-h`, no un render
 * condicional.
 */
export interface CampoProps extends React.ComponentProps<"div"> {
  /** Texto de la etiqueta. Se asocia al control con `htmlFor`. */
  etiqueta?: React.ReactNode;
  /** `id` del control que describe. */
  controlId: string;
  /** Ayuda permanente. La sustituye `error` cuando lo hay. */
  ayuda?: React.ReactNode;
  /** Mensaje de validación. Debe decir qué campo falla y por qué (TRA-01). */
  error?: React.ReactNode;
  /** Marca visual de campo obligatorio. */
  obligatorio?: boolean;
}

export function Campo({
  etiqueta,
  controlId,
  ayuda,
  error,
  obligatorio,
  className,
  children,
  ...props
}: CampoProps) {
  const mensaje = error ?? ayuda;

  return (
    <div
      data-slot="campo"
      className={cn("flex w-full flex-col gap-1.5", className)}
      {...props}
    >
      {etiqueta && (
        <label
          htmlFor={controlId}
          className="text-[13px] font-semibold text-foreground select-none"
        >
          {etiqueta}
          {obligatorio && (
            <span className="text-destructive" aria-hidden>
              {" *"}
            </span>
          )}
        </label>
      )}

      {children}

      {/* Reserva de espacio permanente: sin esto el formulario salta al
          validar. Ver el bloque de arriba. */}
      <p
        id={`${controlId}-ayuda`}
        aria-live={error ? "polite" : undefined}
        className={cn(
          "min-h-[15px] text-xs leading-[15px]",
          error ? "text-destructive font-medium" : "text-muted-foreground",
        )}
      >
        {mensaje}
      </p>
    </div>
  );
}
