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
 * `blanco` es el ratio del tono de acción sobre `--surface`, que es el que
 * publica el traspaso de diseño. `pastel` es el mismo tono sobre la superficie
 * **de su propia familia**, que es como lo usan etiqueta, chip activo, aviso y
 * banda de ahorro — y ese no estaba medido.
 *
 * Primario y coral no llegaban a 4.5 ahí, así que tienen un tono corregido
 * (`--primary-on-surface`, `--promo-on-surface`) y es el que se pinta en esta
 * columna. Ver el bloque de globals.css.
 */
const FAMILIAS = [
  {
    nombre: "Verde salvia · primario",
    uso: "Marca, CTA principal, añadir a la cesta, confirmaciones",
    blanco: "4.99",
    pastel: "4.62",
    corregido: true,
    superficie: "bg-primary-surface",
    borde: "border-primary-border",
    accion: "bg-primary",
    texto: "text-primary-on-surface",
  },
  {
    nombre: "Coral · promoción",
    uso: "3x2, 2ª al 50 %, bajadas de precio, ahorro",
    blanco: "4.66",
    pastel: "4.61",
    corregido: true,
    superficie: "bg-promo-surface",
    borde: "border-promo-border",
    accion: "bg-promo",
    texto: "text-promo-on-surface",
  },
  {
    nombre: "Malva · socio",
    uso: "Tarjeta de socia, precio de socia, cuota",
    blanco: "6.54",
    pastel: "5.54",
    superficie: "bg-member-surface",
    borde: "border-member-border",
    accion: "bg-member",
    texto: "text-member",
  },
  {
    nombre: "Miel · cupón",
    uso: "Cupones, umbrales, prorrateo",
    blanco: "6.37",
    pastel: "5.75",
    superficie: "bg-coupon-surface",
    borde: "border-coupon-border",
    accion: "bg-coupon",
    texto: "text-coupon",
  },
  {
    nombre: "Azul · información",
    uso: "Entrega, avisos neutros, estado de pedido",
    blanco: "6.50",
    pastel: "5.69",
    superficie: "bg-info-surface",
    borde: "border-info-border",
    accion: "bg-info",
    texto: "text-info",
  },
  {
    nombre: "Rojo · error",
    uso: "Validación, sin stock, cupón caído, borrar",
    blanco: "6.54",
    pastel: "5.63",
    superficie: "bg-destructive-surface",
    borde: "border-destructive-border",
    accion: "bg-destructive",
    texto: "text-destructive",
  },
];

const NEUTROS = [
  ["Fondo de página", "bg-background", "#FDFCFB"],
  ["Superficie", "bg-surface", "#FFFFFF"],
  ["Superficie hundida", "bg-surface-sunken", "#F4F2EF"],
  ["Borde", "bg-border", "#E6E2DC"],
  ["Borde fuerte", "bg-border-strong", "#C9C3BA"],
  ["Texto secundario", "bg-muted-foreground", "#5B6B62"],
  ["Texto principal", "bg-foreground", "#1C2B24"],
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
          <div className="flex gap-6 px-4 text-[11px] font-bold tracking-wide text-muted-foreground uppercase">
            <span className="flex-1">Familia</span>
            <span className="w-20 text-right">Sobre blanco</span>
            <span className="w-20 text-right">Sobre pastel</span>
          </div>

          {FAMILIAS.map((f) => (
            <div
              key={f.nombre}
              className={`flex flex-wrap items-center gap-4 rounded-card border p-4 ${f.superficie} ${f.borde}`}
            >
              <div className={`size-12 shrink-0 rounded-control ${f.accion}`} />
              <div className="min-w-52 flex-1">
                <p className={`font-bold ${f.texto}`}>
                  {f.nombre}
                  {f.corregido && (
                    <span className="ml-2 font-normal text-muted-foreground">
                      · tono corregido sobre pastel
                    </span>
                  )}
                </p>
                <p className="text-[13px] text-muted-foreground">{f.uso}</p>
              </div>
              <p className="cifras w-20 text-right text-sm font-bold text-foreground">
                {f.blanco}
              </p>
              <p className={`cifras w-20 text-right text-sm font-bold ${f.texto}`}>
                {f.pastel}
              </p>
            </div>
          ))}

          <p className="mt-1 text-[13px] text-muted-foreground">
            El traspaso de diseño publica solo la primera columna. La segunda es
            la que gobierna etiqueta, chip activo, aviso y banda de ahorro, y en
            primario y coral no llegaba a 4.5:1 con el tono original.
          </p>
        </div>
      </Seccion>

      <Seccion
        titulo="Neutros cálidos"
        nota="Nunca grises fríos. La elevación se tinta con el verde tinta del texto, no con negro."
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
        nota="Plus Jakarta Sans para titulares, cifras, precios e importes. Inter para interfaz, cuerpo y formularios."
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
                Leche entera 1 L
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
            ["Panel", "rounded-panel", "16 · modal, tarjeta de socia"],
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
        nota="Tres niveles, siempre tintados de verde tinta (#1C2B24), nunca negro puro."
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
