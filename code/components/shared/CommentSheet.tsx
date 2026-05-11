"use client";

import { motion, AnimatePresence, useDragControls } from "framer-motion";
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

/// Hook tái sử dụng data + submit logic giữa desktop panel và mobile sheet
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
      // Bỏ qua lỗi lấy dữ liệu
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
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
      // Bỏ qua lỗi gửi
    } finally {
      setIsSubmitting(false);
    }
  };

  return { wishes, loading, newComment, setNewComment, isSubmitting, handleSubmit };
}

// ─── Desktop: Inline Panel (không phải overlay/drawer) ───────────────────

/// Desktop comment panel — INLINE trong flex layout giống TikTok web.
/// Không dùng fixed/overlay, mà render như cột thứ 4 trong layout.
/// WeddingPage sẽ dùng AnimatePresence để show/hide với animation width.
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
          className="h-full bg-white border-l border-black/[0.06] flex flex-col overflow-hidden shrink-0"
          style={{ minWidth: 0 }}
        >
          {/* Header */}
          <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100 shrink-0">
            <div>
              <h3 className="font-sans font-bold text-base text-gray-900 flex items-center gap-2">
                Lời chúc
                <span className="text-sm font-normal text-gray-400">{wishes.length}</span>
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Đóng"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto hide-scrollbar">
            <div className="p-4 space-y-5">
              {loading ? (
                <_LoadingState />
              ) : wishes.length === 0 ? (
                <_EmptyState />
              ) : (
                wishes.map((wish, idx) => <_WishItem key={idx} wish={wish} />)
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

/// Mobile comment bottom sheet — trượt từ dưới lên, có drag-to-close.
export default function CommentSheet({ isOpen, onClose, guestName }: CommentProps) {
  const { wishes, loading, newComment, setNewComment, isSubmitting, handleSubmit } =
    useCommentLogic(isOpen, guestName);

  const dragControls = useDragControls();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-[2px]"
          />

          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            drag="y"
            dragControls={dragControls}
            dragListener={false}
            dragConstraints={{ top: 0 }}
            dragElastic={0.2}
            onDragEnd={(_: unknown, info: { offset: { y: number } }) => {
              if (info.offset.y > 100) onClose();
            }}
            className="fixed bottom-0 left-0 right-0 h-[75vh] bg-white rounded-t-3xl z-[70] flex flex-col shadow-2xl"
          >
            {/* Drag Handle */}
            <div 
              className="w-full flex justify-center py-4 cursor-grab active:cursor-grabbing touch-none"
              onPointerDown={(e) => dragControls.start(e)}
            >
              <div className="w-12 h-1.5 bg-gray-200 rounded-full" />
            </div>

            {/* Header */}
            <div className="flex justify-between items-center px-5 pb-4 border-b border-gray-100">
              <div>
                <h3 className="font-sans font-bold text-base text-gray-900">Lời chúc</h3>
                <p className="text-xs text-gray-400 font-sans mt-0.5">{wishes.length} lời chúc</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Đóng"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto hide-scrollbar">
              <div className="p-4 space-y-5">
                {loading ? (
                  <_LoadingState />
                ) : wishes.length === 0 ? (
                  <_EmptyState />
                ) : (
                  wishes.map((wish, idx) => <_WishItem key={idx} wish={wish} />)
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
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Shared UI Components ─────────────────────────────────────────────────

interface CommentInputProps {
  guestName?: string;
  newComment: string;
  onChange: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
}

function _CommentInput({ guestName, newComment, onChange, onSubmit, isSubmitting }: CommentInputProps) {
  return (
    <form onSubmit={onSubmit} className="border-t border-gray-100 p-4 bg-white shrink-0">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-wedding-red flex items-center justify-center text-xs font-bold text-white flex-shrink-0 font-sans">
          {guestName ? getInitials(guestName) : "B"}
        </div>
        <div className="flex-1 relative">
          <input
            type="text"
            value={newComment}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Gửi lời chúc mừng..."
            className="w-full bg-gray-100 rounded-full px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-wedding-red/30 pr-14 font-sans"
          />
          <button
            type="submit"
            disabled={!newComment.trim() || isSubmitting}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-wedding-red font-bold text-sm disabled:text-gray-300 transition-colors font-sans"
          >
            {isSubmitting ? "..." : "Đăng"}
          </button>
        </div>
      </div>
    </form>
  );
}

// Xóa _getInitials duplicate

function _LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-3">
      <div className="w-6 h-6 border-2 border-wedding-red/30 border-t-wedding-red rounded-full animate-spin" />
      <p className="text-sm text-gray-400 font-sans">Đang tải lời chúc...</p>
    </div>
  );
}

function _EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-2">
      <span className="text-3xl">💌</span>
      <p className="text-sm text-gray-400 font-sans text-center">
        Chưa có lời chúc nào.
        <br />
        Hãy là người đầu tiên!
      </p>
    </div>
  );
}

function _WishItem({ wish }: { wish: WishData }) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="flex gap-3 items-start">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-wedding-red flex items-center justify-center flex-shrink-0 text-white font-bold font-sans text-sm shadow-sm">
        {getInitials(wish.name)}
      </div>
      <div className="flex-1 min-w-0 font-sans">
        <p className="font-bold text-xs text-gray-900 mb-0.5">{wish.name}</p>
        <p className="text-sm text-gray-700 leading-relaxed break-words">{wish.message}</p>
        <div className="flex items-center gap-4 mt-1.5 text-xs text-gray-400">
          <span>
            {wish.createdAt
              ? formatDistanceToNow(wish.createdAt.toDate(), { addSuffix: true, locale: vi })
              : "Vừa xong"}
          </span>
          <button className="font-semibold hover:text-gray-700 transition-colors">Trả lời</button>
        </div>
      </div>
      <button onClick={() => setLiked((l) => !l)} className="flex flex-col items-center transition-colors pt-1">
        <Heart
          size={16}
          strokeWidth={liked ? 0 : 1.5}
          fill={liked ? "#EA4335" : "none"}
          className={liked ? "text-red-500" : "text-gray-300"}
        />
        <span className="text-[10px] mt-0.5 font-sans text-gray-400">{liked ? 1 : 0}</span>
      </button>
    </div>
  );
}
