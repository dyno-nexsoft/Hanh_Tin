"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { GALLERY_IMAGES } from "@/lib/config/wedding";

/// Gallery với Layout Carousel lướt ngang:
/// - Horizontal Carousel: Tương tác chạm vuốt sang ngang giống hệt phong cách TikTok. Tránh hoàn toàn lỗi kẹt cuộn dọc (scroll trap) trên Safari.
/// - Fullscreen lightbox: Xem ảnh đẩy đủ
export default function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const openLightbox = (idx: number) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);
  const prevPhoto = () => setLightboxIndex((i) => (i !== null ? (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length : 0));
  const nextPhoto = () => setLightboxIndex((i) => (i !== null ? (i + 1) % GALLERY_IMAGES.length : 0));

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-track scrolled photo index to update active indicator dot
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollLeft = container.scrollLeft;
      const width = container.clientWidth;
      
      const children = container.querySelectorAll(".snap-center");
      let closestIndex = 0;
      let minDistance = Infinity;
      const containerCenter = container.getBoundingClientRect().left + width / 2;

      children.forEach((child, idx) => {
        const rect = child.getBoundingClientRect();
        const childCenter = rect.left + rect.width / 2;
        const distance = Math.abs(childCenter - containerCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = idx;
        }
      });

      setActiveIndex(closestIndex);
    }
  };

  // Enable bullet click navigation
  const scrollToImage = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const children = container.querySelectorAll(".snap-center");
      const targetChild = children[index];
      if (targetChild) {
        targetChild.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest"
        });
        setActiveIndex(index);
      }
    }
  };

  const scrollGallery = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = window.innerWidth < 768 ? window.innerWidth * 0.75 : 400; // Chiều rộng xấp xỉ 1 ảnh
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="h-full w-full bg-[#0a0a0a] relative flex flex-col overflow-hidden">
      {/* Header */}
      <div className="text-center pt-8 pb-4 px-4 shrink-0">
        <p className="text-white/40 text-[10px] tracking-[0.4em] uppercase font-sans mb-1">Album</p>
        <h2 className="text-white font-script text-3xl sm:text-4xl leading-tight">Khoảnh Khắc</h2>
        <div className="w-10 h-px bg-white/20 mx-auto mt-2" />
      </div>

      {/* Horizontal Carousel */}
      <div className="relative flex-1 w-full flex items-center group">
        {/* Nút cuộn trái (Chỉ hiện trên Desktop khi hover) */}
        <button
          onClick={() => scrollGallery("left")}
          className="hidden md:flex absolute left-4 z-10 w-12 h-12 rounded-full bg-white/10 text-white items-center justify-center hover:bg-white/20 hover:scale-110 transition-all backdrop-blur-md border border-white/20 shadow-2xl opacity-0 group-hover:opacity-100"
        >
          <ChevronLeft size={28} />
        </button>

        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="w-full h-full overflow-x-auto overflow-y-hidden hide-scrollbar snap-container-x px-4 pb-12 flex items-center"
        >
          <div className="flex gap-4 w-max pr-8 h-full items-center">
            {GALLERY_IMAGES.map((img, idx) => (
              <motion.div
                key={img.src}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "50px" }}
                transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.3) }}
                className="shrink-0 w-[75vw] sm:w-[45vw] md:w-[400px] h-[65vh] sm:h-[70vh] relative snap-center rounded-xl overflow-hidden cursor-pointer shadow-2xl border border-white/5 bg-white/5"
                onClick={() => openLightbox(idx)}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-[1.02]"
                  priority={idx < 3}
                  sizes="(max-width: 640px) 75vw, (max-width: 768px) 45vw, 400px"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Nút cuộn phải (Chỉ hiện trên Desktop khi hover) */}
        <button
          onClick={() => scrollGallery("right")}
          className="hidden md:flex absolute right-4 z-10 w-12 h-12 rounded-full bg-white/10 text-white items-center justify-center hover:bg-white/20 hover:scale-110 transition-all backdrop-blur-md border border-white/20 shadow-2xl opacity-0 group-hover:opacity-100"
        >
          <ChevronRight size={28} />
        </button>
      </div>

      {/* TikTok-style Dot Indicators */}
      <div className="absolute bottom-6 left-0 w-full flex items-center justify-center gap-1 z-20">
        {GALLERY_IMAGES.map((_, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={idx}
              onClick={() => scrollToImage(idx)}
              className="py-2 px-1 focus:outline-none transition-all duration-300 group"
              aria-label={`Go to slide ${idx + 1}`}
            >
              <div 
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  isActive 
                    ? "w-6 bg-white opacity-95" 
                    : "w-1.5 bg-white/30 group-hover:bg-white/60"
                }`} 
              />
            </button>
          );
        })}
      </div>

      {/* Photo count badge */}
      <div className="absolute top-6 right-4 bg-white/10 backdrop-blur-sm text-white text-[10px] tracking-wider uppercase font-sans px-3 py-1.5 rounded-full border border-white/10 shadow-lg">
        {GALLERY_IMAGES.length} ảnh
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center backdrop-blur-sm"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors border border-white/10"
              onClick={closeLightbox}
            >
              <X size={20} className="text-white" />
            </button>

            {/* Counter */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 text-white/60 text-xs tracking-[0.2em] uppercase font-sans bg-black/50 px-4 py-1.5 rounded-full">
              {lightboxIndex + 1} / {GALLERY_IMAGES.length}
            </div>

            {/* Prev */}
            <button
              className="absolute left-3 sm:left-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors z-20 border border-white/10"
              onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
            >
              <ChevronLeft size={22} className="text-white" />
            </button>

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              className="max-w-[90vw] max-h-[90dvh] relative"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={GALLERY_IMAGES[lightboxIndex].src}
                alt={GALLERY_IMAGES[lightboxIndex].alt}
                width={1200}
                height={1600}
                className="max-h-[90dvh] w-auto object-contain rounded-lg shadow-2xl"
                priority
              />
            </motion.div>

            {/* Next */}
            <button
              className="absolute right-3 sm:right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors z-20 border border-white/10"
              onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
            >
              <ChevronRight size={22} className="text-white" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
