import type { LucideIcon } from "lucide-react";
import type * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Estado vacío · tablero 02. Padding 48/32, hueco 14, icono en círculo de 72.
 *
 * REGLA §8.5, «nunca un callejón sin salida»: todo estado vacío lleva título
 * que explica, texto que orienta y un botón que sale de ahí.
 *
 * Los tres son obligatorios en el tipo a propósito. La regla estaba escrita en
 * el traspaso de diseño como recomendación y ahí se incumple sola; aquí no
 * compila. Un vacío sin salida deja al usuario mirando una pantalla que no le
 * dice qué hacer, y eso pasa siempre en la vista que nadie repasó.
 */
export interface EstadoVacioProps extends React.ComponentProps<"div"> {
  icono: LucideIcon;
  /** Qué pasa: «Tu cesta está vacía». */
  titulo: React.ReactNode;
  /** Qué se puede hacer al respecto. */
  texto: React.ReactNode;
  /** La salida. Normalmente un `<Button>`. */
  accion: React.ReactNode;
}

export function EstadoVacio({
  icono: Icono,
  titulo,
  texto,
  accion,
  className,
  ...props
}: EstadoVacioProps) {
  return (
    <div
      data-slot="estado-vacio"
      className={cn(
        "flex flex-col items-center gap-3.5 rounded-card border border-border bg-surface px-8 py-12 text-center",
        className,
      )}
      {...props}
    >
      <div className="flex size-18 items-center justify-center rounded-pill bg-surface-sunken">
        <Icono className="size-7.5 text-border-strong" aria-hidden />
      </div>

      <p className="text-lg font-bold text-foreground">{titulo}</p>
      <p className="max-w-84 text-sm text-muted-foreground">{texto}</p>

      <div className="mt-1">{accion}</div>
    </div>
  );
}
