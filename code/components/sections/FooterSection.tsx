'use client';

import { motion } from 'framer-motion';
import { BRIDE, GROOM } from '@/lib/constants/wedding-data';

export default function FooterSection() {
  return (
    <footer className="bg-white py-12 sm:py-20 px-6 text-center border-t border-wedding-red/10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-16 h-16 border border-wedding-red rounded-full flex items-center justify-center mx-auto mb-8">
          <span className="text-wedding-red text-2xl font-script">H&T</span>
        </div>
        
        <h2 className="text-wedding-red font-script text-5xl mb-6">
          {BRIDE.name} & {GROOM.name}
        </h2>
        
        <p className="text-wedding-gray font-serif tracking-[0.4em] uppercase text-xs">
          Trân Trọng Cảm Ơn
        </p>
        
        <p className="mt-12 text-wedding-red/40 text-[11px] tracking-widest uppercase font-serif">
          © 2026 {BRIDE.name} & {GROOM.name} · Designed with Love
        </p>
      </motion.div>
    </footer>
  );
}
