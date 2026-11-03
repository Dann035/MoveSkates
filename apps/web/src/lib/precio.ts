/**
 * Formateo de importes para pintar. NO es aritmética de dinero.
 *
 * FRONTERA, y es dura: aquí no se suma, no se aplica un descuento, no se
 * decide un redondeo y no se calcula un IVA. Todo eso llega ya resuelto desde
 * el dominio (ticket TRA-06) y estos componentes solo lo muestran. Si algún
 * día una función de este fichero necesita operar con dos importes, el error
 * está en quien llama, no aquí.
 */

/** Unidad de medida sobre la que se expresa el precio de referencia. */
export type UnidadMedida = "kg" | "L" | "ud";

const FORMATO_EUR = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const FORMATO_DECIMAL = new Intl.NumberFormat("es-ES", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/**
 * Los importes viajan como string decimal cuando vienen de una columna
 * `numeric` de Postgres. Se acepta ese formato además de `number` para que el
 * frontend no obligue al backend a degradar la precisión antes de enviar.
 */
export type Importe = number | string;

function aNumero(valor: Importe): number {
  return typeof valor === "number" ? valor : Number(valor);
}

/** `1.89` → `"1,89 €"` */
export function formatearEuros(valor: Importe): string {
  return FORMATO_EUR.format(aNumero(valor));
}

/** `1.89` → `"1,89"` — sin símbolo, para tablas que ya lo llevan en cabecera. */
export function formatearDecimal(valor: Importe): string {
  return FORMATO_DECIMAL.format(aNumero(valor));
}

/** `-1.89` → `"−1,89 €"` con el signo menos tipográfico, no el guion. */
export function formatearAhorro(valor: Importe): string {
  const n = Math.abs(aNumero(valor));
  return `−${FORMATO_EUR.format(n)}`;
}

/** `1.89, "L"` → `"1,89 €/L"` */
export function formatearPrecioUnidad(
  valor: Importe,
  unidad: UnidadMedida,
): string {
  return `${FORMATO_EUR.format(aNumero(valor))}/${unidad}`;
}

/** `0.15` → `"15 %"` — para el porcentaje de una promoción o del IVA. */
export function formatearPorcentaje(fraccion: number): string {
  return new Intl.NumberFormat("es-ES", {
    style: "percent",
    maximumFractionDigits: 2,
  }).format(fraccion);
}

export interface ImportePartido {
  /** Parte entera, con separador de millar si toca: `"1"`, `"1.240"` */
  enteros: string;
  /** Coma, decimales y símbolo: `",89 €"` */
  decimales: string;
}

/**
 * Parte un importe para el Bloque de precio, que pinta el entero al doble de
 * tamaño que los céntimos y el símbolo (diseño/README.md §4).
 *
 * Se usa `formatToParts` en vez de partir la cadena por la coma: el separador
 * decimal, el de millares y la posición del símbolo son cosa del locale, y
 * escribirlos a mano es el bug que aparece el día que alguien cambia es-ES.
 */
export function partirImporte(valor: Importe): ImportePartido {
  const partes = FORMATO_EUR.formatToParts(aNumero(valor));

  let enteros = "";
  let decimales = "";
  let yaPasoElEntero = false;

  for (const parte of partes) {
    if (parte.type === "integer" || parte.type === "group") {
      enteros += parte.value;
      continue;
    }
    if (parte.type === "decimal") yaPasoElEntero = true;
    if (yaPasoElEntero) decimales += parte.value;
  }

  return { enteros, decimales };
}
