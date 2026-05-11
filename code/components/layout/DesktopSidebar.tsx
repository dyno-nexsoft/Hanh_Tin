"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { BRIDE, GROOM, WEDDING_DATA } from "@/lib/config/wedding";

/// Các section trong thiệp mời — map với index của snap slides
const NAV_ITEMS = [
  { label: "Lời mời", emoji: "💌", index: 0 },
  { label: "Gia đình", emoji: "👨‍👩‍👧", index: 1 },
  { label: "Lịch cưới", emoji: "📅", index: 2 },
  { label: "Album ảnh", emoji: "🖼️", index: 3 },
  { label: "Địa điểm", emoji: "📍", index: 4 },
  { label: "Lời cảm ơn", emoji: "✨", index: 5 },
];

interface DesktopSidebarProps {
  /// Index của slide đang được hiển thị
  activeIndex: number;
  /// Scroll đến một slide cụ thể
  onNavigate: (index: number) => void;
}

/// Left sidebar hiển thị trên desktop (≥1024px).
/// Mô phỏng navigation sidebar của TikTok web, nhưng thay bằng logo cặp đôi và section nav.
export default function DesktopSidebar({
  activeIndex,
  onNavigate,
}: DesktopSidebarProps) {
  return (
    <aside className="hidden lg:flex flex-col h-dvh bg-white/95 backdrop-blur-xl border-r border-black/[0.06] overflow-hidden"
      style={{ width: "var(--left-sidebar-width)" }}
    >
      {/* Couple Logo / Branding */}
      <div className="flex flex-col items-center pt-8 pb-6 px-4 border-b border-black/[0.06]">
        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-wedding-red/20 shadow-lg mb-3">
          <Image
            src="/images/couple/hero.webp"
            alt="Hạnh & Tín"
            fill
            className="object-cover"
          />
        </div>
        <h2 className="font-script text-wedding-red text-xl leading-tight text-center">
          {GROOM.name} &amp; {BRIDE.name}
        </h2>
        <p className="text-[10px] text-gray-400 tracking-[0.3em] uppercase mt-1 font-sans">
          {format(WEDDING_DATA.bride.weddingDate, "dd · MM · yyyy")}
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 overflow-y-auto hide-scrollbar">
        <ul className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activeIndex === item.index;
            return (
              <li key={item.index}>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onNavigate(item.index)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left
                    transition-all duration-200 font-sans text-sm font-medium
                    ${isActive
                      ? "bg-wedding-red/10 text-wedding-red"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                    }
                  `}
                >
                  <span className="text-base w-5 text-center">{item.emoji}</span>
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-indicator"
                      className="ml-auto w-1.5 h-4 bg-wedding-red rounded-full"
                    />
                  )}
                </motion.button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer — slide dots */}
      <div className="pb-6 px-4 flex justify-center gap-1.5">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.index}
            onClick={() => onNavigate(item.index)}
            className={`rounded-full transition-all duration-300 ${
              activeIndex === item.index
                ? "w-4 h-1.5 bg-wedding-red"
                : "w-1.5 h-1.5 bg-gray-200"
            }`}
          />
        ))}
      </div>
    </aside>
  );
}
