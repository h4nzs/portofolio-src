# AGENTS.md — portofolio-src (h4n.dev)

Astro 6 SPA (single page, scroll-driven). Refactored from Vite+React.

## Commands

| Command | Action |
|---|---|
| `npm run dev` | Astro dev server |
| `npm run build` | Build to `dist/` |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint (`.jsx` only, no `.astro` lint rules) |
| `npm run deploy` | Push `dist/` to `gh-pages` branch via `gh-pages` |

No test or typecheck commands.

## Architecture

### React islands (client:load / client:visible)

Only 4 components remain React. Everything else is pure `.astro` (zero JS).

| Island | Mount | Framework dep |
|---|---|---|
| `NetworkBackground` | `client:load` | none (vanilla canvas) |
| `CustomCursor` | `client:load` | none (CSS transitions instead of framer-motion) |
| `SpotlightCard` | `client:load` | none (CSS custom properties) |
| `BentoGrid` | `client:visible` | **framer-motion** (only component that still bundles it) |

### Static sections (`.astro`, no JS)

All content from `src/data/portfolioData.js` (exports `slides[]` + `slideById(id)`).

| `id` | Content |
|---|---|
| `#slide-0` | Hero (CSS entry animation, no parallax) |
| `#slide-1`–`#slide-10` | About, Specialties, TechnicalStack, CoreCompetencies, Education, Certifications, FeaturedProjects (wraps BentoGrid), Experience, Vision, Connect |

**Critical:** `slideById()` uses `Array.find` on `slides[]` — accessible by `id`, not index.

### Icons

`src/components/Icon.astro` renders Lucide-style SVG inline (zero JS, zero dep). No `lucide-react`.

## Toolchain quirks

- **Base path:** `astro.config.mjs` sets `base: "/portofolio/"`. All asset paths in code must use `/portofolio/...`.
- **No TypeScript:** Plain `.jsx` for React islands. `src/env.d.ts` only for Astro types.
- **`cursor: none`:** `global.css` hides default cursor for custom `CustomCursor` component.
- **Sound effects:** `src/components/react/useSFX.js` uses `Howl` from `howler`. Navbar uses `Howl` directly via `client:load` bundled script. React islands each instantiate their own `Howl` via `useSFX`.
- **GTM/GA:** `BaseLayout.astro` has GTM (`GTM-TKKW9RS9`) and GA (`G-W0WKQXQJQN`). Scripts use `is:inline` to prevent Astro processing.
- **PostCSS:** `postcss.config.js` configures `tailwindcss` + `autoprefixer` (required for Tailwind without `@astrojs/tailwind`).

## Deployment

- **CI:** `.github/workflows/main.yml` — on push to `main`, `npm ci` (Node 20) → `npm run build` → deploy `dist/` to external repo `h4nzs/portofolio` via `peaceiris/actions-gh-pages`.
- **Manual:** `npm run deploy` pushes `dist/` to `gh-pages` branch of current repo.
