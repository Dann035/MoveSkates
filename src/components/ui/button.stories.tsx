import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Plus, ShoppingCart, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

const meta = {
  title: "02 · Componentes/Controles/Botón",
  component: Button,
  args: { children: "Añadir a la cesta" },
  argTypes: {
    intencion: {
      control: "select",
      options: [
        "primario",
        "secundario",
        "contorno",
        "sutil",
        "fantasma",
        "destructivo",
        "enlace",
      ],
    },
    tamano: {
      control: "select",
      options: ["sm", "md", "lg", "icono-sm", "icono-md", "icono-lg"],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primario: Story = {};

export const Intenciones: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button intencion="primario">Primario</Button>
      <Button intencion="secundario">Secundario</Button>
      <Button intencion="contorno">Contorno</Button>
      <Button intencion="sutil">Sutil</Button>
      <Button intencion="fantasma">Fantasma</Button>
      <Button intencion="destructivo">Destructivo</Button>
      <Button intencion="enlace">Enlace</Button>
    </div>
  ),
};

export const Tamanos: Story = {
  name: "Tamaños",
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button tamano="sm">Pequeño</Button>
      <Button tamano="md">Mediano</Button>
      <Button tamano="lg">Grande</Button>
      <Button tamano="icono-sm" intencion="sutil" aria-label="Añadir">
        <Plus />
      </Button>
      <Button tamano="icono-md" intencion="sutil" aria-label="Añadir">
        <Plus />
      </Button>
      <Button tamano="icono-lg" intencion="sutil" aria-label="Eliminar">
        <Trash2 />
      </Button>
    </div>
  ),
};

export const ConIcono: Story = {
  name: "Con icono",
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button>
        <ShoppingCart aria-hidden />
        Añadir a la cesta
      </Button>
      <Button intencion="contorno">
        Ver la ficha
        <Plus aria-hidden />
      </Button>
    </div>
  ),
};

/**
 * §6 del diseño: el botón **mantiene su ancho** mientras carga. Compara los
 * dos de abajo: el contenido invisible sigue reservando el sitio, así que el
 * botón no se encoge y nada de alrededor salta.
 */
export const Cargando: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button cargando>Confirmar pedido</Button>
      <Button cargando etiquetaCargando="Procesando…">Confirmar pedido</Button>
      <Button intencion="contorno" cargando>
        Guardar
      </Button>
    </div>
  ),
};

/**
 * Superficie hundida y texto en borde fuerte. **Nunca opacidad sobre el color
 * primario**: pierde contraste sin avisar y deja de leerse.
 */
export const Deshabilitado: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button disabled>Primario</Button>
      <Button intencion="secundario" disabled>
        Secundario
      </Button>
      <Button intencion="contorno" disabled>
        Sin stock
      </Button>
      <Button intencion="destructivo" disabled>
        Destructivo
      </Button>
    </div>
  ),
};

export const AnchoCompleto: Story = {
  name: "Ancho completo",
  render: () => (
    <div className="flex w-72 flex-col gap-3">
      <Button anchoCompleto>Confirmar pedido</Button>
      <Button intencion="contorno" anchoCompleto>
        Seguir comprando
      </Button>
    </div>
  ),
};
