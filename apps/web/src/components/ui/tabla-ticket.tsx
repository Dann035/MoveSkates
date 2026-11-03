import type * as React from "react";

import {
  formatearAhorro,
  formatearEuros,
  formatearPorcentaje,
  type Importe,
} from "@/lib/precio";
import { cn } from "@/lib/utils";

/**
 * Fila de ticket · tablero 02. Alto 45, padding 14/20, borde inferior.
 *
 * Una fila conserva el nombre y el precio que tenía el producto **al
 * comprarlo** (FAC-03): esta tabla pinta lo que le llega, nunca vuelve a
 * consultar el catálogo. Una factura emitida no cambia aunque el producto
 * cambie o se borre (FAC-06), y eso solo se sostiene si el dato viaja
 * congelado desde el pedido.
 */
export interface LineaTicket {
  /** Nombre congelado en el momento de la compra. */
  producto: string;
  unidades: number;
  /** Precio unitario congelado. */
  precio: Importe;
  /** Descuento aplicado a la línea. Positivo; se pinta en negativo. */
  descuento?: Importe;
  /** Base imponible de la línea, ya descontada. */
  base: Importe;
  /** Tipo de IVA como fracción: 0.04, 0.10, 0.21. */
  tipoIva: number;
  /** Total de la línea con IVA. */
  total: Importe;
}

export interface TablaTicketProps extends React.ComponentProps<"table"> {
  lineas: LineaTicket[];
  /** Descripción para lectores de pantalla. */
  descripcion?: string;
}

const CABECERAS = [
  { texto: "Producto", alineacion: "text-left" },
  { texto: "Uds.", alineacion: "text-right" },
  { texto: "Precio", alineacion: "text-right" },
  { texto: "Descuento", alineacion: "text-right" },
  { texto: "Base", alineacion: "text-right" },
  { texto: "IVA", alineacion: "text-right" },
  { texto: "Total", alineacion: "text-right" },
] as const;

export function TablaTicket({
  lineas,
  descripcion = "Detalle de líneas del ticket",
  className,
  ...props
}: TablaTicketProps) {
  return (
    /* El contenedor scrollea, no el body de la página (§ responsive). */
    <div className="w-full overflow-x-auto">
      <table
        data-slot="tabla-ticket"
        className={cn("w-full min-w-3xl border-collapse", className)}
        {...props}
      >
        <caption className="sr-only">{descripcion}</caption>

        <thead>
          <tr className="border-b border-border bg-surface-sunken">
            {CABECERAS.map((c) => (
              <th
                key={c.texto}
                scope="col"
                className={cn(
                  "px-5 py-3 text-[11px] font-bold tracking-wide uppercase text-muted-foreground",
                  c.alineacion,
                )}
              >
                {c.texto}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {lineas.map((linea, i) => (
            <tr key={i} className="border-b border-border">
              <td className="px-5 py-3.5 text-sm font-semibold text-foreground">
                {linea.producto}
              </td>
              <td className="cifras px-5 py-3.5 text-right text-[13px] font-medium text-foreground">
                {linea.unidades}
              </td>
              <td className="cifras px-5 py-3.5 text-right text-[13px] font-medium text-foreground">
                {formatearEuros(linea.precio)}
              </td>
              <td className="cifras px-5 py-3.5 text-right text-[13px] font-medium text-promo">
                {linea.descuento !== undefined && Number(linea.descuento) !== 0
                  ? formatearAhorro(linea.descuento)
                  : "—"}
              </td>
              <td className="cifras px-5 py-3.5 text-right text-[13px] font-medium text-foreground">
                {formatearEuros(linea.base)}
              </td>
              <td className="cifras px-5 py-3.5 text-right text-[13px] font-medium text-foreground">
                {formatearPorcentaje(linea.tipoIva)}
              </td>
              <td className="cifras px-5 py-3.5 text-right text-[13px] font-bold text-foreground">
                {formatearEuros(linea.total)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
