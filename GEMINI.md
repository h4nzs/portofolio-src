# Project Overview

This directory contains the source code for a personal portfolio website (h4n.dev). It is a modern, single-page application (SPA) built with React, featuring a dark, "tactical" aesthetic with glassmorphism effects and heavy use of animations.

## Tech Stack

*   **Framework:** React (v19)
*   **Build Tool:** Vite (using `rolldown-vite` via overrides)
*   **Styling:** Tailwind CSS (v3)
*   **Animations:** Framer Motion
*   **Icons:** Lucide React
*   **Audio:** use-sound (for interactive hover/click effects)
*   **Deployment:** GitHub Pages (`gh-pages`)

## Key Directories and Files

*   **`src/`**: The main source code directory.
    *   **`src/App.jsx`**: The core application component. It handles the overall layout, scroll tracking, navigation, and renders the individual sections (slides) of the portfolio. It also includes a custom interactive cursor component.
    *   **`src/components/`**: Contains reusable UI components such as `HeroSection`, `BentoGrid`, `Timeline`, `SpotlightCard`, and `NetworkBackground`.
    *   **`src/data/portfolioData.js`**: **Crucial file.** This is the centralized data store for the portfolio. Content like "About Me", skills, project details, education history, and certifications are defined here as a JavaScript array of objects.
    *   **`src/hooks/useSFX.js`**: Custom hook managing sound effects for UI interactions.
*   **`public/`**: Static assets like images (in `public/images/`), sounds (`public/sounds/`), and the favicon. Note that the application references these assets assuming a base path of `/portofolio/` due to GitHub Pages deployment.
*   **`package.json`**: Defines project dependencies, scripts, and basic metadata.
*   **`vite.config.js`**: Configuration for Vite, currently set with `base: '/portofolio/'` for deployment to GitHub Pages.
*   **`tailwind.config.js`**: Configuration for Tailwind CSS, including custom animations and color definitions.
*   **`eslint.config.js`**: Flat configuration file for ESLint.

## Commands

Use the following `npm` scripts to manage the project:

*   **Install Dependencies:** `npm install`
*   **Start Development Server:** `npm run dev` (Starts the Vite dev server)
*   **Build for Production:** `npm run build` (Compiles the app to the `dist/` directory)
*   **Preview Build:** `npm run preview` (Locally serves the `dist/` directory to test the production build)
*   **Lint Code:** `npm run lint` (Runs ESLint)
*   **Deploy:** `npm run deploy` (Uses `gh-pages` to publish the `dist/` directory to the `gh-pages` branch)

## Development Conventions

*   **Content Management:** To update the text, projects, or skills displayed on the website, you should edit the `src/data/portfolioData.js` file. The UI components are designed to dynamically render data from this file.
*   **Styling:** Adhere to Tailwind CSS utility classes for styling. Avoid writing custom CSS in `App.css` or `index.css` unless necessary for complex animations or global base styles not easily handled by Tailwind.
*   **Animations:** Use `framer-motion` for adding interactive or scroll-based animations to components.
*   **Code Style:** The project uses ESLint. Ensure code passes `npm run lint` before committing. Note that the linting rules are configured to ignore unused variables that start with an uppercase letter or an underscore.
