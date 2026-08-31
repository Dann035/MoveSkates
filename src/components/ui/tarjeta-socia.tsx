import { Leaf } from "lucide-react";
import type * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Tarjeta de socia · tablero 02. Panel con degradado malva (200°, #7C5CB0 →
 * #5A3F88), radio de panel, padding 24.
 *
 * Es el único sitio del sistema donde se pinta un degradado y donde el texto
 * va en blanco: representa una tarjeta física, no una superficie de interfaz.
 */

/**
 * Anchos de barra a partir del número de socia.
 *
 * NO es un código de barras real: no codifica EAN-13 ni Code128, solo produce
 * un patrón estable para el mismo número. Escanearlo no devuelve nada. El día
 * que la tarjeta tenga que leerse en una caja, esto se sustituye por un
 * generador de verdad — y entonces el ancho deja de ser decorativo.
 */
function anchosDeBarra(numero: string, cantidad = 58): number[] {
  const digitos = numero.replace(/\D/g, "") || "0";
  const anchos: number[] = [];

  for (let i = 0; i < cantidad; i++) {
    const d = Number(digitos[i % digitos.length]);
    anchos.push((d % 3) + 1);
  }

  return anchos;
}

export interface TarjetaSociaProps extends React.ComponentProps<"div"> {
  nombre: string;
  /** Con o sin espacios: se limpia para generar el patrón. */
  numeroSocia: string;
  /** Ya formateado: «03 / 2021». */
  sociaDesde: string;
  /** Ya formateado: «12,00 € / año». */
  cuota: string;
  programa?: string;
}

export function TarjetaSocia({
  nombre,
  numeroSocia,
  sociaDesde,
  cuota,
  programa = "Mercat Socios",
  className,
  ...props
}: TarjetaSociaProps) {
  const barras = anchosDeBarra(numeroSocia);

  return (
    <div
      data-slot="tarjeta-socia"
      className={cn(
        "flex flex-col justify-between gap-5 rounded-panel p-6 text-white",
        "bg-linear-[200deg,#7C5CB0_0%,#5A3F88_100%] shadow-raised",
        className,
      )}
      {...props}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <p className="text-[11px] font-bold tracking-wide uppercase text-white/70">
            {programa}
          </p>
          <p className="font-display text-[22px] leading-tight font-extrabold">
            {nombre}
          </p>
        </div>
        <Leaf className="size-7 shrink-0 text-white/60" aria-hidden />
      </div>

      <div
        className="flex items-center gap-0.5 rounded-lg bg-white px-3 py-2.5"
        role="img"
        aria-label={`Código de la tarjeta de socia ${numeroSocia}`}
      >
        {barras.map((ancho, i) => (
          <span
            key={i}
            style={{ width: ancho }}
            className="h-9 shrink-0 bg-foreground"
          />
        ))}
      </div>

      <dl className="flex justify-between gap-6">
        {[
          ["Nº de socia", numeroSocia],
          ["Socia desde", sociaDesde],
          ["Cuota", cuota],
        ].map(([etiqueta, valor]) => (
          <div key={etiqueta} className="flex flex-col gap-0.5">
            <dt className="text-[10px] font-semibold tracking-wide uppercase text-white/60">
              {etiqueta}
            </dt>
            <dd className="cifras text-sm font-bold">{valor}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
