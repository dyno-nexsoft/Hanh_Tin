'use client';

/// Section Hero — Thiết kế mới Layout 2:2 giới thiệu riêng biệt Cô dâu & Chú rể.
import { motion } from 'framer-motion';
import Image from 'next/image';
import { BRIDE, GROOM, WeddingSide, WEDDING_DATA } from '@/lib/constants/wedding-data';

export default function HeroSection({ side }: { side: WeddingSide }) {
  const data = WEDDING_DATA[side];
  
  const dateStr = '06.06.2026';

  const groomPhotos = [
    '/images/couple/groom_1.webp',
    '/images/couple/groom_2.webp'
  ];

  const bridePhotos = [
    '/images/couple/bride_1.webp',
    '/images/couple/bride_2.webp'
  ];

  return (
    <section className="bg-white py-8 sm:py-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="space-y-12 sm:space-y-24">
          
          {/* Section Chú Rể */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6">
              <p className="text-wedding-red/60 text-xs tracking-[0.3em] uppercase mb-2">Chú rể</p>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-wedding-red uppercase tracking-wider">
                {GROOM.fullName}
              </h2>
            </div>
            
            <div className="grid grid-cols-2 gap-3 sm:gap-6">
              {groomPhotos.map((src, idx) => (
                <div key={idx} className="relative aspect-[3/4] border border-wedding-red/10 shadow-lg overflow-hidden group">
                  <Image
                    src={src}
                    alt={`Groom ${idx + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Section Cô Dâu */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="mb-6">
              <p className="text-wedding-red/60 text-xs tracking-[0.3em] uppercase mb-2">Cô dâu</p>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-wedding-red uppercase tracking-wider">
                {BRIDE.fullName}
              </h2>
            </div>
            
            <div className="grid grid-cols-2 gap-3 sm:gap-6">
              {bridePhotos.map((src, idx) => (
                <div key={idx} className="relative aspect-[3/4] border border-wedding-red/10 shadow-lg overflow-hidden group">
                  <Image
                    src={src}
                    alt={`Bride ${idx + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
