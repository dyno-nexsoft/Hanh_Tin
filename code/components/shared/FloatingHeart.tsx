'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useEffect } from 'react';

interface FloatingHeartData {
  id: number;
  x: number;
  y: number;
  angle: number;
}

interface FloatingHeartSystemProps {
  hearts: FloatingHeartData[];
  onComplete: (id: number) => void;
}

export default function FloatingHeartSystem({ hearts, onComplete }: FloatingHeartSystemProps) {
  return (
    <div className="absolute inset-0 pointer-events-none z-[100] overflow-hidden">
      <AnimatePresence>
        {hearts.map((heart) => (
          <FloatingHeart key={heart.id} data={heart} onComplete={onComplete} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function FloatingHeart({ data, onComplete }: { data: FloatingHeartData; onComplete: (id: number) => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete(data.id);
    }, 1200);
    return () => clearTimeout(timer);
  }, [data.id, onComplete]);

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        scale: 0.5, 
        x: data.x - 40,
        y: data.y - 40,
        rotate: data.angle - 15 
      }}
      animate={{ 
        opacity: [0, 0.9, 0.7, 0], 
        scale: [0.5, 1.4, 1.1, 0.9], 
        y: data.y - 130,
        rotate: data.angle + 15
      }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 1.2, ease: [0.25, 0, 0, 1] }}
      className="absolute"
      style={{ left: 0, top: 0 }}
    >
      {/* Gold heart with glow */}
      <div style={{ filter: 'drop-shadow(0 0 12px rgba(201, 168, 76, 0.6))' }}>
        <Heart className="w-16 h-16" style={{ color: '#C9A84C', fill: '#C9A84C' }} />
      </div>
    </motion.div>
  );
}
