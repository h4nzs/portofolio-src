import React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const BentoGrid = ({ projects }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      {projects.map((p, i) => (
        <motion.div
          key={p.id}
          className={`group relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 hover:border-white/20 transition-all duration-500 ${i === 0 ? 'md:col-span-2 md:row-span-2 min-h-[400px]' : 'col-span-1 min-h-[300px]'}`}
          whileHover={{ y: -5 }}
        >
          {/* Image Background */}
          <div className="absolute inset-0">
            <img 
              src={p.img} 
              alt={p.title} 
              className="w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700"
              onError={(e) => e.currentTarget.src = "https://placehold.co/600x400/1a1a1a/FFF?text=Project"}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-8">
            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-white/10 text-white border border-white/5 backdrop-blur-md">
                  {p.status}
                </span>
                <div className="flex gap-2">
                  {p.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-xs text-white/50 font-mono">{tag}</span>
                  ))}
                </div>
              </div>
              
              <h3 className={`font-bold text-white mb-2 ${i === 0 ? 'text-3xl' : 'text-xl'}`}>{p.title}</h3>
              <p className="text-white/70 text-sm mb-6 line-clamp-2">{p.short}</p>
              
              <a 
                href={p.repo} 
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100"
              >
                View Repository <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default BentoGrid;
