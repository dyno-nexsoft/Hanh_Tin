'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { BRIDE, GROOM } from '@/lib/config/wedding';
import Image from 'next/image';
import { useRef } from 'react';

export default function FooterSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <footer 
      ref={containerRef}
      className="relative h-full w-full flex items-center justify-center bg-black"
    >
      {/* Background Image with Parallax - Wrapped in overflow-hidden to prevent scrollbars */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <motion.div 
          style={{ y }}
          className="absolute inset-0 h-[140%] -top-[20%]"
        >
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
      </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative z-10 w-full max-w-lg px-6"
      >
        <div className="bg-[#8B1A1A] rounded-sm shadow-2xl border border-white/10 text-center relative overflow-hidden">

          <div className="relative z-10 py-6 sm:py-14 px-6 sm:px-12">
            {/* User-provided Transparent Floral Ornaments - Fine-tuned position */}
            <div className="absolute -top-1 -left-1 w-20 h-20 sm:w-32 sm:h-32 opacity-90 pointer-events-none z-10">
              <Image src="/assets/images/floral-v3-removebg-preview.png" alt="flower" fill className="object-contain" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-20 h-20 sm:w-32 sm:h-32 opacity-90 pointer-events-none z-10 scale-x-[-1] scale-y-[-1]">
              <Image src="/assets/images/floral-v3-removebg-preview.png" alt="flower" fill className="object-contain" />
            </div>

            <h2 className="text-white font-script text-4xl sm:text-7xl mb-3 sm:mb-6">
              Thank You
            </h2>
            
            <div className="space-y-3 mb-5 sm:mb-8 px-2 max-w-sm sm:max-w-md mx-auto">
              <p className="text-white font-serif italic text-sm sm:text-lg leading-relaxed">
                Trân trọng cảm ơn tình cảm và sự hiện diện của Quý khách, anh chị và các bạn đã dành thời gian đến chia vui cùng gia đình chúng mình.
              </p>
              <p className="text-white/80 font-serif italic text-xs sm:text-[15px] leading-relaxed">
                Sự đồng hành và những lời chúc phúc ấm áp từ mọi người chính là món quà vô giá và ý nghĩa nhất để hành trình hạnh phúc của chúng mình thêm phần trọn vẹn.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 text-white/30 mb-4 sm:mb-8">
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
