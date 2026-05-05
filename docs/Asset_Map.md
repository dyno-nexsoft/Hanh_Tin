# Asset Map — Bản Đồ Tài Nguyên

> Tổng số ảnh gốc: 27 file trong `File/`
> Đã tổ chức vào: `public/images/`

---

## Cấu Trúc Thư Mục

```
public/
└── images/
    ├── couple/          ← 4 ảnh chính dùng trong UI sections
    │   ├── hero.jpg     ← Hero section (ảnh đôi full body)
    │   ├── bride.jpg    ← Cô dâu solo → Family section
    │   ├── groom.jpg    ← Chú rể solo → Family section
    │   └── close.jpg    ← Ảnh đôi cận → Love story
    │
    └── gallery/         ← 23 ảnh cho album section (01–23.jpg)
```

---

## Chi Tiết Ảnh Chính (`couple/`)

| File | Ảnh Gốc | Dùng Ở Section | Mô Tả |
|---|---|---|---|
| `hero.jpg` | `SN_02288.JPG` | **HeroSection** | Đôi đứng thẳng toàn thân, nền hoa trắng — ảnh đẹp nhất |
| `bride.jpg` | `SN_02042.JPG` | **FamilySection** | Cô dâu solo, váy mermaid trắng, cầm hoa |
| `groom.jpg` | `SN_02237.JPG` | **FamilySection** | Chú rể solo, suit đen, bowtie |
| `close.jpg` | `SN_02499.JPG` | **LoveStory** | Đôi áp má nhau cận mặt, lãng mạn |

---

## Album Gallery (`gallery/` — 23 ảnh)

| File | Ảnh Gốc | Ghi Chú |
|---|---|---|
| `01.jpg` | `SN_02573.JPG` | Đôi nhìn nhau từ sau, váy xoè |
| `02.jpg` | `SN_02697 copy.jpg` | Đôi vui vẻ giơ thiệp |
| `03.jpg` | `SN_02887.JPG` | — |
| `04.jpg` | `SN_03046.JPG` | — |
| `05.jpg` | `SN_03188.JPG` | — |
| `06.jpg` | `SN_03558.JPG` | — |
| `07.jpg` | `SN_03599.JPG` | — |
| `08.jpg` | `SN_03611.JPG` | — |
| `09.jpg` | `SN_03689.JPG` | — |
| `10.jpg` | `SN_03748.JPG` | — |
| `11.jpg` | `SN_03769.JPG` | — |
| `12.jpg` | `SN_03788.JPG` | — |
| `13.jpg` | `SN_03875.jpg` | — |
| `14.jpg` | `SN_03885.jpg` | — |
| `15.jpg` | `SN_03993.jpg` | — |
| `16.jpg` | `SN_04026.jpg` | — |
| `17.jpg` | `SN_04089.jpg` | — |
| `18.jpg` | `SN_04113.jpg` | — |
| `19.jpg` | `SN_04226.jpg` | — |
| `20.jpg` | `SN_04262.jpg` | — |
| `21.jpg` | `SN_04310.jpg` | — |
| `22.jpg` | `SN_04414.jpg` | — |
| `23.jpg` | `SN_04440.jpg` | — |

---

## Lưu Ý Kỹ Thuật

> [!WARNING]
> Ảnh gốc có kích thước rất lớn (~10–30 MB/file). **Bắt buộc phải optimize trước khi deploy.**

### Tối Ưu Ảnh (Bắt Buộc)

```bash
# Cài sharp-cli để resize/optimize hàng loạt
npm install -g sharp-cli

# Optimize couple/ (resize về max 1920px, quality 85)
sharp --input "public/images/couple/*.jpg" \
      --output "public/images/couple/" \
      resize 1920 --withoutEnlargement \
      --quality 85 --format webp

# Optimize gallery/ (resize về max 800px cho thumbnail)
sharp --input "public/images/gallery/*.jpg" \
      --output "public/images/gallery/" \
      resize 800 --withoutEnlargement \
      --quality 80 --format webp
```

### Hoặc dùng Next.js Image Optimization

Nếu dùng Next.js, component `<Image>` tự động optimize — **không cần làm thủ công**.
Chỉ cần đảm bảo `next.config.js` **không có** `unoptimized: true` khi deploy lên Vercel/Firebase.

```tsx
// Sử dụng đúng cách trong Next.js
import Image from 'next/image';

<Image
  src="/images/couple/hero.jpg"
  alt="Ảnh cưới"
  width={1920}
  height={1280}
  priority          // Chỉ dùng cho ảnh hero (above the fold)
  className="object-cover"
/>
```

---

## Ảnh Còn Thiếu (Cần Bổ Sung)

| Cần | Dùng Ở Đâu | Ghi Chú |
|---|---|---|
| `public/audio/wedding-song.mp3` | MusicPlayer | Nhạc nền đám cưới |
| `public/images/qr-code.png` | DigitalGiftModal | QR code tài khoản nhận mừng cưới |
