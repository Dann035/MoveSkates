import { PiggyBank } from "lucide-react";
import type * as React from "react";

import { formatearAhorro, formatearEuros, type Importe } from "@/lib/precio";
import { tv } from "@/lib/tv";
import { cn } from "@/lib/utils";

/**
 * Resumen del pedido · tablero 02. Padding 24, hueco 18, radio de tarjeta.
 *
 * §9.3 del diseño: el resumen desglosa **promoción por promoción**, el
 * descuento de socio aparte, el IVA por tipo, y el ahorro total. Ese desglose
 * es el que hace auditable el motor: si aquí solo llegara un número, no habría
 * forma de comprobar qué aplicó el cálculo ni en qué orden.
 *
 * Por eso la API pide listas y no totales agregados. Aplanar el desglose antes
 * de llegar a este componente es perder justo lo que el diseño existe para
 * enseñar.
 */
const conceptoVariants = tv({
  base: "flex items-baseline justify-between gap-3 text-sm",
  variants: {
    familia: {
      neutro: "text-muted-foreground [&_[data-valor]]:text-foreground",
      promo: "text-promo [&_[data-valor]]:text-promo",
      socio: "text-member [&_[data-valor]]:text-member",
      cupon: "text-coupon [&_[data-valor]]:text-coupon",
      /** Concepto que no llegó a aplicarse. Se enseña, no se esconde. */
      inaplicable:
        "text-muted-foreground [&_[data-valor]]:text-muted-foreground",
    },
  },
  defaultVariants: { familia: "neutro" },
});

export interface LineaResumen {
  /** «3x2 · Patines RB Cruiser», «IVA 21 % · material deportivo». */
  concepto: React.ReactNode;
  /** Importe de la línea. Negativo para un descuento. */
  importe?: Importe;
  /**
   * Sustituye al importe cuando el concepto no se aplicó. Es lo que exige
   * MOT-09: si un cupón se cae por umbral, aparece con «No aplica» en vez de
   * desaparecer del resumen sin explicación.
   */
  nota?: React.ReactNode;
  familia?: "neutro" | "promo" | "socio" | "cupon" | "inaplicable";
}

export interface ResumenPedidoProps extends React.ComponentProps<"section"> {
  titulo?: React.ReactNode;
  /** «Subtotal (12 productos)». */
  conceptoSubtotal: React.ReactNode;
  subtotal: Importe;
  /** Promociones de producto, descuento de socio y cupón, una por línea. */
  ventajas?: LineaResumen[];
  /** Base imponible e IVA por tipo. */
  impuestos?: LineaResumen[];
  /** Coste de envío, recargo… lo que no es ventaja ni impuesto. */
  otros?: LineaResumen[];
  total: Importe;
  /** Suma de lo ahorrado. Si es 0 o falta, la banda no se pinta. */
  ahorro?: Importe;
  /** Botón de continuar. */
  accion?: React.ReactNode;
}

function Linea({ concepto, importe, nota, familia }: LineaResumen) {
  return (
    <div className={conceptoVariants({ familia })}>
      <dt>{concepto}</dt>
      <dd data-valor className="cifras shrink-0 font-bold">
        {nota ?? (importe !== undefined ? formatearEuros(importe) : null)}
      </dd>
    </div>
  );
}

function Bloque({
  rotulo,
  lineas,
}: {
  rotulo: string;
  lineas: LineaResumen[];
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <p className="text-[11px] font-bold tracking-wide text-muted-foreground uppercase">
        {rotulo}
      </p>
      <dl className="flex flex-col gap-2.5">
        {lineas.map((linea, i) => (
          <Linea key={i} {...linea} />
        ))}
      </dl>
    </div>
  );
}

const Separador = () => <hr className="border-t border-border" />;

export function ResumenPedido({
  titulo = "Resumen del pedido",
  conceptoSubtotal,
  subtotal,
  ventajas,
  impuestos,
  otros,
  total,
  ahorro,
  accion,
  className,
  ...props
}: ResumenPedidoProps) {
  const hayAhorro = ahorro !== undefined && Number(ahorro) > 0;

  return (
    <section
      data-slot="resumen-pedido"
      aria-label={typeof titulo === "string" ? titulo : "Resumen del pedido"}
      className={cn(
        "flex flex-col gap-4.5 rounded-card border border-border bg-surface p-6",
        className,
      )}
      {...props}
    >
      <h2 className="text-lg font-bold text-foreground">{titulo}</h2>

      <dl>
        <Linea concepto={conceptoSubtotal} importe={subtotal} />
      </dl>

      {ventajas && ventajas.length > 0 && (
        <>
          <Separador />
          <Bloque rotulo="Ventajas aplicadas" lineas={ventajas} />
        </>
      )}

      {otros && otros.length > 0 && (
        <>
          <Separador />
          <dl className="flex flex-col gap-2.5">
            {otros.map((linea, i) => (
              <Linea key={i} {...linea} />
            ))}
          </dl>
        </>
      )}

      {impuestos && impuestos.length > 0 && (
        <>
          <Separador />
          <Bloque rotulo="Impuestos" lineas={impuestos} />
        </>
      )}

      <Separador />

      <div className="flex items-baseline justify-between gap-3">
        <p className="text-base font-bold text-foreground">Total</p>
        <p className="cifras font-display text-[26px] font-extrabold text-foreground">
          {formatearEuros(total)}
        </p>
      </div>

      {hayAhorro && (
        <p className="flex items-center gap-2.5 rounded-control bg-promo-surface p-3.5 text-[13px] font-bold text-promo-on-surface">
          <PiggyBank className="size-5 shrink-0" aria-hidden />
          <span>
            Has ahorrado{" "}
            <span className="cifras">
              {formatearAhorro(ahorro).replace("−", "")}
            </span>{" "}
            en esta compra
          </span>
        </p>
      )}

      {accion}
    </section>
  );
}

export { conceptoVariants };
