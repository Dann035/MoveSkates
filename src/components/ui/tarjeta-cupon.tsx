"use client";

import { CalendarX2, Check, TicketPercent, TriangleAlert } from "lucide-react";
import type * as React from "react";

import { Button } from "@/components/ui/button";
import { Etiqueta } from "@/components/ui/etiqueta";
import { formatearEuros, type Importe } from "@/lib/precio";
import { tv } from "@/lib/tv";
import { cn } from "@/lib/utils";

/**
 * Los cuatro estados del .pen. `caido` es el del escenario 1 del motor: una
 * promoción bajó el total por debajo del mínimo del cupón.
 *
 * Está modelado como unión discriminada a propósito. §9.4 del diseño exige que
 * la interfaz **diga por qué y cuánto falta**, y con una unión el compilador no
 * deja pintar un cupón caído sin esa cifra. Si fuese un string suelto con un
 * campo opcional al lado, el día que alguien monte la vista de Cupones con
 * prisa el usuario vería «no aplicable» y ninguna salida.
 */
export type EstadoCupon =
  | { estado: "disponible" }
  | { estado: "aplicado" }
  | { estado: "caido"; faltaParaUmbral: Importe }
  | { estado: "caducado" };

const cuponVariants = tv({
  slots: {
    raiz: "flex flex-col gap-4 rounded-card border p-5",
    simbolo:
      "flex size-11.5 shrink-0 items-center justify-center rounded-[13px]",
    titulo: "font-display text-lg font-extrabold",
  },
  variants: {
    estado: {
      disponible: {
        raiz: "bg-coupon-surface border-coupon-border",
        simbolo: "bg-coupon text-white",
        titulo: "text-foreground",
      },
      aplicado: {
        raiz: "bg-primary-surface border-primary-border",
        simbolo: "bg-primary text-primary-foreground",
        titulo: "text-foreground",
      },
      caido: {
        raiz: "bg-destructive-surface border-destructive-border",
        simbolo: "bg-destructive text-white",
        titulo: "text-foreground",
      },
      caducado: {
        raiz: "bg-surface-sunken border-border",
        simbolo: "bg-border-strong text-surface",
        titulo: "text-muted-foreground",
      },
    },
  },
  defaultVariants: { estado: "disponible" },
});

const ICONO = {
  disponible: TicketPercent,
  aplicado: Check,
  caido: TriangleAlert,
  caducado: CalendarX2,
} as const;

const DISTINTIVO = {
  disponible: { familia: "cupon", texto: "Disponible" },
  aplicado: { familia: "nuevo", texto: "Aplicado" },
  caido: { familia: "alerta", texto: "No aplicable" },
  caducado: { familia: "neutro", texto: "Caducado" },
} as const;

type TarjetaCuponBase = Omit<React.ComponentProps<"article">, "children"> & {
  /** «5 € de descuento», «10 % en frescos». */
  titulo: React.ReactNode;
  /** La condición: «En compras de 30 € o más». */
  condicion: React.ReactNode;
  /** Texto ya formateado: «Caduca el 31 de agosto». */
  caducidad?: React.ReactNode;
  onAplicar?: () => void;
  onQuitar?: () => void;
};

export type TarjetaCuponProps = TarjetaCuponBase & EstadoCupon;

export function TarjetaCupon({
  titulo,
  condicion,
  caducidad,
  onAplicar,
  onQuitar,
  className,
  ...resto
}: TarjetaCuponProps) {
  const { estado } = resto;
  const estilos = cuponVariants({ estado });
  const Icono = ICONO[estado];
  const distintivo = DISTINTIVO[estado];

  /* Se extrae para que el spread de `props` no arrastre las claves de la
     unión al DOM. */
  const props = { ...resto } as Record<string, unknown>;
  delete props.estado;
  delete props.faltaParaUmbral;

  return (
    <article
      data-slot="tarjeta-cupon"
      className={cn(estilos.raiz(), className)}
      {...props}
    >
      <div className="flex items-center gap-3.5">
        <span className={estilos.simbolo()}>
          <Icono className="size-5.5" aria-hidden />
        </span>

        <div className="flex min-w-0 flex-col gap-0.5">
          <p className={estilos.titulo()}>{titulo}</p>
          <p className="text-[13px] text-muted-foreground">{condicion}</p>
        </div>
      </div>

      {/* El escenario 1 del motor, hecho visible. No se esconde el cupón: se
          dice cuánto falta para recuperarlo. */}
      {resto.estado === "caido" && (
        <p className="text-[13px] font-medium text-destructive">
          Te faltan{" "}
          <span className="cifras font-bold">
            {formatearEuros(resto.faltaParaUmbral)}
          </span>{" "}
          para alcanzar el mínimo. Las promociones aplicadas han bajado el total
          por debajo del umbral de este cupón.
        </p>
      )}

      <div className="flex items-center justify-between gap-3">
        {caducidad ? (
          <p className="text-xs text-muted-foreground">{caducidad}</p>
        ) : (
          <span />
        )}
        <Etiqueta familia={distintivo.familia}>{distintivo.texto}</Etiqueta>
      </div>

      {estado === "disponible" && onAplicar && (
        <Button intencion="primario" anchoCompleto onClick={onAplicar}>
          Aplicar al pedido
        </Button>
      )}

      {estado === "aplicado" && onQuitar && (
        <Button intencion="contorno" anchoCompleto onClick={onQuitar}>
          Quitar del pedido
        </Button>
      )}
    </article>
  );
}

export { cuponVariants };
