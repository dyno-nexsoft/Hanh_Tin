# 💍 Thiệp Cưới Hạnh & Tín

Trang web thiệp cưới điện tử hiện đại, tinh tế và cá nhân hóa dành cho ngày trọng đại của cặp đôi **Hạnh & Tín**.

## ✨ Tính năng nổi bật

- **Cá nhân hóa khách mời:** Mỗi khách mời có đường link riêng biệt với tên hiển thị trên thiệp.
- **Đa giao diện (Multi-side):** Tự động đảo trật tự Nhà Trai/Nhà Gái và thay đổi nội dung (Vu Quy/Thành Hôn) tùy theo bên mời.
- **Trang Quản trị (/admin):**
  - Tạo link mời nhanh chóng, tự động mã hóa ký tự đặc biệt.
  - Tích hợp nút **Chia sẻ Native** (Zalo, Messenger...) trên di động.
  - **Tracking:** Theo dõi lượt xem thực tế của từng vị khách thông qua Firebase.
- **Tương tác & Tiện ích:**
  - Gửi lời chúc mừng trực tuyến.
  - Đếm ngược đến ngày cưới.
  - Album ảnh cưới (Gallery).
  - Bản đồ chỉ đường và thông tin mừng cưới (QR Code).

## 🛠 Công nghệ sử dụng

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Database:** [Firebase Firestore](https://firebase.google.com/)
- **Animation:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)

## 🚀 Hướng dẫn nhanh

### 1. Cài đặt & Chạy Local
```bash
npm install
npm run dev
```

### 2. Quản lý khách mời
Truy cập đường dẫn: `/admin`
- Nhập tên khách mời -> Chọn bên mời -> Bấm "Tạo Link".
- Danh sách link được lưu trên Firebase, hiển thị trạng thái **"Đã xem"** khi khách mở thiệp.

### 3. Cấu hình thông tin
Mọi thông tin về ngày giờ, địa điểm, thông tin gia đình được tập trung tại:
`code/lib/config/wedding.ts`

---
© 2026 Hạnh & Tín Wedding Team.
