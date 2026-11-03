# MoveSkate

Tienda de patines con club de socios. **Proyecto 1** de la cartera de portfolio ModoMentor.
Este `CLAUDE.md` es local del proyecto y **complementa** al del repo padre (`../CLAUDE.md`), que
define el régimen de mentoría; en lo que no diga aquí, manda el padre.

## Estándares
Este proyecto usa los estándares senior globales → skill `estandares-senior`.

## Régimen
- **Modo estricto (manual):** landa escribe el código; Claude revisa, cuestiona y da pistas por
  niveles. Claude no escribe código de solución (ver `../docs/00-reglas-mentor.md`).
- **Excepción ya aplicada (D-003):** el sistema de diseño / reskin del frontend lo escribió Claude
  en *modo respuesta*. Las **vistas** y el **backend** los hace landa.

## Stack
- **web:** Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind 4 · shadcn/Base UI
  · Storybook.
- **api:** NestJS · Prisma · PostgreSQL *(por crear)*.

## Estructura (monorepo)

Actual:
```
MoveSkate/
├─ web/     → frontend Next.js (montado)
├─ api/     → backend NestJS (por crear)
└─ docs/    → documentación del proyecto
```

**Objetivo recomendado** (pendiente de decisión de landa):
- `package.json` raíz + `pnpm-workspace.yaml` → monorepo gestionado (install/scripts desde la raíz).
- `packages/shared/` → **contrato canónico**: tipos de dominio, enums y `ApiResponse<T>`, importado
  por `web` y `api`. Evita que los tipos/enums diverjan entre front y back.

## Comandos
```bash
# desde web/ (mientras no haya workspace en la raíz)
pnpm install
pnpm dev          # http://localhost:3000
pnpm storybook    # http://localhost:6006
pnpm build
```

## Reglas del proyecto
- **Contrato front-back:** el frontend se adapta al backend. Tipos del contrato en un único sitio
  (`packages/shared` cuando exista). Fechas como string ISO. Nada de `any`.
- **Respuestas de API:** `{ data }` (item), `{ data, meta }` (lista), `{ error, message, statusCode }`
  (error). Nunca la entidad cruda. Frontend con fallback `|| []`.
- **TDD:** test rojo primero, también en el backend.
- **Criterio de "hecho":** cada vista/feature se define por escrito (en su tarea de Notion) antes de
  picar código. Sin criterio, no arranca.
- **Identidad visual:** marca monocroma rojo/negro/gris/blanco, estética urbana (ver `web/src/app/globals.css`).

## Orden de trabajo (cliente-first)
1. Vistas core con datos mock (catálogo, ficha, cesta) — lo que ve el cliente.
2. Backend que las alimenta: vertical de Productos (entidad → endpoint `{ data }` → la vista lo consume).
3. Motor de promociones; luego RBAC, cuota, factura; y changelog + bug report.
