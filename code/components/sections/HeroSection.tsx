'use client';

/// Section Hero — Layout 2 cột: Chú rể trái, Cô dâu phải.
/// Tối ưu cho cả mobile (1 cột, compact) và desktop (2 cột, có left sidebar).
import { motion } from 'framer-motion';
import Image from 'next/image';
import { WeddingSide } from '@/lib/types';
import { BRIDE, GROOM } from '@/lib/config/wedding';

const GROOM_PHOTOS = ['/images/couple/groom_1.webp', '/images/couple/groom_2.webp'];
const BRIDE_PHOTOS = ['/images/couple/bride_1.webp', '/images/couple/bride_2.webp'];

export default function HeroSection({ side }: { side: WeddingSide }) {
  void side; // side dùng cho routing, không cần trong section này
  return (
    <section className="bg-white h-full w-full flex flex-col justify-center overflow-hidden">
      <div className="w-full h-full flex flex-col lg:flex-row justify-center items-center px-3 sm:px-6 py-4 gap-4 lg:gap-6">

        {/* ── Chú Rể ── */}
        <_PersonCard
          role="Chú rể"
          fullName={GROOM.fullName}
          photos={GROOM_PHOTOS}
          direction="left"
        />

        {/* Divider — chỉ desktop */}
        <div className="hidden lg:block shrink-0 h-48 w-px bg-gradient-to-b from-transparent via-wedding-red/15 to-transparent" />

        {/* ── Cô Dâu ── */}
        <_PersonCard
          role="Cô dâu"
          fullName={BRIDE.fullName}
          photos={BRIDE_PHOTOS}
          direction="right"
          delay={0.15}
        />

      </div>
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

/// Card giới thiệu từng người — responsive cho cả mobile và desktop.
function _PersonCard({ role, fullName, photos, direction, delay = 0 }: PersonCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: direction === 'left' ? -24 : 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay }}
      className="flex-1 flex flex-col items-center justify-center w-full min-w-0"
    >
      {/* Role & Name */}
      <div className="mb-3 sm:mb-5 text-center px-2">
        <p className="text-wedding-red/50 text-[9px] sm:text-[10px] tracking-[0.4em] uppercase mb-1.5 font-serif font-bold">
          {role}
        </p>
        {/* 
          Dùng fluid font-size thay vì whitespace-nowrap để tránh bị clip
          khi content area hẹp (có left sidebar 240px trên desktop)
        */}
        <h2 className="font-script text-wedding-red leading-tight
          text-2xl sm:text-4xl lg:text-3xl xl:text-5xl
          whitespace-nowrap text-center
        ">
          {fullName}
        </h2>
      </div>

      {/* 2-Photo Grid */}
      <div className="grid grid-cols-2 gap-2 sm:gap-4 w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[340px] xl:max-w-[400px] px-2 sm:px-0">
        {photos.map((src, idx) => (
          <div
            key={idx}
            className="relative aspect-[3/4] border border-wedding-red/8 shadow-md overflow-hidden group rounded-xl sm:rounded-2xl"
          >
            <Image
              src={src}
              alt={`${role} ảnh ${idx + 1}`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-108"
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
}
