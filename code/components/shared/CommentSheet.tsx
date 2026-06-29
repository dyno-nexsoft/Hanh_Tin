"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Drawer } from "vaul";
import { X, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { getWishes, addWish } from "@/lib/firebase/services";
import { WishData } from "@/lib/types";
import { getInitials } from "@/lib/utils/strings";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";

interface CommentProps {
  isOpen: boolean;
  onClose: () => void;
  guestName?: string;
}

// ─── Shared logic hook ────────────────────────────────────────────────────

function useCommentLogic(isOpen: boolean, guestName?: string) {
  const [wishes, setWishes] = useState<WishData[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchWishes = async () => {
    try {
      const data = await getWishes();
      setWishes(data);
    } catch (error) {
      // Ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(true);
      fetchWishes();
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await addWish({ name: guestName || "Quý khách", message: newComment.trim() });
      setNewComment("");
      await fetchWishes();
    } catch (error) {
      // Ignore
    } finally {
      setIsSubmitting(false);
    }
  };

  return { wishes, loading, newComment, setNewComment, isSubmitting, handleSubmit };
}

// ─── Desktop: Inline Panel ────────────────────────────────────────────────

export function CommentPanelDesktop({ isOpen, onClose, guestName }: CommentProps) {
  const { wishes, loading, newComment, setNewComment, isSubmitting, handleSubmit } =
    useCommentLogic(isOpen, guestName);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 380, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ type: "spring", damping: 30, stiffness: 260 }}
          className="h-full flex flex-col overflow-hidden shrink-0"
          style={{
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(40px)',
            WebkitBackdropFilter: 'blur(40px)',
            borderLeft: '1px solid rgba(0, 0, 0, 0.05)',
            minWidth: 0,
          }}
        >
          {/* Header */}
          <div
            className="flex justify-between items-center px-5 py-4 shrink-0"
            style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.05)' }}
          >
            <div>
              <h3 className="font-sans font-bold text-lg text-[#1D1D1F] flex items-center gap-2">
                Lời chúc
                <span className="text-sm font-semibold px-2 py-0.5 rounded-full bg-black/5 text-[#86868B]">
                  {wishes.length}
                </span>
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full transition-colors bg-black/5 text-[#86868B] hover:bg-black/10 hover:text-[#1D1D1F]"
              aria-label="Đóng"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto hide-scrollbar">
            <div className="p-4 space-y-6">
              {loading ? (
                <_LoadingState />
              ) : wishes.length === 0 ? (
                <_EmptyState />
              ) : (
                wishes.map((wish, idx) => <WishItem key={idx} wish={wish} />)
              )}
            </div>
          </div>

          {/* Input */}
          <_CommentInput
            guestName={guestName}
            newComment={newComment}
            onChange={setNewComment}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Mobile: Bottom Sheet ─────────────────────────────────────────────────

export default function CommentSheet({ isOpen, onClose, guestName }: CommentProps) {
  const { wishes, loading, newComment, setNewComment, isSubmitting, handleSubmit } =
    useCommentLogic(isOpen, guestName);

  return (
    <Drawer.Root open={isOpen} onOpenChange={(open) => !open && onClose()} shouldScaleBackground>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/30 z-[60] backdrop-blur-sm" />
        
        <Drawer.Content
          className="fixed bottom-0 left-0 right-0 h-[80vh] rounded-t-[32px] z-[70] flex flex-col shadow-2xl outline-none"
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(40px)',
            WebkitBackdropFilter: 'blur(40px)',
            borderTop: '1px solid rgba(255,255,255,0.4)'
          }}
        >
          {/* Draggable Header */}
          <div className="w-full flex flex-col shrink-0">
            <div className="w-full flex justify-center py-3">
              <div className="w-12 h-1.5 rounded-full bg-[#E8E8ED]" />
            </div>

            <div
              className="flex justify-between items-center px-6 pb-4"
              style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}
            >
              <div>
                <h3 className="font-sans font-bold text-xl text-[#1D1D1F]">Lời chúc</h3>
                <p className="text-xs font-semibold text-[#86868B] mt-0.5">
                  {wishes.length} bình luận
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-[#F5F5F7] text-[#86868B] active:scale-95 transition-transform"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto hide-scrollbar">
            <div className="p-6 space-y-6">
              {loading ? (
                <_LoadingState />
              ) : wishes.length === 0 ? (
                <_EmptyState />
              ) : (
                wishes.map((wish, idx) => <WishItem key={idx} wish={wish} />)
              )}
            </div>
          </div>

          {/* Input */}
          <div className="shrink-0">
            <_CommentInput
              guestName={guestName}
              newComment={newComment}
              onChange={setNewComment}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

// ─── Shared UI Components ─────────────────────────────────────────────────

const AVATAR_COLORS = [
  '#E6F0FF', // Soft Blue
  '#E8F5E9', // Soft Green
  '#FFF0E6', // Soft Orange
  '#FCE4EC', // Soft Pink
  '#F3E5F5', // Soft Purple
  '#FFF8D6', // Soft Yellow
];

function getAvatarColor(name: string) {
  if (!name) return '#F5F5F7';
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
}

interface CommentInputProps {
  guestName?: string;
  newComment: string;
  onChange: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
}

function _CommentInput({ guestName, newComment, onChange, onSubmit, isSubmitting }: CommentInputProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="p-4 sm:p-5 shrink-0 bg-white"
      style={{ borderTop: '1px solid rgba(0,0,0,0.05)' }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold font-sans flex-shrink-0"
          style={{ background: guestName ? getAvatarColor(guestName) : '#F5F5F7', color: '#1D1D1F', border: '1px solid rgba(0,0,0,0.05)' }}
        >
          {guestName ? getInitials(guestName) : "Q"}
        </div>
        <div className="flex-1 relative">
          <input
            id="comment-input"
            name="comment"
            type="text"
            value={newComment}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Viết lời chúc..."
            className="w-full rounded-full px-4 py-2.5 text-[15px] focus:outline-none pr-14 font-sans border transition-colors"
            style={{
              background: '#F5F5F7',
              borderColor: 'transparent',
              color: '#1D1D1F',
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = '#0071E3'; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = 'transparent'; }}
          />
          <button
            type="submit"
            disabled={!newComment.trim() || isSubmitting}
            className="absolute right-4 top-1/2 -translate-y-1/2 font-semibold text-sm transition-colors font-sans"
            style={{ color: !newComment.trim() || isSubmitting ? '#86868B' : '#0071E3' }}
          >
            {isSubmitting ? "..." : "Gửi"}
          </button>
        </div>
      </div>
    </form>
  );
}

function _LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-3">
      <div
        className="w-6 h-6 border-[3px] rounded-full animate-spin"
        style={{ borderColor: 'rgba(0,0,0,0.1)', borderTopColor: '#0071E3' }}
      />
      <p className="text-[13px] font-sans font-medium text-[#86868B]">Đang tải...</p>
    </div>
  );
}

