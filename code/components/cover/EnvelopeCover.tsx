"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { BRIDE, GROOM } from "@/lib/config/wedding";

interface EnvelopeCoverProps {
  readonly onOpen: () => void;
  readonly guestName?: string;
}

export default function EnvelopeCover({ onOpen, guestName }: EnvelopeCoverProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(onOpen, 1000);
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          {/* Background image with premium treatment */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/couple/hero.webp"
              alt="Wedding Background"
              fill
              className="object-cover brightness-[0.7] contrast-[1.1]"
              priority
            />
            {/* Sophisticated radial overlay for depth */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)]" />
            <div className="absolute inset-0 bg-black/20" />
          </div>

          {/* Top Text - Absolute positioned to stay at top while envelope is centered */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="absolute top-20 left-0 w-full text-center z-10"
          >
            <p className="text-white text-sm sm:text-lg tracking-[0.6em] uppercase font-serif drop-shadow-lg">
              TRÂN TRỌNG KÍNH MỜI
            </p>
          </motion.div>

          {/* Envelope Section - Clickable anywhere */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative z-20 w-full max-w-[350px] sm:max-w-[500px] aspect-[1.4/1] px-4 cursor-pointer group"
            onClick={handleOpen}
          >
            <div className="relative w-full h-full bg-[#700D11] rounded-sm shadow-[0_30px_100px_rgba(0,0,0,0.6)] flex flex-col items-center justify-center border border-white/10 overflow-hidden">
              {/* Envelope Texture/Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none rounded-sm" />
              
              {/* Envelope Flap Effect - Now Lighter Red */}
              <div 
                className="absolute top-0 left-0 w-full h-full border-b border-white/10 rounded-sm" 
                style={{ 
                  clipPath: 'polygon(0 0, 100% 0, 50% 55%)',
                  backgroundColor: '#8B1A1A', // Brighter red for flap contrast
                  boxShadow: '0 10px 20px rgba(0,0,0,0.3)'
                }}
              />

              {/* User-provided Transparent Floral Ornaments - Fine-tuned position */}
              <div className="absolute -top-1 -left-1 w-32 h-32 sm:w-48 sm:h-48 opacity-90 z-10 pointer-events-none">
                <Image src="/assets/images/floral-v3-removebg-preview.png" alt="flower" fill className="object-contain" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-32 h-32 sm:w-48 sm:h-48 opacity-90 z-10 pointer-events-none scale-x-[-1] scale-y-[-1]">
                <Image src="/assets/images/floral-v3-removebg-preview.png" alt="flower" fill className="object-contain" />
              </div>

              {/* Couple Names (Above the seal) */}
              <div className="absolute top-[20%] left-0 w-full text-center z-20 px-4">
                <p className="text-white font-script text-3xl sm:text-4xl drop-shadow-md">
                  Hạnh & Tín
                </p>
              </div>

              {/* Wax Seal - Visual Only now */}
              <div className="absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 z-30 transition-transform duration-300 group-hover:scale-110">
                <Image 
                  src="/assets/images/wax-seal.webp" 
                  alt="wax-seal" 
                  fill 
                  className="object-contain" 
                />
              </div>

              {/* Guest & Date (Below the seal) */}
              <div className="absolute bottom-[8%] left-0 w-full text-center z-20 px-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="mb-2"
                >
                  <p className="text-white/60 text-[8px] sm:text-[10px] tracking-widest uppercase mb-1">
                    Thân mời
                  </p>
                  <p className="text-white text-lg sm:text-xl font-serif italic">
                    {guestName || "Quý khách"}
                  </p>
                </motion.div>
                
                <p className="text-white/80 text-[9px] sm:text-[11px] tracking-[0.4em] font-serif uppercase">
                  06 . 06 . 2026
                </p>
              </div>
            </div>

          </motion.div>

          {/* Tap Hint - Redesigned for a more premium feel */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.2, 0.7, 0.2],
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-12 left-0 w-full text-center z-30"
          >
            <p className="text-white/50 text-[10px] sm:text-[11px] tracking-[0.5em] uppercase font-serif">
              Chạm vào thiệp để mở
            </p>
            <div className="mt-2 w-8 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
