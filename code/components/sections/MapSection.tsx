'use client';

/// Section bản đồ địa điểm — Google Maps embed + nút chỉ đường.
import { motion } from 'framer-motion';
import { VENUE } from '@/lib/constants/wedding-data';

export default function MapSection() {
  return (
    <section
      className="py-20 px-6"
      style={{ background: 'linear-gradient(180deg, #FDF8F0 0%, white 100%)' }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p
            className="text-sm tracking-[0.3em] uppercase mb-2"
            style={{ color: '#8B0000', fontFamily: 'var(--font-cormorant)' }}
          >
            Địa Điểm Tổ Chức
          </p>
          <h2
            className="text-5xl mb-1"
            style={{ fontFamily: 'var(--font-great-vibes)', color: '#8B0000' }}
          >
            {VENUE.name}
          </h2>
          <p
            className="text-base italic"
            style={{ color: '#6B5B5B', fontFamily: 'var(--font-cormorant)' }}
          >
            📍 {VENUE.address}
          </p>

          <div className="flex items-center gap-3 justify-center mt-4">
            <div className="h-px flex-1 max-w-[80px]" style={{ background: 'linear-gradient(to right, transparent, #D4AF37)' }} />
            <span style={{ color: '#D4AF37' }}>❧</span>
            <div className="h-px flex-1 max-w-[80px]" style={{ background: 'linear-gradient(to left, transparent, #D4AF37)' }} />
          </div>
        </motion.div>

        {/* Map embed */}
        <motion.div
          className="rounded-2xl overflow-hidden shadow-xl"
          style={{ border: '2px solid rgba(212, 175, 55, 0.35)' }}
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <iframe
            src={VENUE.embedUrl}
            width="100%"
            height="360"
            style={{ border: 0, display: 'block' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Bản đồ ${VENUE.name}`}
          />
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="text-center mt-6"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a
            href={VENUE.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-wedding btn-wedding-primary inline-flex items-center gap-2"
          >
            <span>🗺️</span>
            <span>Chỉ Đường</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