function _EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-3">
      <div className="w-12 h-12 rounded-full bg-[#F5F5F7] flex items-center justify-center mb-2">
        <span className="text-xl">✍️</span>
      </div>
      <p className="text-[14px] font-sans font-medium text-[#1D1D1F] text-center">
        Chưa có lời chúc nào.<br />
        <span className="text-[#86868B] text-[13px]">Hãy là người đầu tiên gửi lời chúc!</span>
      </p>
    </div>
  );
}

function WishItem({ wish }: { wish: WishData }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [liked, setLiked] = useState(false);

  return (
    <div className="flex gap-3 items-start">
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold font-sans text-[13px]"
        style={{ background: getAvatarColor(wish.name), color: '#1D1D1F', border: '1px solid rgba(0,0,0,0.05)' }}
      >
        {getInitials(wish.name)}
      </div>
      <div className="flex-1 min-w-0 font-sans">
        <p className="font-semibold text-[14px] text-[#1D1D1F] mb-0.5 tracking-tight">{wish.name}</p>
        <p className="text-[15px] leading-relaxed break-words text-[#1D1D1F]">{wish.message}</p>
        <div className="flex items-center gap-4 mt-1.5 text-[13px]">
          <span className="text-[#86868B] font-medium">
            {wish.createdAt
              ? formatDistanceToNow(wish.createdAt.toDate(), { addSuffix: true, locale: vi })
              : "Vừa xong"}
          </span>
          <button className="font-semibold text-[#86868B] hover:text-[#0071E3] transition-colors">
            Trả lời
          </button>
        </div>
      </div>
      <button onClick={() => setLiked((l) => !l)} className="flex flex-col items-center transition-colors pt-1 px-1">
        <Heart
          size={16}
          strokeWidth={liked ? 0 : 2}
          fill={liked ? "#FF3B30" : "none"}
          className={liked ? "text-[#FF3B30]" : "text-[#86868B]"}
        />
        <span className="text-[11px] mt-1 font-sans font-semibold text-[#86868B]">
          {liked ? 1 : 0}
        </span>
      </button>
    </div>
  );
}
