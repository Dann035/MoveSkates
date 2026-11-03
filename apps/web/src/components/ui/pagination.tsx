import { ChevronLeft, ChevronRight } from "lucide-react";

import { ANILLO_FOCO } from "@/lib/foco";
import { tv } from "@/lib/tv";
import { cn } from "@/lib/utils";

/** Paginación · tablero 02. Casillas de 38, hueco 6, radio de control. */
const casilla = tv({
  base: [
    "inline-flex size-[38px] shrink-0 items-center justify-center",
    "rounded-control border text-sm transition-colors",
    ANILLO_FOCO,
  ],
  variants: {
    estado: {
      normal:
        "border-border bg-surface text-foreground font-medium hover:bg-surface-sunken",
      actual: "border-transparent bg-primary text-primary-foreground font-bold",
      inerte: "border-transparent bg-transparent text-muted-foreground",
      deshabilitado:
        "border-border bg-surface-sunken text-border-strong pointer-events-none",
    },
  },
  defaultVariants: { estado: "normal" },
});

const ELIPSIS = "…" as const;
type Casilla = number | typeof ELIPSIS;

/**
 * Páginas visibles alrededor de la actual, con elipsis y sin saltos.
 *
 * Devuelve siempre la primera y la última, `radio` vecinas a cada lado de la
 * actual, y `…` donde se corta. Cuando el hueco es de una sola página se pinta
 * esa página en vez de la elipsis: `1 … 5 6 7 … 12` sí, `1 … 3 … 12` no —
 * ocupan lo mismo y una de ellas es navegable.
 */
export function construirRango(
  actual: number,
  total: number,
  radio = 1,
): Casilla[] {
  if (total <= 1) return [1];

  const paginas = new Set<number>([1, total]);
  for (let p = actual - radio; p <= actual + radio; p++) {
    if (p >= 1 && p <= total) paginas.add(p);
  }

  const ordenadas = [...paginas].sort((a, b) => a - b);
  const salida: Casilla[] = [];

  for (const [i, pagina] of ordenadas.entries()) {
    if (i > 0) {
      const hueco = pagina - ordenadas[i - 1];
      if (hueco === 2) salida.push(pagina - 1);
      else if (hueco > 2) salida.push(ELIPSIS);
    }
    salida.push(pagina);
  }

  return salida;
}

export interface PaginacionProps {
  paginaActual: number;
  totalPaginas: number;
  /** Modo controlado. Se ignora si se pasa `href`. */
  onCambiar?: (pagina: number) => void;
  /** Modo enlace: renderiza `<a>` navegables, que sobreviven sin JavaScript. */
  href?: (pagina: number) => string;
  /** Vecinas a cada lado de la actual. */
  radio?: number;
  className?: string;
  /** Para lectores de pantalla. Distingue dos paginaciones en una vista. */
  etiqueta?: string;
}

export function Pagination({
  paginaActual,
  totalPaginas,
  onCambiar,
  href,
  radio = 1,
  className,
  etiqueta = "Paginación",
}: PaginacionProps) {
  if (totalPaginas <= 1) return null;

  const casillas = construirRango(paginaActual, totalPaginas, radio);

  const irA = (pagina: number, contenido: React.ReactNode, clave: string) => {
    const esActual = pagina === paginaActual;
    const fuera = pagina < 1 || pagina > totalPaginas;
    const clase = casilla({
      estado: fuera ? "deshabilitado" : esActual ? "actual" : "normal",
    });

    if (fuera) {
      return (
        <span key={clave} className={clase} aria-hidden>
          {contenido}
        </span>
      );
    }

    if (href) {
      return (
        <a
          key={clave}
          href={href(pagina)}
          className={clase}
          aria-current={esActual ? "page" : undefined}
          aria-label={`Página ${pagina}`}
        >
          {contenido}
        </a>
      );
    }

    return (
      <button
        key={clave}
        type="button"
        className={clase}
        aria-current={esActual ? "page" : undefined}
        aria-label={`Página ${pagina}`}
        onClick={() => onCambiar?.(pagina)}
      >
        {contenido}
      </button>
    );
  };

  return (
    <nav aria-label={etiqueta} className={cn("flex items-center gap-1.5", className)}>
      {irA(
        paginaActual - 1,
        <ChevronLeft className="size-4" aria-hidden />,
        "anterior",
      )}

      {casillas.map((c, i) =>
        c === ELIPSIS ? (
          <span
            key={`elipsis-${i}`}
            className={casilla({ estado: "inerte" })}
            aria-hidden
          >
            {ELIPSIS}
          </span>
        ) : (
          irA(c, <span className="cifras">{c}</span>, `p-${c}`)
        ),
      )}

      {irA(
        paginaActual + 1,
        <ChevronRight className="size-4" aria-hidden />,
        "siguiente",
      )}
    </nav>
  );
}
