import { Check } from "lucide-react";
import type * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Proceso por pasos · tablero 02. Círculo de 34, hueco 10, conector de 2 px.
 *
 * Lo usa el checkout de tres pasos (PED-02). El paso completado lleva check;
 * el actual, su número sobre primario; los pendientes, número en contorno.
 *
 * PED-02 exige además poder volver atrás sin perder lo introducido: por eso un
 * paso ya completado admite `href`/`onIr` y los pendientes nunca.
 */
export interface Paso {
  /** «Entrega», «Pago», «Revisión». */
  etiqueta: string;
  href?: string;
  onIr?: () => void;
}

export interface ProcesoPasosProps extends React.ComponentProps<"nav"> {
  pasos: Paso[];
  /** 1-indexado, como lo lee una persona. */
  pasoActual: number;
  /**
   * Nombre del landmark. Dos `<nav>` con la misma etiqueta en una página son
   * indistinguibles para quien navega por landmarks, así que si hay más de un
   * proceso a la vista hay que diferenciarlos.
   */
  etiqueta?: string;
}

export function ProcesoPasos({
  pasos,
  pasoActual,
  etiqueta = "Progreso del pedido",
  className,
  ...props
}: ProcesoPasosProps) {
  return (
    <nav
      data-slot="proceso-pasos"
      aria-label={etiqueta}
      className={cn("flex w-full items-center", className)}
      {...props}
    >
      <ol className="flex w-full items-center">
        {pasos.map((paso, i) => {
          const orden = i + 1;
          const completado = orden < pasoActual;
          const actual = orden === pasoActual;
          const navegable = completado && (paso.href || paso.onIr);

          const circulo = (
            <span
              className={cn(
                "flex size-8.5 shrink-0 items-center justify-center rounded-pill text-sm font-bold transition-colors",
                completado || actual
                  ? "bg-primary text-primary-foreground"
                  : "border border-border-strong bg-surface text-muted-foreground",
              )}
            >
              {completado ? (
                <Check className="size-4" aria-hidden />
              ) : (
                <span className="cifras">{orden}</span>
              )}
            </span>
          );

          const textos = (
            <span className="flex flex-col gap-px text-left">
              <span className="text-[11px] text-muted-foreground">
                Paso {orden}
              </span>
              <span
                className={cn(
                  "text-sm font-bold",
                  actual || completado
                    ? "text-foreground"
                    : "text-muted-foreground",
                )}
              >
                {paso.etiqueta}
              </span>
            </span>
          );

          return (
            <li
              key={paso.etiqueta}
              className={cn("flex items-center", i > 0 && "flex-1")}
              aria-current={actual ? "step" : undefined}
            >
              {i > 0 && (
                <span
                  aria-hidden
                  className={cn(
                    "mx-3 h-0.5 flex-1",
                    completado || actual ? "bg-primary" : "bg-border",
                  )}
                />
              )}

              {navegable ? (
                <a
                  href={paso.href}
                  onClick={paso.onIr}
                  className="flex items-center gap-2.5 rounded-control focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  {circulo}
                  {textos}
                  <span className="sr-only">— completado, volver a este paso</span>
                </a>
              ) : (
                <span className="flex items-center gap-2.5">
                  {circulo}
                  {textos}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
