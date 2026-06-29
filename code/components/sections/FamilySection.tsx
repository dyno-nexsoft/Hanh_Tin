'use client';

/// Section thông tin gia đình — Apple Editorial (Blend of minimal Apple & Wedding Elegance)
import { motion } from 'framer-motion';
import { WeddingSide } from '@/lib/types';
import { BRIDE, GROOM, WEDDING_DATA } from '@/lib/config/wedding';
import { trackGuestLinkView } from '@/lib/firebase/services';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import Typewriter from '@/components/shared/Typewriter';

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

  useEffect(() => {
    if (guestName) {
      trackGuestLinkView(guestName, side).catch(console.error);
    }
  }, [guestName, side]);

  return (
    <section
      className="h-full w-full flex flex-col items-center justify-center overflow-y-auto overflow-x-hidden bg-[#F5F5F7] py-6 px-4"
    >
      <div
        className="w-full max-w-4xl bg-white rounded-[32px] sm:rounded-[40px] shadow-sm flex flex-col p-6 sm:p-10 my-auto shrink-0 relative"
        style={{ border: '1px solid rgba(0,0,0,0.05)' }}
      >
        {/* Apple Style Badge, but more elegant */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto border border-[#D4AF37]/30 text-[#D4AF37] px-5 py-2 rounded-full font-sans font-semibold text-[11px] tracking-[0.2em] uppercase mb-8 sm:mb-10 bg-[#D4AF37]/5"
        >
          {data.ceremonyTitle}
        </motion.div>

        {/* Guest greeting */}
        {guestName && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-10"
          >
            <p className="font-sans text-[11px] font-semibold tracking-[0.2em] uppercase text-[#86868B] mb-2">
              Kính Mời
            </p>
            <p className="font-script text-4xl sm:text-5xl text-[#D4AF37] tracking-normal px-4 leading-tight mb-2">
              <Typewriter text={guestName} delay={600} speed={50} />
            </p>
            <p className="font-sans text-[13px] sm:text-sm font-medium text-[#1D1D1F] max-w-xs mx-auto">
              Đến dự buổi tiệc rượu thân mật chung vui cùng gia đình chúng tôi tại:
            </p>
          </motion.div>
        )}

        {/* Venue & Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#FAF8F5] rounded-3xl p-6 flex flex-col justify-center text-center md:text-left border border-[#D4AF37]/10"
          >
            <p className="font-sans text-[11px] font-bold tracking-[0.1em] uppercase text-[#D4AF37] mb-2">
              Thời Gian
            </p>
            <p className="font-sans text-[17px] sm:text-[19px] font-bold text-[#1D1D1F] tracking-tight mb-1 text-balance leading-tight">
              {data.events[0].date}
            </p>
            <p className="font-sans text-[13px] font-medium text-[#86868B]">
              Lúc {data.events[0].time}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#FAF8F5] rounded-3xl p-6 flex flex-col justify-center text-center md:text-left border border-[#D4AF37]/10"
          >
            <p className="font-sans text-[11px] font-bold tracking-[0.1em] uppercase text-[#D4AF37] mb-2">
              Địa Điểm
            </p>
            <p className="font-sans text-xl font-bold text-[#1D1D1F] tracking-tight leading-tight mb-1">
              {data.venue.name}
            </p>
            <p className="font-sans text-[13px] font-medium text-[#86868B] line-clamp-2">
              {data.venue.address}
            </p>
          </motion.div>
        </div>

        {/* Family columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {side === 'bride' ? (
            <>
              <_FamilyColumn
                side="Nhà Gái"
                father={BRIDE.father}
                mother={BRIDE.mother}
                title={BRIDE.title}
                fullName={BRIDE.fullName}
              />
              <_FamilyColumn
                side="Nhà Trai"
                father={GROOM.father}
                mother={GROOM.mother}
                title={GROOM.title}
                fullName={GROOM.fullName}
              />
            </>
          ) : (
            <>
              <_FamilyColumn
                side="Nhà Trai"
                father={GROOM.father}
                mother={GROOM.mother}
                title={GROOM.title}
                fullName={GROOM.fullName}
              />
              <_FamilyColumn
                side="Nhà Gái"
                father={BRIDE.father}
                mother={BRIDE.mother}
                title={BRIDE.title}
                fullName={BRIDE.fullName}
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Private ─────────────────────────────────────────────────────────────

interface FamilyColumnProps {
  side: string;
  father: string;
  mother: string;
  title: string;
  fullName: string;
}

function _FamilyColumn({ side, father, mother, title, fullName }: FamilyColumnProps) {
  return (
    <div className="bg-white rounded-[24px] p-5 sm:p-6 flex flex-col items-center sm:items-start text-center sm:text-left border border-[#D4AF37]/20 shadow-sm relative overflow-hidden">
      {/* Subtle floral/elegant watermark in background */}
      <div 
        className="absolute -right-6 -bottom-6 w-24 h-24 opacity-5 pointer-events-none"
        style={{ backgroundImage: 'url(/assets/images/floral-v3-removebg-preview.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}
      />
      
      <h3 className="font-sans font-bold text-[11px] sm:text-xs tracking-[0.2em] uppercase text-[#D4AF37] mb-4 relative z-10">
        {side}
      </h3>
      
      <div className="space-y-1.5 font-sans text-[12px] sm:text-[14px] text-[#1D1D1F] mb-6 relative z-10">
        <p className="font-medium text-[#86868B]">
          Ông <span className="font-bold text-[#1D1D1F]">{father}</span>
        </p>
        <p className="font-medium text-[#86868B]">
          Bà <span className="font-bold text-[#1D1D1F]">{mother}</span>
        </p>
      </div>

      <div className="mt-auto relative z-10">
        <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.1em] uppercase text-[#86868B] mb-1">
          {title}
        </p>
        <h4 className="text-[28px] sm:text-[34px] lg:text-[40px] font-script text-[#1D1D1F] leading-[1.1] whitespace-nowrap">
          {fullName}
        </h4>
      </div>
    </div>
  );
}
