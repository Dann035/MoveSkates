import type * as React from "react";

import { tv, type VariantProps } from "@/lib/tv";
import { cn } from "@/lib/utils";

/**
 * Etiqueta · tablero 02. Una pastilla, seis familias de color.
 *
 * REGLA SEMÁNTICA, y no se negocia (diseño/README.md §3): la familia
 * identifica el **tipo de ventaja**, no decora. `promo` es promoción del
 * producto, `socio` es condición de socio, `cupon` es cupón del pedido. El día
 * que un cupón salga en rojo, quien lee el ticket deja de poder distinguir de
 * un vistazo de dónde le viene cada descuento.
 *
 * Por eso las variantes se llaman por lo que significan y no por su color.
 */
const etiquetaVariants = tv({
  base: [
    "inline-flex w-fit shrink-0 items-center gap-1.5",
    "rounded-pill border px-2.5 py-[5px]",
    "font-sans text-xs font-bold whitespace-nowrap",
    "[&_svg]:pointer-events-none [&_svg]:size-[13px] [&_svg]:shrink-0",
  ],
  variants: {
    familia: {
      /** 3x2, 2ª unidad al 50%, bajada de precio, ahorro. */
      promo: "bg-promo-surface border-promo-border text-promo-on-surface",
      /** Precio de socio, ventaja que exige cuota activa. */
      socio: "bg-member-surface border-member-border text-member",
      /** Cupón del pedido, umbral, prorrateo. */
      cupon: "bg-coupon-surface border-coupon-border text-coupon",
      /** Entrega, franja horaria, estado de pedido. */
      entrega: "bg-info-surface border-info-border text-info",
      /** Sin stock, cupón caído, dato que impide comprar. */
      alerta:
        "bg-destructive-surface border-destructive-border text-destructive",
      /** Novedad, alta reciente. */
      nuevo: "bg-primary-surface border-primary-border text-primary-on-surface",
      /** Sin carga semántica: recuentos y metadatos inertes. */
      neutro: "bg-surface-sunken border-border text-muted-foreground",
    },
  },
  defaultVariants: { familia: "promo" },
});

export interface EtiquetaProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof etiquetaVariants> {}

export function Etiqueta({ className, familia, ...props }: EtiquetaProps) {
  return (
    <span
      data-slot="etiqueta"
      className={cn(etiquetaVariants({ familia, className }))}
      {...props}
    />
  );
}

export { etiquetaVariants };
