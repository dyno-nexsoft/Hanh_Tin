'use client';

/// Section thông tin gia đình — Hoàn thiện chuẩn thiệp giấy Việt Nam (Vu Quy/Thành Hôn + Ngày Âm).
import { motion } from 'framer-motion';
import { WeddingSide } from '@/lib/types';
import { BRIDE, GROOM, WEDDING_DATA } from '@/lib/config/wedding';
import { trackGuestLinkView } from '@/lib/firebase/services';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';
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

  // Theo dõi lượt xem từ khách mời
  useEffect(() => {
    if (guestName) {
      trackGuestLinkView(guestName, side).catch(console.error);
    }
  }, [guestName, side]);

  return (
    <section 
      className="h-full w-full flex flex-col items-center justify-center overflow-y-auto overflow-x-hidden relative py-6"
      style={{ background: 'linear-gradient(180deg, #FDF8F0 0%, #F5ECE2 100%)' }}
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.06] pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px]">
          <Image src="/assets/images/song-hy-gold.webp" alt="bg" fill className="object-contain" />
        </div>
      </div>

      <div className="w-[calc(100%-1.5rem)] sm:w-[calc(100%-3rem)] max-w-lg relative z-10 bg-white px-2 pt-6 pb-4 sm:py-8 sm:px-10 rounded-[2rem] border border-wedding-red/5 shadow-inner flex flex-col gap-2 sm:gap-6 my-auto shrink-0">
        {/* Khung viền đôi chạy dọc tinh tế (Double border) giả lập thiệp in cao cấp */}
        <div className="absolute inset-1.5 sm:inset-3 border border-wedding-red/10 rounded-[1.7rem] pointer-events-none z-0" />
        
        
        {/* Tên Lễ (Vu Quy hoặc Thành Hôn) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center mb-1 sm:mb-3 lg:mb-10"
        >
          <div className="relative w-10 h-10 sm:w-14 sm:h-14 mx-auto mb-2 sm:mb-3 opacity-90 rounded-full overflow-hidden border border-wedding-red/10 bg-white/50 p-2 shadow-sm">
            <Image src="/assets/images/song-hy-gold.webp" alt="囍" fill className="object-contain" />
          </div>
          <h2 className="text-wedding-red font-serif text-lg sm:text-3xl tracking-[0.3em] font-bold uppercase mb-1 sm:mb-2">
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
            className="text-center mb-2 sm:mb-6"
          >
            <p className="text-wedding-gray text-[9px] sm:text-xs tracking-[0.2em] uppercase mb-0.5">Trân trọng kính mời</p>
            <p className="text-wedding-red font-serif text-lg sm:text-3xl italic font-bold px-2 leading-tight">
              {guestName}
            </p>
            <p className="text-wedding-gray text-[11px] sm:text-sm mt-1 sm:mt-2 lg:mt-3 max-w-[280px] sm:max-w-none mx-auto opacity-80 leading-tight">
              Đến dự buổi tiệc rượu thân mật chung vui cùng gia đình chúng tôi:
            </p>
          </motion.div>
        )}

        {/* Bố cục 2 cột Nhà Trai - Nhà Gái - Tự động đảo thứ tự theo bên mời */}
        <div className="grid grid-cols-2 gap-1 sm:gap-8 text-center items-start border-t border-wedding-red/10 pt-2 sm:pt-6">
          
          {side === 'bride' ? (
            <>
              {/* Nhà Gái hiện bên trái cho thiệp nhà gái */}
              <div className="space-y-1 sm:space-y-4">
                <h3 className="text-wedding-red/50 font-serif text-[8px] sm:text-xs tracking-widest uppercase">Nhà Gái</h3>
                <div className="space-y-0.5 font-serif text-[9px] sm:text-sm inline-block text-left">
                  <p className="text-wedding-dark whitespace-nowrap">Ông: <span className="font-bold">{BRIDE.father}</span></p>
                  <p className="text-wedding-dark whitespace-nowrap">Bà: &nbsp;&nbsp;<span className="font-bold">{BRIDE.mother}</span></p>
                </div>
                <div className="pt-1">
                  <p className="text-wedding-red/60 text-[7px] sm:text-[10px] tracking-widest uppercase mb-0 italic">{BRIDE.title}</p>
                  <h4 className="text-sm sm:text-2xl font-script text-wedding-red whitespace-nowrap leading-tight">
                    {BRIDE.fullName}
                  </h4>
                </div>
              </div>

              {/* Nhà Trai hiện bên phải */}
              <div className="space-y-1 sm:space-y-4">
                <h3 className="text-wedding-red/50 font-serif text-[8px] sm:text-xs tracking-widest uppercase">Nhà Trai</h3>
                <div className="space-y-0.5 font-serif text-[9px] sm:text-sm inline-block text-left">
                  <p className="text-wedding-dark whitespace-nowrap">Ông: <span className="font-bold">{GROOM.father}</span></p>
                  <p className="text-wedding-dark whitespace-nowrap">Bà: &nbsp;&nbsp;<span className="font-bold">{GROOM.mother}</span></p>
                </div>
                <div className="pt-1">
                  <p className="text-wedding-red/60 text-[7px] sm:text-[10px] tracking-widest uppercase mb-0 italic">{GROOM.title}</p>
                  <h4 className="text-sm sm:text-2xl font-script text-wedding-red whitespace-nowrap leading-tight">
                    {GROOM.fullName}
                  </h4>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Nhà Trai hiện bên trái cho thiệp nhà trai */}
              <div className="space-y-1 sm:space-y-4">
                <h3 className="text-wedding-red/50 font-serif text-[8px] sm:text-xs tracking-widest uppercase">Nhà Trai</h3>
                <div className="space-y-0.5 font-serif text-[9px] sm:text-sm inline-block text-left">
                  <p className="text-wedding-dark whitespace-nowrap">Ông: <span className="font-bold">{GROOM.father}</span></p>
                  <p className="text-wedding-dark whitespace-nowrap">Bà: &nbsp;&nbsp;<span className="font-bold">{GROOM.mother}</span></p>
                </div>
                <div className="pt-1">
                  <p className="text-wedding-red/60 text-[7px] sm:text-[10px] tracking-widest uppercase mb-0 italic">{GROOM.title}</p>
                  <h4 className="text-sm sm:text-2xl font-script text-wedding-red whitespace-nowrap leading-tight">
                    {GROOM.fullName}
                  </h4>
                </div>
              </div>

              {/* Nhà Gái hiện bên phải */}
              <div className="space-y-1 sm:space-y-4">
                <h3 className="text-wedding-red/50 font-serif text-[8px] sm:text-xs tracking-widest uppercase">Nhà Gái</h3>
                <div className="space-y-0.5 font-serif text-[9px] sm:text-sm inline-block text-left">
                  <p className="text-wedding-dark whitespace-nowrap">Ông: <span className="font-bold">{BRIDE.father}</span></p>
                  <p className="text-wedding-dark whitespace-nowrap">Bà: &nbsp;&nbsp;<span className="font-bold">{BRIDE.mother}</span></p>
                </div>
                <div className="pt-1">
                  <p className="text-wedding-red/60 text-[7px] sm:text-[10px] tracking-widest uppercase mb-0 italic">{BRIDE.title}</p>
                  <h4 className="text-sm sm:text-2xl font-script text-wedding-red whitespace-nowrap leading-tight">
                    {BRIDE.fullName}
                  </h4>
                </div>
              </div>
            </>
          )}
        </div>


        {/* Thông tin địa điểm - Di chuyển xuống dưới tên */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-3 sm:mt-8"
        >
          <p className="text-wedding-gray text-[9px] sm:text-xs tracking-[0.1em] uppercase mb-1 opacity-80 leading-none">Tại địa điểm:</p>
          <p className="text-sm sm:text-xl font-serif font-bold text-wedding-red leading-tight">
            {data.venue.name}
          </p>
          <p className="text-wedding-dark font-serif text-[11px] sm:text-sm mt-0.5 opacity-90 leading-tight">
            {data.venue.address}
          </p>
        </motion.div>

        {/* Ngày Âm Lịch - Đặt ở cuối phần giới thiệu */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-3 sm:mt-6 text-center border-t border-wedding-red/10 pt-3 sm:pt-4"
        >
          <p className="text-wedding-red font-serif text-[10px] sm:text-xs tracking-widest uppercase mb-0.5">
            Vào lúc {data.events[0].time}
          </p>
          <p className="text-wedding-red font-serif text-xs sm:text-base font-bold leading-none">
            {data.events[0].date}
          </p>
          <p className="text-wedding-gray font-serif text-[9px] sm:text-xs italic mt-0.5">
            (Nhằm {data.lunarDate})
          </p>
        </motion.div>
      </div>
    </section>
  );
}
