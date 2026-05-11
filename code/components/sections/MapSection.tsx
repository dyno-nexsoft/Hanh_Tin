'use client';

/// Section bản đồ địa điểm — Thiết kế tràn viền (Full-width) cho Mobile.
import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';
import { WeddingSide } from '@/lib/types';
import { WEDDING_DATA } from '@/lib/config/wedding';

export default function MapSection({ side }: { side: WeddingSide }) {
  const venue = WEDDING_DATA[side].venue;

  return (
    <section
      className="h-full w-full flex flex-col justify-center py-4 sm:py-24"
      style={{ background: 'linear-gradient(180deg, #FDF8F0 0%, white 100%)' }}
    >
      <div className="max-w-5xl mx-auto w-full flex flex-col justify-center h-full">
        {/* Header - Giữ padding để text không sát lề quá */}
        <motion.div
          className="text-center mb-4 sm:mb-10 px-6"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center mb-2">
            <div className="p-2 rounded-full bg-wedding-red/5">
              <MapPin className="w-5 h-5 text-wedding-red" />
            </div>
          </div>
          
          <p className="text-[9px] sm:text-xs tracking-[0.3em] uppercase mb-1 text-wedding-red/60 font-serif font-bold">
            Địa Điểm Tổ Chức
          </p>
          
          <h2
            className="text-2xl sm:text-5xl mb-2 leading-[1.2] text-balance"
            style={{ fontFamily: 'var(--font-great-vibes)', color: '#8B0000' }}
          >
            {venue.name}
          </h2>
          
          <p
            className="text-xs sm:text-base italic max-w-xs sm:max-w-md mx-auto leading-tight text-balance opacity-80"
            style={{ color: '#6B5B5B', fontFamily: 'var(--font-lora)' }}
          >
            {venue.address}
          </p>
        </motion.div>

        {/* Map embed - TRÀN VIỀN trên Mobile, có bo góc trên Desktop */}
        <motion.div
          className="sm:rounded-2xl overflow-hidden shadow-xl sm:border-4 sm:border-white sm:mx-6"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative aspect-[3/2] sm:aspect-video w-full">
            <iframe
              src={venue.embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Bản đồ ${venue.name}`}
            />
          </div>
        </motion.div>

        <motion.div
          className="mt-6 sm:mt-10 px-4 sm:px-6 flex justify-center w-full"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a
            href={venue.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-max max-w-[260px] sm:max-w-none inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-[#7B171B] text-white px-5 sm:px-8 py-3.5 sm:py-4 rounded-full font-sans font-bold uppercase tracking-widest text-[10px] shadow-lg hover:bg-[#8B0000] transition-all shrink-0"
          >
            <Navigation className="w-3.5 h-3.5 fill-white/20" />
            Mở Bản Đồ & Chỉ Đường
          </a>
        </motion.div>
      </div>
    </section>
  );
}
