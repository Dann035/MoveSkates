/**
 * Anillo de foco. Definido UNA vez y aplicado igual en los 42 componentes.
 *
 * diseño/README.md §6: «anillo de 2 px del color de acción, por fuera del
 * control y con separación. Es lo primero que se pierde en un diseño pastel y
 * lo primero que hay que exigir en la revisión».
 *
 * `outline` en vez de `ring` a propósito: el outline no participa en el
 * layout, así que no descuadra un control dentro de un flex, y respeta el
 * radio del propio elemento sin tener que repetirlo.
 */
export const ANILLO_FOCO =
  "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

/** Variante para controles sobre superficie oscura o de color de acción. */
export const ANILLO_FOCO_INVERSO =
  "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground";

/**
 * Deshabilitado. §6: «superficie hundida y texto en borde fuerte. Nunca solo
 * opacidad sobre el color primario: pierde contraste sin avisar».
 */
export const DESHABILITADO =
  "disabled:pointer-events-none disabled:bg-surface-sunken disabled:text-border-strong disabled:border-border disabled:shadow-none";
