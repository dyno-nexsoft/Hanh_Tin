"use client";

import { useState, useEffect, Suspense, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import EnvelopeCover from "@/components/cover/EnvelopeCover";
import HeroSection from "@/components/sections/HeroSection";
import FamilySection from "@/components/sections/FamilySection";
import CalendarSection from "@/components/sections/CalendarSection";
import MapSection from "@/components/sections/MapSection";
import GallerySection from "@/components/sections/GallerySection";
import FooterSection from "@/components/sections/FooterSection";
import DigitalGiftModal from "@/components/shared/DigitalGiftModal";
import InteractionSidebar from "@/components/shared/InteractionSidebar";
import NavArrows from "@/components/shared/NavArrows";
import CommentSheet, { CommentPanelDesktop } from "@/components/shared/CommentSheet";
import DesktopSidebar from "@/components/layout/DesktopSidebar";
import { WEDDING_DATA, BRIDE, GROOM } from "@/lib/config/wedding";
import { WeddingSide, WeddingSlideBg } from "@/lib/types";
import { useMusic } from "@/lib/hooks/useMusic";
import { getWishes } from "@/lib/firebase/services";

interface WeddingPageProps {
  side: WeddingSide;
}

const SECTION_COUNT = 6;

/// Màu nền cho từng slide — dùng để style thanh sidebar action đúng màu
const SLIDE_BG: Record<number, WeddingSlideBg> = {
  0: "light",
  1: "light",
  2: "dark", // calendar section: mobile is dark, desktop is light (handled in render)
  3: "dark", // gallery: bg đen
  4: "light",
  5: "dark", // footer: bg tối
};

export default function WeddingPage({ side }: WeddingPageProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#7B171B]" />}>
      <WeddingPageContent side={side} />
    </Suspense>
  );
}

