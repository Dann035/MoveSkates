import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge no conoce los tokens de este diseño. Sin declararlos, dos
 * clases del mismo grupo NO se fusionan y ganan las dos:
 *
 *   cn("rounded-control", "rounded-card")  →  "rounded-control rounded-card"
 *
 * El navegador aplica la última del CSS, no la última del argumento, así que
 * el resultado depende del orden en que Tailwind generó las utilidades. Es un
 * fallo silencioso: no rompe el build y solo se ve en pantalla.
 *
 * `text-display` es el caso feo: sin declararlo como tamaño, twMerge lo trata
 * como color de texto y `cn("text-display", "text-foreground")` se come el
 * tamaño.
 */
export const twMergeConfig = {
  extend: {
    classGroups: {
      rounded: [{ rounded: ["control", "card", "panel", "pill"] }],
      shadow: [{ shadow: ["rest", "raised", "float"] }],
      "font-size": [{ text: ["display"] }],
    },
  },
} as const;

const twMerge = extendTailwindMerge(twMergeConfig);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export { twMerge };
