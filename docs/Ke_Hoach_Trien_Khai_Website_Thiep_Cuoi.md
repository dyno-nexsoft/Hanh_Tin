# Kế Hoạch Triển Khai Website Thiệp Cưới Điện Tử

> **Tham chiếu:** [ewedinvite.site/THIEPMAUDOTRANG](https://www.ewedinvite.site/THIEPMAUDOTRANG)
> **Ngày tạo:** 2026-05-04
> **Phiên bản:** 1.0

---

## 1. Phân Tích Website Mẫu

### 1.1. Luồng Trải Nghiệm Người Dùng (User Flow)

```
[Màn hình bìa - Phong bì đỏ]
         ↓ (Nhấp vào thiệp)
[Animation mở thiệp]
         ↓
[Nội dung chính - Cuộn xuống]
  ├── Hero: Ảnh đôi + Tên + Ngày cưới
  ├── Thông tin hai họ
  ├── Lịch trình sự kiện (Lễ + Tiệc)
  ├── Lịch tháng highlight ngày cưới
  ├── Đồng hồ đếm ngược
  ├── Bản đồ địa điểm
  ├── Form RSVP + Gửi lời chúc
  ├── Nút "GỬI MỪNG CƯỚI" (QR Code)
  └── Album ảnh cưới
```

### 1.2. Chi Tiết Từng Section

| Section          | Mô Tả                                                            |
| ---------------- | ---------------------------------------------------------------- |
| **Cover (Bìa)**  | Phong bì đỏ với dấu xi, logo Song Hỷ (喜喜), nút "Nhấp để mở"    |
| **Hero**         | Ảnh cặp đôi, tên chữ thảo, ngày cưới, tiêu đề dọc "Thư Mời Cưới" |
| **Hai Họ**       | Thông tin nhà trai/nhà gái, tên phụ huynh và địa chỉ             |
| **Sự Kiện**      | Card cho Lễ Thành Hôn (14:00) và Tiệc Mừng (18:00), địa điểm     |
| **Lịch**         | Calendar tháng với ngày cưới được highlight                      |
| **Countdown**    | Đồng hồ đếm ngược realtime (Ngày/Giờ/Phút/Giây)                  |
| **Bản Đồ**       | Google Maps embed + nút "Xem Chỉ Đường"                          |
| **RSVP**         | Form: Tên, Quan hệ, Lời chúc, Xác nhận tham dự                   |
| **Digital Gift** | Button mở modal QR code + thông tin tài khoản ngân hàng          |
| **Gallery**      | Masonry grid ảnh cưới                                            |
| **Music**        | Nút bật/tắt nhạc nền (góc dưới trái)                             |

---

## 2. Tech Stack Chi Tiết

### 2.1. Frontend Framework

**Lựa chọn: Next.js 14 (App Router)**

- **Lý do:** SSG (Static Site Generation) tối ưu hiệu năng, hỗ trợ tốt cho Firebase Hosting
- **Rendering:** `export const dynamic = 'force-static'` để export static HTML

```bash
npx create-next-app@latest hanh-tin --typescript --tailwind --app --no-src-dir
```

### 2.2. Styling

**Tailwind CSS + Custom CSS Variables**

- Định nghĩa design tokens trong `tailwind.config.ts`
- CSS Variables cho màu sắc chủ đạo (Đỏ & Vàng & Trắng)

```ts
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      wedding: {
        red:    '#8B1A1A',  // Đỏ chủ đạo (Burgundy)
        gold:   '#C9A84C',  // Vàng trang trí
        cream:  '#FAF7F2',  // Nền kem
        dark:   '#2D1810',  // Chữ tối
      }
    },
    fontFamily: {
      script: ['Great Vibes', 'Dancing Script', 'cursive'],
      body:   ['Cormorant Garamond', 'serif'],
      ui:     ['Inter', 'sans-serif'],
    }
  }
}
```

### 2.3. Animation

**Framer Motion**

```bash
npm install framer-motion
```

- Opening envelope animation
- Fade-in scroll animations cho từng section
- Falling petals / confetti effect

### 2.4. Backend & Database

**Firebase (Spark Plan - Miễn phí)**

```bash
npm install firebase
```

| Service             | Sử dụng                       |
| ------------------- | ----------------------------- |
| **Cloud Firestore** | Lưu lời chúc (wishes) và RSVP |
| **Hosting**         | Deploy website tĩnh           |

### 2.5. Thư Viện Phụ

```bash
npm install react-confetti           # Hiệu ứng cánh hoa/confetti
npm install react-image-lightbox     # Xem ảnh full màn hình
npm install date-fns                 # Tính toán countdown
npm install @googlemaps/js-api-loader # Google Maps
```

---

## 3. Cấu Trúc Thư Mục Dự Án

```
hanh-tin/
├── app/
│   ├── layout.tsx              # Root layout (fonts, metadata)
│   ├── page.tsx                # Trang chủ (single page)
│   └── globals.css             # Global styles + CSS variables
│
├── components/
│   ├── cover/
│   │   └── EnvelopeCover.tsx   # Màn hình bìa phong bì
│   │
│   ├── sections/
│   │   ├── HeroSection.tsx     # Ảnh + Tên + Ngày cưới
│   │   ├── FamilySection.tsx   # Thông tin hai họ
│   │   ├── EventSection.tsx    # Lễ Thành Hôn & Tiệc Mừng
│   │   ├── CalendarSection.tsx # Lịch highlight ngày cưới
│   │   ├── CountdownSection.tsx# Đồng hồ đếm ngược
│   │   ├── MapSection.tsx      # Google Maps + Chỉ đường
│   │   ├── RSVPSection.tsx     # Form RSVP & Guestbook
│   │   └── GallerySection.tsx  # Album ảnh cưới
│   │
│   ├── ui/
│   │   ├── MusicPlayer.tsx     # Nút bật/tắt nhạc
│   │   ├── DigitalGiftModal.tsx# Modal QR code mừng cưới
│   │   ├── DoubleHappiness.tsx # Logo Song Hỷ 喜喜
│   │   ├── FallingPetals.tsx   # Hiệu ứng cánh hoa rơi
│   │   └── SectionDivider.tsx  # Divider trang trí
│   │
│   └── forms/
│       └── WishForm.tsx        # Form gửi lời chúc
│
├── lib/
│   ├── firebase/
│   │   ├── config.ts           # Firebase configuration
│   │   └── services.ts         # Firestore CRUD functions
│   │
│   ├── hooks/
│   │   ├── useCountdown.ts     # Hook đếm ngược
│   │   └── useMusic.ts         # Hook quản lý nhạc nền
│   │
│   └── constants/
│       └── wedding-data.ts     # Thông tin đám cưới (tên, ngày, địa điểm...)
│
├── public/
│   ├── images/
│   │   ├── couple/             # Ảnh cặp đôi
│   │   ├── gallery/            # Album ảnh cưới
│   │   └── decorations/        # Ảnh trang trí (hoa, pattern)
│   ├── audio/
│   │   └── wedding-song.mp3    # Nhạc nền
│   └── fonts/                  # Custom fonts nếu cần
│
├── firebase.json               # Firebase config deploy
├── .firebaserc                 # Firebase project ID
└── next.config.js              # Next.js config (static export)
```

---

## 4. Thiết Kế Giao Diện Chi Tiết

### 4.1. Design Tokens (Màu Sắc & Typography)

```css
/* globals.css */
:root {
  /* Colors */
  --wedding-red: #8b1a1a;
  --wedding-red-dark: #6b1212;
  --wedding-gold: #c9a84c;
  --wedding-gold-light: #e8d5a3;
  --wedding-cream: #faf7f2;
  --wedding-white: #ffffff;
  --wedding-dark: #2d1810;
  --wedding-gray: #6b6b6b;

  /* Typography */
  --font-script: "Great Vibes", cursive;
  --font-body: "Cormorant Garamond", serif;
  --font-ui: "Inter", sans-serif;
}
```

### 4.2. Component: EnvelopeCover

**Màn hình bìa** (Trạng thái ban đầu):

- Nền màu kem (`#FAF7F2`)
- Logo trang trí góc 4 cạnh (pattern châu Á, màu vàng nhạt)
- Logo Song Hỷ (喜喜) bên trên phong bì
- Tiêu đề "THIỆP / Mời Cưới" (font script)
- Phong bì đỏ lớn ở giữa với dấu xi vàng
- Text "– NHẤP VÀO THIỆP ĐỂ MỞ –" phía dưới

**Animation mở phong bì:**

```tsx
// Sử dụng Framer Motion
const envelopeVariants = {
  closed: { rotateX: 0 },
  open: {
    rotateX: 180,
    transition: { duration: 0.8, ease: "easeInOut" },
  },
};
// Sau animation → setState(isOpened = true) → hiện nội dung chính
```

### 4.3. Component: HeroSection

- Background: Ảnh cưới full-width với overlay gradient
- Tên cặp đôi font chữ thảo (Great Vibes, ~72px)
- Ngày cưới: "DD.MM.YYYY" chữ hoa, spacing rộng
- Tiêu đề dọc "THƯ MỜI CƯỚI" bên cạnh ảnh

### 4.4. Component: CountdownSection

```tsx
// Cấu trúc 4 ô
interface TimeUnit {
  value: number;
  label: string; // Ngày | Giờ | Phút | Giây
}
```

### 4.5. Component: RSVPSection

**Nền:** Đỏ đậm (`#8B1A1A`)
**Form fields:**

- `Tên của bạn là?` (text input)
- `Bạn là gì của Dâu Rể?` (text input)
- `Gửi lời chúc đến Dâu Rể nhé!` (textarea)
- `Bạn Có Tham Dự Không?` (select: Có tham dự / Không tham dự)
- Button "GỬI NGAY" (nền trắng, chữ đỏ)
- Button "GỬI MỪNG CƯỚI" (outline trắng)

---

## 5. Database Schema (Firebase Firestore)

### Collection: `wishes`

```typescript
interface Wish {
  id: string; // Auto-generated
  name: string; // Tên khách
  relationship: string; // Quan hệ với cô dâu/chú rể
  message: string; // Lời chúc
  isAttending: boolean; // Xác nhận tham dự
  createdAt: Timestamp; // Server timestamp
  status: "pending" | "approved"; // Duyệt bởi admin
}
```

### Collection: `rsvps`

```typescript
interface RSVP {
  id: string;
  guestName: string;
  relationship: string;
  isAttending: boolean;
  guestCount?: number;
  phone?: string;
  submittedAt: Timestamp;
}
```

### Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Khách có thể đọc lời chúc đã duyệt
    match /wishes/{doc} {
      allow read: if resource.data.status == 'approved';
      allow create: if request.resource.data.name != ''
                    && request.resource.data.message != '';
    }
    // RSVP chỉ admin đọc được
    match /rsvps/{doc} {
      allow create: if true;
      allow read: if false; // Chỉ qua Firebase Console
    }
  }
}
```

---

## 6. Thông Tin Đám Cưới (wedding-data.ts)

```typescript
// lib/constants/wedding-data.ts
export const WEDDING_CONFIG = {
  groom: {
    name: "Tên Chú Rể",
    displayName: "Chú Rể", // Tên hiển thị (font script)
    family: {
      father: "Họ tên cha",
      mother: "Họ tên mẹ",
      address: "Địa chỉ nhà trai",
    },
  },
  bride: {
    name: "Tên Cô Dâu",
    displayName: "Cô Dâu",
    family: {
      father: "Họ tên cha",
      mother: "Họ tên mẹ",
      address: "Địa chỉ nhà gái",
    },
  },
  wedding: {
    date: new Date("2025-12-14"),
    ceremony: { time: "14:00", label: "LỄ THÀNH HÔN" },
    reception: { time: "18:00", label: "TIỆC MỪNG" },
    venue: {
      name: "Tên địa điểm",
      address: "Địa chỉ chi tiết",
      googleMapsUrl: "https://maps.google.com/?q=...",
      embedUrl: "https://www.google.com/maps/embed?...",
    },
  },
  gifts: {
    bankName: "Tên ngân hàng",
    accountNumber: "Số tài khoản",
    accountHolder: "Chủ tài khoản",
    qrCodeImage: "/images/qr-code.png",
  },
};
```

---

## 7. Custom Hooks

### 7.1. useCountdown

```typescript
// lib/hooks/useCountdown.ts
export function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState(calcTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calcTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft; // { days, hours, minutes, seconds }
}
```

### 7.2. useMusic

```typescript
// lib/hooks/useMusic.ts
export function useMusic(src: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggle = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return { isPlaying, toggle, audioRef };
}
```

---

## 8. Firebase Services

```typescript
// lib/firebase/services.ts
import { db } from "./config";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";
import type { Wish, RSVP } from "../types";

