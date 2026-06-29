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
import RSVPSection from "@/components/sections/RSVPSection";
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

import FloatingHeartSystem from "@/components/shared/FloatingHeart";
interface WeddingPageProps {
  side: WeddingSide;
}

const SECTION_COUNT = 6;

/// Màu nền cho từng slide — dùng để style thanh sidebar action đúng màu
const SLIDE_BG: Record<number, WeddingSlideBg> = {
  0: "light",
  1: "light",
  2: "light",  // calendar
  3: "light",  // gallery
  4: "light",  // rsvp
  5: "light",  // map
  6: "light",  // footer
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
  const [isDesktop, setIsDesktop] = useState(false);

  const searchParams = useSearchParams();
  const guestName = searchParams.get("to") || undefined;

  const { isPlaying, toggle, play } = useMusic("/audio/song.m4a");

  const containerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number; angle: number }[]>([]);

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

  // ─── Track screen size (isDesktop) ───
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ─── Auto-open comments on desktop on initial load ───
  useEffect(() => {
    if (isDesktop) {
      setIsCommentSheetOpen(true);
    }
  }, [isDesktop]);

  // ─── Lock body scroll ───
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
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
      { root: containerRef.current, threshold: 0.5 }
    );
    slideRefs.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [isOpened]);

  // ─── Handlers ───
  const handleNavigate = useCallback((index: number) => {
    slideRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // ─── Keyboard Navigation ───
  useEffect(() => {
    if (!isOpened) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        if (activeIndex > 0) handleNavigate(activeIndex - 1);
      } else if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        if (activeIndex < SECTION_COUNT - 1) handleNavigate(activeIndex + 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpened, activeIndex, handleNavigate]);

  // ─── Handlers ───
  const handleOpenEnvelope = () => { setIsOpened(true); play(); };

  const handleLike = () => {
    const newLiked = !isLiked;
    setIsLiked(newLiked);
    if (typeof window !== "undefined") localStorage.setItem("isLiked", String(newLiked));
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    if (!isLiked) {
      handleLike();
    }
    // Haptic feedback trên mobile
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(50);
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const angle = Math.random() * 40 - 20;
    const id = Date.now();
    setHearts((prev) => [...prev, { id, x, y, angle }]);
  };

  const handleShare = async () => {
    const url = window.location.href;
    const shareData = {
      title: `Thiệp cưới Hạnh & Tín`,
      text: `Trân trọng kính mời bạn đến dự đám cưới của Hạnh & Tín!`,
      url,
    };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch { /* ignored */ }
    } else {
      await navigator.clipboard.writeText(url);
      alert("Đã sao chép link thiệp vào clipboard!");
    }
  };

  const handleHeartComplete = useCallback((id: number) => {
    setHearts((prev) => prev.filter((h) => h.id !== id));
  }, []);

  // handlePrev and handleNext moved down
  const handleAddToCalendar = () => {
    const data = WEDDING_DATA[side];
    const d = data.weddingDate;
    const pad = (n: number) => String(n).padStart(2, "0");
    const endDate = new Date(d.getTime() + 3 * 60 * 60 * 1000);
    
    const formatCalDate = (date: Date) => {
      return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}T${pad(date.getHours())}${pad(date.getMinutes())}00`;
    };
    
    const start = formatCalDate(d);
    const end = formatCalDate(endDate);
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
    <RSVPSection key="rsvp" guestName={guestName} />,
    <MapSection key="map" side={side} />,
    <FooterSection key="footer" />,
  ];

  const handlePrev = activeIndex > 0 ? () => handleNavigate(activeIndex - 1) : () => {};
  const handleNext = activeIndex < sections.length - 1 ? () => handleNavigate(activeIndex + 1) : () => {};

  const slideBgColors = ["#ffffff", "#FDF8F0", "#7B171B", "#0a0a0a", "#FDF8F0", "#000000"];

  return (
    <main vaul-drawer-wrapper="" className="min-h-dvh bg-black overflow-hidden relative">
      {!isOpened && <EnvelopeCover side={side} onOpen={handleOpenEnvelope} guestName={guestName} />}

      <AnimatePresence>
        {isOpened && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="h-dvh w-full flex"
          >
            {/* ── LEFT NAV SIDEBAR (Desktop only) ── */}
            <DesktopSidebar 
              currentSection={activeIndex} 
              totalSections={sections.length}
              side={side}
              onNavigate={handleNavigate}
              isDark={isDarkSlide}
            />

            {/* ── CONTENT & COMMENTS WRAPPER (Flex Row) ── */}
            <div className="flex-1 flex overflow-hidden">
              
              {/* ── CONTENT AREA (Video/Feed) ── */}
              <div
                className="flex-1 relative overflow-hidden transition-colors duration-500"
                style={{ background: slideBgColors[activeIndex] }}
              >
                {/* Snap Scroll Feed */}
                <div
                  ref={containerRef}
                  className="snap-container-y hide-scrollbar absolute inset-0"
                >
                  {sections.map((section, idx) => (
                    <div
                      key={idx}
                      ref={(el) => { slideRefs.current[idx] = el; }}
                      className="snap-slide-y transition-all duration-300"
                      style={{ background: slideBgColors[idx] }}
                      onDoubleClick={handleDoubleClick}
                    >
                      {section}
                    </div>
                  ))}
                </div>

                {/* ── SLIDE PROGRESS BAR (Top) ── */}
                <div className="absolute top-0 left-0 right-0 z-30 flex gap-[3px] px-2 pt-1.5 pointer-events-none">
                  {Array.from({ length: SECTION_COUNT }).map((_, idx) => (
                    <div key={idx} className="flex-1 h-[2px] rounded-full overflow-hidden bg-white/20">
                      <motion.div
                        className="h-full rounded-full bg-white/80"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: idx < activeIndex ? 1 : idx === activeIndex ? 1 : 0 }}
                        style={{ originX: 0 }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                  ))}
                </div>


                {/* ── FLOATING HEARTS ── */}
                <FloatingHeartSystem hearts={hearts} onComplete={handleHeartComplete} />

                {/* 
                  ── DESKTOP: InteractionSidebar + NavArrows float trên UI ──
                  Nằm sát lề phải của CONTENT AREA. 
                  Khi comment mở ra, content area tự co lại => sidebar tự dịch sang trái.
                */}
                <div className="hidden lg:flex items-center gap-2 absolute right-0 inset-y-0 z-20 pointer-events-none pr-3">
                  <div className="flex flex-col items-center justify-center gap-3 h-full pointer-events-auto">
                    <InteractionSidebar
                      onLike={handleLike}
                      onComment={() => setIsCommentSheetOpen(true)}
                      onGift={() => setIsGiftModalOpen(true)}
                      onAddToCalendar={handleAddToCalendar}
                      onToggleMusic={toggle}
                      onShare={handleShare}
                      isLiked={isLiked}
                      likeCount={likeCount}
                      commentCount={commentCount}
                      isPlaying={isPlaying}
                      isDark={isDarkSlide}
                    />
                  </div>

                  {/* NavArrows — far-right, float trên UI */}
                  <div className="flex flex-col items-center justify-center h-full pointer-events-auto">
                    <NavArrows 
                      onPrev={handlePrev} 
                      onNext={handleNext} 
                      canGoPrev={activeIndex > 0}
                      canGoNext={activeIndex < sections.length - 1}
                      isDark={isDarkSlide} 
                    />
                  </div>
                </div>
              </div>

              {/* ── COMMENT PANEL (Flex Sibling) ── 
                  Đẩy content area thu hẹp lại khi width > 0 
              */}
              {isDesktop && (
                <div className="lg:self-stretch lg:flex shrink-0 relative z-30">
                  <CommentPanelDesktop
                    isOpen={isCommentSheetOpen}
                    onClose={() => setIsCommentSheetOpen(false)}
                    guestName={guestName}
                  />
                </div>
              )}
            </div>

            {/* ── MOBILE: InteractionSidebar fixed bottom-right ── */}
            <div className="lg:hidden fixed right-3 bottom-6 z-50">
              <InteractionSidebar
                onLike={handleLike}
                onComment={() => setIsCommentSheetOpen(true)}
                onGift={() => setIsGiftModalOpen(true)}
                onAddToCalendar={handleAddToCalendar}
                onToggleMusic={toggle}
                onShare={handleShare}
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
      {!isDesktop && (
        <CommentSheet isOpen={isCommentSheetOpen} onClose={() => setIsCommentSheetOpen(false)} guestName={guestName} />
      )}
    </main>
  );
}
