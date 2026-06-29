"use client";

import { motion } from "framer-motion";

interface TrackInfoProps {
  currentSection: number;
  totalSections: number;
  isDark?: boolean;
}

export default function TrackInfo({ currentSection, totalSections, isDark = false }: TrackInfoProps) {
  void isDark;
  return (
    <div 
      className="flex flex-col items-center justify-center font-sans tracking-widest text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm bg-white/80"
      style={{
        backdropFilter: 'blur(20px) saturate(150%)',
        border: '1px solid rgba(0,0,0,0.05)',
        color: '#86868B',
      }}
    >
      <div className="flex items-center gap-1">
        <motion.span
          key={currentSection}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[#1D1D1F]"
        >
          {String(currentSection + 1).padStart(2, "0")}
        </motion.span>
        <span>/</span>
        <span>{String(totalSections).padStart(2, "0")}</span>
      </div>
    </div>
  );
}
