'use client';

import { motion } from 'framer-motion';
import { BRIDE, GROOM, WEDDING_DATA } from '@/lib/config/wedding';
import Image from 'next/image';
import { format } from 'date-fns';

export default function FooterSection() {
  const weddingDate = WEDDING_DATA.bride.weddingDate;

  return (
    <footer
      className="relative h-full w-full flex items-center justify-center bg-[#F5F5F7] px-4 py-8"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
        className="w-full max-w-2xl bg-white rounded-[32px] sm:rounded-[40px] shadow-sm overflow-hidden flex flex-col sm:flex-row relative"
        style={{ border: '1px solid rgba(0,0,0,0.05)' }}
      >
        {/* Left side Image - Apple Style Split Card */}
        <div className="w-full sm:w-2/5 aspect-[4/3] sm:aspect-auto sm:h-auto relative bg-[#E8E8ED]">
          <Image
            src="/images/couple/close.webp"
            alt="Thank You"
            fill
            className="object-cover object-top sm:object-center"
          />
        </div>

        {/* Right side Text */}
        <div className="w-full sm:w-3/5 p-8 sm:p-12 flex flex-col justify-center text-center sm:text-left">
          <h2 className="font-sans text-4xl sm:text-5xl font-bold tracking-tighter text-[#1D1D1F] mb-6">
            Cảm ơn bạn.
          </h2>
          
          <p className="font-sans text-[15px] leading-relaxed text-[#1D1D1F] mb-4 font-medium">
            Sự hiện diện của bạn là món quà vô giá, góp phần làm cho ngày vui của chúng tôi thêm phần trọn vẹn và ý nghĩa.
          </p>

          <div className="mt-6 pt-6 border-t border-black/5">
            <p className="font-script text-[36px] sm:text-[44px] text-[#D4AF37] leading-[1.2]">
              {BRIDE.name} &amp; {GROOM.name}
            </p>
            <p className="font-sans text-[11px] font-semibold tracking-[0.2em] uppercase text-[#86868B] mt-2">
              {format(weddingDate, "dd.MM.yyyy")}
            </p>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
