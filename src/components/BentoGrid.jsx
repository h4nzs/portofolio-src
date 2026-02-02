import React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import SpotlightCard from "./SpotlightCard";

const BentoGrid = ({ projects }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      {projects.map((p, i) => (
        <SpotlightCard
          key={p.id}
          className={`group ${i === 0 ? 'md:col-span-2 md:row-span-2 min-h-[400px]' : 'col-span-1 min-h-[300px]'}`}
        >
          {/* Image Background */}
          <div className="absolute inset-0">
            <img 
              src={p.img} 
              alt={p.title} 
              className="w-full h-full object-cover opacity-50 group-hover:opacity-30 group-hover:scale-105 transition-all duration-700 grayscale group-hover:grayscale-0"
              onError={(e) => e.currentTarget.src = "https://placehold.co/600x400/1a1a1a/FFF?text=Project"}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-8 z-10">
            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 backdrop-blur-md">
                  {p.status}
                </span>
                <div className="flex gap-2">
                  {p.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-xs text-white/40 font-mono">{tag}</span>
                  ))}
                </div>
              </div>
              
              <h3 className={`font-bold text-white mb-2 ${i === 0 ? 'text-3xl' : 'text-xl'}`}>{p.title}</h3>
              <p className="text-white/60 text-sm mb-6 line-clamp-2">{p.short}</p>
              
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
        </SpotlightCard>
      ))}
    </div>
  );
};

export default BentoGrid;