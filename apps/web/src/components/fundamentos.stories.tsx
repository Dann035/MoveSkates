import type { Meta, StoryObj } from "@storybook/nextjs-vite";

/**
 * Tablero 01 del diseño, hecho código. No es un componente: es la prueba de
 * que los tokens existen con nombre semántico y con los valores del `.pen`.
 */
const meta: Meta = {
  title: "01 · Fundamentos/Tokens",
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj;

/**
 * Marca monocroma: el único color de marca es el rojo (acción y promoción).
 * Socio, cupón e info se expresan en negro/gris y se distinguen por icono y
 * jerarquía, no por color. El error es un rojo más oscuro que el de marca.
 *
 * El contraste de cada familia (acción sobre superficie y sobre su pastel) se
 * valida con el addon de accesibilidad (axe) en estas mismas stories; por eso
 * aquí no se publican ratios medidos a mano.
 */
const FAMILIAS = [
  {
    nombre: "Rojo · primario",
    uso: "Marca, CTA principal, añadir a la cesta, confirmaciones",
    superficie: "bg-primary-surface",
    borde: "border-primary-border",
    accion: "bg-primary",
    texto: "text-primary-on-surface",
  },
  {
    nombre: "Rojo · promoción",
    uso: "3x2, 2ª al 50 %, bajadas de precio, ahorro",
    superficie: "bg-promo-surface",
    borde: "border-promo-border",
    accion: "bg-promo",
    texto: "text-promo-on-surface",
  },
  {
    nombre: "Negro · socio",
    uso: "Tarjeta de socio, precio de socio, cuota",
    superficie: "bg-member-surface",
    borde: "border-member-border",
    accion: "bg-member",
    texto: "text-member",
  },
  {
    nombre: "Gris oscuro · cupón",
    uso: "Cupones, umbrales, prorrateo",
    superficie: "bg-coupon-surface",
    borde: "border-coupon-border",
    accion: "bg-coupon",
    texto: "text-coupon",
  },
  {
    nombre: "Gris · información",
    uso: "Entrega, avisos neutros, estado de pedido",
    superficie: "bg-info-surface",
    borde: "border-info-border",
    accion: "bg-info",
    texto: "text-info",
  },
  {
    nombre: "Rojo · error",
    uso: "Validación, sin stock, cupón caído, borrar",
    superficie: "bg-destructive-surface",
    borde: "border-destructive-border",
    accion: "bg-destructive",
    texto: "text-destructive",
  },
];

const NEUTROS = [
  ["Fondo de página", "bg-background", "#FAFAFA"],
  ["Superficie", "bg-surface", "#FFFFFF"],
  ["Superficie hundida", "bg-surface-sunken", "#F4F4F5"],
  ["Borde", "bg-border", "#E4E4E7"],
  ["Borde fuerte", "bg-border-strong", "#A1A1AA"],
  ["Texto secundario", "bg-muted-foreground", "#52525B"],
  ["Texto principal", "bg-foreground", "#18181B"],
];

const Seccion = ({
  titulo,
  nota,
  children,
}: {
  titulo: string;
  nota?: string;
  children: React.ReactNode;
}) => (
  <section className="flex flex-col gap-4">
    <div>
      <h2 className="font-display text-2xl font-extrabold text-foreground">
        {titulo}
      </h2>
      {nota && <p className="mt-1 text-sm text-muted-foreground">{nota}</p>}
    </div>
    {children}
  </section>
);

export const Color: Story = {
  render: () => (
    <div className="flex flex-col gap-10 p-2">
      <Seccion
        titulo="Familias de color"
        nota="Cada familia tiene tres piezas: superficie, borde y acción. Un pastel nunca lleva texto encima ni pinta un botón primario. El color identifica el tipo de ventaja, no decora."
      >
        <div className="flex flex-col gap-3">
          {FAMILIAS.map((f) => (
            <div
              key={f.nombre}
              className={`flex flex-wrap items-center gap-4 rounded-card border p-4 ${f.superficie} ${f.borde}`}
            >
              <div className={`size-12 shrink-0 rounded-control ${f.accion}`} />
              <div className="min-w-52 flex-1">
                <p className={`font-bold ${f.texto}`}>{f.nombre}</p>
                <p className="text-[13px] text-muted-foreground">{f.uso}</p>
              </div>
            </div>
          ))}
        </div>
      </Seccion>

      <Seccion
        titulo="Neutros fríos"
        nota="Grises fríos neutros. La elevación usa una sombra neutra, sin tinte de color."
      >
        <div className="flex flex-wrap gap-3">
          {NEUTROS.map(([nombre, clase, hex]) => (
            <div key={nombre} className="w-40">
              <div
                className={`h-16 rounded-control border border-border ${clase}`}
              />
              <p className="mt-1.5 text-[13px] font-semibold text-foreground">
                {nombre}
              </p>
              <p className="cifras text-xs text-muted-foreground">{hex}</p>
            </div>
          ))}
        </div>
      </Seccion>
    </div>
  ),
};

export const Tipografia: Story = {
  render: () => (
    <div className="flex flex-col gap-10 p-2">
      <Seccion
        titulo="Escala"
        nota="Archivo para titulares, cifras, precios e importes. Inter para interfaz, cuerpo y formularios."
      >
        <div className="flex flex-col gap-3">
          {[
            ["text-display", "44 · display"],
            ["text-4xl", "36"],
            ["text-3xl", "30"],
            ["text-2xl", "24"],
            ["text-xl", "20"],
            ["text-lg", "18"],
            ["text-base", "16"],
            ["text-sm", "14"],
            ["text-xs", "12"],
          ].map(([clase, etiqueta]) => (
            <div key={clase} className="flex items-baseline gap-6">
              <span className="cifras w-24 shrink-0 text-xs text-muted-foreground">
                {etiqueta}
              </span>
              <span className={`font-display font-extrabold ${clase}`}>
                Patines RB Cruiser
              </span>
            </div>
          ))}
        </div>
      </Seccion>

      <Seccion
        titulo="Cifras tabulares"
        nota="La clase .cifras. Sin ella, una columna de precios no alinea las comas y la tabla deja de poder leerse de un vistazo."
      >
        <div className="flex gap-10">
          {[
            ["Con .cifras", "cifras"],
            ["Sin .cifras", ""],
          ].map(([titulo, clase]) => (
            <div key={titulo}>
              <p className="mb-2 text-[13px] font-semibold">{titulo}</p>
              <div className={`flex flex-col font-display font-bold ${clase}`}>
                <span>1,89 €</span>
                <span>11,10 €</span>
                <span>184,20 €</span>
              </div>
            </div>
          ))}
        </div>
      </Seccion>
    </div>
  ),
};

export const FormaYElevacion: Story = {
  name: "Forma y elevación",
  render: () => (
    <div className="flex flex-col gap-10 p-2">
      <Seccion titulo="Radios">
        <div className="flex flex-wrap gap-4">
          {[
            ["Control", "rounded-control", "8 · botón, input, miniatura"],
            ["Tarjeta", "rounded-card", "12 · tarjeta, tabla"],
            ["Panel", "rounded-panel", "16 · modal, tarjeta de socio"],
            ["Pastilla", "rounded-pill", "999 · etiqueta, chip, avatar"],
          ].map(([nombre, clase, nota]) => (
            <div key={nombre} className="w-48">
              <div
                className={`h-20 border border-border-strong bg-surface ${clase}`}
              />
              <p className="mt-1.5 text-[13px] font-semibold">{nombre}</p>
              <p className="text-xs text-muted-foreground">{nota}</p>
            </div>
          ))}
        </div>
      </Seccion>

      <Seccion
        titulo="Elevación"
        nota="Tres niveles, con una sombra neutra (gris carbón, #18181B), sin tinte de color."
      >
        <div className="flex flex-wrap gap-6">
          {[
            ["1 · reposo", "shadow-rest", "Tarjeta en rejilla"],
            ["2 · elevado", "shadow-raised", "Hover, desplegable"],
            ["3 · flotante", "shadow-float", "Modal, drawer, barra fija"],
          ].map(([nombre, clase, nota]) => (
            <div key={nombre} className="w-52">
              <div className={`h-24 rounded-card bg-surface ${clase}`} />
              <p className="mt-3 text-[13px] font-semibold">{nombre}</p>
              <p className="text-xs text-muted-foreground">{nota}</p>
            </div>
          ))}
        </div>
      </Seccion>

      <Seccion
        titulo="Espaciado"
        nota="Base 4. Nada se coloca fuera de esta escala."
      >
        <div className="flex flex-wrap items-end gap-3">
          {[4, 8, 12, 16, 20, 24, 32, 40, 48, 64].map((v) => (
            <div key={v} className="flex flex-col items-center gap-1.5">
              <div
                style={{ width: v, height: v }}
                className="bg-primary-border"
              />
              <span className="cifras text-xs text-muted-foreground">{v}</span>
            </div>
          ))}
        </div>
      </Seccion>
    </div>
  ),
};
