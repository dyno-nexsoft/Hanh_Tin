"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, Gift, CalendarPlus, Share2 } from "lucide-react";
import Image from "next/image";

interface InteractionSidebarProps {
  onLike: () => void;
  onComment: () => void;
  onGift: () => void;
  onAddToCalendar: () => void;
  onToggleMusic: () => void;
  onShare?: () => void;
  isLiked: boolean;
  likeCount: number | string;
  commentCount: number | string;
  isPlaying: boolean;
  isDark?: boolean;
}

/// Apple Futuristic Sidebar (Frosted glass)
export default function InteractionSidebar({
  onLike,
  onComment,
  onGift,
  onAddToCalendar,
  onToggleMusic,
  onShare,
  isLiked,
  likeCount,
  commentCount,
  isPlaying,
  isDark = false,
}: InteractionSidebarProps) {
  void isDark;
  return (
    <div className="flex flex-col items-center gap-3 select-none">

      {/* Avatar + Add to Calendar */}
      <div className="relative cursor-pointer mb-2 group" onClick={onAddToCalendar} title="Thêm vào lịch">
        <div
          className="w-[46px] h-[46px] rounded-full overflow-hidden shadow-sm transition-transform duration-300 group-hover:scale-105"
          style={{ border: '2px solid #FFFFFF' }}
        >
          <Image src="/images/couple/hero.webp" alt="Couple" width={46} height={46} className="object-cover w-full h-full" />
        </div>
        <div
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[22px] h-[22px] rounded-full flex items-center justify-center bg-[#0071E3] border-2 border-white"
        >
          <CalendarPlus className="w-3 h-3 text-white" />
        </div>
      </div>

      {/* Like */}
      <_ActionButton label={likeCount.toString()} onClick={onLike}>
        <Heart
          size={24}
          strokeWidth={isLiked ? 0 : 2}
          fill={isLiked ? "#FF3B30" : "none"}
          className={`transition-colors duration-300 ${isLiked ? "text-[#FF3B30]" : "text-[#1D1D1F]"}`}
        />
      </_ActionButton>

      {/* Comment */}
      <_ActionButton label={commentCount.toString()} onClick={onComment}>
        <MessageCircle size={24} strokeWidth={2} className="text-[#1D1D1F]" />
      </_ActionButton>

      {/* Gift */}
      <_ActionButton label="Quà" onClick={onGift}>
        <Gift size={24} strokeWidth={2} className="text-[#1D1D1F]" />
      </_ActionButton>

      {/* Share */}
      {onShare && (
        <_ActionButton label="Chia sẻ" onClick={onShare}>
          <Share2 size={22} strokeWidth={2} className="text-[#1D1D1F]" />
        </_ActionButton>
      )}

      {/* Music Disc */}
      <_MusicDisc isPlaying={isPlaying} onToggle={onToggleMusic} />
    </div>
  );
}

// ─── Private Sub-components ───────────────────────────────────────────────

interface ActionButtonProps {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}

function _ActionButton({ label, onClick, children }: ActionButtonProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        onClick={onClick}
        className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm bg-white/80"
        style={{
          backdropFilter: 'blur(20px) saturate(150%)',
          WebkitBackdropFilter: 'blur(20px) saturate(150%)',
          border: '1px solid rgba(0,0,0,0.05)',
        }}
      >
        {children}
      </motion.button>
      <span
        className="text-[11px] font-semibold font-sans leading-none text-[#1D1D1F] drop-shadow-sm"
      >
        {label}
      </span>
    </div>
  );
}

interface MusicDiscProps {
  isPlaying: boolean;
  onToggle: () => void;
}

function _MusicDisc({ isPlaying, onToggle }: MusicDiscProps) {
  return (
    <div className="flex flex-col items-center mt-2 relative">
      <AnimatePresence>
        {isPlaying && (
          <>
            {[1, 2, 3].map((i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 0, x: 0, scale: 0.5 }}
                animate={{ opacity: [0, 1, 0], y: -50 - i * 15, x: i % 2 === 0 ? 16 : -16, scale: [0.5, 1.1, 0.8] }}
                transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.65, ease: "easeOut" }}
                className="absolute pointer-events-none z-0 select-none font-bold"
                style={{ fontSize: 12 + i * 2, color: '#0071E3' }}
              >
                ♪
              </motion.span>
            ))}
          </>
        )}
      </AnimatePresence>

      <motion.div
        animate={{ rotate: isPlaying ? 360 : 0 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="w-12 h-12 cursor-pointer relative z-10"
        onClick={onToggle}
        title={isPlaying ? "Tạm dừng nhạc" : "Phát nhạc"}
      >
        <div
          className="w-full h-full rounded-full flex items-center justify-center overflow-hidden relative shadow-md bg-white p-[2px]"
        >
          <div className="w-full h-full rounded-full overflow-hidden relative">
            <Image src="/images/couple/hero.webp" alt="Nhạc nền" fill className="object-cover" />
            <div className="absolute inset-0 bg-black/10" />
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="w-3 h-3 bg-white rounded-full shadow-inner border border-gray-200" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
