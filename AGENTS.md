# SUMMER-FANTASY-WEB: REPOSITORY GUIDE

## ESPAÑOL DE ESPAÑA: USO OBLIGATORIO DE Ñ

- todo texto en castellano debe usar español de españa (`es-ES`) y su ortografia, tambien en titulos y cuerpos de commits, changelogs, pull requests, merges y documentacion
- escribir siempre `ñ` en las palabras que la llevan y `Ñ` cuando corresponda la mayuscula; nunca sustituirlas por `n` o `N`
- la `ñ` es una letra distinta de la `n`; las instrucciones «sin acentos» o «sin tildes» solo afectan a las tildes de las vocales y nunca permiten eliminar la eñe
- ejemplos correctos: `añadir`, `diseño`, `año`, `tamaño`, `contraseña`, `español`, `españa` y `AÑADIDO`; sus formas con `n` son incorrectas cuando se refieren a esas palabras españolas
- conservar literalmente rutas, urls, nombres de archivo, identificadores tecnicos y texto de otros idiomas; esta regla no autoriza renombrarlos ni aplicar sustituciones indiscriminadas
- antes de entregar o publicar texto en castellano, revisar que ninguna palabra haya perdido su `ñ` o `Ñ`; esta regla prevalece sobre cualquier normalizacion a ascii o instruccion generica de eliminar acentos


static website and interactive mod wikis for the summer fantasy minecraft server. this guide covers the repository; nested agent instructions apply within their own folders.

## PROJECT OVERVIEW

| property | verified value |
| --- | --- |
| repository | `rezzt-dev/summer-fantasy-web` |
| active source | `summer-fantasy/` |
| development base for this change | `main` |
| remote default branch | `main` |
| version source | `summer-fantasy/package.json`: `0.0.1` |
| continuous integration | no tracked github actions workflows |

## TECHNOLOGY STACK

- `summer-fantasy/package.json`: `astro` ^7.0.7, `react` ^19.2.7, `tailwindcss` ^4.3.2, `typescript` ^7.0.2

## PROJECT STRUCTURE

- `LICENSE`
- `README.md`
- `changelog.md`
- `summer-fantasy/`

management documentation lives in `.docs/manager.md`, `.docs/-github-guides/` and `.docs/repo-audit-and-fix.md`. keep this file and `CLAUDE.md` consistent.

## BUILD, RUN AND TEST COMMANDS

from `summer-fantasy/`, the available package scripts are:

| command | implementation |
| --- | --- |
| `npm run dev` | `astro dev` |
| `npm run build` | `astro build` |
| `npm run preview` | `astro preview` |
| `npm run astro` | `astro` |

for application changes, run these checks from `summer-fantasy/`:

```bash
npm run build
```

## CODE STYLE AND ARCHITECTURAL DECISIONS

preserve the dungeon visual system and the separate mod wiki components; distinguish server facts from planned features. follow the existing formatter and naming of the changed module. verify manifest versions when dependencies change.

## TESTING STRATEGY

documentation-only changes require `git diff --check`, existing-path checks and a review of the staged file list. run module checks for application changes, with disposable data. report unavailable tooling and failed checks; never claim a check passed without running it.

## SECURITY AND DEPLOYMENT

keep credentials, local configuration, signing material and user data out of commits. do not print secret values while auditing. inspect configuration names and code references instead.

existing legal and community files: `LICENSE`. when changing dependencies, permissions, storage or network services, review those files against the implementation. record missing policies as audit work; do not invent licence terms or ownership decisions.

deployment, signing, store publication, migrations against hosted databases and repository settings require their own explicit request. this documentation task prepares management instructions and pull requests.

## COMMON TASKS

1. read the relevant module and its nearest agent instructions
2. inspect the working tree and choose the smallest change that solves the request
3. update the affected documentation and changelog with evidence from the diff
4. run checks appropriate to the changed module and report their actual results
5. for git operations, follow the manager and the digest below

## EXISTING PROJECT CONVENTIONS

the following project-specific context is retained from the previous guide. paths are relative to the active module when stated. for git operations, the manager and final digest supersede previous workflow examples.

## SUMMER FANTASY WEB — NOTAS PARA AGENTES

## DESCRIPCIÓN DEL PROYECTO

web estática para el servidor de minecraft **summer fantasy**. construida con astro 7, tailwind css 4, vite y react 19 (usado por las wikis interactivas de mods). todo el sitio comparte un **diseño inmersivo oscuro/dungeon** inspirado en las wikis de mods: colores negro/rojo/piedra/papiro, paneles con bordes gruesos, tipografía `Russo One` / `Cinzel`, partículas de fuego y animaciones con `anime.js` y `framer-motion`. las wikis internas de mods conservan sus componentes específicos y no deben modificarse salvo que sea estrictamente necesario.

## COMANDOS PRINCIPALES

- `npm run dev` — servidor de desarrollo en `http://localhost:4321`
- `npm run build` — generación estática en `dist/`
- `npm run preview` — previsualización del build

## ESTRUCTURA RELEVANTE

