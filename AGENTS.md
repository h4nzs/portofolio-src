# AGENTS.md — portofolio-src (h4n.dev)

## Commands

| Command | Action |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build to `dist/` |
| `npm run preview` | Serve production build locally |
| `npm run lint` | ESLint (flat config; `eslint .`) |
| `npm run deploy` | Push `dist/` to `gh-pages` branch via `gh-pages` |

No test or typecheck commands (`.jsx` only, no `tsconfig`).

## Toolchain quirks

- **Vite is swapped:** `package.json` uses `"vite": "npm:rolldown-vite@7.1.14"` via `overrides` — do not remove or change this.
- **Base path:** `vite.config.js` sets `base: "/portofolio/"`. Asset URLs in code must reference `/portofolio/...` (sounds, images). The `index.html` uses relative paths (`./favicon.ico`).
- **CSS is critical:** `src/main.jsx` imports both `index.css` (Tailwind directives) and `App.css` (glass styles, fonts, `cursor: none`, glitch animations). If either import is removed, styling breaks silently.
- **ESLint quirk:** `no-unused-vars` ignores `^[A-Z_]|^motion$` patterns — relevant for `motion` (framer-motion) and React component uppercase names.
- **`use-sound` vs `howler`:** `src/hooks/useSFX.js` imports `Howl` from `howler`, but `howler` is NOT a direct dependency — it works only because `use-sound` (in `dependencies`) bundles it as a transitive dep. Do not remove `use-sound` or the import breaks.
- **`cursor: none`:** `src/App.css` sets `body { cursor: none; }`. This is intentional for the custom `CustomCursor` component. Do NOT override cursor styles.
- **Tailwind stale scan path:** `tailwind.config.js` scans `./document/**/*.{js,ts,jsx,tsx}` but no `document/` directory exists. This is harmless but stale.

## Architecture (10-section SPA)

A single-page app with 10 anchor-scrolled sections + 1 hero overlay. All text/projects/skills/timeline data lives in `src/data/portfolioData.js`:

| Slide index | `id` attribute | Source |
|---|---|---|
| Hero (no index) | `#slide-0` | `HeroSection.jsx` (hardcoded, NOT in portfolioData) |
| slides[0] | `#slide-1` | About Me |
| slides[1] | `#slide-2` | Specialties |
| slides[2] | `#slide-3` | Technical Stack |
| slides[3] | `#slide-4` | Core Competencies |
| slides[4] | `#slide-5` | Education Timeline |
| slides[5] | `#slide-6` | Certifications |
| slides[6] | `#slide-7` | Featured Projects |
| slides[7] | `#slide-8` | Experience Log |
| slides[8] | `#slide-9` | Vision |
| slides[9] | `#slide-10` | Connect |

**Critical:** `App.jsx` accesses the `slides` array by hardcoded index (e.g., `slides[0].html`, `slides[2].skills.technical`, `slides[6].projects`). Reordering the array or adding/removing entries will silently shift all sections. Modify fields in place; do not reorder.

## Key components

- **`NetworkBackground`** (`src/components/NetworkBackground.jsx`): Full-canvas particle network animation with a periodic "breach gate" sequence. Rendered at `z-0` behind all content. Do NOT add DOM elements at z-0 or modify the canvas logic without understanding the animation state machine.
- **`CustomCursor`** (defined in `App.jsx`): Two-element cursor (dot + ring) using `mix-blend-difference` at `z-[100]`. It tracks all `a, button, .cursor-pointer` elements.
- **`BentoGrid`** (`src/components/BentoGrid.jsx`): Uses framer-motion `layoutId` + `AnimatePresence` for shared layout animations on card expand. Every card's `layoutId` is `card-${project.id}`. Breaking this pattern breaks the expand animation.
- **`SpotlightCard`** (`src/components/SpotlightCard.jsx`): Wrapper that adds a mouse-following radial gradient spotlight. Uses CSS custom properties `--mouse-x`/`--mouse-y`.

## Sound effects

The `useSFX` hook creates two `Howl` instances pointing to `/portofolio/sounds/hover.mp3` and `/portofolio/sounds/click.mp3`. These paths only resolve at the `/portofolio/` base path. The click handler (`playClick`) is called on both `onMouseDown`/`onClick` — be careful not to double-call it.

## Animation patterns

- **framer-motion** is the sole animation library. Use `motion` components for any new animations.
- **Scroll-driven:** `HeroSection` uses `useScroll`/`useTransform` for parallax. `Timeline` uses `whileInView` for entry animations.
- **`animate-pulse-slow`** is a custom Tailwind animation (8s pulse) defined in `tailwind.config.js`.

## Deployment

- **CI** (`.github/workflows/main.yml`): On push to `main`, runs `npm ci` → `npm run build` → deploys `dist/` to **external** repo `h4nzs/portofolio` via `peaceiris/actions-gh-pages` (uses `PERSONAL_TOKEN`, forces orphan commits).
- **Manual:** `npm run deploy` uses `gh-pages` package to push `dist/` to `gh-pages` branch of the current repo.
