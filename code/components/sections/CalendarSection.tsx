'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { WeddingSide } from '@/lib/types';
import { WEDDING_DATA } from '@/lib/config/wedding';
import { useCountdown } from '@/lib/hooks/useCountdown';

export default function CalendarSection({ side }: { side: WeddingSide }) {
  const data = WEDDING_DATA[side];
  const weddingDay = data.weddingDate.getDate();
  const monthName = data.weddingDate.toLocaleString('vi-VN', { month: 'long' });
  const year = data.weddingDate.getFullYear();
  
  const { days: cdDays, hours, minutes, seconds } = useCountdown(data.weddingDate);
  const timeItems = [
    { label: 'Ngày', value: cdDays },
    { label: 'Giờ', value: hours },
    { label: 'Phút', value: minutes },
    { label: 'Giây', value: seconds },
  ];
  
  const totalDays = new Date(year, data.weddingDate.getMonth() + 1, 0).getDate();
  const days = Array.from({ length: totalDays }, (_, i) => i + 1);
  const firstDayOfMonth = new Date(year, data.weddingDate.getMonth(), 1).getDay();
  const emptySlots = firstDayOfMonth === 0 ? 0 : firstDayOfMonth;

  return (
    <section
      className="h-full w-full flex flex-col items-center justify-center py-6 px-4 bg-[#F5F5F7] overflow-y-auto"
    >
      <div className="w-full max-w-xl flex flex-col gap-4 relative z-10 shrink-0">
        
        {/* Calendar Card iOS Style */}
        <div
          className="w-full bg-white rounded-[32px] sm:rounded-[40px] p-6 sm:p-8 shadow-sm"
          style={{ border: '1px solid rgba(0,0,0,0.05)' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-sans text-3xl font-bold tracking-tight text-[#1D1D1F] capitalize">
              {monthName}
            </h2>
            <div className="bg-[#F5F5F7] px-4 py-1.5 rounded-full">
              <span className="font-sans font-bold text-sm text-[#0071E3] tracking-wide">
                {year}
              </span>
            </div>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map((day, idx) => (
              <span
                key={day}
                className="text-center font-sans text-[11px] font-bold uppercase tracking-wider"
                style={{ color: idx === 0 ? '#FF3B30' : '#86868B' }}
              >
                {day}
              </span>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-y-2">
            {Array.from({ length: emptySlots }).map((_, i) => (
              <div key={`empty-${i}`} className="col-span-1" />
            ))}
            
            {days.map((day) => (
              <div key={day} className="relative flex items-center justify-center h-10 sm:h-12">
                {day === weddingDay && (
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#FF3B30] rounded-full shadow-sm" />
                  </motion.div>
                )}
                <span
                  className={`relative z-10 font-sans text-sm sm:text-[15px] font-semibold ${
                    day === weddingDay ? 'text-white' : 'text-[#1D1D1F]'
                  }`}
                >
                  {day}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Countdown Widget iOS Style */}
        <div className="grid grid-cols-4 gap-3 sm:gap-4 w-full">
          {timeItems.map((item) => (
            <div
              key={item.label}
              className="bg-white rounded-[24px] p-4 flex flex-col items-center justify-center shadow-sm"
              style={{ border: '1px solid rgba(0,0,0,0.05)' }}
            >
              <span className="font-sans text-2xl sm:text-3xl font-bold tracking-tighter text-[#1D1D1F] tabular-nums mb-1">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="font-sans text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#86868B]">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Message */}
        <div className="text-center mt-4">
          <p className="font-sans text-[15px] font-semibold text-[#1D1D1F]">
            Hẹn gặp bạn lúc <span className="text-[#0071E3]">{data.events[0].time}</span>
          </p>
        </div>

      </div>
    </section>
  );
}
