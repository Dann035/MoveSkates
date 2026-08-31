import { createTV } from "tailwind-variants";

import { twMergeConfig } from "@/lib/utils";

/**
 * Punto único de entrada a tailwind-variants.
 *
 * Ningún componente importa `tailwind-variants` directamente: si lo hiciera,
 * usaría el twMerge por defecto —el que no conoce `rounded-control` ni
 * `shadow-raised`— y las clases que le pasen las vistas por `className` se
 * fusionarían mal solo en ese componente. Ver el comentario de utils.ts.
 */
export const tv = createTV({ twMergeConfig });

export type { VariantProps } from "tailwind-variants";
