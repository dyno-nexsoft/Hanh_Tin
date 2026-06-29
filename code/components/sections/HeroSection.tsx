'use client';

/// Section Hero — Apple Futuristic
import { motion } from 'framer-motion';
import Image from 'next/image';
import { WeddingSide } from '@/lib/types';
import { BRIDE, GROOM } from '@/lib/config/wedding';

const GROOM_PHOTOS = ['/images/couple/groom_1.webp', '/images/couple/groom_2.webp'];
const BRIDE_PHOTOS = ['/images/couple/bride_1.webp', '/images/couple/bride_2.webp'];

export default function HeroSection({ side }: { side: WeddingSide }) {
  void side;
  return (
    <section
      className="h-full w-full flex flex-col justify-center overflow-hidden relative bg-[#F5F5F7]"
    >
      <div className="w-full h-full flex flex-col lg:flex-row justify-center items-center px-4 py-8 gap-6 lg:gap-12 relative z-10">

        {/* ── Chú Rể ── */}
        <_PersonCard
          role="Chú rể"
          fullName={GROOM.fullName}
          photos={GROOM_PHOTOS}
          direction="left"
        />

        {/* ── Cô Dâu ── */}
        <_PersonCard
          role="Cô dâu"
          fullName={BRIDE.fullName}
          photos={BRIDE_PHOTOS}
          direction="right"
          delay={0.15}
        />
      </div>

      {/* Scroll cue Apple style */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <p className="font-sans text-[10px] font-semibold tracking-[0.2em] uppercase text-[#86868B]">
          Khám phá
        </p>
      </motion.div>
    </section>
  );
}

// ─── Private Components ───────────────────────────────────────────────────

interface PersonCardProps {
  role: string;
  fullName: string;
  photos: string[];
  direction: 'left' | 'right';
  delay?: number;
}

function _PersonCard({ role, fullName, photos, direction, delay = 0 }: PersonCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.32, 0.72, 0, 1] }}
      className="flex flex-col items-center justify-center w-full lg:w-[420px] min-w-0"
    >
      {/* 2-Photo Grid in Apple Style Rounded Rectangles */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[340px] xl:max-w-[400px] px-2 sm:px-0 mb-6">
        {photos.map((src, idx) => (
          <motion.div
            key={idx}
            className="relative aspect-[3/4] overflow-hidden group rounded-[24px] sm:rounded-[32px] bg-white shadow-sm"
            style={{ border: '1px solid rgba(0,0,0,0.05)' }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Image
              src={src}
              alt={`${role} ảnh ${idx + 1}`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </motion.div>
        ))}
      </div>

      {/* Role & Name */}
      <div className="text-center px-4">
        <p className="font-sans text-[11px] font-bold tracking-[0.2em] uppercase text-[#86868B] mb-1">
          {role}
        </p>
        <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1D1D1F]">
          {fullName}
        </h2>
      </div>
    </motion.div>
  );
}
