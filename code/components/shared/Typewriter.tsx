'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface TypewriterProps {
  text: string;
  className?: string;
  delay?: number; // delay trước khi bắt đầu gõ (ms)
  speed?: number; // tốc độ gõ mỗi ký tự (ms)
}

/// Hiệu ứng chữ gõ từng ký tự — dùng cho tên khách mời trên FamilySection
export default function Typewriter({ text, className = '', delay = 400, speed = 60 }: TypewriterProps) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDisplayed('');
    let intervalId: NodeJS.Timeout | undefined;
    let i = 0;

    const timeout = setTimeout(() => {
      intervalId = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length && intervalId) {
          clearInterval(intervalId);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, delay, speed]);

  return (
    <span className={className}>
      {displayed}
      {displayed.length < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block w-[2px] h-[1em] bg-current ml-0.5 align-middle"
        />
      )}
    </span>
  );
}
