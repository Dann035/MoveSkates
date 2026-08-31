import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { BloquePrecio } from "@/components/ui/bloque-precio";
import { Etiqueta } from "@/components/ui/etiqueta";
import { TarjetaProducto } from "@/components/ui/tarjeta-producto";
import { TarjetaSocia } from "@/components/ui/tarjeta-socia";

const meta: Meta = { title: "02 · Componentes/Dominio/Identidad" };
export default meta;
type Story = StoryObj;

/**
 * La familia identifica **el tipo de ventaja**, no decora. Coral es promoción
 * del producto, malva es condición de socia, miel es cupón. Si un día un cupón
 * sale en coral, quien lee el ticket deja de poder distinguir de un vistazo de
 * dónde le viene cada descuento.
 */
export const Etiquetas: Story = {
  name: "Etiqueta",
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Etiqueta familia="promo">3x2</Etiqueta>
      <Etiqueta familia="promo">2ª al 50 %</Etiqueta>
      <Etiqueta familia="socio">Precio socia</Etiqueta>
      <Etiqueta familia="cupon">Cupón 5 €</Etiqueta>
      <Etiqueta familia="entrega">Entrega hoy</Etiqueta>
      <Etiqueta familia="alerta">Sin stock</Etiqueta>
      <Etiqueta familia="nuevo">Nuevo</Etiqueta>
      <Etiqueta familia="neutro">12 referencias</Etiqueta>
    </div>
  ),
};

/**
 * El precio por unidad de medida **no es opcional**: es exigible en España y
 * es lo único que permite comparar dos formatos del mismo producto. Por eso
 * `precioUnidad` es obligatorio en el tipo, no un extra que se olvida.
 */
export const Precios: Story = {
  name: "Bloque de precio",
  render: () => (
    <div className="flex flex-wrap items-start gap-12">
      {[
        { titulo: "Normal", props: {} },
        {
          titulo: "Rebajado",
          props: { importeAnterior: 2.49, variante: "promo" as const },
        },
        {
          titulo: "Precio de socia",
          props: { importeAnterior: 2.49, variante: "socio" as const },
        },
      ].map(({ titulo, props }) => (
        <div key={titulo}>
          <p className="mb-3 text-[13px] font-semibold">{titulo}</p>
          <BloquePrecio
            importe={1.89}
            precioUnidad={{ importe: 1.89, unidad: "L" }}
            {...props}
          />
        </div>
      ))}

      <div>
        <p className="mb-3 text-[13px] font-semibold">Tamaños</p>
        <div className="flex items-start gap-8">
          {(["sm", "md", "lg"] as const).map((t) => (
            <BloquePrecio
              key={t}
              tamano={t}
              importe={11.4}
              precioUnidad={{ importe: 4.56, unidad: "kg" }}
            />
          ))}
        </div>
      </div>
    </div>
  ),
};

const BASE = {
  marca: "Hacendado",
  nombre: "Leche entera de vaca 1 L",
  precio: {
    importe: 1.89,
    precioUnidad: { importe: 1.89, unidad: "L" as const },
  },
};

/**
 * Las cuatro variantes del .pen. Fíjate en que el nombre ocupa **dos líneas
 * fijas** en las cuatro: por eso los botones quedan alineados aunque los
 * nombres tengan longitudes distintas (§8.6).
 */
export const TarjetasDeProducto: Story = {
  name: "Tarjeta de producto",
  render: () => (
    <div className="grid max-w-5xl grid-cols-2 gap-5 lg:grid-cols-4">
      <TarjetaProducto {...BASE} onAnadir={() => {}} onAlternarFavorito={() => {}} />

      <TarjetaProducto
        {...BASE}
        nombre="Judías verdes redondas extrafinas 400 g"
        precio={{
          importe: 1.35,
          importeAnterior: 1.8,
          variante: "promo",
          precioUnidad: { importe: 3.38, unidad: "kg" },
        }}
        distintivos={[{ familia: "promo", texto: "2ª al 50 %" }]}
        onAnadir={() => {}}
        onAlternarFavorito={() => {}}
        favorito
      />

      <TarjetaProducto
        {...BASE}
        nombre="Aceite de oliva virgen extra 1 L"
        precio={{
          importe: 6.75,
          importeAnterior: 7.5,
          variante: "socio",
          precioUnidad: { importe: 6.75, unidad: "L" },
        }}
        distintivos={[{ familia: "socio", texto: "Precio socia" }]}
        cantidadEnCesta={3}
        maxPorPedido={12}
        onCambiarCantidad={() => {}}
        onEliminarDeCesta={() => {}}
      />

      <TarjetaProducto
        {...BASE}
        nombre="Salmón fresco en lomos 300 g"
        precio={{
          importe: 8.95,
          precioUnidad: { importe: 29.83, unidad: "kg" },
        }}
        sinStock
        onAlternarFavorito={() => {}}
      />
    </div>
  ),
};

export const Socia: Story = {
  name: "Tarjeta de socia",
  render: () => (
    <TarjetaSocia
      className="max-w-sm"
      nombre="Laura Marí Ferrer"
      numeroSocia="4820 1193 0077"
      sociaDesde="03 / 2021"
      cuota="12,00 € / año"
    />
  ),
};