function WeddingPageContent({ side }: WeddingPageProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false);
  const [isCommentSheetOpen, setIsCommentSheetOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const [isLiked, setIsLiked] = useState(false);
  const likeCount = "12.4K";
  const [commentCount, setCommentCount] = useState<number | string>("...");

  const searchParams = useSearchParams();
  const guestName = searchParams.get("to") || undefined;

  const { isPlaying, toggle, play } = useMusic("/audio/song.m4a");

  const containerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  // ─── Fetch real comment count ───
  useEffect(() => {
    getWishes()
      .then((wishes) => setCommentCount(wishes.length))
      .catch(() => setCommentCount(0));
  }, []);

  // ─── Restore liked state ───
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("isLiked") === "true") {
      setIsLiked(true);
    }
  }, []);

  // ─── Auto-open comments on desktop on initial load ───
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth >= 1024) {
      setIsCommentSheetOpen(true);
    }
  }, []);

  // ─── Lock body scroll ───
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "unset"; };
  }, []);

  // ─── IntersectionObserver: track active slide ───
  useEffect(() => {
    if (!isOpened) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = slideRefs.current.indexOf(entry.target as HTMLDivElement);
            if (idx !== -1) setActiveIndex(idx);
          }
        }
      },
      { root: containerRef.current, threshold: 0.6 }
    );
    slideRefs.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [isOpened]);

  // ─── Handlers ───
  const handleOpenEnvelope = () => { setIsOpened(true); play(); };

  const handleLike = () => {
    const newLiked = !isLiked;
    setIsLiked(newLiked);
    if (typeof window !== "undefined") localStorage.setItem("isLiked", String(newLiked));
  };

  const handleNavigate = useCallback((index: number) => {
    slideRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handlePrev = activeIndex > 0 ? () => handleNavigate(activeIndex - 1) : undefined;
  const handleNext = activeIndex < SECTION_COUNT - 1 ? () => handleNavigate(activeIndex + 1) : undefined;

  const handleAddToCalendar = () => {
    const data = WEDDING_DATA[side];
    const d = data.weddingDate;
    const pad = (n: number) => String(n).padStart(2, "0");
    const start = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;
    const end = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours() + 3)}${pad(d.getMinutes())}00`;
    const title = encodeURIComponent(`Đám cưới ${GROOM.name} & ${BRIDE.name}`);
    const details = encodeURIComponent("Trân trọng kính mời bạn đến dự lễ cưới của chúng tôi!");
    const location = encodeURIComponent(`${data.venue.name}, ${data.venue.address}`);
    window.open(`https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}&ctz=Asia/Ho_Chi_Minh`, "_blank");
  };

  /// Màu theme cho action sidebar dựa vào slide hiện tại
  const isDarkSlide = SLIDE_BG[activeIndex] === "dark";

  const sections = [
    <HeroSection key="hero" side={side} />,
    <FamilySection key="family" side={side} />,
    <CalendarSection key="calendar" side={side} />,
    <GallerySection key="gallery" />,
    <MapSection key="map" side={side} />,
    <FooterSection key="footer" />,
  ];

  const slideBgColors = ["#ffffff", "#FDF8F0", "#7B171B", "#0a0a0a", "#FDF8F0", "#000000"];

  return (
    <main className="min-h-dvh bg-black overflow-hidden relative">
      {!isOpened && <EnvelopeCover onOpen={handleOpenEnvelope} guestName={guestName} />}

      <AnimatePresence>
        {isOpened && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="h-dvh w-full flex"
          >
            {/* ── LEFT NAV SIDEBAR (Desktop only) ── */}
            <DesktopSidebar activeIndex={activeIndex} onNavigate={handleNavigate} />

            {/* ── CONTENT AREA ── */}
            <div
              className="flex-1 relative overflow-hidden flex transition-colors duration-500"
              style={{ background: slideBgColors[activeIndex] }}
            >

              {/* Snap Scroll Feed */}
              <div className="flex-1 relative overflow-hidden">
                <div
                  ref={containerRef}
                  className="snap-container-y hide-scrollbar absolute inset-0"
                >
                  {sections.map((section, idx) => {
                    const needsPadding = idx === 1 || idx === 2; // Chỉ padding cho Family Section và Calendar Section
                    return (
                      <div
                        key={idx}
                        ref={(el) => { slideRefs.current[idx] = el; }}
                        className="snap-slide-y transition-all duration-300 pr-0"
                        style={{ background: slideBgColors[idx] }}
                      >
                        {section}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 
                ── DESKTOP INTERACTION LAYOUT (đúng chuẩn TikTok) ──
                
                Layout: [Action Sidebar] [NavArrows]
                - Action Sidebar: sát phải video
                - NavArrows: far-right edge, tách biệt hoàn toàn
                
                Ref: tiktok.png & tiktok_with_comment.png
              */}
              <div className={`
                hidden lg:flex items-center gap-3 pr-3 pl-2 shrink-0
                ${isDarkSlide ? "text-white [&_button]:bg-white/10 [&_button:hover]:bg-white/20 [&_span]:text-white [&_.text-gray-700]:text-white [&_.text-gray-800]:text-white" : ""}
              `}>
                {/* Action Sidebar */}
                <InteractionSidebar
                  onLike={handleLike}
                  onComment={() => setIsCommentSheetOpen(true)}
                  onGift={() => setIsGiftModalOpen(true)}
                  onAddToCalendar={handleAddToCalendar}
                  onToggleMusic={toggle}
                  isLiked={isLiked}
                  likeCount={likeCount}
                  commentCount={commentCount}
                  isPlaying={isPlaying}
                  isDark={isDarkSlide}
                />

                {/* NavArrows — far-right, tách biệt */}
                <NavArrows onPrev={handlePrev} onNext={handleNext} />
              </div>

              {/* CommentPanel Desktop — INLINE, không phải overlay/drawer */}
              <div className="hidden lg:self-stretch lg:flex">
                <CommentPanelDesktop
                  isOpen={isCommentSheetOpen}
                  onClose={() => setIsCommentSheetOpen(false)}
                  guestName={guestName}
                />
              </div>
            </div>

            {/* ── MOBILE: InteractionSidebar fixed bottom-right ── */}
            <div className="lg:hidden fixed right-3 bottom-6 z-50">
              <InteractionSidebar
                onLike={handleLike}
                onComment={() => setIsCommentSheetOpen(true)}
                onGift={() => setIsGiftModalOpen(true)}
                onAddToCalendar={handleAddToCalendar}
                onToggleMusic={toggle}
                isLiked={isLiked}
                likeCount={likeCount}
                commentCount={commentCount}
                isPlaying={isPlaying}
                isDark={activeIndex === 2 ? false : isDarkSlide}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MODALS ── */}
      <DigitalGiftModal side={side} isOpen={isGiftModalOpen} onClose={() => setIsGiftModalOpen(false)} />
      {/* Mobile only — Desktop dùng CommentPanelDesktop inline */}
      <div className="lg:hidden">
        <CommentSheet isOpen={isCommentSheetOpen} onClose={() => setIsCommentSheetOpen(false)} guestName={guestName} />
      </div>
    </main>
  );
}
