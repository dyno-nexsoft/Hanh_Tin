'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function CalendarSection() {
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const weddingDay = 6;

  return (
    <section className="bg-white py-16 sm:py-20 px-4 sm:px-6">
      {/* Giảm padding mobile từ p-10 xuống p-6 để tăng không gian cho chữ */}
      <div className="max-w-md mx-auto p-6 sm:p-10 border border-wedding-red/10 shadow-sm relative bg-wedding-cream-dark/10">
        
        {/* Tiêu đề lịch */}
        <div className="text-center mb-8 sm:mb-10">
          <p className="font-script text-4xl sm:text-5xl text-wedding-red mb-2">Tháng Sáu</p>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-6 sm:w-8 bg-wedding-red/20"></div>
            <p className="font-serif text-[10px] sm:text-sm uppercase tracking-[0.3em] sm:tracking-[0.5em] text-wedding-dark/60">2026</p>
            <div className="h-px w-6 sm:w-8 bg-wedding-red/20"></div>
          </div>
        </div>

        {/* Header các thứ trong tuần */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-6 text-center">
          {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map((day, idx) => (
            <span key={day} className={`text-[10px] font-bold font-serif ${idx === 0 ? 'text-wedding-red' : 'text-wedding-gray'}`}>
              {day}
            </span>
          ))}
        </div>

        {/* Các ngày trong tháng */}
        <div className="grid grid-cols-7 gap-y-2 sm:gap-y-4 text-center">
          <div className="col-span-1"></div>
          
          {days.map((day) => (
            <div key={day} className="relative flex items-center justify-center h-8 sm:h-10">
              {day === weddingDay && (
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-wedding-red/20 fill-wedding-red/10" />
                </motion.div>
              )}
              <span className={`relative z-10 font-serif text-sm ${day === weddingDay ? 'text-wedding-red font-bold text-lg' : 'text-wedding-dark'}`}>
                {day}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-10 sm:mt-12 text-center">
          {/* Tối ưu mobile: text-xl/2xl và whitespace-nowrap để không bị gãy dòng */}
          <p className="font-script text-xl sm:text-3xl text-wedding-red opacity-80 whitespace-nowrap">
            Hẹn gặp bạn tại buổi tiệc lúc 17:30
          </p>
        </div>
        
        {/* Trang trí góc */}
        <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-wedding-red/20"></div>
        <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-wedding-red/20"></div>
      </div>
    </section>
  );
}
