import React from "react";
import { motion } from "framer-motion";
import SpotlightCard from "./SpotlightCard";

const Timeline = ({ history }) => {
  return (
    <div className="w-full max-w-3xl space-y-8 relative">
      <div className="absolute left-[28px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      {history.map((item, i) => (
        <motion.div 
          key={i} 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="relative flex gap-8 items-start group"
        >
          <div className="relative z-10 w-14 h-14 rounded-2xl bg-[#0a0a0a] border border-white/10 p-2 shadow-lg flex-shrink-0 group-hover:border-cyan-500/30 transition-colors">
            <img src={item.logo} alt="logo" className="w-full h-full object-contain rounded-lg grayscale group-hover:grayscale-0 transition-all" onError={(e) => e.currentTarget.src = "https://placehold.co/100"} />
          </div>
          
          <SpotlightCard className="flex-1 p-6 hover:bg-white/5 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">{item.title}</h3>
              <span className="text-xs font-mono text-white/40 bg-white/5 px-2 py-1 rounded border border-white/5">{item.period}</span>
            </div>
            <p className="text-indigo-400 font-medium text-sm mb-2">{item.role}</p>
            <p className="text-white/60 text-sm leading-relaxed">{item.details}</p>
          </SpotlightCard>
        </motion.div>
      ))}
    </div>
  );
};

export default Timeline;