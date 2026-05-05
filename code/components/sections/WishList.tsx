'use client';

/// WishList — Hiển thị danh sách lời chúc từ khách mời.
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getWishes, WishData } from '@/lib/firebase/services';

export default function WishList({ guestName }: { guestName?: string }) {
  const [wishes, setWishes] = useState<WishData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishes = async () => {
      try {
        const data = await getWishes();
        setWishes(data);
      } catch (error) {
        console.error('Error fetching wishes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishes();
  }, []);

  if (loading) return null;
  if (wishes.length === 0) return null;

  return (
    <section className="bg-wedding-cream-dark py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-script text-6xl text-wedding-red mb-12">Lời Chúc Từ Bạn Bè</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
          {wishes.map((wish, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white p-8 border border-wedding-red/10 shadow-sm relative"
            >
              <div className="absolute top-4 right-6 text-wedding-red/10 text-4xl font-serif">“</div>
              <p className="font-serif text-lg text-wedding-dark mb-4 italic">
                {wish.message}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-px bg-wedding-red/30"></div>
                <p className="font-serif font-bold text-wedding-red uppercase tracking-wider">
                  {wish.name}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
