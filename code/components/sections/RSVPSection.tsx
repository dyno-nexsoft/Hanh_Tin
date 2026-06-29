'use client';

/// Section xác nhận tham dự (RSVP) — Apple Futuristic
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';

export default function RSVPSection({ guestName }: { guestName?: string }) {
  const [hasVoted, setHasVoted] = useState(false);
  const [vote, setVote] = useState<'yes' | 'no' | null>(null);

  const handleVote = (choice: 'yes' | 'no') => {
    setVote(choice);
    setHasVoted(true);
    // TODO: integrate with Firebase if real RSVP tracking is needed
  };

  return (
    <section className="h-full w-full bg-[#F5F5F7] flex flex-col justify-center items-center px-4 py-6 overflow-y-auto">
      <div
        className="w-full max-w-xl bg-white rounded-[32px] sm:rounded-[40px] shadow-sm flex flex-col p-6 sm:p-10 shrink-0 relative overflow-hidden"
        style={{ border: '1px solid rgba(0,0,0,0.05)' }}
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-sans text-[11px] font-bold tracking-[0.2em] uppercase text-[#D4AF37] mb-3">
              Xác Nhận Tham Dự
            </p>
            <h2 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-[#1D1D1F] mb-4">
              RSVP
            </h2>
            
            <p className="font-sans text-[15px] text-[#1D1D1F] font-medium leading-relaxed">
              Bạn sẽ đến chung vui cùng chúng mình chứ?
            </p>
            {guestName && (
              <p className="font-sans text-lg font-bold text-[#0071E3] mt-2">
                {guestName}
              </p>
            )}
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          {!hasVoted ? (
            <motion.div 
              key="vote-buttons"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={() => handleVote('yes')}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-full font-sans font-semibold text-[15px] transition-all bg-[#0071E3] text-white hover:bg-[#0077ED] active:scale-[0.98] shadow-sm"
              >
                <CheckCircle2 size={18} />
                Chắc chắn rồi! 🥳
              </button>

              <button
                onClick={() => handleVote('no')}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-full font-sans font-semibold text-[15px] transition-all bg-[#F5F5F7] text-[#1D1D1F] hover:bg-[#E8E8ED] active:scale-[0.98] border border-black/5"
              >
                <XCircle size={18} />
                Tiếc quá, mình bận 🥺
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="vote-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-6 bg-[#FAF8F5] rounded-[24px] border border-[#D4AF37]/20"
            >
              {vote === 'yes' ? (
                <>
                  <CheckCircle2 size={40} className="text-[#34C759] mb-3" />
                  <p className="font-sans text-[17px] font-bold text-[#1D1D1F]">Tuyệt vời!</p>
                  <p className="font-sans text-[14px] text-[#86868B] mt-1">Hẹn gặp bạn tại tiệc cưới nhé.</p>
                </>
              ) : (
                <>
                  <XCircle size={40} className="text-[#86868B] mb-3" />
                  <p className="font-sans text-[17px] font-bold text-[#1D1D1F]">Rất tiếc!</p>
                  <p className="font-sans text-[14px] text-[#86868B] mt-1">Cảm ơn bạn đã phản hồi. Hẹn dịp khác nhé.</p>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
