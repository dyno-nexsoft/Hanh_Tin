# Tài liệu UI/UX: Thiệp Mời Số Phong Cách TikTok

> **Cập nhật lần cuối:** 2026-05-18  
> **Trạng thái:** Đã triển khai & đang tinh chỉnh

---

## 1. Tổng quan (Overview)

Thiệp cưới số được xây dựng theo phong cách **TikTok-style fullscreen experience**: toàn bộ nội dung chia thành các slide toàn màn hình, người dùng vuốt dọc để lướt qua từng phần. Trên desktop, có thêm left navigation sidebar cố định và right interaction sidebar nổi (float), hoàn toàn tương thích responsive cho cả mobile và desktop.

**Stack:** Next.js 16, React 19, Tailwind CSS v4, Framer Motion, Firebase Firestore.

---

## 2. Kiến trúc Layout

### 2.1. Cấu trúc Slide Toàn Màn Hình

- **Container chính:** `WeddingPage.tsx` — quản lý toàn bộ danh sách slides, trạng thái slide hiện tại, và render `InteractionSidebar`.
- **Mỗi slide:** Có class `.snap-slide-y` với `height: 100dvh`, `scroll-snap-align: start`, `scroll-snap-stop: always`.
- **Scroll container:** CSS Scroll Snap theo trục Y (`scroll-snap-type: y mandatory`).
- **Lưu ý quan trọng:** Class `.snap-slide-y` KHÔNG còn đặt `overflow-y: hidden` hay `justify-content: center` lên các phần tử con nữa — mỗi `<section>` tự quản lý layout và overflow của mình để tránh lỗi clipping.
- **Tách biệt Thanh Tương Tác trên Desktop:** Sidebar không bị bọc chung với `.snap-slide-y`. Nó là một khối nằm ngang bên cạnh video feed để không bị trôi đi khi lướt slide.

### 2.2. Danh sách Slides (Thứ tự)

| Index | Component         | Nội dung             | isDark             |
| ----- | ----------------- | -------------------- | ------------------ |
| 0     | `HeroSection`     | Ảnh cô dâu & chú rể  | ✗                  |
| 1     | `FamilySection`   | Thiệp gia đình / Lễ  | ✗                  |
| 2     | `CalendarSection` | Lịch cưới đếm ngược  | Đặc biệt (xem 3.2) |
| 3     | `GallerySection`  | Album ảnh lướt ngang | ✓                  |
| 4     | `MapSection`      | Bản đồ & chỉ đường   | ✗                  |
| 5     | `FooterSection`   | Thank You card       | ✓                  |

### 2.3. Desktop Layout

- **Left sidebar** (`DesktopNav`): Cố định bên trái, hiển thị avatar cặp đôi, ngày cưới, menu điều hướng slide.
- **Main content area:** Chiếm phần còn lại của viewport.
- **Right sidebar** (`InteractionSidebar`): Nằm bên phải khung feed chính (inline), chứa các nút tương tác TikTok-style.
- **Comment panel:** Hiển thị inline bên phải cùng của màn hình (không dùng Drawer) khi bấm nút Comment, tạo không gian hiển thị độc lập không che khuất slide.

### 2.4. Mobile Layout

- Không có left sidebar.
- `InteractionSidebar` float ở góc phải màn hình (absolute, z-50).
- Comment hiển thị dưới dạng **Bottom Sheet**.

---

## 3. InteractionSidebar — Thanh Tương Tác TikTok

**File:** `components/shared/InteractionSidebar.tsx`

### 3.1. Các nút (theo thứ tự từ trên xuống)

1. **Avatar** — Ảnh đại diện cặp đôi + nút `+` (Add to Calendar)
2. **❤️ Thả tim** — Like count realtime từ Firestore, double-tap vào màn hình cũng thả tim
3. **💬 Bình luận** — Số lượng lời chúc; bấm mở Comment panel/Bottom Sheet
4. **🎁 Quà** — Mở popup QR chuyển khoản tặng quà mừng
5. **🎵 Đĩa nhạc** — Play/Pause nhạc nền, animation đĩa nhạc tròn quay (`object-cover`) với thiết kế backdrop blur tinh tế ở viền.

### 3.2. Dynamic Dark/Light Theme

Sidebar tự động đổi theme dựa trên prop `isDark` nhận từ `WeddingPage`:

