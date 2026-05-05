"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { BRIDE, GROOM } from "@/lib/constants/wedding-data";

interface EnvelopeCoverProps {
  readonly onOpen: () => void;
}

export default function EnvelopeCover({ onOpen }: EnvelopeCoverProps) {
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
          style={{ backgroundColor: "#7B171B" }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          {/* Họa tiết Song Hỷ mờ ở nền */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute top-10 left-10 w-64 h-64 rotate-12">
              <Image src="/song-hy-gold.webp" alt="pattern" fill className="object-contain" />
            </div>
            <div className="absolute bottom-10 right-10 w-64 h-64 -rotate-12">
              <Image src="/song-hy-gold.webp" alt="pattern" fill className="object-contain" />
            </div>
          </div>

          <div className="text-center px-6 relative z-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              {/* Biểu tượng Song Hỷ chính - Được AI tạo riêng cho thiệp */}
              <div className="relative w-40 h-40 sm:w-64 sm:h-64 mx-auto mb-2 overflow-hidden rounded-full">
                <Image
                  src="/song-hy-gold.webp"
                  alt="Song Hỷ Gold"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <h1 className="text-white text-3xl sm:text-4xl font-serif tracking-[0.3em] uppercase mb-4">
                Thiệp Mời
              </h1>
              <div className="h-px w-20 bg-white/50 mx-auto mb-6"></div>
              <p className="text-white/80 text-2xl sm:text-3xl font-script mb-10">
                {BRIDE.name} & {GROOM.name}
              </p>
            </motion.div>

            <motion.button
              onClick={handleOpen}
              className="bg-white px-14 py-4 rounded-full font-sans tracking-[0.2em] text-xs font-bold uppercase shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:bg-white/90 transition-all"
              style={{ color: "#7B171B" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Mở Thiệp
            </motion.button>
          </div>
          
          {/* Khung viền trang trí kép */}
          <div className="absolute top-0 left-0 w-full h-full border-[15px] border-white/5 pointer-events-none"></div>
          <div className="absolute top-4 left-4 right-4 bottom-4 border border-white/10 pointer-events-none"></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
