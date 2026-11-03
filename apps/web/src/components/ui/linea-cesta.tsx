"use client";

import { X } from "lucide-react";
import type * as React from "react";

import { Button } from "@/components/ui/button";
import { Etiqueta, type EtiquetaProps } from "@/components/ui/etiqueta";
import { SelectorCantidad } from "@/components/ui/selector-cantidad";
import {
  formatearAhorro,
  formatearEuros,
  formatearPrecioUnidad,
  type Importe,
  type UnidadMedida,
} from "@/lib/precio";
import { cn } from "@/lib/utils";

/** Qué ventaja se aplicó a esta línea y cuánto descontó. */
export interface VentajaAplicada {
  familia: EtiquetaProps["familia"];
  /** «3x2», «Precio socio», «2ª al 50 %». */
  texto: string;
}

export interface LineaCestaProps extends React.ComponentProps<"li"> {
  marca: string;
  nombre: string;
  imagen?: React.ReactNode;
  cantidad: number;
  maxPorPedido?: number;
  precioUnidad: { importe: Importe; unidad: UnidadMedida };
  /** Importe de la línea después de aplicar las ventajas. */
  importe: Importe;
  /** Importe antes de las ventajas. Se pinta tachado si difiere. */
  importeAnterior?: Importe;
  /**
   * §9.3 del diseño: la promoción aplicada tiene que **verse en la línea**,
   * no solo en el total. Es uno de los cuatro sitios donde el motor se hace
   * visible; si esto se queda vacío, el desglose deja de ser auditable.
   */
  ventajas?: VentajaAplicada[];
  onCambiarCantidad?: (cantidad: number) => void;
  onEliminar?: () => void;
  href?: string;
}

export function LineaCesta({
  marca,
  nombre,
  imagen,
  cantidad,
  maxPorPedido,
  precioUnidad,
  importe,
  importeAnterior,
  ventajas,
  onCambiarCantidad,
  onEliminar,
  href,
  className,
  ...props
}: LineaCestaProps) {
  const ahorro =
    importeAnterior !== undefined
      ? Number(importeAnterior) - Number(importe)
      : 0;

  return (
    <li
      data-slot="linea-cesta"
      className={cn(
        "flex flex-col gap-4 border-b border-border py-4",
        "sm:flex-row sm:items-center",
        className,
      )}
      {...props}
    >
      <div className="flex size-19 shrink-0 items-center justify-center overflow-hidden rounded-control bg-surface-sunken [&_img]:size-full [&_img]:object-contain">
        {imagen}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <p className="text-xs font-medium text-muted-foreground">{marca}</p>

        <h3 className="text-[15px] font-semibold text-foreground">
          {href ? (
            <a href={href} className="hover:text-primary transition-colors">
              {nombre}
            </a>
          ) : (
            nombre
          )}
        </h3>

        <p className="cifras text-xs text-muted-foreground">
          {formatearPrecioUnidad(precioUnidad.importe, precioUnidad.unidad)} ·{" "}
          {cantidad} {cantidad === 1 ? "unidad" : "unidades"}
        </p>

        {ventajas && ventajas.length > 0 && (
          <div className="mt-0.5 flex flex-wrap gap-1.5">
            {ventajas.map((v) => (
              <Etiqueta key={v.texto} familia={v.familia}>
                {v.texto}
              </Etiqueta>
            ))}
          </div>
        )}
      </div>

      <SelectorCantidad
        valor={cantidad}
        max={maxPorPedido}
        etiqueta={nombre}
        onCambiar={onCambiarCantidad}
        onEliminar={onEliminar}
        className="shrink-0"
      />

      <div className="flex shrink-0 flex-col items-end gap-1 sm:w-28">
        <p className="cifras font-display text-lg font-extrabold text-foreground">
          {formatearEuros(importe)}
        </p>

        {ahorro > 0 && (
          <>
            <p className="cifras text-[13px] text-muted-foreground line-through">
              {formatearEuros(importeAnterior!)}
            </p>
            <p className="cifras text-xs font-bold text-promo">
              {formatearAhorro(ahorro)}
            </p>
          </>
        )}
      </div>

      {onEliminar && (
        <Button
          intencion="fantasma"
          tamano="icono-md"
          onClick={onEliminar}
          aria-label={`Eliminar ${nombre} de la cesta`}
          className="shrink-0 text-muted-foreground hover:text-destructive"
        >
          <X aria-hidden />
        </Button>
      )}
    </li>
  );
}
