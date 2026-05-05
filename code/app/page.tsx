"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift } from "lucide-react";
import EnvelopeCover from "@/components/cover/EnvelopeCover";
import HeroSection from "@/components/sections/HeroSection";
import FamilySection from "@/components/sections/FamilySection";
import EventSection from "@/components/sections/EventSection";
import CalendarSection from "@/components/sections/CalendarSection";
import CountdownSection from "@/components/sections/CountdownSection";
import MapSection from "@/components/sections/MapSection";
import RSVPSection from "@/components/sections/RSVPSection";
import GallerySection from "@/components/sections/GallerySection";
import WishList from "@/components/sections/WishList";
import FooterSection from "@/components/sections/FooterSection";
import MusicPlayer from "@/components/ui/MusicPlayer";
import DigitalGiftModal from "@/components/ui/DigitalGiftModal";
import { useMusic } from "@/lib/hooks/useMusic";

export default function HomePage() {
  const [isOpened, setIsOpened] = useState(false);
  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false);
  
  // Khởi tạo nhạc ở level root để có thể trigger khi nhấn nút Mở
  const { isPlaying, toggle, play } = useMusic("/audio/song.m4a");

  // Chặn scroll khi chưa mở thiệp
  useEffect(() => {
    if (!isOpened) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpened]);

  const handleOpenEnvelope = () => {
    setIsOpened(true);
    // Tự động phát nhạc ngay khi người dùng nhấn Mở
    play();
  };

  return (
    <main className="min-h-screen bg-white">
      <EnvelopeCover onOpen={handleOpenEnvelope} />

      <AnimatePresence>
        {isOpened && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <HeroSection />
            <FamilySection />
            <EventSection />
            <CalendarSection />
            <CountdownSection />
            <GallerySection />
            <WishList />
            <MapSection />
            <RSVPSection />
            <FooterSection />

            {/* Truyền state nhạc xuống component con */}
            <MusicPlayer isPlaying={isPlaying} toggle={toggle} />

            <motion.button
              initial={{ opacity: 0, x: 50, scale: 0.5 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.7 }}
              onClick={() => setIsGiftModalOpen(true)}
              className="fixed bottom-6 right-4 z-[60] w-16 h-16 rounded-full flex items-center justify-center shadow-2xl border-2 border-white/20 text-white"
              style={{ backgroundColor: "#7B171B" }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Gift className="w-8 h-8" />
            </motion.button>

            <DigitalGiftModal
              isOpen={isGiftModalOpen}
              onClose={() => setIsGiftModalOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
