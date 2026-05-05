'use client';

import { motion } from 'framer-motion';
import { BRIDE, GROOM } from '@/lib/constants/wedding-data';

export default function FamilySection() {
  return (
    <section className="bg-wedding-cream-dark py-16 sm:py-20 px-6">
      <div className="max-w-5xl mx-auto relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-0 text-center items-center">
          
          {/* Nhà Gái */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:px-12"
          >
            <h2 className="text-wedding-dark font-serif text-base sm:text-lg uppercase tracking-[0.2em] sm:tracking-[0.4em] mb-8 sm:mb-10 opacity-70">
              Nhà Gái
            </h2>
            <div className="space-y-6 font-serif">
              <div>
                <p className="text-wedding-gray italic text-[10px] uppercase tracking-widest mb-2">Thân sinh phụ mẫu Ông:</p>
                {/* Giảm tracking và size trên mobile để tránh xuống dòng */}
                <p className="text-xl sm:text-3xl font-bold text-wedding-red uppercase tracking-normal sm:tracking-wider leading-tight">{BRIDE.father}</p>
              </div>
              <div>
                <p className="text-wedding-gray italic text-[10px] uppercase tracking-widest mb-2">Bà:</p>
                <p className="text-xl sm:text-3xl font-bold text-wedding-red uppercase tracking-normal sm:tracking-wider leading-tight">{BRIDE.mother}</p>
              </div>
              
              <div className="pt-10 sm:pt-12">
                <p className="text-wedding-red font-script text-3xl mb-1 opacity-80">Cô Dâu</p>
                {/* Fix quan trọng: text-2xl cho mobile, text-4xl cho desktop */}
                <p className="text-2xl sm:text-4xl font-bold font-serif uppercase tracking-tight sm:tracking-[0.1em] text-wedding-red leading-tight">
                  {BRIDE.fullName}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Đường kẻ phân chia */}
          <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-64 bg-wedding-red/10"></div>
          <div className="md:hidden w-12 h-px bg-wedding-red/10 mx-auto my-12"></div>

          {/* Nhà Trai */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:px-12"
          >
            <h2 className="text-wedding-dark font-serif text-base sm:text-lg uppercase tracking-[0.2em] sm:tracking-[0.4em] mb-8 sm:mb-10 opacity-70">
              Nhà Trai
            </h2>
            <div className="space-y-6 font-serif">
              <div>
                <p className="text-wedding-gray italic text-[10px] uppercase tracking-widest mb-2">Thân sinh phụ mẫu Ông:</p>
                <p className="text-xl sm:text-3xl font-bold text-wedding-red uppercase tracking-normal sm:tracking-wider leading-tight">{GROOM.father}</p>
              </div>
              <div>
                <p className="text-wedding-gray italic text-[10px] uppercase tracking-widest mb-2">Bà:</p>
                <p className="text-xl sm:text-3xl font-bold text-wedding-red uppercase tracking-normal sm:tracking-wider leading-tight">{GROOM.mother}</p>
              </div>
              
              <div className="pt-10 sm:pt-12">
                <p className="text-wedding-red font-script text-3xl mb-1 opacity-80">Chú Rể</p>
                <p className="text-2xl sm:text-4xl font-bold font-serif uppercase tracking-tight sm:tracking-[0.1em] text-wedding-red leading-tight">
                  {GROOM.fullName}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
