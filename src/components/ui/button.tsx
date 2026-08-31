import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { Loader2 } from "lucide-react";

import { ANILLO_FOCO, DESHABILITADO } from "@/lib/foco";
import { tv, type VariantProps } from "@/lib/tv";
import { cn } from "@/lib/utils";

/**
 * Botón · tablero 02 del diseño.
 *
 * Cinco intenciones, tres tamaños. Medidas tomadas del .pen: alto 40, padding
 * horizontal 18, hueco 8, texto 14/600, icono 18.
 */
const botonVariants = tv({
  base: [
    "relative inline-flex shrink-0 items-center justify-center gap-2",
    "rounded-control border border-transparent bg-clip-padding",
    "font-sans font-semibold whitespace-nowrap select-none",
    "transition-colors",
    ANILLO_FOCO,
    DESHABILITADO,
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  variants: {
    intencion: {
      primario: "bg-primary text-primary-foreground hover:bg-primary-hover",
      secundario:
        "bg-primary-surface text-primary-on-surface border-primary-border hover:bg-primary-border",
      contorno:
        "bg-surface text-foreground border-border-strong hover:bg-surface-sunken",
      /** Contorno suave. Es el «Botón icono» del .pen: borde normal, no fuerte. */
      sutil: "bg-surface text-foreground border-border hover:bg-surface-sunken",
      fantasma: "bg-transparent text-foreground hover:bg-surface-sunken",
      destructivo:
        "bg-destructive text-primary-foreground hover:bg-destructive/90",
      enlace:
        "bg-transparent text-primary underline-offset-4 hover:underline h-auto p-0",
    },
    tamano: {
      sm: "h-[34px] px-3.5 text-[13px] [&_svg]:size-4",
      md: "h-10 px-[18px] text-sm [&_svg]:size-[18px]",
      lg: "h-12 px-6 text-base [&_svg]:size-5",
      /* Cuadrados, solo icono. Los tres tamaños del .pen: 34 / 36 / 40 */
      "icono-sm": "size-[34px] p-0 [&_svg]:size-4",
      "icono-md": "size-9 p-0 [&_svg]:size-[18px]",
      "icono-lg": "size-10 p-0 [&_svg]:size-5",
    },
    anchoCompleto: {
      true: "w-full",
    },
  },
  defaultVariants: {
    intencion: "primario",
    tamano: "md",
  },
});

type BotonVariantes = VariantProps<typeof botonVariants>;

export interface BotonProps
  extends Omit<ButtonPrimitive.Props, "className">,
    BotonVariantes {
  /**
   * Base UI admite aquí una función `(estado) => string`. Se restringe a
   * string a propósito: las variantes de estado las decide `botonVariants`,
   * no quien llama, y así el sistema no se bifurca componente a componente.
   */
  className?: string;
  /**
   * §6 del diseño: el botón **mantiene su ancho** mientras carga; cambia icono
   * y etiqueta, no se encoge. Por eso el contenido original sigue ocupando
   * sitio (invisible) y el indicador se superpone.
   */
  cargando?: boolean;
  /** Texto que sustituye a la etiqueta mientras carga. */
  etiquetaCargando?: string;
}

function Button({
  className,
  intencion,
  tamano,
  anchoCompleto,
  cargando = false,
  etiquetaCargando,
  disabled,
  children,
  ...props
}: BotonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(
        botonVariants({ intencion, tamano, anchoCompleto, className }),
      )}
      disabled={disabled || cargando}
      aria-busy={cargando || undefined}
      {...props}
    >
      {/* `invisible` es visibility:hidden, así que este nodo reserva el ancho
          pero desaparece del árbol de accesibilidad. Sin el `sr-only` de
          abajo, un botón cargando sin `etiquetaCargando` se queda sin nombre
          accesible y el lector solo anuncia «botón». */}
      <span
        className={cn("inline-flex items-center gap-2", cargando && "invisible")}
        aria-hidden={cargando || undefined}
      >
        {children}
      </span>

      {cargando && (
        <>
          <span className="absolute inset-0 inline-flex items-center justify-center gap-2 px-3">
            <Loader2 className="animate-spin" aria-hidden />
            {etiquetaCargando ? (
              <span className="truncate" aria-hidden>
                {etiquetaCargando}
              </span>
            ) : null}
          </span>
          <span className="sr-only">
            {etiquetaCargando ?? children}
            {" — en curso"}
          </span>
        </>
      )}
    </ButtonPrimitive>
  );
}

export { Button, botonVariants };
