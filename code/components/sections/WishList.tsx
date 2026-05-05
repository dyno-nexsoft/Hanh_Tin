'use client';

/// WishList — Phiên bản Multi-row Marquee (Nhiều hàng chạy đan xen).
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getWishes } from '@/lib/firebase/services';
import { WishData } from '@/lib/types';
import { MessageSquare } from 'lucide-react';

export default function WishList({ guestName }: { guestName?: string }) {
  const [wishes, setWishes] = useState<WishData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWishes = async () => {
    try {
      console.log('Fetching wishes from Firestore...');
      const data = await getWishes();
      console.log(`Successfully fetched ${data.length} wishes.`);
      // Xáo trộn ngẫu nhiên
      const shuffled = [...data].sort(() => Math.random() - 0.5);
      setWishes(shuffled);
    } catch (error) {
      console.error('Error fetching wishes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishes();
    const interval = setInterval(fetchWishes, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading && wishes.length === 0) return null;

  // Chia dữ liệu thành 2 hoặc 3 hàng tùy số lượng
  const rows = wishes.length >= 6 ? 2 : 1;
  const wishGroups = Array.from({ length: rows }, (_, i) => 
    wishes.filter((_, idx) => idx % rows === i)
  );

  return (
    <section className="bg-wedding-cream-dark py-20 overflow-hidden border-y border-wedding-red/5">
      <div className="text-center mb-12 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-script text-6xl text-wedding-red">Lời Chúc Từ Bạn Bè</h2>
          <p className="text-wedding-gray font-serif italic mt-2 opacity-70">
            {wishes.length > 0 ? `Cảm ơn ${wishes.length} lời chúc từ mọi người` : 'Hãy gửi lời chúc đầu tiên cho hai bạn nhé!'}
          </p>
        </motion.div>
      </div>

      {wishes.length > 0 ? (
        <div className="space-y-6 sm:space-y-10 relative">
          {/* Lớp phủ Gradient 2 bên */}
          <div className="absolute inset-y-0 left-0 w-20 sm:w-60 bg-gradient-to-r from-wedding-cream-dark to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-20 sm:w-60 bg-gradient-to-l from-wedding-cream-dark to-transparent z-10 pointer-events-none"></div>

          {wishGroups.map((group, rowIdx) => (
            <div key={rowIdx} className="relative flex overflow-hidden">
              <motion.div
                className="flex gap-6 py-10 px-6"
                animate={{
                  x: rowIdx % 2 === 0 ? ["0%", "-50%"] : ["-50%", "0%"],
                }}
                transition={{
                  duration: 40 + rowIdx * 10, // Mỗi hàng một tốc độ khác nhau
                  ease: "linear",
                  repeat: Infinity,
                }}
                style={{ width: "fit-content" }}
              >
                {/* Render 3 lần để đảm bảo lặp vô tận mượt mà */}
                {[...group, ...group, ...group].map((wish, idx) => (
                  <div
                    key={idx}
                    className="flex-shrink-0 w-[280px] sm:w-[380px] bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-wedding-red/5 relative hover:shadow-md transition-shadow group cursor-default"
                  >
                    <div className="absolute top-4 right-6 text-wedding-red/5 text-4xl font-serif">“</div>
                    <p className="font-serif text-base sm:text-lg text-wedding-dark mb-6 italic leading-relaxed line-clamp-3">
                      {wish.message}
                    </p>
                    <div className="absolute bottom-3 right-5">
                      <p className="font-serif font-bold text-wedding-red tracking-wider text-[10px] sm:text-xs opacity-70">
                        — {wish.name}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      ) : (
        <div className="max-w-md mx-auto px-6 text-center py-12 border border-dashed border-wedding-red/20 rounded-3xl bg-white/30">
          <MessageSquare className="w-10 h-10 text-wedding-red/20 mx-auto mb-4" />
          <p className="text-wedding-gray font-serif italic text-sm">
            Chưa có lời chúc nào được gửi đi.
          </p>
        </div>
      )}
    </section>
  );
}
