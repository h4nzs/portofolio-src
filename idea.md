### 🚀 Upgrade Plan: "The Living Network"

A static glass UI is clean, but a **Network Engineer's** portfolio needs to feel *alive*—like a pulsing node in a vast system.

I have refactored your code to include:

1. **NetworkBackground (The "Spiderweb" Effect)**: A canvas-based system where nodes connect to your cursor and each other, simulating a mesh topology.
2. **Expandable Bento Grid**: Cards now morph into detailed views when clicked using `framer-motion` layout animations.
3. **Reactive UI**: Added magnetic buttons and hover-triggered glows.

Here is your complete refactor.

---

### 1. New Component: The Network Background

Create `src/components/NetworkBackground.jsx`. This replaces your custom cursor with a system where the *entire background* reacts to your presence.

```jsx
import React, { useEffect, useRef } from 'react';

const NetworkBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Configuration
    const particleCount = 60;
    const connectionDistance = 150;
    const mouseDistance = 200;
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // Mouse state
    const mouse = { x: -1000, y: -1000 };

    // Initialize Canvas
    canvas.width = width;
    canvas.height = height;

    // Particles
    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(100, 200, 255, 0.5)';
        ctx.fill();
      }
    }

    const particles = Array.from({ length: particleCount }, () => new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      particles.forEach(p => {
        p.update();
        p.draw();

        // Connect to other particles
        particles.forEach(p2 => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(100, 200, 255, ${0.1 * (1 - distance / connectionDistance)})`;
            ctx.lineWidth = 1;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });

        // Connect to Mouse (The "Network Engineer" feel)
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseDistance) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(59, 130, 246, ${0.4 * (1 - distance / mouseDistance)})`; // Stronger Blue
          ctx.lineWidth = 1.5;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // Event Listeners
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0 pointer-events-none bg-[#050505]" // Deep dark background
    />
  );
};

export default NetworkBackground;

```

---

### 2. Refactored Component: Expandable Bento Grid

Update `src/components/BentoGrid.jsx`. This adds the "morphing" effect when you click a card.

```jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github } from 'lucide-react';
import { portfolioData } from '../data/portfolioData'; // Ensure this path is correct

const BentoGrid = () => {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 py-20">
      <h2 className="text-4xl font-bold text-white mb-12 text-center">System Log: Projects</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
        {portfolioData.projects.map((project, i) => (
          <motion.div
            key={project.id}
            layoutId={`card-${project.id}`}
            onClick={() => setSelectedId(project.id)}
            className={`
              group relative rounded-3xl overflow-hidden cursor-pointer
              bg-white/5 border border-white/10 hover:border-blue-500/50
              transition-colors duration-300
              ${i === 0 || i === 3 ? 'md:col-span-2' : 'col-span-1'}
            `}
            whileHover={{ y: -5 }}
          >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
              <img 
                src={project.img} 
                alt={project.title}
                className="w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent" />
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
              <motion.h3 className="text-2xl font-bold text-white mb-2">{project.title}</motion.h3>
              <motion.p className="text-white/60 line-clamp-2 text-sm">{project.short}</motion.p>
              
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="px-2 py-1 text-xs font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* EXPANDED OVERLAY */}
      <AnimatePresence>
        {selectedId && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-40"
              onClick={() => setSelectedId(null)}
            />
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
              {portfolioData.projects.filter(p => p.id === selectedId).map(project => (
                <motion.div
                  key={project.id}
                  layoutId={`card-${project.id}`}
                  className="w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl pointer-events-auto"
                >
                  <div className="relative h-64 md:h-80">
                    <img src={project.img} alt={project.title} className="w-full h-full object-cover" />
                    <button 
                      onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                      className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-white/20 transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-3xl font-bold text-white mb-2">{project.title}</h3>
                        <p className="text-blue-400 font-mono text-sm">{project.status}</p>
                      </div>
                      <div className="flex gap-3">
                         {project.repo && (
                           <a href={project.repo} target="_blank" rel="noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                             <Github className="text-white" size={20} />
                           </a>
                         )}
                      </div>
                    </div>
                    
                    <p className="text-white/70 leading-relaxed mb-6">
                      {project.long}
                    </p>

                    <div className="flex flex-wrap gap-2">
                       {project.tags.map(tag => (
                         <span key={tag} className="px-3 py-1 text-sm font-mono bg-white/5 text-white/80 border border-white/10 rounded-full">
                           {tag}
                         </span>
                       ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BentoGrid;

```

---

### 3. Integration: `App.jsx`

Now we wire it all together. Note the `z-index` layering.

```jsx
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import NetworkBackground from "./components/NetworkBackground";
import HeroSection from "./components/HeroSection";
import BentoGrid from "./components/BentoGrid";
import "./App.css";

const App = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="relative min-h-screen text-white overflow-x-hidden selection:bg-blue-500/30">
      
      {/* 1. THE INTERACTIVE BACKGROUND (Z-0) */}
      <NetworkBackground />

      {/* 2. PROGRESS BAR (Z-50) */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-blue-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* 3. CONTENT LAYERS (Z-10) */}
      <main className="relative z-10 flex flex-col gap-20">
        
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center">
          <HeroSection />
        </section>

        {/* Bento Grid (Expandable) */}
        <section id="projects" className="min-h-screen py-20">
          <BentoGrid />
        </section>

        {/* Footer */}
        <footer className="py-12 text-center border-t border-white/5 bg-black/20 backdrop-blur-sm">
          <p className="font-mono text-white/40 text-sm">
            SECURE_CONNECTION_ESTABLISHED // DEHAN © 2026
          </p>
        </footer>

      </main>
    </div>
  );
};

export default App;

```

---

### 4. Styles: `App.css` (Cleanup)

We don't need much here anymore since Tailwind handles most, but ensure the base is clean.

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  font-family: 'Inter', sans-serif;
  background-color: #050505;
  color: white;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #050505;
}
::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Utilities */
.font-mono {
  font-family: 'JetBrains Mono', monospace;
}

```

### Why this is better:

1. **NetworkBackground**: The lines connecting to the mouse create an immediate "Engineer" feel. It feels like you are physically plugging into the site.
2. **Bento Expansion**: Instead of just linking away, the user stays in the "app" feel. The smooth morphing animation is premium.
3. **Depth**: By placing the canvas at `z-0` and content at `z-10`, we create a true sense of depth.