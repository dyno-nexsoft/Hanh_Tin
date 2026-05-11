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
  isLiked: boolean;
  likeCount: number | string;
  commentCount: number | string;
  isPlaying: boolean;
  isDark?: boolean;
}

/// Sidebar tương tác kiểu TikTok — đặt ngay bên phải nội dung.
/// Mỗi nút có nền tròn xám mờ đúng theo thiết kế TikTok web.
/// Tự động chuyển màu trắng/tối dựa trên thuộc tính isDark.
export default function InteractionSidebar({
  onLike,
  onComment,
  onGift,
  onAddToCalendar,
  onToggleMusic,
  isLiked,
  likeCount,
  commentCount,
  isPlaying,
  isDark = false,
}: InteractionSidebarProps) {
  const iconColorClass = isDark ? "text-white" : "text-gray-800";

  return (
    <div className="flex flex-col items-center gap-3 select-none">

      {/* Avatar + Add to Calendar */}
      <div className="relative cursor-pointer mb-1 group" onClick={onAddToCalendar} title="Thêm vào lịch">
        <div className="w-11 h-11 rounded-full border-2 border-white overflow-hidden shadow-md">
          <Image src="/images/couple/hero.webp" alt="Couple" width={44} height={44} className="object-cover w-full h-full" />
        </div>
        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 bg-[#EA4335] text-white w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
          <CalendarPlus className="w-2.5 h-2.5" />
        </div>
      </div>

      {/* Like */}
      <_ActionButton label={likeCount.toString()} onClick={onLike} isDark={isDark}>
        <Heart
          size={26}
          strokeWidth={0}
          fill={isLiked ? "#EA4335" : "currentColor"}
          className={`transition-colors duration-200 ${isLiked ? "text-[#EA4335]" : iconColorClass}`}
        />
      </_ActionButton>

      {/* Comment */}
      <_ActionButton label={commentCount.toString()} onClick={onComment} isDark={isDark}>
        <MessageCircle size={26} strokeWidth={0} fill="currentColor" className={iconColorClass} />
      </_ActionButton>

      {/* Gift (thay Bookmark) */}
      <_ActionButton label="Quà" onClick={onGift} isDark={isDark}>
        <Gift size={26} strokeWidth={0} fill="currentColor" className={iconColorClass} />
      </_ActionButton>

      {/* Music Disc */}
      <_MusicDisc isPlaying={isPlaying} onToggle={onToggleMusic} isDark={isDark} />
    </div>
  );
}

// ─── Private Sub-components ───────────────────────────────────────────────

interface ActionButtonProps {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
  isDark?: boolean;
}

/// Nút tương tác với nền tròn xám — đúng thiết kế TikTok web
function _ActionButton({ label, onClick, children, isDark = false }: ActionButtonProps) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <motion.button
        whileTap={{ scale: 0.85 }}
        whileHover={{ scale: 1.08 }}
        onClick={onClick}
        className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors duration-150 ${
          isDark 
            ? "bg-white/10 hover:bg-white/20" 
            : "bg-black/[0.06] hover:bg-black/[0.12]"
        }`}
      >
        {children}
      </motion.button>
      <span className={`text-[11px] font-semibold font-sans leading-none drop-shadow-md ${isDark ? "text-white" : "text-gray-700"}`}>
        {label}
      </span>
    </div>
  );
}

interface MusicDiscProps {
  isPlaying: boolean;
  onToggle: () => void;
  isDark?: boolean;
}

/// Đĩa nhạc quay — giống biểu tượng nhạc TikTok
function _MusicDisc({ isPlaying, onToggle, isDark = false }: MusicDiscProps) {
  return (
    <div className="flex flex-col items-center mt-1 relative">
      <AnimatePresence>
        {isPlaying && (
          <>
            {[1, 2, 3].map((i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 0, x: 0, scale: 0.5 }}
                animate={{ opacity: [0, 1, 0], y: -50 - i * 15, x: i % 2 === 0 ? 16 : -16, scale: [0.5, 1.1, 0.8] }}
                transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.65, ease: "easeOut" }}
                className={`absolute pointer-events-none z-0 select-none ${isDark ? "text-white/80" : "text-gray-700"}`}
                style={{ fontSize: 12 + i * 2 }}
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
        className="w-11 h-11 cursor-pointer relative z-10"
        onClick={onToggle}
        title={isPlaying ? "Tạm dừng nhạc" : "Phát nhạc"}
      >
        <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center border-[7px] border-gray-700 shadow-md overflow-hidden relative">
          <Image src="/images/couple/hero.webp" alt="Nhạc nền" fill className="object-cover" />
          <div className="absolute w-[4px] h-[4px] bg-white/20 rounded-full z-10 backdrop-blur-sm shadow-sm" />
          <div className="absolute w-[2px] h-[2px] bg-gray-900 rounded-full z-10" />
        </div>
      </motion.div>
    </div>
  );
}
