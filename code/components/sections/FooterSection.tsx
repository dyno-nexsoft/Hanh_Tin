'use client';

import { motion } from 'framer-motion';
import { BRIDE, GROOM } from '@/lib/config/wedding';
import Image from 'next/image';

export default function FooterSection() {
  return (
    <footer className="relative h-[85vh] min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image with premium treatment */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/couple/close.webp"
          alt="Thank You Background"
          fill
          className="object-cover brightness-[0.4] contrast-[1.1]"
          priority
        />
        {/* Sophisticated radial overlay for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.5)_100%)]" />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative z-10 w-full max-w-lg px-6"
      >
        <div className="bg-[#8B1A1A] rounded-sm shadow-2xl border border-white/10 text-center relative overflow-hidden">
          {/* Card Background Image - Extremely subtle */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/couple/close.webp"
              alt="Couple"
              fill
              className="object-cover brightness-[0.3] opacity-10"
            />
          </div>

          <div className="relative z-10 p-8 sm:p-16">
            {/* User-provided Transparent Floral Ornaments - Fine-tuned position */}
            <div className="absolute -top-1 -left-1 w-24 h-24 sm:w-32 sm:h-32 opacity-90 pointer-events-none z-10">
              <Image src="/assets/images/floral-v3-removebg-preview.png" alt="flower" fill className="object-contain" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-24 h-24 sm:w-32 sm:h-32 opacity-90 pointer-events-none z-10 scale-x-[-1] scale-y-[-1]">
              <Image src="/assets/images/floral-v3-removebg-preview.png" alt="flower" fill className="object-contain" />
            </div>

            <h2 className="text-white font-script text-4xl sm:text-7xl mb-6">
              Thank You
            </h2>
            
            <p className="text-white/90 font-serif italic text-base sm:text-lg leading-relaxed mb-10 px-2">
              Sự hiện diện của bạn là món quà ý nghĩa nhất đối với chúng mình.
            </p>

            <div className="flex items-center justify-center gap-3 text-white/30 mb-8">
              <div className="h-px w-6 bg-white/20"></div>
              <p className="font-script text-2xl text-white">
                {BRIDE.name} & {GROOM.name}
              </p>
              <div className="h-px w-6 bg-white/20"></div>
            </div>
            
            <p className="text-white/40 text-[10px] tracking-widest uppercase font-serif">
              06 . 06 . 2026
            </p>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
