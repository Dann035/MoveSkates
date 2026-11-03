import {
  AlertTriangle,
  CheckCircle2,
  Info,
  TicketPercent,
  type LucideIcon,
} from "lucide-react";
import type * as React from "react";

import { tv, type VariantProps } from "@/lib/tv";
import { cn } from "@/lib/utils";

/**
 * Aviso · tablero 02. Padding 16, hueco 12, radio de control, icono 20.
 *
 * §8.5 del diseño: **ningún error dice «ha ocurrido un error»**. Todo aviso
 * explica qué ha pasado y qué se puede hacer; por eso `titulo` es obligatorio
 * y el cuerpo es donde va la salida.
 */
const avisoVariants = tv({
  base: "flex items-start gap-3 rounded-control border p-4",
  variants: {
    familia: {
      info: "bg-info-surface border-info-border [&_[data-icono]]:text-info",
      exito:
        "bg-primary-surface border-primary-border [&_[data-icono]]:text-primary-on-surface",
      error:
        "bg-destructive-surface border-destructive-border [&_[data-icono]]:text-destructive",
      cupon:
        "bg-coupon-surface border-coupon-border [&_[data-icono]]:text-coupon",
    },
  },
  defaultVariants: { familia: "info" },
});

const ICONO_POR_FAMILIA: Record<
  NonNullable<VariantProps<typeof avisoVariants>["familia"]>,
  LucideIcon
> = {
  info: Info,
  exito: CheckCircle2,
  error: AlertTriangle,
  cupon: TicketPercent,
};

export interface AvisoProps
  extends Omit<React.ComponentProps<"div">, "title">,
    VariantProps<typeof avisoVariants> {
  /** Qué ha pasado. Concreto: «Tu cuota se renueva el 1 de septiembre». */
  titulo: React.ReactNode;
  /** Sustituye al icono por defecto de la familia. */
  icono?: LucideIcon;
  /** Acción de salida: un botón, un enlace. */
  accion?: React.ReactNode;
}

export function Aviso({
  familia = "info",
  titulo,
  icono,
  accion,
  className,
  children,
  ...props
}: AvisoProps) {
  const Icono = icono ?? ICONO_POR_FAMILIA[familia ?? "info"];

  return (
    <div
      data-slot="aviso"
      role={familia === "error" ? "alert" : "status"}
      className={cn(avisoVariants({ familia, className }))}
      {...props}
    >
      <Icono data-icono className="mt-px size-5 shrink-0" aria-hidden />

      <div className="flex flex-1 flex-col gap-1">
        <p className="text-sm font-bold text-foreground">{titulo}</p>
        {children && (
          <div className="text-[13px] text-muted-foreground">{children}</div>
        )}
        {accion && <div className="mt-2 flex gap-2">{accion}</div>}
      </div>
    </div>
  );
}

export { avisoVariants };
