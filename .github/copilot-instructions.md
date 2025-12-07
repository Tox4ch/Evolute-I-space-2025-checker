**Project Overview**
- **Type:** Fullstack TypeScript app (Vite + React client, small Express server).
- **Client root:** `client/` (Vite `root` is set to `client` in `vite.config.ts`).
- **Server entry:** `server/index.ts` — bundled with `esbuild` during `pnpm build`.

**How to run (developer)**
- Start dev frontend: `pnpm dev` — runs `vite` with `--host` from repository root.
- Build for production: `pnpm build` — runs `vite build` (outputs to `dist/public`) and then bundles `server/index.ts` via `esbuild` into `dist`.
- Start production server: `pnpm start` (expects `NODE_ENV=production` and uses files under `dist`).
- Type check: `pnpm check` (runs `tsc --noEmit`).

**Important files & locations**
- Frontend entry: `client/src/main.tsx` and top-level app in `client/src/App.tsx`.
- UI primitives / components: `client/src/components/ui/*` (Radix-based wrappers).
- Pages: `client/src/pages/*` (e.g. `Home.tsx`, `NotFound.tsx`).
- Contexts/hooks: `client/src/contexts/*`, `client/src/hooks/*` (use these for cross-cutting state).
- Shared code between client and server: `shared/` and alias `@shared` (see `vite.config.ts`).
- Global constants: `client/src/const.ts` and `shared/const.ts`.

**Project conventions & patterns (concrete)**
- Imports use Vite aliases defined in `vite.config.ts`: `@` -> `client/src`, `@shared` -> `shared`, `@assets` -> `attached_assets`.
  - Example: `import { Toaster } from "@/components/ui/sonner"`.
- The UI layer wraps Radix components — prefer composing via `client/src/components/ui/*` rather than importing Radix directly when changing visuals or behavior.
- Routing uses `wouter` with a simple `Switch` in `App.tsx`. For client-side routes, server serves `index.html` for any path (see `server/index.ts`).
- Theme: `ThemeProvider` in `App.tsx` controls theme defaults; color tokens are adjusted in `client/src/index.css` (see comment in `App.tsx`).

**Build / deployment notes**
- `vite.config.ts` changes the frontend `outDir` to `dist/public` so the server can serve static files from `dist/public`.
- The build script bundles the server with esbuild: `esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist`.
- In production the server serves static files from `dist/public`; ensure both client and server bundles are present in `dist` before running `pnpm start`.

**Dependencies & patches**
- Package manager: `pnpm` (see `packageManager` in `package.json`). Run `pnpm install` before running scripts.
- There is a patched dependency: `patches/wouter@3.7.1.patch` referenced in `package.json` under `pnpm.patchedDependencies` — do not remove or ignore this patch.

**Guidance for AI agents (what to do / what to avoid)**
- Use project aliases when editing imports (`@/...`, `@shared`) to match developer expectations.
- Small UI changes: prefer editing `client/src/components/ui/*` or page components in `client/src/pages/*`.
- Server changes: if modifying `server/index.ts`, remember the build step uses `esbuild` — update build script only if you intentionally change packaging.
- Environment files: Vite `envDir` points to repo root; look for `.env` files at the repository root when adding configuration.
- Tests: no explicit test scripts found; `vitest` is in devDependencies but not wired into `package.json` scripts — add tests carefully and include scripts if you introduce them.
- TypeScript: keep `tsconfig.json` and run `pnpm check` to validate types before pushing changes.

**Quick code examples**
- Use alias imports: `import Home from "@/pages/Home"`.
- Theme hint from code: `ThemeProvider defaultTheme="light"` is set in `client/src/App.tsx` — change `index.css` for palette adjustments.

If anything above is unclear or you want more details (e.g. component examples, tests setup, or CI hooks), tell me which area to expand and I will iterate.
