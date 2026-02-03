import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Eye, Github, Linkedin, Mail } from 'lucide-react';
import "./App.css";

import { slides } from "./data/portfolioData";
import HeroSection from "./components/HeroSection";
import BentoGrid from "./components/BentoGrid";
import Timeline from "./components/Timeline";
import SpotlightCard from "./components/SpotlightCard";
import { useSFX } from "./hooks/useSFX";

// Custom Cursor Component
const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updatePosition);
    return () => window.removeEventListener('mousemove', updatePosition);
  }, []);

  return (
    <>
      <motion.div 
        className="fixed w-4 h-4 bg-cyan-400 rounded-full pointer-events-none z-[100] mix-blend-difference"
        animate={{ x: position.x - 8, y: position.y - 8 }}
        transition={{ type: "spring", stiffness: 1000, damping: 50, mass: 0.1 }}
      />
      <motion.div 
        className="fixed w-12 h-12 border border-white/20 rounded-full pointer-events-none z-[100]"
        animate={{ x: position.x - 24, y: position.y - 24 }}
        transition={{ type: "spring", stiffness: 200, damping: 30, mass: 0.5 }}
      />
    </>
  );
};

const App = React.memo(() => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const { playHover, playClick } = useSFX();

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [currentCert, setCurrentCert] = useState("");

  // Nav Active State
  const [activeId, setActiveId] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      let current = 0;
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
          current = parseInt(section.id.split('-')[1]);
        }
      });
      setActiveId(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-[#050505] text-white min-h-screen selection:bg-cyan-500/30">
      <CustomCursor />
      <div className="bg-noise" /> {/* Noise Texture Overlay */}
      
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-cyan-500 to-indigo-500 origin-left z-50" style={{ scaleX }} />

      {/* Navbar */}
      <header className="fixed top-0 inset-x-0 z-40 bg-[#050505]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-bold text-xl tracking-tighter" onMouseEnter={playHover}>h4n.dev</div>
          <nav className="hidden md:flex gap-1">
            {slides.map(s => (
              <a 
                key={s.id} 
                href={`#slide-${s.id}`}
                className={`px-4 py-2 text-sm rounded-full transition-all ${activeId === s.id ? 'bg-white text-black font-bold' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
                onMouseEnter={playHover}
                onClick={(e) => {
                  playClick();
                  e.preventDefault();
                  document.getElementById(`slide-${s.id}`)?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {s.title}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main>
        <HeroSection />

        {/* Content Slides */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 pb-32 space-y-32">
          
          {/* About */}
          <section id="slide-1" className="relative pt-24 min-h-[800px] flex items-center overflow-hidden">
            {/* Blended Background Image */}
            <div className="absolute right-0 top-0 bottom-0 w-full md:w-[60%] z-0 opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700">
               <img 
                 src={slides[0].photo} 
                 alt="Profile" 
                 className="w-full h-full object-cover object-center md:object-right-top"
                 style={{ 
                   maskImage: 'radial-gradient(circle at 75% 40%, black 50%, transparent 100%)',
                   WebkitMaskImage: 'radial-gradient(circle at 75% 40%, black 50%, transparent 100%)' 
                 }}
               />
               <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#050505]/20 to-[#050505]" />
               <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
            </div>

            {/* Content Content */}
            <div className="relative z-10 max-w-3xl space-y-8">
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">
                About Me.
              </h2>
              <div 
                className="text-lg md:text-xl text-white/80 leading-relaxed font-light backdrop-blur-sm p-6 rounded-3xl border border-white/5 bg-black/20" 
                dangerouslySetInnerHTML={{ __html: slides[0].html }} 
              />
              <div className="flex flex-wrap gap-3">
                {slides[0].hobbies.map(h => (
                  <SpotlightCard key={h} className="px-4 py-2 rounded-full bg-cyan-950/20 border border-cyan-500/20 text-sm font-mono text-cyan-400">
                    {h}
                  </SpotlightCard>
                ))}
              </div>
            </div>
          </section>

          {/* Skills Grid */}
          <section id="slide-2" className="pt-24">
            <h2 className="text-4xl font-bold mb-12">Technical Arsenal.</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {slides[1].skills.technical.map((s, i) => (
                <SpotlightCard key={i} className="p-6 flex justify-between items-center" onMouseEnter={playHover}>
                  <span className="font-bold text-white/90">{s.label}</span>
                  <span className="text-sm font-mono text-white/50 text-right">{s.value}</span>
                </SpotlightCard>
              ))}
            </div>
          </section>

          {/* Soft Skills */}
          <section id="slide-3" className="pt-24">
            <h2 className="text-4xl font-bold mb-12 text-right">Core Competencies.</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {slides[2].skills.soft.map((s, i) => (
                <SpotlightCard key={i} className="p-6 border-t-2 border-cyan-500/50" onMouseEnter={playHover}>
                  <h3 className="text-xl font-bold mb-2">{s.label}</h3>
                  <p className="text-sm text-white/60">{s.value}</p>
                </SpotlightCard>
              ))}
            </div>
          </section>

          {/* Education */}
          <section id="slide-4" className="pt-24 flex flex-col items-center">
            <h2 className="text-4xl font-bold mb-16">Education Timeline.</h2>
            <Timeline history={slides[3].history} />
          </section>

          {/* Certifications */}
          <section id="slide-5" className="relative pt-24 min-h-[600px] flex flex-col justify-center overflow-hidden">
            {/* Blended Background Image */}
            <div className="absolute right-0 top-0 bottom-0 w-full md:w-[60%] z-0 opacity-50 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700 pointer-events-none">
               <img 
                 src="/portofolio/images/profile-2.png" 
                 alt="Background" 
                 className="w-full h-full object-cover object-[50%_40%]"
                 style={{ 
                   maskImage: 'radial-gradient(circle at 70% 50%, black 40%, transparent 100%)',
                   WebkitMaskImage: 'radial-gradient(circle at 70% 50%, black 40%, transparent 100%)' 
                 }}
               />
               <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#050505]/20 to-[#050505]" />
               <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
            </div>

            <div className="relative z-10 w-full">
              <h2 className="text-4xl font-bold mb-12">Certifications.</h2>
              <div className="flex gap-6 overflow-x-auto pb-4">
                {slides[4].certs.map((c, i) => (
                  <SpotlightCard key={i} className="min-w-[300px] p-4 group cursor-pointer" onMouseEnter={playHover}>
                    <div className="h-40 bg-black/50 rounded-lg mb-4 overflow-hidden relative" onClick={() => { playClick(); setCurrentCert(c.img); setModalOpen(true); }}>
                      <img src={c.img} alt={c.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Eye className="text-white" />
                      </div>
                    </div>
                    <h3 className="font-bold text-lg">{c.title}</h3>
                    <p className="text-xs text-white/50">{c.desc}</p>
                  </SpotlightCard>
                ))}
              </div>
            </div>
          </section>

          {/* Projects Bento */}
          <section id="slide-6" className="pt-24">
            <h2 className="text-4xl font-bold mb-12">Selected Works.</h2>
            <BentoGrid projects={slides[5].projects} />
          </section>

          {/* Experience */}
          <section id="slide-7" className="pt-24 flex flex-col items-center">
            <h2 className="text-4xl font-bold mb-16">Experience Log.</h2>
            <Timeline history={slides[6].history} />
          </section>

          {/* Vision */}
          <section id="slide-8" className="pt-24 text-center max-w-4xl mx-auto">
            <div className="relative p-12 rounded-[3rem] border border-cyan-500/20 bg-gradient-to-b from-cyan-900/10 to-transparent overflow-hidden">
              <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:30px_30px]" />
              <h2 className="relative text-sm font-mono uppercase tracking-widest text-cyan-400 mb-6">The Vision</h2>
              <div className="relative text-3xl md:text-5xl font-bold leading-tight" dangerouslySetInnerHTML={{ __html: slides[7].html }} />
            </div>
          </section>

          {/* Contact */}
          <section id="slide-9" className="pt-24 pb-24 text-center">
             <h2 className="text-6xl font-bold mb-8">Ready to Collaborate?</h2>
             <p className="text-xl text-white/50 mb-12">Let's build secure, scalable systems together.</p>
             <div className="flex justify-center gap-6">
                <a href="mailto:sayadehan134@gmail.com" onMouseEnter={playHover} onClick={playClick} className="p-4 rounded-full bg-white text-black hover:scale-110 transition-transform"><Mail /></a>
                <a href="https://github.com/h4nzs" onMouseEnter={playHover} onClick={playClick} className="p-4 rounded-full glass-panel border border-white/10 hover:bg-white/10 hover:scale-110 transition-transform"><Github /></a>
                <a href="https://instagram.com/h4nzss" onMouseEnter={playHover} onClick={playClick} className="p-4 rounded-full glass-panel border border-white/10 hover:bg-white/10 hover:scale-110 transition-transform"><Linkedin /></a>
             </div>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center border-t border-white/5 text-white/30 text-sm font-mono">
        © {new Date().getFullYear()} Dehan. Engineered with Precision.
      </footer>

      {/* Cert Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4" onClick={() => setModalOpen(false)}>
          <img src={currentCert} alt="Certificate" className="max-w-full max-h-[90vh] rounded-lg shadow-2xl border border-white/10" />
        </div>
      )}
    </div>
  );
});

export default App;