"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import * as React from "react";

import { ANILLO_FOCO } from "@/lib/foco";
import { tv, type VariantProps } from "@/lib/tv";
import { cn } from "@/lib/utils";

/**
 * Selector de cantidad · tablero 02. Caja 116×40, laterales de 38.
 *
 * Al llegar al mínimo, el botón de restar se convierte en papelera: quitar la
 * última unidad y eliminar la línea son la misma intención del usuario, y
 * dejar el «−» apagado obliga a buscar otro control para lo que ya se estaba
 * intentando hacer.
 *
 * El componente NO decide el máximo. El límite por referencia es una regla de
 * dominio (CES-04) y llega en `max`; aquí solo se respeta.
 */
const selectorVariants = tv({
  base: [
    "inline-flex items-center overflow-hidden",
    "rounded-control border border-border-strong bg-surface",
  ],
  variants: {
    tamano: {
      sm: "h-9 [&>button]:w-8 [&>output]:w-9 text-[13px]",
      md: "h-10 [&>button]:w-[38px] [&>output]:w-10 text-sm",
    },
  },
  defaultVariants: { tamano: "md" },
});

const lateral = cn(
  "inline-flex h-full items-center justify-center transition-colors",
  "hover:bg-surface-sunken",
  "disabled:pointer-events-none disabled:text-border-strong",
  ANILLO_FOCO,
);

export interface SelectorCantidadProps
  extends VariantProps<typeof selectorVariants> {
  /** Controlado. Si se omite, el componente gestiona su propio estado. */
  valor?: number;
  defaultValor?: number;
  onCambiar?: (cantidad: number) => void;
  /**
   * Se llama al restar estando en el mínimo. Si no se pasa, el botón se
   * deshabilita en lugar de mostrar la papelera.
   */
  onEliminar?: () => void;
  min?: number;
  /** Límite por referencia. Regla de dominio, no de este componente. */
  max?: number;
  disabled?: boolean;
  /** Nombre del producto, para que el lector de pantalla diga de qué es. */
  etiqueta?: string;
  className?: string;
}

export function SelectorCantidad({
  valor,
  defaultValor = 1,
  onCambiar,
  onEliminar,
  min = 1,
  max = Number.POSITIVE_INFINITY,
  disabled,
  etiqueta,
  tamano,
  className,
}: SelectorCantidadProps) {
  const [interno, setInterno] = React.useState(defaultValor);
  const controlado = valor !== undefined;
  const cantidad = controlado ? valor : interno;

  const fijar = (siguiente: number) => {
    const acotada = Math.min(Math.max(siguiente, min), max);
    if (acotada === cantidad) return;
    if (!controlado) setInterno(acotada);
    onCambiar?.(acotada);
  };

  const enMinimo = cantidad <= min;
  const enMaximo = cantidad >= max;
  const puedeEliminar = enMinimo && Boolean(onEliminar);
  const sufijo = etiqueta ? ` de ${etiqueta}` : "";

  return (
    <div
      data-slot="selector-cantidad"
      className={cn(selectorVariants({ tamano, className }))}
    >
      <button
        type="button"
        className={cn(lateral, puedeEliminar && "hover:text-destructive")}
        disabled={disabled || (enMinimo && !puedeEliminar)}
        aria-label={
          puedeEliminar ? `Eliminar${sufijo}` : `Quitar una unidad${sufijo}`
        }
        onClick={() => (puedeEliminar ? onEliminar?.() : fijar(cantidad - 1))}
      >
        {puedeEliminar ? (
          <Trash2 className="size-4" aria-hidden />
        ) : (
          <Minus className="size-4" aria-hidden />
        )}
      </button>

      {/* `output` con aria-live: al cambiar la cantidad el lector la anuncia
          sin que el foco salga del botón que se está pulsando. */}
      <output
        aria-live="polite"
        aria-label={`Cantidad${sufijo}`}
        className="cifras inline-flex h-full items-center justify-center font-bold text-foreground"
      >
        {cantidad}
      </output>

      <button
        type="button"
        className={cn(lateral, "text-primary")}
        disabled={disabled || enMaximo}
        aria-label={`Añadir una unidad${sufijo}`}
        onClick={() => fijar(cantidad + 1)}
      >
        <Plus className="size-4" aria-hidden />
      </button>
    </div>
  );
}

export { selectorVariants };