/// Gửi lời chúc từ khách mời
export const submitWish = async (
  data: Omit<Wish, "id" | "createdAt" | "status">,
) => {
  await addDoc(collection(db, "wishes"), {
    ...data,
    createdAt: serverTimestamp(),
    status: "approved",
  });
};

/// Lấy danh sách lời chúc đã được duyệt
export const getApprovedWishes = async (): Promise<Wish[]> => {
  const q = query(
    collection(db, "wishes"),
    where("status", "==", "approved"),
    orderBy("createdAt", "desc"),
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Wish);
};
```

---

## 9. Quy Trình Triển Khai (Step-by-step)

### Bước 1: Khởi Tạo Dự Án

```bash
# Tạo Next.js app
npx create-next-app@latest hanh-tin \
  --typescript \
  --tailwind \
  --app \
  --no-src-dir \
  --import-alias "@/*"

cd hanh-tin

# Cài đặt dependencies
npm install firebase framer-motion date-fns
npm install react-confetti @googlemaps/js-api-loader
npm install -D @types/google.maps
```

### Bước 2: Cấu Hình Firebase

```bash
# Cài Firebase CLI
npm install -g firebase-tools

# Đăng nhập
firebase login

# Khởi tạo trong thư mục dự án
firebase init
# Chọn: Firestore, Hosting
# Hosting public dir: out
# Single-page app: Yes
```

### Bước 3: Cấu Hình Next.js cho Static Export

```javascript
// next.config.js
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};
module.exports = nextConfig;
```

### Bước 4: Thiết Kế Database Firestore

1. Truy cập [Firebase Console](https://console.firebase.google.com/)
2. Vào **Firestore Database** → Tạo database
3. Chọn chế độ **Production mode**
4. Thêm Security Rules (xem Section 5)

### Bước 5: Điền Thông Tin Đám Cưới

- Cập nhật `lib/constants/wedding-data.ts`
- Upload ảnh vào `public/images/`
- Upload nhạc nền vào `public/audio/`

### Bước 6: Build và Deploy

```bash
# Build static
npm run build

