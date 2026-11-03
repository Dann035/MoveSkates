"use client";

import { Heart, ShoppingCart } from "lucide-react";
import type * as React from "react";

import { BloquePrecio, type BloquePrecioProps } from "@/components/ui/bloque-precio";
import { Button } from "@/components/ui/button";
import { Etiqueta, type EtiquetaProps } from "@/components/ui/etiqueta";
import { SelectorCantidad } from "@/components/ui/selector-cantidad";
import { ANILLO_FOCO } from "@/lib/foco";
import { cn } from "@/lib/utils";

export interface DistintivoProducto {
  familia: EtiquetaProps["familia"];
  texto: string;
}

export interface TarjetaProductoProps
  extends Omit<React.ComponentProps<"article">, "onSelect"> {
  marca: string;
  nombre: string;
  /** Todo lo del bloque de precio, ya calculado por el dominio. */
  precio: Omit<BloquePrecioProps, "tamano" | "className">;
  /**
   * Imagen. Se recibe como nodo en vez de como URL para que la vista elija
   * entre `next/image`, un `<img>` o un marcador, sin que este componente
   * tenga que saber de dominios remotos ni de tamaños.
   */
  imagen?: React.ReactNode;
  /** Promoción, novedad, precio de socio… Se pintan sobre la imagen. */
  distintivos?: DistintivoProducto[];
  /** CAT-03: se sigue viendo, pero no se puede añadir a la cesta. */
  sinStock?: boolean;
  /** Unidades ya en la cesta. Si es > 0, la acción pasa a ser el selector. */
  cantidadEnCesta?: number;
  /** Límite por referencia (CES-04). */
  maxPorPedido?: number;
  favorito?: boolean;
  onAlternarFavorito?: () => void;
  onAnadir?: () => void;
  onCambiarCantidad?: (cantidad: number) => void;
  onEliminarDeCesta?: () => void;
  /** Enlace a la ficha. Envuelve imagen y nombre, no la tarjeta entera. */
  href?: string;
}

export function TarjetaProducto({
  marca,
  nombre,
  precio,
  imagen,
  distintivos,
  sinStock = false,
  cantidadEnCesta = 0,
  maxPorPedido,
  favorito = false,
  onAlternarFavorito,
  onAnadir,
  onCambiarCantidad,
  onEliminarDeCesta,
  href,
  className,
  ...props
}: TarjetaProductoProps) {
  const titulo = href ? (
    <a
      href={href}
      className={cn("hover:text-primary transition-colors", ANILLO_FOCO)}
    >
      {nombre}
    </a>
  ) : (
    nombre
  );

  return (
    <article
      data-slot="tarjeta-producto"
      className={cn(
        "group flex w-full flex-col overflow-hidden",
        "rounded-card border border-border bg-surface",
        "shadow-rest transition-shadow hover:shadow-raised",
        sinStock && "opacity-90",
        className,
      )}
      {...props}
    >
      <div className="relative flex h-44 shrink-0 items-start justify-between bg-surface-sunken p-3">
        {imagen && (
          <div className="absolute inset-0 -z-0 [&_img]:size-full [&_img]:object-contain">
            {imagen}
          </div>
        )}

        <div className="relative z-10 flex flex-wrap gap-1.5">
          {sinStock && <Etiqueta familia="alerta">Sin stock</Etiqueta>}
          {distintivos?.map((d) => (
            <Etiqueta key={d.texto} familia={d.familia}>
              {d.texto}
            </Etiqueta>
          ))}
        </div>

        {onAlternarFavorito && (
          <button
            type="button"
            onClick={onAlternarFavorito}
            aria-pressed={favorito}
            aria-label={
              favorito
                ? `Quitar ${nombre} de favoritos`
                : `Añadir ${nombre} a favoritos`
            }
            className={cn(
              "relative z-10 inline-flex size-8 shrink-0 items-center justify-center",
              "rounded-pill bg-surface/90 backdrop-blur-sm transition-colors",
              favorito
                ? "text-promo"
                : "text-muted-foreground hover:text-promo",
              ANILLO_FOCO,
            )}
          >
            <Heart
              className="size-4"
              fill={favorito ? "currentColor" : "none"}
              aria-hidden
            />
          </button>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2.5 p-4">
        <p className="text-xs font-medium text-muted-foreground">{marca}</p>

        {/* §8.6: dos líneas fijas. Sin esto, los botones de una fila de
            tarjetas quedan a alturas distintas según lo largo del nombre. */}
        <h3 className="line-clamp-2 min-h-10 text-sm leading-tight font-semibold text-foreground">
          {titulo}
        </h3>

        <BloquePrecio {...precio} />

        <div className="mt-auto pt-1">
          {sinStock ? (
            <Button intencion="contorno" anchoCompleto disabled>
              Sin stock
            </Button>
          ) : cantidadEnCesta > 0 ? (
            <SelectorCantidad
              valor={cantidadEnCesta}
              max={maxPorPedido}
              etiqueta={nombre}
              onCambiar={onCambiarCantidad}
              onEliminar={onEliminarDeCesta}
              className="w-full [&>output]:flex-1"
            />
          ) : (
            <Button intencion="primario" anchoCompleto onClick={onAnadir}>
              <ShoppingCart aria-hidden />
              Añadir
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
