'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { WeddingSide } from '@/lib/types';
import { WEDDING_DATA } from '@/lib/config/wedding';
import Image from 'next/image';
import { useCountdown } from '@/lib/hooks/useCountdown';

export default function CalendarSection({ side }: { side: WeddingSide }) {
  const data = WEDDING_DATA[side];
  const weddingDay = data.weddingDate.getDate();
  const monthName = data.weddingDate.toLocaleString('vi-VN', { month: 'long' });
  const year = data.weddingDate.getFullYear();
  
  // Countdown logic
  const { days: cdDays, hours, minutes, seconds } = useCountdown(data.weddingDate);
  const timeItems = [
    { label: 'Ngày', value: cdDays },
    { label: 'Giờ', value: hours },
    { label: 'Phút', value: minutes },
    { label: 'Giây', value: seconds },
  ];
  
  // Calculate total days in month
  const totalDays = new Date(year, data.weddingDate.getMonth() + 1, 0).getDate();
  const days = Array.from({ length: totalDays }, (_, i) => i + 1);

  // Calculate empty slots before the first day of the month (optional but good)
  // For simplicity I'll stick to a basic grid or fix the first day offset.
  const firstDayOfMonth = new Date(year, data.weddingDate.getMonth(), 1).getDay(); // 0 is Sunday
  const emptySlots = firstDayOfMonth === 0 ? 0 : firstDayOfMonth; // Simplified for VN calendar (CN is first)

  return (
    <section className="bg-wedding-red h-full w-full flex flex-col items-center justify-center py-4 sm:py-20 relative overflow-hidden">
      <div className="w-[calc(100%-1.5rem)] sm:w-[calc(100%-3rem)] max-w-xl text-center flex flex-col items-center justify-center relative z-10">
        <div className="w-full flex flex-col justify-center p-4 sm:p-10 border border-wedding-red/10 shadow-sm relative bg-white rounded-[2rem] overflow-hidden shrink-0">
        
        {/* Tiêu đề lịch */}
        <div className="text-center mb-4 sm:mb-10">
          <p className="font-script text-3xl sm:text-5xl text-wedding-red mb-1 sm:mb-2 capitalize">{monthName}</p>
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <div className="h-px w-6 sm:w-8 bg-wedding-red/20"></div>
            <p className="font-serif text-[10px] sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.5em] text-wedding-dark/60">{year}</p>
            <div className="h-px w-6 sm:w-8 bg-wedding-red/20"></div>
          </div>
        </div>

        {/* Header các thứ trong tuần */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2 sm:mb-4 text-center max-w-[260px] sm:max-w-[320px] lg:max-w-none mx-auto w-full">
          {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map((day, idx) => (
            <span key={day} className={`text-[10px] sm:text-[11px] font-bold font-serif ${idx === 0 ? 'text-wedding-red' : 'text-wedding-gray'}`}>
              {day}
            </span>
          ))}
        </div>

        {/* Các ngày trong tháng */}
        <div className="grid grid-cols-7 gap-y-0.5 sm:gap-y-4 text-center max-w-[260px] sm:max-w-[320px] lg:max-w-none mx-auto w-full">
          {Array.from({ length: emptySlots }).map((_, i) => (
             <div key={`empty-${i}`} className="col-span-1"></div>
          ))}
          
          {days.map((day) => (
            <div key={day} className="relative flex items-center justify-center h-7 sm:h-10">
              {day === weddingDay && (
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Heart className="w-7 h-7 sm:w-10 sm:h-10 text-wedding-red/20 fill-wedding-red/10" />
                </motion.div>
              )}
              <span className={`relative z-10 font-serif text-xs sm:text-sm ${day === weddingDay ? 'text-wedding-red font-bold text-base sm:text-lg' : 'text-wedding-dark'}`}>
                {day}
              </span>
            </div>
          ))}
        </div>

        {/* Countdown Tích hợp */}
        <div className="mt-4 sm:mt-10 border-t border-wedding-red/10 pt-4 sm:pt-6">
          <div className="grid grid-cols-4 gap-1.5 sm:gap-4 max-w-[260px] sm:max-w-[320px] lg:max-w-none mx-auto w-full">
            {timeItems.map((item, idx) => (
              <div key={item.label} className="flex flex-col items-center bg-wedding-red py-2 sm:py-3 rounded-xl shadow-md">
                <span className="text-lg sm:text-3xl font-sans font-black text-white mb-0.5 sm:mb-1 tabular-nums">
                  {String(item.value).padStart(2, '0')}
                </span>
                <span className="text-[8px] sm:text-xs uppercase tracking-[0.1em] sm:tracking-[0.2em] text-white/80 font-serif">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 sm:mt-10 text-center">
          <p className="font-script text-lg sm:text-3xl text-wedding-red opacity-80 whitespace-nowrap">
            Hẹn gặp bạn lúc {data.events[0].time}
          </p>
        </div>
        
        {/* Trang trí góc */}
        <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-wedding-red/20"></div>
        <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-wedding-red/20"></div>
        </div>
      </div>
    </section>
  );
}
