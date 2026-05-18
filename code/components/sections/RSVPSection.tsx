'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function RSVPSection({ guestName }: { guestName?: string }) {
  const [hasVoted, setHasVoted] = useState(false);
  const [vote, setVote] = useState<'yes' | 'no' | null>(null);

  const handleVote = (choice: 'yes' | 'no') => {
    setVote(choice);
    setHasVoted(true);
    // Here we could also save to Firebase or state
  };

  return (
    <section className="h-full w-full bg-wedding-red text-white flex flex-col justify-center items-center px-6 relative">
      <div className="max-w-md w-full">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-script text-6xl mb-4 text-white">Xác nhận tham dự</h2>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-8 bg-white/30"></div>
              <Heart className="w-4 h-4 text-white/50" />
              <div className="h-px w-8 bg-white/30"></div>
            </div>
            
            <p className="font-serif text-lg text-white/90 leading-relaxed mb-2">
              Bạn sẽ đến chung vui cùng chúng mình chứ?
            </p>
            {guestName && (
              <p className="font-serif text-xl font-bold text-white mb-8">
                {guestName}
              </p>
            )}
          </motion.div>
        </div>

        <div className="space-y-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => handleVote('yes')}
            disabled={hasVoted}
            className={`w-full relative overflow-hidden rounded-xl border-2 transition-all p-4 flex justify-between items-center text-lg font-medium
              ${hasVoted ? 'border-white/20 bg-white/10' : 'border-white bg-white/20 hover:bg-white/30'}
              ${vote === 'yes' ? 'ring-2 ring-white ring-offset-2 ring-offset-wedding-red' : ''}
            `}
          >
            <span className="relative z-10">Chắc chắn rồi! 🥳</span>
            {hasVoted && <span className="relative z-10 font-bold">{vote === 'yes' ? '92%' : '92%'}</span>}
            {hasVoted && (
              <motion.div 
                initial={{ width: 0 }} 
                animate={{ width: '92%' }} 
                transition={{ duration: 0.5 }}
                className="absolute left-0 top-0 bottom-0 bg-white/30" 
              />
            )}
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => handleVote('no')}
            disabled={hasVoted}
            className={`w-full relative overflow-hidden rounded-xl border-2 transition-all p-4 flex justify-between items-center text-lg font-medium
              ${hasVoted ? 'border-white/20 bg-white/10' : 'border-white/50 bg-white/10 hover:bg-white/20'}
              ${vote === 'no' ? 'ring-2 ring-white/50 ring-offset-2 ring-offset-wedding-red' : ''}
            `}
          >
            <span className="relative z-10">Tiếc quá, mình bận mất 🥺</span>
            {hasVoted && <span className="relative z-10 font-bold">{vote === 'yes' ? '8%' : '8%'}</span>}
            {hasVoted && (
              <motion.div 
                initial={{ width: 0 }} 
                animate={{ width: '8%' }} 
                transition={{ duration: 0.5 }}
                className="absolute left-0 top-0 bottom-0 bg-white/10" 
              />
            )}
          </motion.button>
        </div>

        {hasVoted && (
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="text-center mt-8 font-serif italic text-white/80"
          >
            Cảm ơn bạn đã xác nhận!
          </motion.p>
        )}
      </div>
    </section>
  );
}
