'use client';

import { motion } from 'framer-motion';
import { useCountdown } from '@/lib/hooks/useCountdown';
import { WEDDING_DATA, WeddingSide } from '@/lib/constants/wedding-data';

export default function CountdownSection({ side }: { side: WeddingSide }) {
  const { days, hours, minutes, seconds } = useCountdown(WEDDING_DATA[side].weddingDate);

  const timeItems = [
    { label: 'Ngày', value: days },
    { label: 'Giờ', value: hours },
    { label: 'Phút', value: minutes },
    { label: 'Giây', value: seconds },
  ];

  return (
    <section className="bg-wedding-red py-16 sm:py-24 px-6 text-white overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-serif text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.5em] mb-12 text-white/70">
            Tiết Kiệm Thời Gian Để Đến Ngày Vui
          </h2>
          
          <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-2xl mx-auto">
            {timeItems.map((item, idx) => (
              <div key={item.label} className="relative">
                <div className="flex flex-col items-center bg-white/5 py-4 sm:py-6 rounded-lg backdrop-blur-sm border border-white/10">
                  {/* Font số: Đổi sang Sans-serif Bold để dễ đọc nhất trên mobile */}
                  <span className="text-3xl sm:text-6xl font-sans font-black mb-1 tabular-nums">
                    {String(item.value).padStart(2, '0')}
                  </span>
                  <span className="text-[8px] sm:text-[10px] uppercase tracking-widest text-white/50 font-serif">
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
