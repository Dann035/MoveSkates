import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Search } from "lucide-react";
import * as React from "react";

import { CampoTexto } from "@/components/ui/campo-texto";
import { Casilla } from "@/components/ui/casilla";
import { Chip } from "@/components/ui/chip";
import { Desplegable } from "@/components/ui/desplegable";
import { Interruptor } from "@/components/ui/interruptor";
import { SelectorCantidad } from "@/components/ui/selector-cantidad";

const meta: Meta = { title: "02 · Componentes/Controles/Formulario" };
export default meta;
type Story = StoryObj;

const CATEGORIAS = [
  { valor: "lacteos", texto: "Lácteos y huevos" },
  { valor: "frescos", texto: "Frutas y verduras" },
  { valor: "despensa", texto: "Despensa" },
  { valor: "congelados", texto: "Congelados", disabled: true },
];

/**
 * Los cuatro estados del campo, en fila. Fíjate en que **todos ocupan la misma
 * altura**: el texto de ayuda reserva su sitio aunque esté vacío, así que
 * validar no desplaza el resto del formulario hacia abajo.
 */
export const CamposDeTexto: Story = {
  name: "Campo de texto",
  render: () => (
    <div className="grid max-w-4xl gap-6 sm:grid-cols-2">
      <CampoTexto
        etiqueta="Nombre del producto"
        defaultValue="Leche entera 1 L"
        ayuda="Máximo 120 caracteres"
        obligatorio
      />
      <CampoTexto
        etiqueta="Buscar"
        placeholder="Busca por nombre o marca"
        icono={<Search />}
      />
      <CampoTexto
        etiqueta="SKU"
        defaultValue="LEC-001"
        error="Ya existe un producto con este SKU"
      />
      <CampoTexto
        etiqueta="Código de barras"
        defaultValue="8480000123456"
        ayuda="Se rellena al escanear"
        disabled
      />
      <CampoTexto
        etiqueta="Precio sin IVA"
        defaultValue="1,89"
        sufijo="€"
        inputClassName="cifras"
      />
      <Desplegable
        etiqueta="Categoría"
        opciones={CATEGORIAS}
        defaultValue="lacteos"
        ayuda="Solo subcategorías de segundo nivel"
      />
    </div>
  ),
};

export const Casillas: Story = {
  name: "Casilla",
  render: () => (
    <div className="flex max-w-xs flex-col gap-3">
      <Casilla etiqueta="Sin gluten" recuento={128} defaultChecked />
      <Casilla etiqueta="Sin lactosa" recuento={64} />
      <Casilla etiqueta="Ecológico" recuento={0} disabled />
      <Casilla etiqueta="Todas las dietas" indeterminate />
    </div>
  ),
};

export const Interruptores: Story = {
  name: "Interruptor",
  render: () => (
    <div className="flex max-w-md flex-col gap-5">
      <Interruptor
        etiqueta="Producto publicado"
        descripcion="Los borradores solo se ven desde administración"
        defaultChecked
      />
      <Interruptor
        etiqueta="Avisarme de la renovación"
        descripcion="Un correo 7 días antes del cargo"
      />
      <Interruptor etiqueta="Promoción activa" disabled />
    </div>
  ),
};

/**
 * Al llegar al mínimo el «−» se convierte en papelera. Baja el primero hasta 1
 * y observa el cambio: quitar la última unidad y eliminar la línea son la
 * misma intención.
 */
export const SelectoresDeCantidad: Story = {
  name: "Selector de cantidad",
  render: function Render() {
    const [n, setN] = React.useState(2);
    return (
      <div className="flex flex-wrap items-center gap-6">
        <SelectorCantidad
          valor={n}
          onCambiar={setN}
          onEliminar={() => setN(0)}
          max={12}
          etiqueta="Leche entera 1 L"
        />
        <SelectorCantidad defaultValor={12} max={12} etiqueta="Tope alcanzado" />
        <SelectorCantidad defaultValor={1} tamano="sm" />
        <SelectorCantidad defaultValor={3} disabled />
      </div>
    );
  },
};

export const Chips: Story = {
  name: "Chip de filtro",
  render: function Render() {
    const [activos, setActivos] = React.useState<string[]>(["Sin lactosa"]);
    const alternar = (t: string) =>
      setActivos((a) => (a.includes(t) ? a.filter((x) => x !== t) : [...a, t]));

    return (
      <div className="flex max-w-2xl flex-col gap-6">
        <div>
          <p className="mb-2 text-[13px] font-semibold">Facetas con recuento</p>
          <div className="flex flex-wrap gap-2">
            {[
              ["Sin lactosa", 64],
              ["Sin gluten", 128],
              ["Ecológico", 41],
              ["Vegano", 23],
            ].map(([t, n]) => (
              <Chip
                key={t as string}
                activo={activos.includes(t as string)}
                recuento={n as number}
                onClick={() => alternar(t as string)}
              >
                {t}
              </Chip>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-[13px] font-semibold">
            Filtros activos, se quitan uno a uno
          </p>
          <div className="flex flex-wrap gap-2">
            {activos.map((t) => (
              <Chip key={t} activo onQuitar={() => alternar(t)}>
                {t}
              </Chip>
            ))}
            {activos.length === 0 && (
              <p className="text-[13px] text-muted-foreground">
                Ningún filtro aplicado
              </p>
            )}
          </div>
        </div>
      </div>
    );
  },
};
