'use client';

/// Section thông tin gia đình — Hoàn thiện chuẩn thiệp giấy Việt Nam (Vu Quy/Thành Hôn + Ngày Âm).
import { motion } from 'framer-motion';
import { WeddingSide } from '@/lib/types';
import { BRIDE, GROOM, WEDDING_DATA } from '@/lib/config/wedding';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Image from 'next/image';

export default function FamilySection({ side }: { side: WeddingSide }) {
  return (
    <Suspense fallback={<div className="h-96" />}>
      <FamilySectionContent side={side} />
    </Suspense>
  );
}

function FamilySectionContent({ side }: { side: WeddingSide }) {
  const searchParams = useSearchParams();
  const guestName = searchParams.get('to');
  const data = WEDDING_DATA[side];

  return (
    <section className="bg-wedding-cream-dark py-4 sm:py-24 px-2 sm:px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px]">
          <Image src="/assets/images/song-hy-gold.webp" alt="bg" fill className="object-contain" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10 bg-white/40 px-2 py-4 sm:p-12 rounded-[2rem] border border-wedding-red/5 shadow-inner">
        
        {/* Tên Lễ (Vu Quy hoặc Thành Hôn) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center mb-4 sm:mb-10"
        >
          <div className="relative w-16 h-16 mx-auto mb-4 opacity-90 rounded-full overflow-hidden border border-wedding-red/10 bg-white/50 p-2 shadow-sm">
            <Image src="/assets/images/song-hy-gold.webp" alt="囍" fill className="object-contain" />
          </div>
          <h2 className="text-wedding-red font-serif text-2xl sm:text-4xl tracking-[0.3em] font-bold uppercase mb-2">
            {data.ceremonyTitle}
          </h2>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-wedding-red/30 to-transparent mx-auto"></div>
        </motion.div>

        {/* Lời chào khách mời */}
        {guestName && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-6 sm:mb-12"
          >
            <p className="text-wedding-gray text-[11px] sm:text-xs tracking-[0.2em] uppercase mb-1">Trân trọng kính mời</p>
            <p className="text-wedding-red font-serif text-xl sm:text-3xl italic font-bold px-4 leading-tight">
              {guestName}
            </p>
            <p className="text-wedding-gray text-[11px] sm:text-xs mt-3 max-w-[280px] sm:max-w-none mx-auto opacity-70">
              Đến dự buổi tiệc rượu thân mật chung vui cùng gia đình chúng tôi tại:
            </p>
            <p className="text-sm sm:text-lg font-serif font-bold text-wedding-red mt-1">
              {data.venue.name}
            </p>
            <p className="text-wedding-dark font-serif text-[11px] sm:text-sm mt-1 opacity-80">
              {data.venue.address}
            </p>
          </motion.div>
        )}

        {/* Bố cục 2 cột Nhà Trai - Nhà Gái */}
        <div className="grid grid-cols-2 gap-2 sm:gap-12 text-center items-start border-t border-wedding-red/10 pt-8 sm:pt-12">
          
          {/* Nhà Gái */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-wedding-red/50 font-serif text-[11px] sm:text-xs tracking-widest uppercase">Nhà Gái</h3>
            <div className="space-y-2 font-serif text-[11px] sm:text-lg">
              <p className="text-wedding-dark">Ông: <span className="font-bold">{BRIDE.father}</span></p>
              <p className="text-wedding-dark">Bà: <span className="font-bold">{BRIDE.mother}</span></p>
            </div>
            
            <div className="pt-4">
              <p className="text-wedding-red/60 text-[9px] sm:text-xs tracking-widest uppercase mb-1 italic">
                {BRIDE.title}
              </p>
               <h4 className="text-xl sm:text-4xl font-script text-wedding-red tracking-tighter sm:tracking-normal leading-tight">
                {BRIDE.fullName}
              </h4>
            </div>
          </div>

          {/* Nhà Trai */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-wedding-red/50 font-serif text-[11px] sm:text-xs tracking-widest uppercase">Nhà Trai</h3>
            <div className="space-y-2 font-serif text-[11px] sm:text-lg">
              <p className="text-wedding-dark">Ông: <span className="font-bold">{GROOM.father}</span></p>
              <p className="text-wedding-dark">Bà: <span className="font-bold">{GROOM.mother}</span></p>
            </div>
            
            <div className="pt-4">
              <p className="text-wedding-red/60 text-[9px] sm:text-xs tracking-widest uppercase mb-1 italic">
                {GROOM.title}
              </p>
               <h4 className="text-xl sm:text-4xl font-script text-wedding-red tracking-tighter sm:tracking-normal leading-tight">
                {GROOM.fullName}
              </h4>
            </div>
          </div>
        </div>

        {/* Ngày Âm Lịch - Đặt ở cuối phần giới thiệu */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-6 sm:mt-16 text-center border-t border-wedding-red/10 pt-8"
        >
          <p className="text-wedding-red font-serif text-xs sm:text-sm tracking-widest uppercase mb-1">
            Vào lúc {data.events[0].time}
          </p>
          <p className="text-wedding-red font-serif text-sm sm:text-lg font-bold">
            {data.events[0].date}
          </p>
          <p className="text-wedding-gray font-serif text-[11px] sm:text-xs italic mt-1">
            (Nhằm {data.lunarDate})
          </p>
        </motion.div>
      </div>
    </section>
  );
}
