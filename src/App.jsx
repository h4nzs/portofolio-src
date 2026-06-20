import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Eye, Github, Linkedin, Mail, Instagram, ShieldAlert, Code2, TerminalSquare, Menu, X } from 'lucide-react';
import "./App.css";

import { slides, slideById } from "./data/portfolioData";
import NetworkBackground from "./components/NetworkBackground";
import HeroSection from "./components/HeroSection";
import BentoGrid from "./components/BentoGrid";
import Timeline from "./components/Timeline";
import SpotlightCard from "./components/SpotlightCard";
import { useSFX } from "./hooks/useSFX";

// --- VISIBLE CURSOR COMPONENT ---
const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  useEffect(() => {
    const onMouseMove = (e) => setPosition({ x: e.clientX, y: e.clientY });
    const onMouseDown = () => setClicked(true);
    const onMouseUp = () => setClicked(false);
    
    // Add hover listeners to clickable elements
    const handleLinkHover = () => setLinkHovered(true);
    const handleLinkLeave = () => setLinkHovered(false);

    document.querySelectorAll("a, button, .cursor-pointer").forEach((el) => {
      el.addEventListener("mouseenter", handleLinkHover);
      el.addEventListener("mouseleave", handleLinkLeave);
    });

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] mix-blend-difference">
      {/* Core Dot - High Contrast */}
      <motion.div
        className="fixed top-0 left-0 bg-white rounded-full"
        animate={{
          x: position.x - 8,
          y: position.y - 8,
          height: 16,
          width: 16,
          scale: clicked ? 0.8 : linkHovered ? 1.5 : 1
        }}
        transition={{ type: "spring", stiffness: 1000, damping: 50 }}
      />
      
      {/* Outer Ring - Radar Feel */}
      <motion.div
        className="fixed top-0 left-0 border-2 border-white rounded-full opacity-50"
        animate={{
          x: position.x - 24,
          y: position.y - 24,
          height: 48,
          width: 48,
          scale: clicked ? 0.8 : linkHovered ? 1.2 : 1,
          opacity: linkHovered ? 1 : 0.5
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </div>
  );
};

const App = React.memo(() => {
  const { playHover, playClick } = useSFX();

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [currentCert, setCurrentCert] = useState("");

  // Nav Active State
  const [activeId, setActiveId] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    <div className="relative min-h-screen text-white overflow-x-hidden selection:bg-cyan-500/30">
      
      {/* 1. VISIBLE TACTICAL CURSOR */}
      <CustomCursor />

      {/* 2. THE INTERACTIVE BACKGROUND (Z-0) */}
      <NetworkBackground />
      
      {/* Navbar */}
      <header className="fixed top-0 inset-x-0 z-40 bg-dark-bg/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-bold text-xl tracking-tighter" onMouseEnter={playHover}>h4nzs</div>
          <nav className="hidden md:flex items-center gap-1 overflow-x-auto">
            {slides.map(s => (
              <a 
                key={s.id} 
                href={`#slide-${s.id}`}
                className={`px-2.5 py-2 text-[11px] font-mono uppercase tracking-wider whitespace-nowrap transition-all flex items-center ${activeId === s.id ? 'bg-cyan-500 text-black font-bold' : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'}`}
                onMouseEnter={playHover}
                onClick={(e) => {
                  playClick();
                  e.preventDefault();
                  document.getElementById(`slide-${s.id}`)?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                [{s.title}]
              </a>
            ))}
          </nav>
          <button
            className="md:hidden p-2 text-white/60 hover:text-white transition-colors"
            onMouseEnter={playHover}
            onClick={() => { playClick(); setMobileMenuOpen(!mobileMenuOpen); }}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/5 bg-dark-bg/95 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-6 py-4 space-y-1">
              {slides.map(s => (
                <a
                  key={s.id}
                  href={`#slide-${s.id}`}
                  className={`block px-4 py-3 text-xs font-mono uppercase tracking-widest transition-all ${activeId === s.id ? 'bg-cyan-500 text-black font-bold' : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'}`}
                  onClick={(e) => { playClick(); setMobileMenuOpen(false); e.preventDefault(); document.getElementById(`slide-${s.id}`)?.scrollIntoView({ behavior: 'smooth' }); }}
                >
                  [{s.title}]
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* 3. CONTENT LAYERS (Z-10) */}
      <main className="relative z-10">
        <HeroSection />

        {/* Content Slides */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 pb-32 space-y-32">
          
          {/* About */}
          <section id="slide-1" className="relative pt-24 min-h-[800px] flex items-center overflow-hidden">
            {/* Blended Background Image */}
            <div className="absolute right-0 top-0 bottom-0 w-full md:w-[60%] z-0 opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700">
               <img 
                  src={slideById(1).photo} 
                  alt="Dehan Amada portrait" 
                  loading="lazy" decoding="async"
                  className="w-full h-full object-cover object-center md:object-right-top"
                 style={{ 
                   maskImage: 'radial-gradient(circle at 85% 40%, black 50%, transparent 100%)',
                   WebkitMaskImage: 'radial-gradient(circle at 85% 40%, black 50%, transparent 100%)' 
                 }}
               />
               <div className="absolute inset-0 bg-gradient-to-l from-transparent via-dark-bg/20 to-dark-bg" />
               <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent" />
            </div>

            {/* Content Content */}
            <div className="relative z-10 max-w-3xl space-y-8">
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">
                About Me.
              </h2>
              <div 
                className="text-lg md:text-xl text-white/80 leading-relaxed font-light backdrop-blur-sm p-8 border-l-4 border-cyan-500 bg-black/40" 
                dangerouslySetInnerHTML={{ __html: slideById(1).html }} 
              />
              <div className="flex flex-wrap gap-3">
                {slideById(1).hobbies.map(h => (
                  <SpotlightCard key={h} className="px-4 py-2 bg-cyan-950/20 border border-cyan-500/20 text-xs font-mono text-cyan-400 uppercase tracking-wider">
                    {h}
                  </SpotlightCard>
                ))}
              </div>
            </div>
          </section>

          {/* Specialties (NEW SLIDE 2) */}
          <section id="slide-2" className="pt-24">
            <h2 className="text-4xl font-bold mb-12">Specialties.</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {slideById(2).specialties.map((s, i) => {
                const Icon = s.icon === 'ShieldAlert' ? ShieldAlert : s.icon === 'Code2' ? Code2 : TerminalSquare;
                return (
                  <SpotlightCard key={i} className="p-8 border-t-2 border-cyan-500/50" onMouseEnter={playHover}>
                    <Icon className="text-cyan-400 mb-6" size={32} />
                    <h3 className="text-2xl font-bold mb-4">{s.title}</h3>
                    <p className="text-white/60 leading-relaxed">{s.desc}</p>
                  </SpotlightCard>
                );
              })}
            </div>
          </section>

          {/* Skills Grid */}
          <section id="slide-3" className="pt-24">
            <h2 className="text-4xl font-bold mb-12">Technical Arsenal.</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {slideById(3).skills.technical.map((s, i) => (
                <SpotlightCard key={i} className="p-6 flex justify-between items-center" onMouseEnter={playHover}>
                  <span className="font-bold text-white/90">{s.label}</span>
                  <span className="text-sm font-mono text-white/50 text-right">{s.value}</span>
                </SpotlightCard>
              ))}
            </div>
          </section>

          {/* Soft Skills */}
          <section id="slide-4" className="pt-24">
            <h2 className="text-4xl font-bold mb-12 text-right">Core Competencies.</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {slideById(4).skills.soft.map((s, i) => (
                <SpotlightCard key={i} className="p-6 border-t-2 border-cyan-500/50" onMouseEnter={playHover}>
                  <h3 className="text-xl font-bold mb-2">{s.label}</h3>
                  <p className="text-sm text-white/60">{s.value}</p>
                </SpotlightCard>
              ))}
            </div>
          </section>

          {/* Education */}
          <section id="slide-5" className="pt-24 flex flex-col items-center">
            <h2 className="text-4xl font-bold mb-16">Education Timeline.</h2>
            <Timeline history={slideById(5).history} />
          </section>

          {/* Certifications */}
          <section id="slide-6" className="relative pt-24 min-h-[600px] flex flex-col justify-center overflow-hidden">
            {/* Blended Background Image */}
            <div className="absolute right-0 top-0 bottom-0 w-full md:w-[60%] z-0 opacity-50 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700 pointer-events-none">
               <img 
                  src="/portofolio/images/profile-2.webp" 
                  alt="Dehan Amada secondary portrait" 
                  loading="lazy" decoding="async"
                  className="w-full h-full object-cover object-[50%_45%]"
                 style={{ 
                   maskImage: 'radial-gradient(circle at 85% 40%, black 50%, transparent 100%)',
                   WebkitMaskImage: 'radial-gradient(circle at 85% 40%, black 50%, transparent 100%)' 
                 }}
               />
               <div className="absolute inset-0 bg-gradient-to-l from-transparent via-dark-bg/20 to-dark-bg" />
               <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent" />
            </div>

            <div className="relative z-10 w-full">
              <h2 className="text-4xl font-bold mb-12">Certifications.</h2>
              <div className="flex gap-6 overflow-x-auto pb-4">
                {slideById(6).certs.map((c, i) => (
                  <SpotlightCard key={i} className="min-w-[300px] p-4 group cursor-pointer border border-white/10 hover:border-cyan-500 transition-colors" onMouseEnter={playHover}>
                    <div className="h-40 bg-black/50 mb-4 overflow-hidden relative" onClick={() => { playClick(); setCurrentCert(c.img); setModalOpen(true); }}>
                      <img src={c.img} alt={c.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform opacity-60 group-hover:opacity-100" />
                      <div className="absolute inset-0 bg-cyan-500/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Eye className="text-white" />
                      </div>
                    </div>
                    <h3 className="font-bold text-lg uppercase font-mono tracking-tight">{c.title}</h3>
                    <p className="text-xs text-white/50 font-mono">[{c.desc}]</p>
                  </SpotlightCard>
                ))}
              </div>
            </div>
          </section>

          {/* Projects Bento */}
          <section id="slide-7" className="pt-24">
            <h2 className="text-4xl font-bold mb-12">Selected Works.</h2>
            <BentoGrid projects={slideById(7).projects} />
          </section>

          {/* Experience */}
          <section id="slide-8" className="pt-24 flex flex-col items-center">
            <h2 className="text-4xl font-bold mb-16">Experience Log.</h2>
            <Timeline history={slideById(8).history} />
          </section>

          {/* Vision */}
          <section id="slide-9" className="pt-24 text-center max-w-4xl mx-auto">
            <div className="relative p-12 border border-cyan-500/30 bg-dark-bg overflow-hidden">
              {/* Tactical Corners */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-500" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-500" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-500" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-500" />
              
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDQwIEwgNDAgNDAgTCA0MCAwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMzQsMjExLDIzOCwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
              <h2 className="relative text-sm font-mono uppercase tracking-widest text-cyan-400 mb-6 bg-cyan-950/30 inline-block px-4 py-1 border border-cyan-500/30">[ THE_VISION ]</h2>
              <div className="relative text-3xl md:text-5xl font-bold leading-tight uppercase font-mono tracking-tight" dangerouslySetInnerHTML={{ __html: slideById(9).html }} />
            </div>
          </section>

          {/* Contact */}
          <section id="slide-10" className="pt-24 pb-24 text-center">
             <h2 className="text-6xl font-bold mb-8 uppercase tracking-tighter">Ready to Initiate?</h2>
             <p className="text-xl text-white/50 mb-12 font-mono uppercase tracking-widest">// Let's build secure, scalable systems together.</p>
             <div className="flex justify-center flex-wrap gap-6">
                <button 
                  onClick={() => {
                    playClick();
                    window.location.href = "mailto:" + "sayadehan134" + "@" + "gmail.com";
                  }}
                  onMouseEnter={playHover}
                  className="px-8 py-4 bg-cyan-500 text-black font-mono font-bold uppercase tracking-widest hover:bg-cyan-400 transition-colors flex items-center gap-3"
                  aria-label="Send Email"
                >
                  <Mail size={20} /> [ SEND_COMMS ]
                </button>
                <a href="https://github.com/h4nzs" onMouseEnter={playHover} onClick={playClick} aria-label="GitHub" className="px-6 py-4 bg-dark-bg border border-white/20 hover:border-cyan-500 text-white hover:text-cyan-400 transition-colors flex items-center gap-3 font-mono uppercase"><Github size={20} /></a>
                <a href="https://instagram.com/h4nzss" onMouseEnter={playHover} onClick={playClick} aria-label="Instagram" className="px-6 py-4 bg-dark-bg border border-white/20 hover:border-cyan-500 text-white hover:text-cyan-400 transition-colors flex items-center gap-3 font-mono uppercase"><Instagram size={20} /></a>
                <a href="https://linkedin.com/in/muhammad-dehan-amada" onMouseEnter={playHover} onClick={playClick} aria-label="LinkedIn" className="px-6 py-4 bg-dark-bg border border-white/20 hover:border-cyan-500 text-white hover:text-cyan-400 transition-colors flex items-center gap-3 font-mono uppercase"><Linkedin size={20} /></a>
             </div>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center border-t border-white/5 text-white/50 text-sm font-mono">
        © {new Date().getFullYear()} Dehan. Engineered with Precision.
      </footer>

      {/* Cert Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4" onClick={() => setModalOpen(false)}>
          <div className="relative p-1 border border-cyan-500/50">
            <img src={currentCert} alt={currentCert} className="max-w-full max-h-[90vh] shadow-2xl border border-white/10" />
            <div className="absolute -top-2 -right-2 p-2 bg-cyan-500 text-black font-bold text-xs font-mono">X</div>
          </div>
        </div>
      )}
    </div>
  );
});

export default App;
