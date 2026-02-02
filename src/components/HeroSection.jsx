import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const HeroSection = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <section id="slide-0" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 1. Background Atmosphere (Aurora) */}
      <div className="absolute inset-0 bg-[#050505]">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[100px] mix-blend-screen animate-pulse-slow delay-75" />
      </div>

      {/* 2. The Glass Monolith */}
      <motion.div 
        style={{ y: y1 }}
        className="relative z-10 w-full max-w-4xl mx-4 p-[1px] rounded-3xl bg-gradient-to-b from-white/10 to-transparent"
      >
        <div className="relative bg-black/40 backdrop-blur-2xl rounded-[23px] border border-white/5 p-12 md:p-20 overflow-hidden shadow-2xl">
          
          {/* Internal Glow Line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />

          <div className="flex flex-col items-center text-center space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-white mb-4 hero-title glitch-text" data-text="Dehan.">
                Dehan.
              </h1>
              <div className="flex items-center justify-center gap-3">
                <span className="h-[1px] w-12 bg-white/20"></span>
                <p className="font-mono text-sm text-cyan-400 uppercase tracking-[0.3em] glow-text">
                  Fullstack Architect
                </p>
                <span className="h-[1px] w-12 bg-white/20"></span>
              </div>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="max-w-xl text-lg text-white/60 leading-relaxed font-light"
            >
              Engineering <span className="text-white font-medium">secure</span> digital ecosystems 
              with precision and zero-trust architecture.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex gap-4 mt-8"
            >
              <button 
                onClick={() => document.getElementById('slide-1')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              >
                Explore Work
              </button>
              <a 
                href="https://github.com/h4nzs" 
                target="_blank" 
                rel="noreferrer"
                className="px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white font-medium backdrop-blur-md hover:bg-white/10 transition-colors"
              >
                Github
              </a>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* 3. Abstract Floating Glass Artifacts */}
      <motion.div style={{ y: y2 }} className="absolute right-[10%] top-[15%] w-24 h-24 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md rotate-12 opacity-30" />
      <motion.div style={{ y: y1 }} className="absolute left-[10%] bottom-[20%] w-16 h-16 rounded-full bg-white/5 border border-white/10 backdrop-blur-md -rotate-12 opacity-20" />
    </section>
  );
};

export default HeroSection;