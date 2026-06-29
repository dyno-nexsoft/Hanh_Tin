'use client';

/// Section bản đồ địa điểm — Apple Futuristic
import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';
import { WeddingSide } from '@/lib/types';
import { WEDDING_DATA } from '@/lib/config/wedding';

export default function MapSection({ side }: { side: WeddingSide }) {
  const venue = WEDDING_DATA[side].venue;

  return (
    <section
      className="h-full w-full flex flex-col justify-center py-6 px-4 bg-[#F5F5F7] overflow-y-auto"
    >
      <div className="max-w-4xl mx-auto w-full flex flex-col items-center justify-center shrink-0">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
        >
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm border border-black/5">
              <MapPin className="w-5 h-5 text-[#FF3B30]" />
            </div>
          </div>
          
          <p className="font-sans text-[11px] font-bold tracking-[0.2em] uppercase text-[#86868B] mb-2">
            Địa Điểm Tổ Chức
          </p>
          
          <h2 className="font-sans text-3xl sm:text-5xl font-bold tracking-tighter text-[#1D1D1F] mb-3">
            {venue.name}
          </h2>
          
          <p className="font-sans text-[15px] font-medium text-[#1D1D1F] max-w-md mx-auto leading-relaxed">
            {venue.address}
          </p>
        </motion.div>

        {/* Map embed Card */}
        <motion.div
          className="w-full bg-white rounded-[32px] sm:rounded-[40px] p-2 shadow-sm border border-black/5 overflow-hidden"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        >
          <div className="relative aspect-[4/3] sm:aspect-[21/9] w-full rounded-[24px] sm:rounded-[32px] overflow-hidden">
            <iframe
              src={venue.embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Bản đồ ${venue.name}`}
              className="grayscale-[30%] contrast-[1.1] opacity-90" // Slight tweak to make map look more "Apple Maps" like
            />
          </div>
        </motion.div>

        {/* Navigate button Apple iOS Style */}
        <motion.div
          className="mt-8 w-full sm:w-auto"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        >
          <a
            href={venue.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full font-sans font-bold text-[15px] transition-all bg-[#0071E3] text-white hover:bg-[#0077ED] active:scale-[0.98] shadow-sm"
          >
            <Navigation className="w-4 h-4" />
            Mở Bản Đồ & Chỉ Đường
          </a>
        </motion.div>
      </div>
    </section>
  );
}
