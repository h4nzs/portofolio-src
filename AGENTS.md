# AGENTS.md — portofolio-src (h4n.dev)

## Commands

| Command | Action |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build to `dist/` |
| `npm run preview` | Serve production build locally |
| `npm run lint` | ESLint (flat config; `eslint .`) |
| `npm run deploy` | Push `dist/` to `gh-pages` branch via `gh-pages` |

No test or typecheck commands (`.jsx` only, no `tsconfig`). `test_changes.js` at root is a stub, not a test runner.

## Toolchain quirks

- **Vite swapped:** `package.json` uses `"vite": "npm:rolldown-vite@7.1.14"` via `overrides` — do not touch this.
- **Base path:** `vite.config.js` sets `base: "/portofolio/"`. All asset URLs in code (sounds, images) must reference `/portofolio/...`. `index.html` uses relative paths (`./favicon.ico`).
- **`optimizeDeps`:** Vite pre-bundles `framer-motion` explicitly via `optimizeDeps.include`. Do not remove.
- **CSS critical:** `src/main.jsx` imports both `index.css` (Tailwind directives) and `App.css` (fonts, glass styles, `cursor: none`, glitch animations). Removing either breaks styling silently.
- **ESLint quirk:** `no-unused-vars` ignores `^[A-Z_]|^motion$` — relevant for `motion` (framer-motion) and uppercase component names.
- **`cursor: none`:** `App.css` sets `body { cursor: none; }`. Intentional for the custom `CustomCursor` component. Do not override.
- **`howler` / `use-sound`:** `src/hooks/useSFX.js` imports `Howl` from `howler` (direct dependency). `use-sound` is in `dependencies` but unused in source.
- **GTM / GA:** `index.html` contains Google Tag Manager (`GTM-TKKW9RS9`) and Google Analytics (`G-W0WKQXQJQN`) scripts. Present in production build.

## Architecture (10-section SPA)

All text/projects/skills/timeline data lives in `src/data/portfolioData.js`, which exports both `slides` (array) and `slideById(id)` (helper).

| Slide index | `id` attribute | Content |
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

**Critical:** `App.jsx` accesses slides by hardcoded index (e.g., `slides[0].html`, `slides[2].skills.technical`, `slides[6].projects`). Reordering the array silently shifts all sections. Modify fields in place; do not reorder.

## Key components

- **`NetworkBackground`** (`src/components/NetworkBackground.jsx`): Full-canvas particle network with a periodic "breach gate" sequence. Rendered at `z-0`. Do not add DOM at `z-0` or modify canvas logic without understanding the animation state machine.
- **`CustomCursor`** (defined in `App.jsx`): Two-element cursor (dot + ring) at `z-[100]` with `mix-blend-difference`. Tracks `a, button, .cursor-pointer`.
- **`BentoGrid`** (`src/components/BentoGrid.jsx`): Uses framer-motion `layoutId` + `AnimatePresence` for shared layout animations. Every card's `layoutId` is `card-${project.id}`.
- **`SpotlightCard`** (`src/components/SpotlightCard.jsx`): Mouse-following radial gradient spotlight via CSS custom properties `--mouse-x`/`--mouse-y`.

## Sound effects

`useSFX` creates two `Howl` instances for `/portofolio/sounds/hover.mp3` and `/portofolio/sounds/click.mp3`. `playClick` is called on both `onMouseDown`/`onClick` — avoid double-calling.

## Animation patterns

- **framer-motion** is the sole animation library. Use `motion` components for new animations.
- **Scroll-driven:** `HeroSection` uses `useScroll`/`useTransform` for parallax. `Timeline` uses `whileInView`.
- **`animate-pulse-slow`** is a custom Tailwind animation (8s pulse) in `tailwind.config.js`.

## Deployment

- **CI** (`.github/workflows/main.yml`): On push to `main`, runs `npm ci` (Node 20) → `npm run build` → deploys `dist/` to external repo `h4nzs/portofolio` via `peaceiris/actions-gh-pages` with `PERSONAL_TOKEN` and `force_orphan: true`.
- **Manual:** `npm run deploy` pushes `dist/` to `gh-pages` branch of current repo.
