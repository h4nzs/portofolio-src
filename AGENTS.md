# AGENTS.md — portofolio-src (h4n.dev)

## Commands

| Command | Action |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build to `dist/` |
| `npm run preview` | Serve production build locally |
| `npm run lint` | ESLint (flat config; `eslint .`) |
| `npm run deploy` | Push `dist/` to `gh-pages` branch via `gh-pages` |

No test or typecheck commands exist (`.jsx` only, no `tsconfig`).

## Toolchain quirks

- **Vite is swapped:** `package.json` uses `"vite": "npm:rolldown-vite@7.1.14"` via `overrides` — do not remove or change this.
- **Base path:** `vite.config.js` sets `base: "/portofolio/"` (required for GH Pages). Asset URLs in code must reference `/portofolio/...` (e.g., sounds, images).
- **CSS is critical:** `src/main.jsx` imports both `index.css` (Tailwind directives) and `App.css` (custom glass styles). If either import is missing, styling breaks silently.
- **ESLint quirk:** Unused vars matching `^[A-Z_]|^motion$` are ignored. This is relevant for framer-motion `motion` variables and React component uppercase names.

## Content model (SPA)

This is a **single-page app** with anchor-scrolled sections. All text, projects, skills, and timeline data live in a single file:

- **`src/data/portfolioData.js`** — exports an array of 10 slide objects (`id: 1`–`10`). To change portfolio content, edit this file; do **not** touch presentation components.

Sound effects (`use-sound` hook in `src/hooks/useSFX.js`) hardcode paths like `/portofolio/sounds/hover.mp3` — these only resolve correctly when `base` is `/portofolio/`.

## Deployment

Two paths:

- **CI** (`.github/workflows/main.yml`): On push to `main`, runs `npm ci` → `npm run build` → deploys `dist/` to **external** repo `h4nzs/portofolio` via `peaceiris/actions-gh-pages`. Uses `PERSONAL_TOKEN` secret. Forces orphan commits.
- **Manual:** `npm run deploy` uses `gh-pages` package to push `dist/` to the `gh-pages` branch of the current repo.

## Tailwind

Custom class `animate-pulse-slow` and color tokens `glass-surface` / `glass-border` are defined in `tailwind.config.js`. Content scan paths include `./document/**/*.{js,ts,jsx,tsx}` and root `./*.{js,ts,jsx,tsx}` in addition to standard `./src/**/*.{js,ts,jsx,tsx}`.
