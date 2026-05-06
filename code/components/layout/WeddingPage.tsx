"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
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
import MusicPlayer from "@/components/shared/MusicPlayer";
import DigitalGiftModal from "@/components/shared/DigitalGiftModal";
import { useMusic } from "@/lib/hooks/useMusic";
import { WeddingSide } from "@/lib/types";

interface WeddingPageProps {
  side: WeddingSide;
}

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

  const searchParams = useSearchParams();
  const guestName = searchParams.get("to") || undefined;

  const { isPlaying, toggle, play } = useMusic("/audio/song.m4a");

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
    play();
  };

  return (
    <main className="min-h-screen bg-white">
      <EnvelopeCover onOpen={handleOpenEnvelope} guestName={guestName} />

      <AnimatePresence>
        {isOpened && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <FamilySection side={side} />
            <HeroSection side={side} />
            <CalendarSection side={side} />
            <CountdownSection side={side} />
            <GallerySection />
            <WishList guestName={guestName} />
            <RSVPSection guestName={guestName} />
            <MapSection side={side} />
            <FooterSection />

            <MusicPlayer isPlaying={isPlaying} toggle={toggle} />

            {/* Floating Gift Button with Premium Animations */}
            <div className="fixed bottom-6 right-4 z-[60]">
              {/* Pulse Ring */}
              <motion.div
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.3, 0, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 rounded-full border-2 border-[#7B171B]"
              />
              
              <motion.button
                initial={{ opacity: 0, x: 50, scale: 0.5 }}
                animate={{ 
                  opacity: 1, 
                  x: 0, 
                  scale: [1, 1.05, 1],
                  rotate: [0, -5, 5, -5, 5, 0]
                }}
                transition={{
                  scale: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  },
                  rotate: {
                    duration: 0.5,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: "easeInOut"
                  },
                  opacity: { duration: 0.5 },
                  x: { type: "spring", stiffness: 260, damping: 20 }
                }}
                onClick={() => setIsGiftModalOpen(true)}
                className="relative w-12 h-12 rounded-full flex items-center justify-center shadow-2xl border-2 border-white/20 text-white"
                style={{ backgroundColor: "#7B171B" }}
                whileHover={{ scale: 1.15, rotate: 0 }}
                whileTap={{ scale: 0.9 }}
              >
                <Gift className="w-6 h-6" />
              </motion.button>
            </div>

            <DigitalGiftModal
              side={side}
              isOpen={isGiftModalOpen}
              onClose={() => setIsGiftModalOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
