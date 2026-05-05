'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Heart } from 'lucide-react';
import { addWish } from '@/lib/firebase/services';

export default function RSVPSection({ guestName }: { guestName?: string }) {
  const [name, setName] = useState(guestName ?? '');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;

    setLoading(true);
    try {
      await addWish({ name, message });
      setSubmitted(true);
      setName('');
      setMessage('');
    } catch (error) {
      console.error('Error adding wish: ', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-wedding-red py-12 sm:py-20 px-6 text-white overflow-hidden">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-script text-6xl mb-4 text-white">Gửi Lời Chúc</h2>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-8 bg-white/30"></div>
              <Heart className="w-4 h-4 text-white/50" />
              <div className="h-px w-8 bg-white/30"></div>
            </div>
            
            {/* Fix lỗi xuống dòng: Dùng text-xs/sm và tracking-wide thay vì quá rộng */}
            <p className="font-serif text-[11px] sm:text-xs uppercase tracking-wide sm:tracking-[0.3em] text-white/80 leading-relaxed whitespace-nowrap">
              Rất vui khi nhận được lời chúc của bạn
            </p>
          </motion.div>
        </div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/10 p-12 rounded-2xl border border-white/20 text-center backdrop-blur-md"
          >
            <Heart className="w-12 h-12 text-white mx-auto mb-6" />
            <p className="font-serif text-xl italic">Cảm ơn bạn đã gửi lời chúc tốt đẹp nhất đến chúng mình!</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label className="block font-serif text-[10px] uppercase tracking-[0.2em] text-white/60 ml-1">
                Tên của bạn
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nhập tên của bạn..."
                className="w-full bg-white p-4 outline-none border-b-2 border-transparent focus:border-white/50 transition-all font-serif text-base rounded-lg"
                style={{ color: '#333333' }}
              />
            </div>

            <div className="space-y-3">
              <label className="block font-serif text-[10px] uppercase tracking-[0.2em] text-white/60 ml-1">
                Lời chúc mừng
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Nhập lời chúc của bạn..."
                className="w-full bg-white p-4 outline-none border-b-2 border-transparent focus:border-white/50 transition-all font-serif resize-none text-base rounded-lg"
                style={{ color: '#333333' }}
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-white py-5 text-wedding-red font-sans font-bold uppercase tracking-widest text-xs shadow-xl flex items-center justify-center gap-3 disabled:opacity-50 rounded-lg"
            >
              {loading ? 'Đang gửi...' : (
                <>
                  <Send className="w-4 h-4" />
                  Gửi Ngay
                </>
              )}
            </motion.button>
          </form>
        )}
      </div>
    </section>
  );
}
