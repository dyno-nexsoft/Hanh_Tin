"use client";

import { motion } from "framer-motion";
import { format } from "date-fns";
import { BRIDE, GROOM, WEDDING_DATA } from "@/lib/config/wedding";
import { WeddingSide } from "@/lib/types";
import { ChevronUp } from "lucide-react";

interface EnvelopeCoverProps {
  onOpen: () => void;
  guestName?: string;
  isOpen?: boolean;
  side?: WeddingSide;
}

/// Apple Futuristic Light version (Slide to unlock aesthetic)
export default function EnvelopeCover({ onOpen, guestName, isOpen = false, side = 'bride' }: EnvelopeCoverProps) {
  const weddingDate = WEDDING_DATA[side].weddingDate;
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: isOpen ? "-100%" : 0 }}
      transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
      className="absolute inset-0 z-[200] flex flex-col items-center justify-between touch-none"
      style={{
        background: 'rgba(245, 245, 247, 0.75)',
        backdropFilter: 'blur(30px) saturate(150%)',
        WebkitBackdropFilter: 'blur(30px) saturate(150%)',
      }}
    >
      {/* Top Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full flex flex-col items-center pt-[20vh] px-6 text-center"
      >
        <p className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-[#86868B] mb-6">
          Save The Date
        </p>
        <h1
          className="font-sans text-5xl sm:text-7xl font-bold tracking-tighter leading-none"
          style={{ color: '#1D1D1F' }}
        >
          {GROOM.name}
          <br />
          <span className="text-[#86868B] text-4xl">&amp;</span>
          <br />
          {BRIDE.name}
        </h1>
        
        <p className="font-sans text-sm font-semibold tracking-[0.1em] text-[#1D1D1F] mt-8 bg-white/50 px-6 py-2 rounded-full border border-black/5 shadow-sm">
          {format(weddingDate, "dd.MM.yyyy")}
        </p>
      </motion.div>

      {/* Bottom Section (Guest & Slide to open) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="w-full flex flex-col items-center pb-16 px-6"
      >
        {guestName && (
          <div className="mb-12 flex flex-col items-center">
            <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#86868B] mb-2">
              Kính Mời
            </p>
            <p className="font-sans text-xl font-bold text-[#1D1D1F] tracking-tight text-center max-w-[280px]">
              {guestName}
            </p>
          </div>
        )}

        {/* Apple Style Swipe up to open */}
        <button
          onClick={onOpen}
          className="group flex flex-col items-center justify-center p-4 focus:outline-none"
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center"
          >
            <ChevronUp className="w-5 h-5 text-[#86868B] -mb-2 opacity-50 group-hover:text-[#0071E3] transition-colors" />
            <ChevronUp className="w-5 h-5 text-[#86868B] group-hover:text-[#0071E3] transition-colors" />
          </motion.div>
          <p className="mt-3 font-sans text-xs font-semibold tracking-[0.1em] uppercase text-[#1D1D1F] group-hover:text-[#0071E3] transition-colors">
            Vuốt để mở
          </p>
        </button>
      </motion.div>
    </motion.div>
  );
}
