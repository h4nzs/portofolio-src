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
              group relative rounded-3xl overflow-hidden cursor-pointer
              bg-white/5 border border-white/10 hover:border-cyan-500/50
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
                onError={(e) => e.currentTarget.src = "https://placehold.co/600x400/1a1a1a/FFF?text=Project"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent" />
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
              <motion.h3 className="text-2xl font-bold text-white mb-2">{project.title}</motion.h3>
              <motion.p className="text-white/60 line-clamp-2 text-sm">{project.short}</motion.p>
              
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-2 py-1 text-xs font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded">
                  {project.status}
                </span>
                {project.tags.slice(0, 2).map(tag => (
                  <span key={tag} className="px-2 py-1 text-xs font-mono bg-white/10 text-white/50 border border-white/10 rounded">
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
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60]"
              onClick={() => setSelectedId(null)}
            />
            <div className="fixed inset-0 flex items-center justify-center z-[70] p-4 pointer-events-none">
              {projects.filter(p => p.id === selectedId).map(project => (
                <motion.div
                  key={project.id}
                  layoutId={`card-${project.id}`}
                  className="w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl pointer-events-auto"
                >
                  <div className="relative h-64 md:h-80">
                    <img src={project.img} alt={project.title} className="w-full h-full object-cover" />
                    <button 
                      onClick={(e) => { e.stopPropagation(); playClick(); setSelectedId(null); }}
                      onMouseEnter={playHover}
                      className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-white/20 transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-3xl font-bold text-white mb-2">{project.title}</h3>
                        <p className="text-cyan-400 font-mono text-sm">{project.status}</p>
                      </div>
                      <div className="flex gap-3">
                         {project.live && (
                           <a 
                             href={project.live} 
                             target="_blank" 
                             rel="noreferrer" 
                             className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-full hover:bg-cyan-500/20 transition-colors text-cyan-400"
                             onMouseEnter={playHover}
                             onClick={playClick}
                             title="Live Demo"
                           >
                             <ExternalLink size={20} />
                           </a>
                         )}
                         {project.repo && (
                           <a 
                             href={project.repo} 
                             target="_blank" 
                             rel="noreferrer" 
                             className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors border border-white/10"
                             onMouseEnter={playHover}
                             onClick={playClick}
                           >
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
