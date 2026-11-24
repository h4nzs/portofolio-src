# h4nzs — Personal Portfolio

Source code of [Dehan Amada's portfolio](https://h4nzs.github.io/portofolio/): a single-page, dark "tactical" site built with Astro. It covers my work in fullstack development, DevOps, security and AI agents.

## Features

- **Static first:** Astro 6 renders every section to plain HTML. Only four small React islands ship JavaScript.
- **Tactical UI:** custom cursor, spotlight cards, animated network-graph background and glitch text.
- **Sound effects:** subtle hover and click sounds (Howler) in the project grid.
- **Data-driven content:** bio, specialties, stack, projects, experience and education all live in [`src/data/portfolioData.js`](src/data/portfolioData.js).
- **SEO:** meta and Open Graph tags, JSON-LD (`Person`, `FAQPage`), sitemap and `robots.txt`, PWA manifest.
- **Responsive:** mobile, tablet and desktop.

## Tech stack

| Area | Choice |
|---|---|
| Framework | [Astro 6](https://astro.build) (static output) |
| Islands | React 19 (`NetworkBackground`, `CustomCursor`, `SpotlightCard`, `BentoGrid`) |
| Styling | Tailwind CSS 3, plain CSS for glitch and entry animations |
| Animation | CSS-first; Framer Motion only in `BentoGrid` |
| Audio | Howler |
| Tooling | ESLint 9 (flat config, `.jsx` only) |
| Hosting | GitHub Pages |

## Project structure

```
src/
├── data/portfolioData.js     # all content (slides[] + slideById())
├── layouts/BaseLayout.astro  # <head>, meta, JSON-LD, analytics
├── pages/index.astro         # assembles the sections
├── components/
│   ├── sections/*.astro      # Hero, About, Specialties, TechnicalStack, ...
│   ├── react/*.jsx           # the 4 React islands + CertModal, useSFX
│   ├── Icon.astro            # inline SVG icon set
│   └── Navbar / Footer
└── styles/                   # global.css, glitch.css
public/                       # images, sounds, sitemap, robots, manifest
```

## Getting started

Requires Node.js 22.12 or newer (CI uses Node 24).

```bash
git clone https://github.com/h4nzs/portofolio-src.git
cd portofolio-src
npm install
npm run dev        # http://localhost:4321/portofolio/
```

| Command | Action |
|---|---|
| `npm run dev` | Astro dev server |
| `npm run build` | Build to `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | ESLint |
| `npm run deploy` | Manual push of `dist/` to `gh-pages` (CI normally does this) |

The site is served under `/portofolio/` (`base` in `astro.config.mjs`), so asset paths in the data file start with `/portofolio/`.

## Updating the content

Edit `src/data/portfolioData.js`. Sections are looked up by `id`, not by array position.

| `id` | Section | Notes |
|---|---|---|
| 1 | About | `html`, `photo`, `hobbies[]` |
| 2 | Specialties | `icon` must exist in `Icon.astro` (e.g. `ShieldAlert`, `Code2`, `Bot`, `Server`) |
| 3 | Technical Stack | `skills.technical[]` as `{ label, value }` |
| 4 | Core Competencies | `skills.soft[]` |
| 5 | Education | `history[]` |
| 6 | Certifications | `certs[]` |
| 7 | Featured Projects | `projects[]`: `title`, `short`, `long`, `challenge`, `impact`, `tags`, `status`, `img`, optional `repo`, `live` and `wide` (spans two columns) |
| 8 | Experience | `history[]`, newest first; `logo` is optional |
| 9 | Vision | `html` |
| 10 | Connect | links are in `Connect.astro` |

Project covers are `.webp` screenshots or `.svg` illustrations in `public/images/`. Don't use screenshots of private or offline systems.

## Deployment

Pushing to `main` runs [`.github/workflows/main.yml`](.github/workflows/main.yml): install, build, then publish `dist/` to the `gh-pages` branch of the separate [`h4nzs/portofolio`](https://github.com/h4nzs/portofolio) repository, which GitHub Pages serves. The workflow needs a `PERSONAL_TOKEN` secret with write access to that repository.

## Contact

[GitHub](https://github.com/h4nzs) · [LinkedIn](https://linkedin.com/in/muhammad-dehan-amada) · [Instagram](https://instagram.com/h4nzss)
