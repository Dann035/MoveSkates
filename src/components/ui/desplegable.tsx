"use client";

import * as React from "react";

import { Campo } from "@/components/ui/campo";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export interface OpcionDesplegable {
  valor: string;
  texto: string;
  disabled?: boolean;
}

/**
 * Desplegable · tablero 02. Mismo bloque que el Campo de texto, con el
 * control cambiado: etiqueta 13/600, caja de 40 con borde fuerte, chevron.
 *
 * Envuelve el `Select` de shadcn (Base UI debajo) para no repetir en cada
 * formulario el cableado de etiqueta, ayuda y `aria-describedby`. Cuando haga
 * falta agrupar opciones o pintar cada una a medida, se usa `Select` directo:
 * este atajo cubre el caso normal, no lo tapa.
 */
export interface DesplegableProps {
  etiqueta?: React.ReactNode;
  opciones: OpcionDesplegable[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (valor: string) => void;
  placeholder?: string;
  ayuda?: React.ReactNode;
  error?: React.ReactNode;
  obligatorio?: boolean;
  disabled?: boolean;
  id?: string;
  className?: string;
}

export function Desplegable({
  etiqueta,
  opciones,
  value,
  defaultValue,
  onValueChange,
  placeholder = "Selecciona una opción",
  ayuda,
  error,
  obligatorio,
  disabled,
  id,
  className,
}: DesplegableProps) {
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
      <Select
        value={value}
        defaultValue={defaultValue}
        onValueChange={(v) => onValueChange?.(v as string)}
        disabled={disabled}
      >
        <SelectTrigger
          id={controlId}
          aria-invalid={invalido || undefined}
          aria-describedby={`${controlId}-ayuda`}
          className={cn(
            "h-10 w-full rounded-control bg-surface px-3.5 text-sm",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
            "data-disabled:bg-surface-sunken data-disabled:text-border-strong",
            invalido ? "border-destructive" : "border-border-strong",
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent className="rounded-control border-border bg-surface shadow-raised">
          {opciones.map((opcion) => (
            <SelectItem
              key={opcion.valor}
              value={opcion.valor}
              disabled={opcion.disabled}
              className="text-sm"
            >
              {opcion.texto}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Campo>
  );
}