| Slide             | Môi trường | Kiểu hiển thị (Màu Text/Icon Sidebar)                    |
| ----------------- | ---------- | -------------------------------------------------------- |
| Hero, Family, Map | Tất cả     | Chữ Tối (`isDark=false`) - Nền slide sáng                |
| Gallery, Footer   | Tất cả     | Chữ Trắng (`isDark=true`) - Nền slide tối                |
| Calendar          | Mobile     | Chữ Tối (`isDark=false`) - Sidebar đè lên thẻ trắng      |
| Calendar          | Desktop    | Chữ Trắng (`isDark=true`) - Sidebar nằm trên viền nền đỏ |

_Lý do tách biệt Calendar:_ Trên mobile, thẻ lịch thu hẹp nên Sidebar đè thẳng lên không gian nền trắng của thẻ $\rightarrow$ Cần text tối. Trên desktop, Sidebar nằm rời ra bên phải ngoài thẻ, trên lớp nền viền màu đỏ đậm $\rightarrow$ Cần text trắng.

### 3.3. Padding an toàn tránh che nội dung

- Trên **mobile**, các nội dung/nút quan trọng cần padding-right `pr-[72px]` đến `pr-[80px]` để không bị Sidebar che khuất. Hoặc được bao bọc (wrap) bằng `max-w-max` dóng giữa.
- Áp dụng ở: nút CTA của `MapSection` (chuyển sang canh giữa tự động).

---

## 4. Chi tiết từng Section

### 4.1. HeroSection (`components/sections/HeroSection.tsx`)

- Layout 2 cột trên desktop (`lg:flex-row`), stack dọc trên mobile (`flex-col`).
- Mỗi cột: label role + tên đầy đủ + 2 ảnh dạng grid 2 cột.
- **Tên cô dâu/chú rể:** `whitespace-nowrap` để không xuống dòng; font-size `text-2xl sm:text-4xl lg:text-3xl xl:text-5xl`.

### 4.2. FamilySection (`components/sections/FamilySection.tsx`)

- Nền gradient ấm cream-beige: `linear-gradient(180deg, #FDF8F0 0%, #F5ECE2 100%)`.
- Watermark Song Hỷ (囍) ở giữa nền, opacity 6%.
- **White card:** Bo góc `rounded-[2rem]`, có **viền đôi** trang trí (double border) bên trong.
- **Tên phụ huynh:** Dùng `inline-block text-left` kết hợp với thẻ bao `text-center` để canh "Ông / Bà" thẳng hàng tuyệt đối.
- **Tối ưu Desktop:** Loại bỏ các margin `lg:` khổng lồ để thẻ không bị phình to sinh ra thanh cuộn thừa (scrollbar).

### 4.3. CalendarSection (`components/sections/CalendarSection.tsx`)

- Nền đỏ trầu `bg-wedding-red` tràn viền 100%.
- Highlight ngày 6/6 với icon trái tim nổi bật lớn hơn.
- Cấu trúc layout `flex-center` và cấu trúc grid max-width thu gọn để không cấn đụng Sidebar.

### 4.4. GallerySection (`components/sections/GallerySection.tsx`)

- Album ảnh lướt ngang (horizontal carousel) dạng grid.
- **Desktop Navigation:** Đã bổ sung hai nút Mũi tên (ChevronLeft, ChevronRight) hiển thị khi hover trên giao diện Desktop (`md:flex`). Các nút thực thi thao tác `scrollBy` mượt mà (smooth) để thay thế hoàn toàn cho thao tác "kéo chuột/Shift+Scroll" khó dùng.

### 4.5. MapSection (`components/sections/MapSection.tsx`)

- Nền gradient `#FDF8F0 → white`.
- Nút CTA "Mở Bản Đồ & Chỉ Đường" đã được xử lý tách rời để thu hẹp không gian, căn chỉnh chính giữa (w-max).

### 4.6. FooterSection (`components/sections/FooterSection.tsx`)

- Background: ảnh cặp đôi blur (parallax) làm nền tối toàn slide.
- **Thank You card:** Màu đỏ trầu `#8B1A1A` thuần túy.

---

## 5. Hệ thống Bình Luận (Comments)

### 5.1. Desktop

- Comment panel hiển thị **inline** bên phải main content, trượt vào từ phải (`translateX` animation).
- Không dùng Drawer hay Modal để tránh overlay che slide.
- Width cố định ~380px, height 100%.

### 5.2. Mobile

- Comment hiển thị dưới dạng **Bottom Sheet** trượt lên từ dưới.
- Có thể kéo xuống để đóng.

---

## 6. Tính năng Đã Triển Khai

