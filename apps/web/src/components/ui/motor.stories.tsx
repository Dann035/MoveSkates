import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "@/components/ui/button";
import { LineaCesta } from "@/components/ui/linea-cesta";
import { ResumenPedido } from "@/components/ui/resumen-pedido";
import { TablaTicket } from "@/components/ui/tabla-ticket";
import { TarjetaCupon } from "@/components/ui/tarjeta-cupon";

/**
 * # Los cuatro sitios donde el motor tiene que verse
 *
 * El diseño existe para que el cálculo sea legible (§9). Estas cuatro piezas
 * son las que lo hacen auditable: si alguna aplana el desglose en un único
 * número, deja de poder comprobarse qué aplicó el motor y en qué orden.
 *
 * Todas las cifras de aquí son el **escenario 1** del enunciado del motor:
 * 3x2, segunda unidad al 50 %, cupón de 5 € sobre compras de 30 € y descuento
 * de socio del 5 %. Y el 3x2 tira el total por debajo de los 30 € que
 * activaban el cupón.
 */
const meta: Meta = { title: "02 · Componentes/Dominio/El motor visible" };
export default meta;
type Story = StoryObj;

/** §9.2 — cada línea muestra qué promoción se le aplicó y cuánto ahorró. */
export const EnLaCesta: Story = {
  name: "1 · En la cesta",
  render: () => (
    <ul className="max-w-4xl">
      <LineaCesta
        marca="Hacendado"
        nombre="Patines Rollerblade RB Cruiser"
        cantidad={3}
        maxPorPedido={12}
        precioUnidad={{ importe: 1.89, unidad: "L" }}
        importe={3.78}
        importeAnterior={5.67}
        ventajas={[{ familia: "promo", texto: "3x2" }]}
        onCambiarCantidad={() => {}}
        onEliminar={() => {}}
      />
      <LineaCesta
        marca="Hacendado"
        nombre="Ruedas Undercover 80mm (x4)"
        cantidad={2}
        precioUnidad={{ importe: 4.5, unidad: "kg" }}
        importe={2.7}
        importeAnterior={3.6}
        ventajas={[{ familia: "promo", texto: "2ª al 50 %" }]}
        onCambiarCantidad={() => {}}
        onEliminar={() => {}}
      />
      <LineaCesta
        marca="Hacendado"
        nombre="Rodamientos Bones Reds (x16)"
        cantidad={1}
        precioUnidad={{ importe: 6.75, unidad: "L" }}
        importe={6.75}
        importeAnterior={7.5}
        ventajas={[{ familia: "socio", texto: "Precio socio" }]}
        onCambiarCantidad={() => {}}
        onEliminar={() => {}}
      />
    </ul>
  ),
};

/**
 * §9.3 — el resumen desglosa promoción por promoción, el descuento de socio
 * aparte, el IVA por tipo y el ahorro total.
 *
 * Mira la línea del cupón: **no desaparece**. Se queda con «No aplica», porque
 * esconderla dejaría al usuario sin saber por qué ya no le cuentan los 5 €.
 */
export const EnElResumen: Story = {
  name: "2 · En el resumen",
  render: () => (
    <ResumenPedido
      className="max-w-95"
      conceptoSubtotal="Subtotal (12 productos)"
      subtotal={34.1}
      ventajas={[
        { concepto: "3x2 · Patines RB Cruiser", importe: -1.89, familia: "promo" },
        {
          concepto: "2ª al 50 % · Ruedas Undercover 80mm",
          importe: -0.9,
          familia: "promo",
        },
        { concepto: "descuento socio 5 %", importe: -1.57, familia: "socio" },
        {
          concepto: "Cupón 5 € (mínimo 30 €)",
          nota: "No aplica",
          familia: "inaplicable",
        },
      ]}
      impuestos={[
        { concepto: "Base imponible", importe: 27.15 },
        { concepto: "IVA 21 % · material deportivo", importe: 0.64 },
        { concepto: "IVA 10 % · resto", importe: 1.95 },
      ]}
      total={29.74}
      ahorro={4.36}
      accion={
        <Button anchoCompleto tamano="lg">
          Continuar con el pedido
        </Button>
      }
    />
  ),
};

/**
 * §9.4 — el escenario 1, hecho interfaz. Cuando una promoción baja el total
 * por debajo del mínimo del cupón, **se dice por qué y cuánto falta**.
 *
 * El componente lo obliga por tipos: el estado `caido` exige
 * `faltaParaUmbral`, así que no se puede pintar un cupón caído sin la cifra.
 */
export const ElCuponCaido: Story = {
  name: "3 · El cupón caído",
  render: () => (
    <div className="grid max-w-4xl gap-5 sm:grid-cols-2">
      <TarjetaCupon
        estado="disponible"
        titulo="5 € de descuento"
        condicion="En compras de 30 € o más"
        caducidad="Caduca el 31 de agosto"
        onAplicar={() => {}}
      />
      <TarjetaCupon
        estado="aplicado"
        titulo="10 % en frescos"
        condicion="Sin importe mínimo"
        caducidad="Caduca el 15 de septiembre"
        onQuitar={() => {}}
      />
      <TarjetaCupon
        estado="caido"
        faltaParaUmbral={0.26}
        titulo="5 € de descuento"
        condicion="En compras de 30 € o más"
        caducidad="Caduca el 31 de agosto"
      />
      <TarjetaCupon
        estado="caducado"
        titulo="3 € de bienvenida"
        condicion="En compras de 20 € o más"
        caducidad="Caducó el 30 de junio"
      />
    </div>
  ),
};

/**
 * §9 y FAC-02/FAC-03 — el descuento va sobre la base y el IVA sobre el importe
 * ya descontado. Una línea conserva el nombre y el precio que tenía el
 * producto **al comprarlo**: esta tabla nunca vuelve a consultar el catálogo.
 */
export const EnElTicket: Story = {
  name: "4 · En el ticket",
  render: () => (
    <TablaTicket
      lineas={[
        {
          producto: "Patines Rollerblade RB Cruiser",
          unidades: 3,
          precio: 1.89,
          descuento: 1.89,
          base: 3.63,
          tipoIva: 0.04,
          total: 3.78,
        },
        {
          producto: "Ruedas Undercover 80mm (x4)",
          unidades: 2,
          precio: 1.8,
          descuento: 0.9,
          base: 2.45,
          tipoIva: 0.1,
          total: 2.7,
        },
        {
          producto: "Rodamientos Bones Reds (x16)",
          unidades: 1,
          precio: 7.5,
          descuento: 0.75,
          base: 6.14,
          tipoIva: 0.1,
          total: 6.75,
        },
        {
          producto: "Freno universal de repuesto",
          unidades: 2,
          precio: 1.35,
          base: 2.6,
          tipoIva: 0.04,
          total: 2.7,
        },
      ]}
    />
  ),
};
