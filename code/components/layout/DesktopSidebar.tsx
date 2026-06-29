"use client";

import { motion } from "framer-motion";
import { WeddingSide } from "@/lib/types";
import { BRIDE, GROOM } from "@/lib/config/wedding";

interface DesktopSidebarProps {
  currentSection: number;
  totalSections: number;
  side: WeddingSide;
  onNavigate: (index: number) => void;
  isDark?: boolean;
}

/// Apple Style Desktop Navigation Sidebar
export default function DesktopSidebar({
  currentSection,
  totalSections,
  side,
  onNavigate,
  isDark = false,
}: DesktopSidebarProps) {
  void side;
  void isDark;
  const sections = [
    { id: 0, label: "Trang chủ" },
    { id: 1, label: "Gia đình" },
    { id: 2, label: "Sự kiện" },
    { id: 3, label: "Album" },
    { id: 4, label: "Bản đồ" },
    { id: 5, label: "Cảm ơn" },
  ];

  return (
    <aside
      className="hidden lg:flex w-[260px] h-full flex-col justify-between py-10 px-8 shrink-0 relative z-40 bg-[#F5F5F7]"
      style={{
        borderRight: '1px solid rgba(0,0,0,0.05)',
      }}
    >
      {/* Header — Couple Name */}
      <div className="flex flex-col items-start gap-1">
        <h1 className="font-sans text-2xl font-bold tracking-tighter text-[#1D1D1F]">
          {GROOM.name}
          <span className="text-[#86868B] mx-2">&amp;</span>
          {BRIDE.name}
        </h1>
        <p className="font-sans text-[11px] font-semibold tracking-widest uppercase text-[#86868B]">
          Wedding Invitation
        </p>
      </div>

      {/* Navigation Menu */}
      <nav className="flex flex-col gap-1 w-full mt-10 flex-1">
        {sections.slice(0, totalSections).map((section, idx) => {
          const isActive = currentSection === idx;
          return (
            <button
              key={section.id}
              onClick={() => onNavigate(idx)}
              className="group relative flex items-center w-full py-2.5 px-3 rounded-lg transition-all duration-300 outline-none text-left"
            >
              {/* Active Background Pill */}
              {isActive && (
                <motion.div
                  layoutId="desktop-nav-pill"
                  className="absolute inset-0 bg-white rounded-lg shadow-sm border border-black/5"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}

              {/* Text */}
              <span
                className={`relative z-10 font-sans text-[14px] font-medium transition-colors duration-300 ml-1 ${
                  isActive ? "text-[#1D1D1F] font-semibold" : "text-[#86868B] group-hover:text-[#1D1D1F]"
                }`}
              >
                {section.label}
              </span>

              {/* Active Dot Indicator */}
              {isActive && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="relative z-10 w-1.5 h-1.5 rounded-full ml-auto mr-1 bg-[#0071E3]"
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="mt-auto pt-8 border-t border-black/5">
        <p className="font-sans text-[11px] font-semibold tracking-wider text-[#86868B] uppercase mb-1">
          Lễ Cưới
        </p>
        <p className="font-sans text-sm font-semibold text-[#1D1D1F]">
          Năm 2024
        </p>
      </div>
    </aside>
  );
}
