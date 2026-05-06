'use client';

import { useState } from 'react';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { motion } from 'framer-motion';
import { GALLERY_IMAGES } from '@/lib/config/wedding';

export default function GallerySection() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-wedding-red font-script text-5xl sm:text-6xl mb-4">Our Memories</h2>
          <p className="text-wedding-gray font-serif italic max-w-lg mx-auto leading-relaxed text-sm sm:text-base opacity-80">
            Lưu giữ những khoảnh khắc ngọt ngào nhất của tình yêu chúng mình
          </p>
        </div>

        {/* Giảm gap từ 6 xuống 2 để ảnh to hơn và gần nhau hơn */}
        <div className="columns-2 sm:columns-3 gap-2 space-y-2">
          {GALLERY_IMAGES.map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i % 3 * 0.05 }}
              className="break-inside-avoid cursor-pointer group"
              onClick={() => {
                setIndex(i);
                setOpen(true);
              }}
            >
              <div className="relative overflow-hidden wedding-border">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={600}
                  height={900}
                  className="w-full h-auto transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={GALLERY_IMAGES.map((img) => ({ src: img.src, alt: img.alt }))}
      />
    </section>
  );
}
