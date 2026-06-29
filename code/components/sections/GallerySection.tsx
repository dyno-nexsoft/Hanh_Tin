"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { GALLERY_IMAGES } from "@/lib/config/wedding";

/// Gallery Apple Style (Sleek Horizontal Scroll)
export default function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const openLightbox = (idx: number) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);
  const prevPhoto = () => setLightboxIndex((i) => (i !== null ? (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length : 0));
  const nextPhoto = () => setLightboxIndex((i) => (i !== null ? (i + 1) % GALLERY_IMAGES.length : 0));

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
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
      const scrollAmount = window.innerWidth < 768 ? window.innerWidth * 0.75 : 400;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <section
      className="h-full w-full relative flex flex-col overflow-hidden bg-[#F5F5F7] group"
    >
      {/* Header */}
      <div className="text-center pt-10 pb-6 px-4 shrink-0 relative z-10">
        <p className="font-sans text-[11px] font-bold tracking-[0.2em] uppercase text-[#86868B] mb-2">
          Thư Viện Ảnh
        </p>
        <h2 className="font-sans text-4xl sm:text-5xl font-bold tracking-tighter text-[#1D1D1F]">
          Khoảnh Khắc
        </h2>
      </div>

      {/* Horizontal Carousel */}
      <div className="relative flex-1 w-full flex items-center z-10">
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="w-full h-full overflow-x-auto overflow-y-hidden hide-scrollbar snap-container-x px-4 pb-16 flex items-center"
        >
          <div className="flex gap-4 sm:gap-6 w-max pr-8 h-full items-center">
            {GALLERY_IMAGES.map((img, idx) => (
              <motion.div
                key={img.src}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "50px" }}
                transition={{ duration: 0.6, delay: Math.min(idx * 0.05, 0.3), ease: [0.32, 0.72, 0, 1] }}
                className="shrink-0 w-[75vw] sm:w-[45vw] md:w-[400px] h-[60vh] sm:h-[65vh] relative snap-center rounded-[32px] overflow-hidden cursor-pointer shadow-sm bg-white"
                style={{ border: '1px solid rgba(0,0,0,0.05)' }}
                onClick={() => openLightbox(idx)}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                  priority={idx < 3}
                  sizes="(max-width: 640px) 75vw, (max-width: 768px) 45vw, 400px"
                />
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-300 bg-white/20"
                  style={{ opacity: activeIndex === idx ? 0 : 1 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Controls (Dots & Arrows) */}
      <div className="absolute bottom-8 left-0 w-full flex items-center justify-center gap-4 z-20">
        {/* Nút cuộn trái */}
        <button
          onClick={() => scrollGallery("left")}
          className="hidden md:flex w-12 h-12 rounded-full items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 bg-white shadow-sm border border-black/5 text-[#1D1D1F] hover:bg-[#F5F5F7]"
        >
          <ChevronLeft size={24} strokeWidth={2} />
        </button>

        {/* Dot Indicators - iOS Style Page Controls */}
        <div className="flex items-center justify-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-sm border border-black/5">
          {GALLERY_IMAGES.map((_, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={idx}
                onClick={() => scrollToImage(idx)}
                className="focus:outline-none transition-all duration-300 py-1"
                aria-label={`Go to slide ${idx + 1}`}
              >
                <div 
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: isActive ? 16 : 6,
                    height: 6,
                    background: isActive ? '#0071E3' : '#D1D1D6',
                  }}
                />
              </button>
            );
          })}
        </div>

        {/* Nút cuộn phải */}
        <button
          onClick={() => scrollGallery("right")}
          className="hidden md:flex w-12 h-12 rounded-full items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 bg-white shadow-sm border border-black/5 text-[#1D1D1F] hover:bg-[#F5F5F7]"
        >
          <ChevronRight size={24} strokeWidth={2} />
        </button>
      </div>

      {/* Photo count badge */}
      <div className="absolute top-8 right-6 font-sans text-xs font-semibold text-[#86868B] bg-white px-3 py-1.5 rounded-full border border-black/5 shadow-sm">
        {GALLERY_IMAGES.length} Ảnh
      </div>

      {/* ── Lightbox Apple Style ── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center touch-none"
            style={{
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(40px) saturate(150%)',
              WebkitBackdropFilter: 'blur(40px) saturate(150%)',
            }}
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-colors bg-[#E8E8ED] text-[#86868B] hover:bg-[#D1D1D6] hover:text-[#1D1D1F]"
              onClick={closeLightbox}
            >
              <X size={20} strokeWidth={2.5} />
            </button>

            {/* Counter */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 font-sans text-xs font-bold tracking-widest text-[#1D1D1F] px-4 py-1.5 rounded-full bg-white/50 border border-black/5 shadow-sm">
              {lightboxIndex + 1} / {GALLERY_IMAGES.length}
            </div>

            {/* Prev */}
            <button
              className="absolute left-4 sm:left-8 w-12 h-12 rounded-full flex items-center justify-center transition-colors z-20 bg-white/50 text-[#1D1D1F] border border-black/5 hover:bg-white shadow-sm backdrop-blur-md"
              onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
            >
              <ChevronLeft size={24} strokeWidth={2} />
            </button>

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="max-w-[95vw] max-h-[90dvh] relative"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={GALLERY_IMAGES[lightboxIndex].src}
                alt={GALLERY_IMAGES[lightboxIndex].alt}
                width={1200}
                height={1600}
                className="max-h-[90dvh] w-auto object-contain rounded-2xl shadow-xl"
                priority
              />
            </motion.div>

            {/* Next */}
            <button
              className="absolute right-4 sm:right-8 w-12 h-12 rounded-full flex items-center justify-center transition-colors z-20 bg-white/50 text-[#1D1D1F] border border-black/5 hover:bg-white shadow-sm backdrop-blur-md"
              onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
            >
              <ChevronRight size={24} strokeWidth={2} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
