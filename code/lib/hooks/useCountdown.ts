/// Hook tính đếm ngược đến ngày cưới theo realtime.
/// Trả về số ngày, giờ, phút, giây còn lại — cập nhật mỗi giây.
'use client';

import { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isOver: boolean;
}

export function useCountdown(targetDate: Date): TimeLeft {
  const calculate = (): TimeLeft => {
    const diff = targetDate.getTime() - Date.now();
    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true };
    }
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      isOver: false,
    };
  };

  // Initialize with zeros to avoid hydration mismatch
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ 
    days: 0, 
    hours: 0, 
    minutes: 0, 
    seconds: 0, 
    isOver: false 
  });

  useEffect(() => {
    // Set initial value on client
    setTimeLeft(calculate());
    
    const timer = setInterval(() => setTimeLeft(calculate()), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}
