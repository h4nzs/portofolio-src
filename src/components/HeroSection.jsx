/* eslint-disable no-unused-vars */
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useSFX } from "../hooks/useSFX";
import { Terminal, Cpu } from "lucide-react";

const HeroSection = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const { playHover, playClick } = useSFX();

  return (
    <section id="slide-0" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      
      {/* Grid overlay for tactical feel */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDQwIEwgNDAgNDAgTCA0MCAwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-50 z-0" />

      {/* The Core Panel */}
      <motion.div 
        style={{ y: y1 }}
        className="relative z-10 w-full max-w-5xl mx-4 border border-white/20 bg-[#050505]/80 backdrop-blur-sm"
      >
        {/* Tactical Corner Accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-500" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-500" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-500" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-500" />

        <div className="p-8 md:p-16 overflow-hidden">
          {/* Header Bar */}
          <div className="flex justify-between items-center mb-12 border-b border-white/10 pb-4">
             <div className="flex gap-2">
                <span className="w-2 h-2 bg-cyan-500 animate-pulse" />
                <span className="text-xs font-mono text-cyan-500 tracking-widest">[ SYS.ONLINE ]</span>
             </div>
             <span className="text-xs font-mono text-white/40 uppercase tracking-widest">ID: h4nzs // SECURE_CONN</span>
          </div>

          <div className="flex flex-col items-start space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-white mb-4 uppercase font-mono glitch-text" data-text="DEHAN">
                DEHAN
              </h1>
              <div className="flex items-center gap-4 mt-6">
                <Terminal className="text-cyan-400" size={24} />
                <p className="font-mono text-sm md:text-lg text-cyan-400 uppercase tracking-[0.2em]">
                  Fullstack Architect
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="max-w-2xl text-lg md:text-xl text-white/70 leading-relaxed font-mono border-l-2 border-cyan-500/50 pl-6 py-2"
            >
              Engineering <span className="text-white font-bold bg-white/10 px-1">secure</span> digital ecosystems 
              with precision and zero-trust architecture. Building systems that refuse to break.
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto"
            >
              <button 
                onMouseEnter={playHover}
                onClick={() => {
                  playClick();
                  document.getElementById('slide-1')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group relative px-8 py-4 bg-cyan-500 text-black font-mono font-bold uppercase tracking-widest overflow-hidden"
              >
                <span className="relative z-10">INIT: Explore Work</span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              </button>
              
              <a 
                href="https://github.com/h4nzs" 
                target="_blank" 
                rel="noreferrer"
                onMouseEnter={playHover}
                onClick={playClick}
                className="px-8 py-4 border border-white/20 text-white font-mono font-bold uppercase tracking-widest hover:bg-white/10 transition-colors flex items-center justify-center gap-3"
              >
                <Cpu size={18} />
                [ GITHUB ]
              </a>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
