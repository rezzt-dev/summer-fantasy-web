# Summer Fantasy Web — Notas para agentes

## Descripción del proyecto

Web estática para el servidor de Minecraft **Summer Fantasy**. Construida con Astro 7, Tailwind CSS 4, Vite y React 19 (usado por las wikis interactivas de mods). Todo el sitio comparte un **diseño inmersivo oscuro/dungeon** inspirado en las wikis de mods: colores negro/rojo/piedra/papiro, paneles con bordes gruesos, tipografía `Russo One` / `Cinzel`, partículas de fuego y animaciones con `anime.js` y `framer-motion`. Las wikis internas de mods conservan sus componentes específicos y no deben modificarse salvo que sea estrictamente necesario.

## Comandos principales

- `npm run dev` — servidor de desarrollo en `http://localhost:4321`
- `npm run build` — generación estática en `dist/`
- `npm run preview` — previsualización del build

## Estructura relevante

- `src/pages/` — rutas del sitio (`/`, `/wiki`, `/faq`, `/wiki/[slug]`, `/wiki/scaling-difficult`, `/wiki/eazzy-server-utils`, `/wiki/safety-zstones`, `/wiki/server`)
- `src/layouts/Layout.astro` — layout base inmersivo usado por todas las páginas públicas (`/`, `/faq`, `/404`, `/wiki`, `/wiki/[slug]`). Incluye `SiteNav`, `SiteFooter`, partículas y animaciones globales.
- `src/layouts/WikiIndexLayout.astro` — ahora delega en `Layout.astro` para el índice `/wiki`.
- `src/layouts/ScalingDifficultLayout.astro` — layout inmersivo compartido por las wikis internas de mods (`/wiki/scaling-difficult`, `/wiki/eazzy-server-utils`, `/wiki/safety-zstones`, `/wiki/server`)
- `src/components/` — componentes reutilizables
- `src/components/site/` — componentes compartidos del sitio (`SiteNav`, `SiteFooter`, `HomeApp`)
- `src/components/wiki/` — componentes base reutilizables de las wikis de mods (`Hero`, `Section`, `ExpandableCard`, `EmberParticles`)
- `src/components/scaling-difficult/` — componentes React específicos de Scaling Difficult
- `src/components/eazzy-server-utils/` — componentes React de la wiki de Eazzy Server Utils
- `src/components/safety-zstones/` — componentes React de la wiki de Safety ZStones
- `src/components/server/` — componentes React de la wiki combinada de Server + Primeros Pasos
- `src/components/wiki-index/` — componentes React del índice de wikis (`/wiki`)
- `src/components/faq/FaqList.astro` — listado de FAQs con acordeones y búsqueda (estilo inmersivo)
- `src/content/` — colecciones de contenido (`wiki`, `faq`, `server`)
- `src/content.config.ts` — definición de esquemas de las colecciones
- `src/styles/global.css` — hoja legada del tema cartoon; ya no se importa en el layout principal
- `src/styles/scaling-difficult.css` — estilos globales principales del sitio (paleta oscura, utilidades `.dungeon-panel`, `.parchment`, `.mc-slot`, animaciones y `.prose` oscuro)
- `public/scaling-difficult/` — recursos estáticos de la wiki de Scaling Difficult
- `agent-docs/minecraft-server-info/` — fuente de la información del servidor (solo lectura)
- `agent-docs/scaling-difficult-wiki/` — proyecto original de la wiki de Scaling Difficult (solo lectura)
- `agent-docs/mods-info/` — documentación fuente de los mods propios (solo lectura)

## Convenciones

- El contenido se escribe en Markdown dentro de las colecciones correspondientes.
- Los artículos de wiki usan `category` para agruparse en el índice.
- El orden de los artículos y preguntas se controla con el campo `order` en el frontmatter.
- Se prefiere la generación estática (`output: 'static'`).
- Las rutas `/wiki/scaling-difficult`, `/wiki/eazzy-server-utils`, `/wiki/safety-zstones` y `/wiki/server` son páginas estáticas con componentes React; los artículos Markdown correspondientes en `src/content/wiki/` se mantienen para aparecer en el índice. La página `/wiki/server` combina la información general del servidor con la guía de primeros pasos.
- Todas las páginas públicas usan el mismo sistema visual: `Layout.astro`, `scaling-difficult.css`, `SiteNav`, `SiteFooter` y partículas de fuego.

## Referencias útiles

- [Astro Routing](https://docs.astro.build/en/guides/routing/)
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [Tailwind CSS v4](https://tailwindcss.com/docs/v4-beta)
