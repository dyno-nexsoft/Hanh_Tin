'use client';

import { motion } from 'framer-motion';
import { useCountdown } from '@/lib/hooks/useCountdown';
import { WeddingSide } from '@/lib/types';
import { WEDDING_DATA } from '@/lib/config/wedding';
import Image from 'next/image';

export default function CountdownSection({ side }: { side: WeddingSide }) {
  const { days, hours, minutes, seconds } = useCountdown(WEDDING_DATA[side].weddingDate);

  const timeItems = [
    { label: 'Ngày', value: days },
    { label: 'Giờ', value: hours },
    { label: 'Phút', value: minutes },
    { label: 'Giây', value: seconds },
  ];

  return (
    <section className="bg-wedding-red h-full w-full flex flex-col justify-center py-6 sm:py-24 px-4 sm:px-6 text-white overflow-hidden relative">
      <div className="max-w-4xl mx-auto text-center relative z-10 w-full flex flex-col items-center justify-center py-10 gap-12 sm:gap-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center w-full"
        >
          <h2 className="font-serif text-base sm:text-2xl uppercase tracking-[0.3em] sm:tracking-[0.5em] mb-12 sm:mb-16 text-white drop-shadow-md">
            Ngày Hạnh Phúc
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 max-w-3xl mx-auto px-2 w-full">
            {timeItems.map((item, idx) => (
              <div key={item.label} className="relative">
                <div className="flex flex-col items-center bg-white/10 py-10 sm:py-14 rounded-2xl backdrop-blur-md border border-white/20 shadow-xl">
                  {/* Font số: Tăng size cực lớn */}
                  <span className="text-6xl sm:text-8xl font-sans font-black mb-3 tabular-nums drop-shadow-lg">
                    {String(item.value).padStart(2, '0')}
                  </span>
                  <span className="text-xs sm:text-sm uppercase tracking-[0.3em] text-white/80 font-serif">
                    {item.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* Background decorative element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem] sm:text-[20rem] font-script text-white/5 pointer-events-none select-none">
           HT
        </div>
      </div>
    </section>
  );
}
