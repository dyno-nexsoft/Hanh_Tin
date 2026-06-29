"use client";

import { motion } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";

interface NavArrowsProps {
  onPrev: () => void;
  onNext: () => void;
  canGoPrev: boolean;
  canGoNext: boolean;
  isDark?: boolean;
}

export default function NavArrows({
  onPrev,
  onNext,
  canGoPrev,
  canGoNext,
  isDark = false,
}: NavArrowsProps) {
  void isDark;
  return (
    <div className="flex flex-col gap-2">
      <motion.button
        whileTap={canGoPrev ? { scale: 0.9 } : undefined}
        onClick={onPrev}
        disabled={!canGoPrev}
        className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 shadow-sm
          ${canGoPrev ? 'bg-white/90 hover:bg-white text-[#1D1D1F] cursor-pointer' : 'bg-white/40 text-[#86868B]/50 cursor-not-allowed'}`}
        style={{
          backdropFilter: 'blur(20px) saturate(150%)',
          border: '1px solid rgba(0,0,0,0.05)',
        }}
        aria-label="Previous section"
      >
        <ChevronUp size={22} strokeWidth={1.5} />
      </motion.button>

      <motion.button
        whileTap={canGoNext ? { scale: 0.9 } : undefined}
        onClick={onNext}
        disabled={!canGoNext}
        className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 shadow-sm
          ${canGoNext ? 'bg-white/90 hover:bg-white text-[#1D1D1F] cursor-pointer' : 'bg-white/40 text-[#86868B]/50 cursor-not-allowed'}`}
        style={{
          backdropFilter: 'blur(20px) saturate(150%)',
          border: '1px solid rgba(0,0,0,0.05)',
        }}
        aria-label="Next section"
      >
        <ChevronDown size={22} strokeWidth={1.5} />
      </motion.button>
    </div>
  );
}
