# MoveSkate

Tienda de patines con club de socios. Proyecto 1 de la cartera de portfolio
(ver `../CLAUDE.md`). Frontend en Next.js; el backend (NestJS + Prisma + PostgreSQL)
se añade en su fase.

## Stack

- **Next.js 16** (App Router, Turbopack) · **React 19** · **TypeScript**
- **Tailwind 4** + **shadcn / Base UI** con `tailwind-variants`
- **Storybook** para el sistema de diseño

## Identidad visual

Marca monocroma: **rojo** (acción y promoción), **negro/gris** (estructura y contenido),
**blanco** (fondo). Estética urbana. Los tokens viven en `src/app/globals.css`; el catálogo
de fundamentos y componentes está en Storybook.

## Puesta en marcha

```bash
pnpm install
pnpm dev          # app en http://localhost:3000
pnpm storybook    # sistema de diseño en http://localhost:6006
pnpm build        # build de producción
```

## Estructura

- `src/app/` — rutas y layout de la app.
- `src/components/ui/` — componentes del sistema de diseño (≈30) y sus stories.
- `src/lib/` — utilidades (`precio`, `tv`, `utils`, `foco`).
