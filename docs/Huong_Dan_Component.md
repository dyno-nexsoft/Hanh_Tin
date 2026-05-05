# Hướng Dẫn Code Từng Component

> Dựa trên phân tích website mẫu: [ewedinvite.site/THIEPMAUDOTRANG](https://www.ewedinvite.site/THIEPMAUDOTRANG)

---

## 1. EnvelopeCover — Màn Hình Bìa Phong Bì

### Giao diện
- Nền kem (`#FAF7F2`), họa tiết góc 4 cạnh màu vàng nhạt (phong cách châu Á)
- Logo **Song Hỷ 喜喜** vàng ở giữa trên
- Tiêu đề `THIỆP / Mời Cưới` (font script)
- **Phong bì đỏ** (`#8B1A1A`) trung tâm, dấu xi vàng ở giữa
- Dòng chữ `– NHẤP VÀO THIỆP ĐỂ MỞ –` bên dưới

### Animation (Framer Motion)
```tsx
// EnvelopeCover.tsx
'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function EnvelopeCover({ onOpen }: { onOpen: () => void }) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(onOpen, 1200); // Sau animation → hiện nội dung
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FAF7F2]"
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
    >
      {/* Corner decorations */}
      <div className="absolute top-4 left-4 w-16 h-16 opacity-30">
        <CornerPattern />
      </div>
      {/* ... 3 góc còn lại */}

      <p className="font-ui tracking-[0.3em] text-xs text-wedding-gold mb-2">THIỆP</p>
      <h1 className="font-script text-5xl text-wedding-dark mb-6">Mời Cưới</h1>

      {/* Song Hỷ Logo */}
      <DoubleHappiness className="w-16 h-16 text-wedding-gold mb-6" />

      {/* Envelope */}
      <motion.div
        className="w-64 h-44 bg-wedding-red rounded-sm cursor-pointer relative"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        animate={isAnimating ? { y: -20, opacity: 0 } : {}}
        transition={{ duration: 0.6 }}
        onClick={handleClick}
      >
        {/* Envelope flap lines */}
        <EnvelopeLines />
        {/* Wax seal */}
        <WaxSeal className="absolute inset-0 m-auto w-14 h-14" />
      </motion.div>

      <p className="mt-6 text-xs tracking-[0.25em] text-wedding-gray">
        – NHẤP VÀO THIỆP ĐỂ MỞ –
      </p>
    </motion.div>
  );
}
```

---

## 2. HeroSection — Ảnh Cặp Đôi & Tên

### Giao diện
- Ảnh cưới full-width, chiều cao 100vh
- Tiêu đề dọc `THƯ MỜI CƯỚI` bên trái
- Tên chú rể & cô dâu font script, kích thước lớn
- Ký tự `&` hoặc `và` giữa 2 tên
- Ngày cưới chữ hoa, letter-spacing rộng

```tsx
// HeroSection.tsx
export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image src="/images/couple/hero.jpg" alt="Couple" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/10" />
      </div>

      {/* Vertical title */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 writing-mode-vertical">
        <span className="font-ui tracking-[0.4em] text-xs text-white/80 uppercase">
          Thư Mời Cưới
        </span>
      </div>

      {/* Names */}
      <div className="relative z-10 text-center w-full px-8">
        <motion.h2 className="font-script text-6xl text-white mb-2"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}>
          {WEDDING_CONFIG.groom.displayName}
        </motion.h2>
        <p className="font-body text-white/70 text-lg my-2">&amp;</p>
        <motion.h2 className="font-script text-6xl text-white mb-6"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          {WEDDING_CONFIG.bride.displayName}
        </motion.h2>
        <p className="font-ui tracking-[0.3em] text-white/80 text-sm">
          {format(WEDDING_CONFIG.wedding.date, 'dd . MM . yyyy')}
        </p>
      </div>
    </section>
  );
}
```

---

## 3. EventSection — Lễ Thành Hôn & Tiệc Mừng

### Giao diện
- 2 card song song (hoặc stacked trên mobile)
- Card: icon, giờ lớn, tên sự kiện, địa điểm
- Màu nền card: trắng/kem, viền vàng

```tsx
// EventSection.tsx
const events = [
  {
    title: 'LỄ THÀNH HÔN',
    time: '14:00',
    icon: '🔔',
    venue: WEDDING_CONFIG.wedding.venue.name,
    address: WEDDING_CONFIG.wedding.venue.address,
  },
  {
    title: 'TIỆC MỪNG',
    time: '18:00',
    icon: '🥂',
    venue: WEDDING_CONFIG.wedding.venue.name,
    address: WEDDING_CONFIG.wedding.venue.address,
  },
];

export default function EventSection() {
  return (
    <section className="py-16 bg-wedding-cream">
      <SectionDivider title="Sự Kiện" />
      <div className="flex flex-col md:flex-row gap-6 max-w-2xl mx-auto px-6">
        {events.map((event) => (
          <EventCard key={event.title} {...event} />
        ))}
      </div>
    </section>
  );
}
```

---

## 4. CountdownSection — Đồng Hồ Đếm Ngược

```tsx
// CountdownSection.tsx
'use client';
import { useCountdown } from '@/lib/hooks/useCountdown';

export default function CountdownSection() {
  const { days, hours, minutes, seconds } = useCountdown(WEDDING_CONFIG.wedding.date);
  const units = [
    { value: days,    label: 'Ngày'  },
    { value: hours,   label: 'Giờ'   },
    { value: minutes, label: 'Phút'  },
    { value: seconds, label: 'Giây'  },
  ];

  return (
    <section className="py-16 bg-wedding-red text-white text-center">
      <h3 className="font-body text-2xl mb-10">Đếm Ngược Đến Ngày Vui</h3>
      <div className="flex justify-center gap-4 md:gap-8">
        {units.map(({ value, label }) => (
          <div key={label} className="flex flex-col items-center">
            <span className="font-body text-5xl md:text-7xl font-light">
              {String(value).padStart(2, '0')}
            </span>
            <span className="font-ui text-xs tracking-widest mt-2 opacity-80">
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
```

---

## 5. RSVPSection — Form Xác Nhận Tham Dự

```tsx
// RSVPSection.tsx
'use client';
import { useState } from 'react';
import { submitWish } from '@/lib/firebase/services';

export default function RSVPSection() {
  const [form, setForm] = useState({
    name: '', relationship: '', message: '', isAttending: true,
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.message) return;
    setStatus('loading');
    try {
      await submitWish(form);
      setStatus('success');
      setForm({ name: '', relationship: '', message: '', isAttending: true });
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="py-12 bg-wedding-red text-white">
      <h3 className="text-center font-body text-2xl mb-2">Xác Nhận Tham Dự</h3>
      <p className="text-center font-script text-3xl mb-8">Gửi Lời Chúc</p>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto px-6 space-y-4">
        <input
          className="w-full bg-transparent border border-white/50 rounded px-4 py-3 placeholder:text-white/60 text-white"
          placeholder="Tên của bạn là?"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          className="w-full bg-transparent border border-white/50 rounded px-4 py-3 placeholder:text-white/60 text-white"
          placeholder="Bạn là gì của Dâu Rể?"
          value={form.relationship}
          onChange={(e) => setForm({ ...form, relationship: e.target.value })}
        />
        <textarea
          className="w-full bg-transparent border border-white/50 rounded px-4 py-3 placeholder:text-white/60 text-white resize-none"
          placeholder="Gửi lời chúc đến Dâu Rể nhé!"
          rows={3}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          required
        />
        <select
          className="w-full bg-transparent border border-white/50 rounded px-4 py-3 text-white"
          value={form.isAttending ? 'yes' : 'no'}
          onChange={(e) => setForm({ ...form, isAttending: e.target.value === 'yes' })}
        >
          <option value="yes">✓ Có tham dự</option>
          <option value="no">✗ Không tham dự</option>
        </select>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-white text-wedding-red font-ui font-semibold tracking-widest py-3 rounded"
        >
          {status === 'loading' ? 'ĐANG GỬI...' : 'GỬI NGAY'}
        </button>
      </form>

      {status === 'success' && (
        <p className="text-center mt-4 text-white/80">✓ Cảm ơn bạn đã gửi lời chúc!</p>
      )}
    </section>
  );
}
```

---

## 6. GallerySection — Album Ảnh Cưới

```tsx
// GallerySection.tsx
'use client';
import Image from 'next/image';
import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox'; // npm install yet-another-react-lightbox

const photos = [
  { src: '/images/gallery/1.jpg', alt: 'Ảnh cưới 1' },
  { src: '/images/gallery/2.jpg', alt: 'Ảnh cưới 2' },
  // ...
];

export default function GallerySection() {
  const [index, setIndex] = useState(-1);

  return (
    <section className="py-16 bg-white">
      <h3 className="font-script text-4xl text-center text-wedding-dark mb-10">
        Album hình cưới
      </h3>

      {/* Masonry grid */}
      <div className="columns-2 md:columns-3 gap-3 max-w-2xl mx-auto px-4">
        {photos.map((photo, i) => (
          <div
            key={i}
            className="mb-3 cursor-pointer overflow-hidden rounded"
            onClick={() => setIndex(i)}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={400}
              height={300}
              className="w-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        ))}
      </div>

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={photos}
      />
    </section>
  );
}
```

---

## 7. MusicPlayer — Nút Bật/Tắt Nhạc

```tsx
// MusicPlayer.tsx
'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MusicPlayer({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    audioRef.current = new Audio(src);
    audioRef.current.loop = true;
    return () => { audioRef.current?.pause(); };
  }, [src]);

  const toggle = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <button
      onClick={toggle}
      className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full bg-wedding-dark/80 backdrop-blur text-white flex items-center justify-center shadow-lg"
      aria-label={isPlaying ? 'Tắt nhạc' : 'Bật nhạc'}
    >
      <motion.span animate={{ rotate: isPlaying ? 360 : 0 }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}>
        🎵
      </motion.span>
    </button>
  );
}
```

---

## 8. FallingPetals — Hiệu Ứng Cánh Hoa Rơi

```tsx
// FallingPetals.tsx
'use client';
import { useEffect, useRef } from 'react';

export default function FallingPetals() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    // ... canvas animation logic cho cánh hoa rơi
    // Mỗi petal: { x, y, size, speed, rotation, color }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ width: '100%', height: '100%' }}
    />
  );
}
```

---

## 9. DigitalGiftModal — Modal QR Mừng Cưới

```tsx
// DigitalGiftModal.tsx
'use client';
import { useState } from 'react';
import Image from 'next/image';
import { WEDDING_CONFIG } from '@/lib/constants/wedding-data';

export default function DigitalGiftModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { gifts } = WEDDING_CONFIG;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="mx-auto block border border-white text-white font-ui tracking-widest text-sm py-3 px-8 rounded hover:bg-white hover:text-wedding-red transition-colors"
      >
        GỬI MỪNG CƯỚI
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={() => setIsOpen(false)}>
          <div className="bg-white rounded-lg p-8 max-w-sm w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <h4 className="font-body text-xl text-center text-wedding-dark mb-4">Mừng Cưới</h4>
            <Image src={gifts.qrCodeImage} alt="QR Code" width={200} height={200} className="mx-auto mb-4" />
            <p className="text-center text-sm text-wedding-gray">{gifts.bankName}</p>
            <p className="text-center font-semibold text-wedding-dark">{gifts.accountNumber}</p>
            <p className="text-center text-sm text-wedding-gray">{gifts.accountHolder}</p>
            <button onClick={() => setIsOpen(false)} className="mt-6 w-full bg-wedding-red text-white py-2 rounded">
              Đóng
            </button>
          </div>
        </div>
      )}
    </>
  );
}
```
