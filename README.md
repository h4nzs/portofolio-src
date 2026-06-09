# h4n.dev - Personal Portfolio

A modern, high-performance personal portfolio website featuring a dark, "tactical" aesthetic with glassmorphism effects and fluid animations. 

## ✨ Features

- **Interactive Tactical Cursor:** A custom cursor that reacts to clickable elements and movement.
- **Immersive Audio (SFX):** Subtle sound effects on hover and click interactions using `use-sound`.
- **Fluid Animations:** Scroll-driven animations, page transitions, and interactive components powered by Framer Motion.
- **Centralized Data:** All portfolio content (projects, skills, education, experience) is managed from a single data file, making it incredibly easy to update without touching the UI code.
- **Responsive Design:** Fully optimized for mobile, tablet, and desktop viewing.
- **Zero-Trust Vibe:** Styled with a cyber/tactical aesthetic fitting for a fullstack developer & security specialist.

## 🛠️ Tech Stack

- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v3](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Deployment:** [GitHub Pages](https://pages.github.com/)

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/h4nzs/portofolio.git
   ```
2. Navigate to the project directory:
   ```bash
   cd portofolio
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and visit `http://localhost:5173`.

## 📝 Customizing Your Content

The entire portfolio is data-driven. You don't need to dig through complex React components to update your information.

Simply open `src/data/portfolioData.js` and modify the JavaScript objects. The UI will automatically reflect your changes. This includes:
- Personal Bio & Hobbies
- Technical & Soft Skills
- Education & Certifications
- Featured Projects & Experience
- Social Links

## 📂 Project Structure

```text
├── public/                 # Static assets (images, sounds, favicons)
├── src/
│   ├── components/         # Reusable UI components (Hero, BentoGrid, Timeline, etc.)
│   ├── data/               # Centralized content store (portfolioData.js)
│   ├── hooks/              # Custom React hooks (e.g., useSFX)
│   ├── App.jsx             # Main application layout and scroll logic
│   ├── index.css           # Global CSS (Tailwind directives)
│   └── main.jsx            # React entry point
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind configuration and custom colors
└── vite.config.js          # Vite configuration
```

## 📦 Deployment

This project is configured to deploy to GitHub Pages. 

1. Ensure the `base` path in `vite.config.js` matches your repository name (currently set to `/portofolio/`).
2. Run the deployment script:
   ```bash
   npm run deploy
   ```
This command will build the project and push the `dist` folder to the `gh-pages` branch.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