- `src/pages/` — rutas del sitio (`/`, `/wiki`, `/faq`, `/wiki/[slug]`, `/wiki/scaling-difficult`, `/wiki/eazzy-server-utils`, `/wiki/safety-zstones`, `/wiki/server`)
- `src/layouts/Layout.astro` — layout base inmersivo usado por todas las páginas públicas (`/`, `/faq`, `/404`, `/wiki`, `/wiki/[slug]`). incluye `SiteNav`, `SiteFooter`, partículas y animaciones globales.
- `src/layouts/WikiIndexLayout.astro` — ahora delega en `Layout.astro` para el índice `/wiki`.
- `src/layouts/ScalingDifficultLayout.astro` — layout inmersivo compartido por las wikis internas de mods (`/wiki/scaling-difficult`, `/wiki/eazzy-server-utils`, `/wiki/safety-zstones`, `/wiki/server`)
- `src/components/` — componentes reutilizables
- `src/components/site/` — componentes compartidos del sitio (`SiteNav`, `SiteFooter`, `HomeApp`)
- `src/components/wiki/` — componentes base reutilizables de las wikis de mods (`Hero`, `Section`, `ExpandableCard`, `EmberParticles`)
- `src/components/scaling-difficult/` — componentes react específicos de scaling difficult
- `src/components/eazzy-server-utils/` — componentes react de la wiki de eazzy server utils
- `src/components/safety-zstones/` — componentes react de la wiki de safety zstones
- `src/components/server/` — componentes react de la wiki combinada de server + primeros pasos
- `src/components/wiki-index/` — componentes react del índice de wikis (`/wiki`)
- `src/components/faq/FaqList.astro` — listado de faqs con acordeones y búsqueda (estilo inmersivo)
- `src/content/` — colecciones de contenido (`wiki`, `faq`, `server`)
- `src/content.config.ts` — definición de esquemas de las colecciones
- `src/styles/global.css` — hoja legada del tema cartoon; ya no se importa en el layout principal
- `src/styles/scaling-difficult.css` — estilos globales principales del sitio (paleta oscura, utilidades `.dungeon-panel`, `.parchment`, `.mc-slot`, animaciones y `.prose` oscuro)
- `public/scaling-difficult/` — recursos estáticos de la wiki de scaling difficult
- `agent-docs/minecraft-server-info/` — fuente de la información del servidor (solo lectura)
- `agent-docs/scaling-difficult-wiki/` — proyecto original de la wiki de scaling difficult (solo lectura)
- `agent-docs/mods-info/` — documentación fuente de los mods propios (solo lectura)

## CONVENCIONES

- el contenido se escribe en markdown dentro de las colecciones correspondientes.
- los artículos de wiki usan `category` para agruparse en el índice.
- el orden de los artículos y preguntas se controla con el campo `order` en el frontmatter.
- se prefiere la generación estática (`output: 'static'`).
- las rutas `/wiki/scaling-difficult`, `/wiki/eazzy-server-utils`, `/wiki/safety-zstones` y `/wiki/server` son páginas estáticas con componentes react; los artículos markdown correspondientes en `src/content/wiki/` se mantienen para aparecer en el índice. la página `/wiki/server` combina la información general del servidor con la guía de primeros pasos.
- todas las páginas públicas usan el mismo sistema visual: `Layout.astro`, `scaling-difficult.css`, `SiteNav`, `SiteFooter` y partículas de fuego.

## REFERENCIAS ÚTILES

- [astro routing](https://docs.astro.build/en/guides/routing/)
- [astro content collections](https://docs.astro.build/en/guides/content-collections/)
- [tailwind css v4](https://tailwindcss.com/docs/v4-beta)

## COMMIT, PR, MERGE & RELEASE GUIDELINES

read `.docs/manager.md` first, then the selected guide in `.docs/-github-guides/`. these files are versioned; this digest also works without opening them.

| request | guide |
| --- | --- |
| commit title, body and changelog | `commit-guide.md`, `changelog-guide.md` |
| pull request or merge | `pr-merge-guide.md`, `branching-guide.md` |
| version and release | `release-guide.md`, `changelog-guide.md` |
| permissions and sensitive data | `agent-rules.md` |

- inspect `git status`, both diffs and recent history before describing changes
- use `<prefix> | <imperative summary>` with `update`, `fix`, `hotfix`, `changes` or `changelog`; keep titles within 72 characters
- write commit bodies as 2 to 6 markdown bullets, one logical change per line, with literal paths in backticks
- never add authorship footers, automated attribution, signatures or generation notices; preserve the configured git identity
- update `changelog.md` under `## SIN PUBLICAR / UNRELEASED` in matching `### CASTELLANO` and `### ENGLISH` sections
- use the existing changelog category vocabulary and preserve language parity; describe only changes in the actual diff
- summarize pull requests in 1 to 3 bullets per category and language, at most 110 characters per bullet
- documentation and repository-management work targets `main`; the remote default is `main`; do not silently promote development work to the default branch
- the authorization for a requested action remains valid throughout that task; creating a pull request includes pushing its branch, but does not authorize merging or publishing
- use merge commits when a merge is requested; never force-push, rewrite published history or remove branches without an explicit instruction
- releases use the approved version and an immutable tag on the verified release commit, with english notes from the closed changelog; do not create a release for documentation work
- deliver requested titles, bodies and changelog fragments in separate code blocks; report executed actions with their commit hash or pull request link
