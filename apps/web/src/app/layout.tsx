import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";

import "./globals.css";

/** Interfaz, cuerpo, etiquetas, celdas de texto, formularios. */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

/** Titulares, cifras, precios, importes, valores de tabla. Estética urbana. */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MoveSkate",
  description: "Tienda de patines con club de socios",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${archivo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
