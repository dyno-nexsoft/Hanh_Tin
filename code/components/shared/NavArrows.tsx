"use client";

import { motion } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";

interface NavArrowsProps {
  /// undefined nghĩa là đang ở slide đầu/cuối — button sẽ bị disable
  onPrev?: () => void;
  onNext?: () => void;
}

/// Nút điều hướng lên/xuống — đặt ở cạnh phải màn hình desktop.
/// Đúng theo layout TikTok web: tách hoàn toàn khỏi action sidebar,
/// nằm ở far-right edge của content area.
export default function NavArrows({ onPrev, onNext }: NavArrowsProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <motion.button
        whileTap={onPrev ? { scale: 0.88 } : undefined}
        onClick={onPrev}
        className={`w-10 h-10 rounded-full bg-black/[0.06] hover:bg-black/[0.12] flex items-center justify-center transition-all duration-200 ${
          onPrev ? "opacity-100 cursor-pointer" : "opacity-0 pointer-events-none"
        }`}
        title="Slide trước"
      >
        <ChevronUp size={22} strokeWidth={2.5} className="text-gray-700" />
      </motion.button>

      <motion.button
        whileTap={onNext ? { scale: 0.88 } : undefined}
        onClick={onNext}
        className={`w-10 h-10 rounded-full bg-black/[0.06] hover:bg-black/[0.12] flex items-center justify-center transition-all duration-200 ${
          onNext ? "opacity-100 cursor-pointer" : "opacity-0 pointer-events-none"
        }`}
        title="Slide tiếp theo"
      >
        <ChevronDown size={22} strokeWidth={2.5} className="text-gray-700" />
      </motion.button>
    </div>
  );
}