# Preview local
npx serve out

# Deploy lên Firebase
firebase deploy
```

### Bước 7: Cấu Hình Custom Domain (Tuỳ Chọn)

```bash
# Thêm domain trong Firebase Console
# Firebase Hosting → Add custom domain
# Cấu hình DNS record theo hướng dẫn
```

---

## 10. Checklist Trước Khi Phát Hành

### 📋 Nội dung

- [ ] Tên cặp đôi đúng chính xác
- [ ] Ngày giờ tổ chức chính xác
- [ ] Địa điểm và link Google Maps đúng
- [ ] Thông tin hai họ đầy đủ
- [ ] Thông tin tài khoản ngân hàng đúng
- [ ] QR code hoạt động

### 🖼️ Assets

- [ ] Ảnh bìa (hero) chất lượng cao (≥1080px)
- [ ] Ít nhất 6-10 ảnh cho gallery
- [ ] Nhạc nền đã upload
- [ ] QR code ảnh sắc nét

### ⚙️ Technical

- [ ] Firebase Firestore đã bật
- [ ] Security Rules đã cấu hình
- [ ] Google Maps API key đã cấu hình
- [ ] Countdown đúng timezone (UTC+7)
- [ ] Test trên thiết bị di động (iOS & Android)
- [ ] Test trên Chrome, Safari, Firefox
- [ ] HTTPS hoạt động

### 🧪 Kiểm Tra Tính Năng

- [ ] Animation mở phong bì hoạt động
- [ ] Countdown đếm ngược đúng
- [ ] Form RSVP gửi được
- [ ] Gallery lightbox hoạt động
- [ ] Map hiển thị đúng
- [ ] Nhạc bật/tắt hoạt động
- [ ] QR modal mở đúng

---

## 11. Ước Tính Thời Gian

| Giai Đoạn | Công Việc                         | Thời Gian   |
| --------- | --------------------------------- | ----------- |
| Setup     | Khởi tạo dự án, cấu hình Firebase | 2 giờ       |
| Cover     | Màn hình bìa + Animation phong bì | 4 giờ       |
| Sections  | Hero, Family, Event, Calendar     | 6 giờ       |
| Features  | Countdown, Map, Music             | 4 giờ       |
| RSVP      | Form + Firebase integration       | 4 giờ       |
| Gallery   | Upload ảnh + Lightbox             | 3 giờ       |
| Polish    | Animation, Responsive, Testing    | 5 giờ       |
| Deploy    | Firebase + Domain setup           | 2 giờ       |
| **Tổng**  |                                   | **~30 giờ** |

---

## 12. Chi Phí Ước Tính

| Dịch Vụ                 | Gói                     | Chi Phí           |
| ----------------------- | ----------------------- | ----------------- |
| Firebase Hosting        | Spark (Free)            | **0 VND**         |
| Firebase Firestore      | ≤ 1GB, ≤ 50k reads/ngày | **0 VND**         |
| Google Maps             | ≤ $200 credit/tháng     | **0 VND**         |
| Domain riêng (tuỳ chọn) | .com, .vn, .wedding     | ~300k VND/năm     |
| **Tổng**                |                         | **~0 - 300k VND** |

---

_Tài liệu này được tạo dựa trên phân tích thực tế website mẫu [ewedinvite.site/THIEPMAUDOTRANG](https://www.ewedinvite.site/THIEPMAUDOTRANG)_
