import type { Preview } from "@storybook/nextjs-vite";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import React from "react";

import "../src/app/globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },

    /* El fondo de página del diseño. Sobre blanco puro, `--surface` deja de
       distinguirse del lienzo y las tarjetas parecen no tener superficie. */
    backgrounds: {
      options: {
        pagina: { name: "Fondo de página", value: "#FDFCFB" },
        superficie: { name: "Superficie", value: "#FFFFFF" },
        hundida: { name: "Superficie hundida", value: "#F4F2EF" },
      },
    },

    a11y: { test: "error" },

    options: {
      storySort: {
        order: [
          "01 · Fundamentos",
          "02 · Componentes",
          ["Controles", "Dominio", "Navegación", "Retroalimentación"],
        ],
      },
    },
  },

  initialGlobals: { backgrounds: { value: "pagina" } },

  decorators: [
    (Story) => (
      <div className={`${inter.variable} ${jakarta.variable} font-sans p-6`}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
