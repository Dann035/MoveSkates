import type * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Esqueletos de carga · tablero 02 y tablero 07.
 *
 * Un esqueleto tiene que ocupar **el mismo sitio** que el contenido que
 * sustituye. Si no, el contenido real entra y desplaza lo que hay debajo justo
 * cuando el usuario ya había ido a pulsar algo. Por eso estas piezas replican
 * las medidas de la tarjeta y de la línea reales, no un rectángulo genérico.
 */
export function Esqueleto({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="esqueleto"
      className={cn("animate-pulse rounded-control bg-surface-sunken", className)}
      {...props}
    />
  );
}

/** Mismas medidas que `TarjetaProducto`: imagen 176, cuerpo con 4 bloques. */
export function EsqueletoTarjeta({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-card border border-border bg-surface",
        className,
      )}
      aria-hidden
      {...props}
    >
      <Esqueleto className="h-44 rounded-none" />
      <div className="flex flex-col gap-2.5 p-4">
        <Esqueleto className="h-3 w-20" />
        <Esqueleto className="h-4 w-full" />
        <Esqueleto className="h-4 w-3/4" />
        <Esqueleto className="mt-1 h-7 w-24" />
        <Esqueleto className="mt-2 h-10 w-full" />
      </div>
    </div>
  );
}

/** Rejilla de tarjetas. `cantidad` debe coincidir con el tamaño de página. */
export function EsqueletoRejilla({
  cantidad = 8,
  className,
}: {
  cantidad?: number;
  className?: string;
}) {
  return (
    <div
      role="status"
      aria-label="Cargando productos"
      className={cn(
        "grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4",
        className,
      )}
    >
      {Array.from({ length: cantidad }, (_, i) => (
        <EsqueletoTarjeta key={i} />
      ))}
    </div>
  );
}

/** Mismas medidas que `LineaCesta`: miniatura de 76 y tres líneas de texto. */
export function EsqueletoLinea({ className }: { className?: string }) {
  return (
    <div
      className={cn("flex items-center gap-4 border-b border-border py-4", className)}
      aria-hidden
    >
      <Esqueleto className="size-19 shrink-0" />
      <div className="flex flex-1 flex-col gap-2">
        <Esqueleto className="h-3 w-24" />
        <Esqueleto className="h-4 w-56" />
        <Esqueleto className="h-3 w-40" />
      </div>
      <Esqueleto className="h-10 w-29 shrink-0" />
      <Esqueleto className="h-6 w-20 shrink-0" />
    </div>
  );
}

export function EsqueletoLista({
  cantidad = 4,
  className,
}: {
  cantidad?: number;
  className?: string;
}) {
  return (
    <div role="status" aria-label="Cargando" className={className}>
      {Array.from({ length: cantidad }, (_, i) => (
        <EsqueletoLinea key={i} />
      ))}
    </div>
  );
}