| Tính năng                     | Trạng thái    | Ghi chú                                       |
| ----------------------------- | ------------- | --------------------------------------------- |
| Vertical Snap Scroll          | ✅ Hoàn thành | CSS Scroll Snap + Framer Motion               |
| Horizontal Gallery Carousel   | ✅ Hoàn thành | Lướt ngang vuốt & nút điều hướng click        |
| Like / Double-tap             | ✅ Hoàn thành | Realtime Firestore                            |
| Bình luận / Lời chúc          | ✅ Hoàn thành | Bottom Sheet (mobile), Inline Panel (desktop) |
| Tặng quà (QR popup)           | ✅ Hoàn thành | Hiển thị QR + tên ngân hàng                   |
| Chia sẻ link                  | ✅ Hoàn thành | Copy to clipboard + Web Share API             |
| Nhạc nền + đĩa quay           | ✅ Hoàn thành | Play/Pause, animation rotate                  |
| Add to Calendar               | ✅ Hoàn thành | Nút `+` trên avatar, tạo file `.ics`          |
| InteractionSidebar Dark/Light | ✅ Hoàn thành | Lập trình logic Theme theo màn hình và Slide  |
| Tên khách mời cá nhân hoá     | ✅ Hoàn thành | URL query param `?to=TênKháchMời`             |
| Responsive Mobile/Desktop     | ✅ Hoàn thành | Breakpoints mobile/sm/lg/xl                   |

---

## 7. Các Vấn Đề Đã Giải Quyết

### 7.1. Lỗi nội dung section bị cắt (clipping)

**Nguyên nhân:** Rule CSS `.snap-slide-y > *` hardcode `overflow-y: hidden` và `justify-content: center` ghi đè mọi class trên `<section>` con.  
**Giải pháp:** Xóa rule `.snap-slide-y > *` khỏi `globals.css`. Mỗi section tự khai báo layout của mình.

### 7.2. Tên cô dâu "Đoàn Thị Mỹ Hạnh" bị xuống dòng

**Giải pháp:** `whitespace-nowrap` + giảm font-size xuống `text-2xl sm:text-4xl lg:text-3xl xl:text-5xl`.

### 7.3. Logo Song Hỷ (囍) bị cắt ở trên

**Giải pháp:** Bỏ `overflow-hidden` khỏi card container, tăng `pt-6` trên mobile.

### 7.4. Nền section bị "chữ nhật" không tràn qua Sidebar

**Giải pháp:** Bỏ padding khỏi slide wrapper, đặt padding bên trong từng section. Background tràn 100% viewport width, Sidebar float đè lên.

### 7.5. Nút "Mở Bản Đồ" bị Sidebar che

**Giải pháp:** Nút thu vào `w-max` và căn chỉnh Center hoàn toàn độc lập với Sidebar.

### 7.6. Thank You card bị cắt trên viewport thấp (~681px)

**Giải pháp:** Giảm xuống `py-6 mb-3 mb-4` trên mobile, giữ `sm:py-14` cho desktop.

### 7.7. Màu chữ Sidebar sai lệch ở Lịch cưới (CalendarSection)

**Nguyên nhân:** Lịch có thẻ trắng, nhưng Desktop thì Sidebar lại rớt ra viền đỏ ngoài thẻ.
**Giải pháp:** Custom logic isDarkSlide kết hợp kiểm tra Responsive. Mobile sẽ ép text Tối (isDark=false) vì Sidebar bị thẻ đè. Desktop sẽ ép text Trắng (isDark=true) vì Sidebar nằm trên nền đỏ.

### 7.8. Thẻ thiệp Gia Đình (FamilySection) lỗi thanh cuộn trên Desktop

**Nguyên nhân:** Dùng padding khổng lồ `lg:pt-12` `lg:mt-16` làm thẻ phình dài sinh ra scrollbar kép.
**Giải pháp:** Gọt bớt các spacing để thẻ luôn Fit trong màn hình Desktop.

### 7.9. Chữ Ông/Bà trong Nhà Trai, Nhà Gái bị chênh do căn giữa

**Giải pháp:** Bọc hai thẻ `p` vào một `div` có class `inline-block text-left` kết hợp `text-center` bao quanh. Kéo các text dóng nhau 100% y như thiệp in ấn.

### 7.10. Album Ảnh (Gallery) trên Desktop cực khó thao tác

**Nguyên nhân:** Lướt ngang trên trình duyệt Desktop bằng chuột thông thường đòi hỏi thao tác Shift+Cuộn phiền toái.
**Giải pháp:** Thêm hai nút Chevron (Mũi tên trái/phải) nổi lên khi rê chuột. Áp dụng `Element.scrollBy` tạo luồng trượt (slide carousel) thuận tiện.
