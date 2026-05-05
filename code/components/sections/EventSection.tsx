'use client';

import { motion } from 'framer-motion';
import { Heart, GlassWater, MapPin, Calendar } from 'lucide-react';
import { WEDDING_DATA, WeddingSide } from '@/lib/constants/wedding-data';

export default function EventSection({ side }: { side: WeddingSide }) {
  const events = WEDDING_DATA[side].events;
  return (
    <section className="bg-white py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-wedding-red font-script text-6xl sm:text-7xl mb-4">Sự Kiện</h2>
          <div className="separator"></div>
        </div>

        <div className={`grid grid-cols-1 ${events.length > 1 ? 'md:grid-cols-2' : 'max-w-md mx-auto'} gap-12 sm:gap-16`}>
          {events.map((event, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="relative p-6 sm:p-12 border border-wedding-red/10 text-center hover:border-wedding-red transition-all group bg-wedding-cream-dark/30"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-3 sm:p-4 border border-wedding-red/10 rounded-full shadow-sm">
                {idx === 0 ? (
                  <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-wedding-red fill-wedding-red/10" />
                ) : (
                  <GlassWater className="w-6 h-6 sm:w-8 sm:h-8 text-wedding-red" />
                )}
              </div>
              
              {/* Hạ size mobile xuống text-lg và giảm tracking */}
              <h3 className="text-wedding-red font-serif text-lg sm:text-2xl uppercase tracking-[0.1em] sm:tracking-[0.3em] mb-6 sm:mb-8 mt-2 sm:mt-4 font-bold leading-tight">
                {event.title}
              </h3>
              
              <div className="space-y-4 sm:space-y-6 font-serif">
                <div className="flex items-center justify-center gap-2 text-wedding-dark">
                   <Calendar className="w-4 h-4 text-wedding-red" />
                   <p className="text-lg sm:text-xl font-bold tracking-widest">{event.time}</p>
                </div>
                
                {/* Giảm size ngày tháng và tracking để không bị gãy dòng */}
                <p className="text-[13px] sm:text-base text-wedding-gray italic tracking-normal sm:tracking-wider leading-relaxed px-2">
                  {event.date}
                </p>
                
                <div className="pt-6 sm:pt-8 border-t border-wedding-red/5">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-wedding-red flex-shrink-0" />
                    <p className="text-wedding-red font-bold uppercase tracking-wider text-sm sm:text-base leading-tight">
                      {event.venue}
                    </p>
                  </div>
                  <p className="text-wedding-gray text-[12px] sm:text-sm leading-relaxed max-w-[220px] sm:max-w-none mx-auto">
                    {event.address}
                  </p>
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 w-full h-1 bg-wedding-red scale-x-0 group-hover:scale-x-100 transition-transform origin-center duration-500"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
