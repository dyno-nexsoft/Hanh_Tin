'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { BRIDE, GROOM, COUPLE_PHOTOS, GALLERY_IMAGES, WeddingSide, WEDDING_DATA } from '@/lib/constants/wedding-data';

export default function HeroSection({ side, guestName }: { side: WeddingSide, guestName?: string }) {
  const smallImages = GALLERY_IMAGES.slice(0, 3);
  const data = WEDDING_DATA[side];
  
  // Format date: 06.06.2026
  const dateStr = data.weddingDate.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).replace(/\//g, '.');

  return (
    <section className="bg-white py-12 sm:py-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-wedding-red font-serif tracking-[0.2em] sm:tracking-[0.3em] uppercase text-[10px] sm:text-sm mb-6">
            Lễ Thành Hôn
          </p>
          
          {/* Fix lỗi nhảy dòng: Giảm size mobile xuống text-4xl/5xl và dùng whitespace-nowrap */}
          <h1 className="text-wedding-red font-script text-5xl sm:text-9xl mb-6 leading-tight whitespace-nowrap tracking-tight sm:tracking-normal">
            {BRIDE.name} & {GROOM.name}
          </h1>
          
          <div className="separator mb-10 sm:mb-12"></div>
          
          {/* Main Large Image */}
          <div className="relative aspect-[3/4] max-w-[450px] mx-auto p-2 border border-wedding-red mb-8 shadow-xl">
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src={COUPLE_PHOTOS.hero}
                alt="Wedding Hero"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
          
          {/* 3 Small Images */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-[450px] mx-auto">
            {smallImages.map((img, idx) => (
              <div key={idx} className="relative aspect-square p-1 border border-wedding-red shadow-md">
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={img.src}
                    alt={`Couple ${idx}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
          
          {guestName && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-8 mb-4"
            >
              <p className="text-wedding-red/70 font-serif text-sm italic">Trân trọng kính mời</p>
              <p className="text-wedding-red font-serif text-xl sm:text-2xl font-bold mt-1 uppercase tracking-wider">{guestName}</p>
            </motion.div>
          )}

          <p className="mt-8 text-wedding-red font-serif text-lg sm:text-2xl tracking-[0.2em] uppercase">
            {dateStr}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
