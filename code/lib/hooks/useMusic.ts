"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/**
 * Hook to manage background music playback.
 * Handles state synchronization and automatic pausing when the app is hidden.
 */
export function useMusic(src: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Only create one audio instance
    if (!audioRef.current) {
      const audio = new Audio(src);
      audio.loop = true;
      audio.volume = 0.4;
      audioRef.current = audio;

      // Sync state when audio actually starts playing
      const handlePlay = () => setIsPlaying(true);
      // Sync state when audio is paused (by user or system/browser)
      const handlePause = () => setIsPlaying(false);

      audio.addEventListener("play", handlePlay);
      audio.addEventListener("pause", handlePause);

      // Handle visibility change (lock screen, switch app)
      const handleVisibilityChange = () => {
        if (document.hidden && audioRef.current && !audioRef.current.paused) {
          audioRef.current.pause();
        }
      };

      document.addEventListener("visibilitychange", handleVisibilityChange);

      return () => {
        audio.removeEventListener("play", handlePlay);
        audio.removeEventListener("pause", handlePause);
        document.removeEventListener("visibilitychange", handleVisibilityChange);
        
        audio.pause();
        audio.src = "";
        audioRef.current = null;
      };
    }
  }, [src]);

  const play = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play().catch((err) => {
        console.log("Autoplay blocked or error:", err);
      });
    }
  }, []);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  return { isPlaying, toggle, play, pause };
}

