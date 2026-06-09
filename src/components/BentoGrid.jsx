/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github } from 'lucide-react';
import { useSFX } from "../hooks/useSFX";

const BentoGrid = ({ projects }) => {
  const [selectedId, setSelectedId] = useState(null);
  const { playHover, playClick } = useSFX();

  return (
    <div className="w-full">      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            layoutId={`card-${project.id}`}
            onClick={() => { playClick(); setSelectedId(project.id); }}
            onMouseEnter={playHover}
            className={`
              group relative overflow-hidden cursor-pointer
              bg-[#050505] border border-white/10 hover:border-cyan-500
              transition-colors duration-300
              ${i === 0 || i === 3 ? 'md:col-span-2' : 'col-span-1'}
            `}
            whileHover={{ y: -5 }}
          >
            {/* Tactical Corners */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/50 group-hover:border-cyan-500 z-20" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/50 group-hover:border-cyan-500 z-20" />

            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
              <img 
                src={project.img} 
                alt={project.title}
                className="w-full h-full object-cover opacity-30 group-hover:opacity-20 mix-blend-luminosity group-hover:mix-blend-normal group-hover:scale-105 transition-all duration-700"
                onError={(e) => e.currentTarget.src = "https://placehold.co/600x400/1a1a1a/FFF?text=Project"}
              />
              {/* Scanline overlay */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDQwIEwgNDAgNDAgTCA0MCAwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-50 z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-[#050505]/20 z-10" />
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 z-20">
              <div className="mb-auto flex justify-between">
                <span className="font-mono text-xs text-white/30 tracking-widest uppercase">ID:{project.id}</span>
              </div>
              <motion.h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-wide">{project.title}</motion.h3>
              <motion.p className="text-white/60 line-clamp-2 text-sm font-mono">{project.short}</motion.p>
              
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-2 py-1 text-xs font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  [{project.status}]
                </span>
                {project.tags.slice(0, 2).map(tag => (
                  <span key={tag} className="px-2 py-1 text-xs font-mono bg-white/5 text-white/50 border border-white/10">
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
              className="fixed inset-0 bg-[#050505]/95 backdrop-blur-md z-[60]"
              onClick={() => setSelectedId(null)}
            />
            <div className="fixed inset-0 flex items-center justify-center z-[70] p-4 pointer-events-none">
              {projects.filter(p => p.id === selectedId).map(project => (
                <motion.div
                  key={project.id}
                  layoutId={`card-${project.id}`}
                  className="w-full max-w-3xl bg-[#0a0a0a] border border-cyan-500/30 overflow-hidden shadow-2xl pointer-events-auto relative"
                >
                  {/* Tactical Corners */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-500 z-50" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-500 z-50" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-500 z-50" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-500 z-50" />

                  <div className="relative h-48 md:h-64 border-b border-white/10">
                    <img src={project.img} alt={project.title} className="w-full h-full object-cover mix-blend-luminosity opacity-40" />
                    <button 
                      onClick={(e) => { e.stopPropagation(); playClick(); setSelectedId(null); }}
                      onMouseEnter={playHover}
                      className="absolute top-4 right-4 p-2 bg-[#050505] border border-white/20 text-white hover:border-cyan-500 hover:text-cyan-400 transition-colors"
                    >
                      <X size={20} />
                    </button>
                    <div className="absolute bottom-4 left-6">
                      <span className="font-mono text-xs text-cyan-400 bg-cyan-950/50 px-2 py-1 border border-cyan-500/30">
                        {project.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-8 max-h-[50vh] overflow-y-auto custom-scroll">
                    <div className="flex justify-between items-start mb-8">
                      <div>
                        <h3 className="text-4xl font-bold text-white mb-2 uppercase tracking-tight">{project.title}</h3>
                      </div>
                      <div className="flex gap-3">
                         {project.live && (
                           <a 
                             href={project.live} 
                             target="_blank" 
                             rel="noreferrer" 
                             className="p-3 bg-[#050505] border border-white/10 hover:border-cyan-500 transition-colors text-white hover:text-cyan-400 flex items-center gap-2 font-mono text-sm uppercase"
                             onMouseEnter={playHover}
                             onClick={playClick}
                             title="Live Demo"
                           >
                             <ExternalLink size={16} /> LIVE
                           </a>
                         )}
                         {project.repo && (
                           <a 
                             href={project.repo} 
                             target="_blank" 
                             rel="noreferrer" 
                             className="p-3 bg-[#050505] border border-white/10 hover:border-white/40 transition-colors text-white flex items-center gap-2 font-mono text-sm uppercase"
                             onMouseEnter={playHover}
                             onClick={playClick}
                           >
                             <Github size={16} /> CODE
                           </a>
                         )}
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="border-l-2 border-white/10 pl-4">
                        <p className="text-white/80 leading-relaxed font-mono">
                          {project.long}
                        </p>
                      </div>

                      {project.challenge && (
                        <div>
                          <h4 className="text-cyan-400 font-mono text-sm mb-2 uppercase tracking-widest">/* The Challenge */</h4>
                          <p className="text-white/60 text-sm leading-relaxed">{project.challenge}</p>
                        </div>
                      )}

                      {project.impact && (
                        <div>
                          <h4 className="text-cyan-400 font-mono text-sm mb-2 uppercase tracking-widest">/* The Impact */</h4>
                          <p className="text-white/60 text-sm leading-relaxed">{project.impact}</p>
                        </div>
                      )}

                      <div className="pt-6 border-t border-white/10 flex flex-wrap gap-2">
                         {project.tags.map(tag => (
                           <span key={tag} className="px-3 py-1 text-xs font-mono bg-white/5 text-white/60 border border-white/10 uppercase tracking-wider">
                             {tag}
                           </span>
                         ))}
                      </div>
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