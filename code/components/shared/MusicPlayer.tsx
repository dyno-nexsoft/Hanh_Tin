"use client";

import { motion } from "framer-motion";
import { Music, Music2 } from "lucide-react";

interface MusicPlayerProps {
  isPlaying: boolean;
  toggle: () => void;
}

export default function MusicPlayer({ isPlaying, toggle }: MusicPlayerProps) {
  return (
    <motion.button
      onClick={toggle}
      initial={{ opacity: 0, x: -50, scale: 0.5 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.5 }}
      
      className="fixed bottom-6 left-4 z-[60] w-12 h-12 rounded-full flex items-center justify-center shadow-2xl border-2 border-white/20 text-white"
      style={{ backgroundColor: "#7B171B" }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      title={isPlaying ? "Tắt nhạc" : "Bật nhạc"}
    >
      <motion.div
        animate={
          isPlaying
            ? {
                rotate: 360,
              }
            : { rotate: 0 }
        }
        transition={isPlaying ? { repeat: Infinity, duration: 4, ease: "linear" } : { duration: 0.5 }}
      >
        {isPlaying ? (
          <Music2 className="w-6 h-6" />
        ) : (
          <Music className="w-6 h-6 opacity-50" />
        )}
      </motion.div>

    </motion.button>
  );
}
