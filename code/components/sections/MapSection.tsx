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
      className="py-16 sm:py-24"
      style={{ background: 'linear-gradient(180deg, #FDF8F0 0%, white 100%)' }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Header - Giữ padding để text không sát lề quá */}
        <motion.div
          className="text-center mb-10 px-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-wedding-red/5">
              <MapPin className="w-6 h-6 text-wedding-red" />
            </div>
          </div>
          
          <p className="text-[10px] sm:text-xs tracking-[0.4em] uppercase mb-3 text-wedding-red/60 font-serif font-bold">
            Địa Điểm Tổ Chức
          </p>
          
          <h2
            className="text-3xl sm:text-5xl mb-4 leading-[1.2] text-balance"
            style={{ fontFamily: 'var(--font-great-vibes)', color: '#8B0000' }}
          >
            {venue.name}
          </h2>
          
          <p
            className="text-sm sm:text-base italic max-w-md mx-auto leading-relaxed text-balance opacity-80"
            style={{ color: '#6B5B5B', fontFamily: 'var(--font-lora)' }}
          >
            {venue.address}
          </p>

          <div className="flex items-center gap-3 justify-center mt-6">
            <div className="h-px flex-1 max-w-[60px] sm:max-w-[100px]" style={{ background: 'linear-gradient(to right, transparent, #D4AF37)' }} />
            <span style={{ color: '#D4AF37' }}>❧</span>
            <div className="h-px flex-1 max-w-[60px] sm:max-w-[100px]" style={{ background: 'linear-gradient(to left, transparent, #D4AF37)' }} />
          </div>
        </motion.div>

        {/* Map embed - TRÀN VIỀN trên Mobile, có bo góc trên Desktop */}
        <motion.div
          className="sm:rounded-2xl overflow-hidden shadow-2xl sm:border-4 sm:border-white sm:mx-6"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative aspect-[4/3] sm:aspect-video w-full">
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

        {/* CTA Button */}
        <motion.div
          className="text-center mt-10 px-6"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a
            href={venue.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#7B171B] text-white px-10 py-5 rounded-xl sm:rounded-full font-sans font-bold uppercase tracking-widest text-xs shadow-lg hover:bg-[#8B0000] transition-all"
          >
            <Navigation className="w-4 h-4 fill-white/20" />
            Mở Bản Đồ & Chỉ Đường
          </a>
        </motion.div>
      </div>
    </section>
  );
}
