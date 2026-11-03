import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  Boxes,
  PackageX,
  PiggyBank,
  SearchX,
  ShoppingBasket,
  TicketPercent,
  TriangleAlert,
} from "lucide-react";
import * as React from "react";

import { Aviso } from "@/components/ui/aviso";
import { Button } from "@/components/ui/button";
import { EstadoVacio } from "@/components/ui/estado-vacio";
import { EsqueletoLista, EsqueletoRejilla } from "@/components/ui/esqueletos";
import { Metrica } from "@/components/ui/metrica";
import { Pagination } from "@/components/ui/pagination";
import { ProcesoPasos } from "@/components/ui/proceso-pasos";

const meta: Meta = { title: "02 · Componentes/Retroalimentación" };
export default meta;
type Story = StoryObj;

export const Avisos: Story = {
  name: "Aviso",
  render: () => (
    <div className="flex max-w-2xl flex-col gap-3">
      <Aviso familia="info" titulo="Tu cuota se renueva el 1 de septiembre">
        Se cobrarán 12,00 € en la tarjeta terminada en 4417.
      </Aviso>
      <Aviso familia="exito" titulo="Pedido confirmado">
        Lo recibirás el jueves entre las 17:00 y las 19:00.
      </Aviso>
      <Aviso
        familia="cupon"
        titulo="Te faltan 0,26 € para aplicar tu cupón de 5 €"
        accion={
          <Button tamano="sm" intencion="secundario">
            Ver productos que suman
          </Button>
        }
      >
        Las promociones aplicadas han bajado el total por debajo del mínimo de
        30 €.
      </Aviso>
      <Aviso
        familia="error"
        titulo="No hemos podido cobrar el pedido"
        accion={
          <Button tamano="sm" intencion="destructivo">
            Cambiar método de pago
          </Button>
        }
      >
        Tu banco ha rechazado la tarjeta terminada en 4417. Tu cesta sigue
        intacta.
      </Aviso>
    </div>
  ),
};

export const Metricas: Story = {
  name: "Métrica",
  render: () => (
    <div className="grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <Metrica
        icono={PiggyBank}
        familia="promo"
        etiqueta="Ahorro acumulado 2026"
        valor="184,20 €"
        variacion="+22,40 € este mes"
      />
      <Metrica
        icono={Boxes}
        familia="primario"
        etiqueta="Referencias activas"
        valor="1.284"
        variacion="+18 esta semana"
      />
      <Metrica
        icono={TicketPercent}
        familia="cupon"
        etiqueta="Promociones vigentes"
        valor="12"
      />
      <Metrica
        icono={PackageX}
        familia="alerta"
        etiqueta="Sin stock"
        valor="7"
        variacion="+3 desde ayer"
      />
    </div>
  ),
};

/**
 * **Nunca un callejón sin salida** (§8.5). Los tres estados llevan título que
 * explica, texto que orienta y un botón que sale de ahí — y el tipo los exige,
 * así que no compila un vacío sin salida.
 */
export const EstadosVacios: Story = {
  name: "Estado vacío",
  render: () => (
    <div className="grid max-w-5xl gap-5 lg:grid-cols-3">
      <EstadoVacio
        icono={ShoppingBasket}
        titulo="Tu cesta está vacía"
        texto="Añade productos desde el catálogo y aquí verás el desglose de tus promociones."
        accion={<Button>Ir al catálogo</Button>}
      />
      <EstadoVacio
        icono={SearchX}
        titulo="Sin resultados para «lehce»"
        texto="No hemos encontrado nada. Prueba con menos palabras o revisa la ortografía."
        accion={<Button intencion="contorno">Ver todo en Lácteos</Button>}
      />
      <EstadoVacio
        icono={TriangleAlert}
        titulo="No hemos podido cargar el catálogo"
        texto="El servidor no ha respondido. No es cosa tuya: vuelve a intentarlo en unos segundos."
        accion={<Button intencion="contorno">Reintentar</Button>}
      />
    </div>
  ),
};

/**
 * Un esqueleto ocupa **el mismo sitio** que el contenido que sustituye. Si no,
 * lo real entra y desplaza lo de debajo justo cuando ya ibas a pulsar algo.
 */
export const Esqueletos: Story = {
  render: () => (
    <div className="flex max-w-5xl flex-col gap-10">
      <EsqueletoRejilla cantidad={4} />
      <EsqueletoLista cantidad={3} />
    </div>
  ),
};

export const Paginaciones: Story = {
  name: "Paginación",
  render: function Render() {
    const [p, setP] = React.useState(1);
    return (
      <div className="flex flex-col gap-6">
        <Pagination
          etiqueta="Interactiva"
          paginaActual={p}
          totalPaginas={12}
          onCambiar={setP}
        />
        <Pagination
          etiqueta="Pocas páginas"
          paginaActual={1}
          totalPaginas={3}
          onCambiar={() => {}}
        />
        <Pagination
          etiqueta="Por el centro"
          paginaActual={7}
          totalPaginas={12}
          onCambiar={() => {}}
        />
        <Pagination
          etiqueta="Última página"
          paginaActual={12}
          totalPaginas={12}
          onCambiar={() => {}}
        />
      </div>
    );
  },
};

export const Pasos: Story = {
  name: "Proceso por pasos",
  render: () => (
    <div className="flex max-w-2xl flex-col gap-10">
      {[1, 2, 3].map((n) => (
        <ProcesoPasos
          key={n}
          etiqueta={`Progreso del pedido, ejemplo en el paso ${n}`}
          pasoActual={n}
          pasos={[
            { etiqueta: "Entrega", onIr: () => {} },
            { etiqueta: "Pago", onIr: () => {} },
            { etiqueta: "Revisión" },
          ]}
        />
      ))}
    </div>
  ),
};
