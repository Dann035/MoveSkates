import {
  formatearEuros,
  formatearPrecioUnidad,
  partirImporte,
  type Importe,
  type UnidadMedida,
} from "@/lib/precio";
import { tv, type VariantProps } from "@/lib/tv";
import { cn } from "@/lib/utils";

/**
 * Bloque de precio · tablero 02.
 *
 * Tratamiento fijo en toda la plataforma (diseño/README.md §4): entero grande,
 * céntimos y símbolo a la mitad y alineados arriba; debajo, en una línea, el
 * precio anterior tachado y el precio por unidad de medida.
 */
const precioVariants = tv({
  slots: {
    raiz: "flex flex-col gap-1",
    actual: "flex items-start gap-0.5 font-display font-extrabold cifras",
    centimos: "font-display font-bold cifras leading-none",
    referencia: "flex items-center gap-2.5 text-muted-foreground",
  },
  variants: {
    variante: {
      /** Precio normal. */
      normal: { actual: "text-foreground", centimos: "text-foreground" },
      /** Precio rebajado por una promoción del producto. */
      promo: { actual: "text-promo", centimos: "text-promo" },
      /** Precio de socio. Negro, porque la ventaja viene de la cuota. */
      socio: { actual: "text-member", centimos: "text-member" },
    },
    tamano: {
      sm: {
        actual: "text-xl",
        centimos: "text-[11px] pt-[2px]",
        referencia: "text-[11px]",
      },
      md: {
        actual: "text-[28px] leading-none",
        centimos: "text-[15px] pt-[3px]",
        referencia: "text-xs",
      },
      lg: {
        actual: "text-4xl leading-none",
        centimos: "text-xl pt-1",
        referencia: "text-[13px]",
      },
    },
  },
  defaultVariants: { variante: "normal", tamano: "md" },
});

export interface PrecioUnidad {
  importe: Importe;
  unidad: UnidadMedida;
}

export interface BloquePrecioProps
  extends VariantProps<typeof precioVariants> {
  /** Importe que se paga. Llega ya calculado: aquí no se descuenta nada. */
  importe: Importe;
  /** Precio antes de la ventaja. Se pinta tachado. */
  importeAnterior?: Importe;
  /**
   * Precio por unidad de medida. **Obligatorio, y por eso no es opcional en el
   * tipo**: es exigible legalmente en España y es lo único que permite
   * comparar dos formatos del mismo producto. Aparece en tarjeta, ficha, línea
   * de cesta y ticket (diseño/README.md §4).
   */
  precioUnidad: PrecioUnidad;
  className?: string;
}

export function BloquePrecio({
  importe,
  importeAnterior,
  precioUnidad,
  variante,
  tamano,
  className,
}: BloquePrecioProps) {
  const { raiz, actual, centimos, referencia } = precioVariants({
    variante,
    tamano,
  });
  const { enteros, decimales } = partirImporte(importe);

  return (
    <div data-slot="bloque-precio" className={cn(raiz(), className)}>
      {/* Partido en dos nodos, el lector lee «1» y «,89 €» como dos cifras
          distintas. Se le da el importe entero en un nodo solo-lectores y se
          ocultan las partes visuales.

          No se usa `aria-label` sobre el <p>: un párrafo no tiene rol
          implícito y ARIA prohíbe etiquetarlo, así que el atributo se ignora
          en algunos lectores y el precio se leería partido igualmente. */}
      <p className={actual()}>
        <span className="sr-only">{formatearEuros(importe)}</span>
        <span aria-hidden>{enteros}</span>
        <span className={centimos()} aria-hidden>
          {decimales}
        </span>
      </p>

      <p className={referencia()}>
        {importeAnterior !== undefined && (
          <span className="cifras line-through">
            <span className="sr-only">Antes: </span>
            {formatearEuros(importeAnterior)}
          </span>
        )}
        <span className="cifras">
          {formatearPrecioUnidad(precioUnidad.importe, precioUnidad.unidad)}
        </span>
      </p>
    </div>
  );
}

export { precioVariants };
