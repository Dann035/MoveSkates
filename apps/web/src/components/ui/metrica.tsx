import type { LucideIcon } from "lucide-react";
import type * as React from "react";

import { tv, type VariantProps } from "@/lib/tv";
import { cn } from "@/lib/utils";

/**
 * Métrica · tablero 02. Tarjeta de padding 20, icono en cuadro de 34 (radio
 * 10), etiqueta 13/600, valor 30/800, variación 12/600.
 *
 * La usan el panel de administración (ADM-08: referencias activas, borradores,
 * promociones vigentes, sin stock) y el panel de socio (ARE-02: ahorro
 * acumulado).
 */
const metricaVariants = tv({
  slots: {
    cuadro: "flex size-8.5 shrink-0 items-center justify-center rounded-[10px]",
    variacion: "text-xs font-semibold",
  },
  variants: {
    familia: {
      neutro: {
        cuadro: "bg-surface-sunken text-muted-foreground",
        variacion: "text-muted-foreground",
      },
      primario: {
        cuadro: "bg-primary-surface text-primary-on-surface",
        variacion: "text-primary",
      },
      promo: {
        cuadro: "bg-promo-surface text-promo-on-surface",
        variacion: "text-promo",
      },
      socio: {
        cuadro: "bg-member-surface text-member",
        variacion: "text-member",
      },
      cupon: {
        cuadro: "bg-coupon-surface text-coupon",
        variacion: "text-coupon",
      },
      alerta: {
        cuadro: "bg-destructive-surface text-destructive",
        variacion: "text-destructive",
      },
    },
  },
  defaultVariants: { familia: "neutro" },
});

export interface MetricaProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof metricaVariants> {
  icono: LucideIcon;
  etiqueta: React.ReactNode;
  /** Ya formateado. Esta tarjeta no calcula ni convierte nada. */
  valor: React.ReactNode;
  /** Comparativa con el periodo anterior: «+22,40 € este mes». */
  variacion?: React.ReactNode;
}

export function Metrica({
  icono: Icono,
  etiqueta,
  valor,
  variacion,
  familia,
  className,
  ...props
}: MetricaProps) {
  const estilos = metricaVariants({ familia });

  return (
    <div
      data-slot="metrica"
      className={cn(
        "flex flex-col gap-2.5 rounded-card border border-border bg-surface p-5",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-2.5">
        <span className={estilos.cuadro()}>
          <Icono className="size-4.5" aria-hidden />
        </span>
        <p className="text-[13px] font-semibold text-muted-foreground">
          {etiqueta}
        </p>
      </div>

      <p className="cifras font-display text-3xl font-extrabold text-foreground">
        {valor}
      </p>

      {variacion && <p className={estilos.variacion()}>{variacion}</p>}
    </div>
  );
}

export { metricaVariants };
