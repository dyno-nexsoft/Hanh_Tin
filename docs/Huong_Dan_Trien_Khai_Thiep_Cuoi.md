# Tài liệu Kỹ thuật: Phát triển Website Thiệp Cưới Digital

Dựa trên mẫu tham chiếu: [ewedinvite.site/THIEPMAUDOTRANG](https://www.ewedinvite.site/THIEPMAUDOTRANG)

Tài liệu này cung cấp hướng dẫn chi tiết về cấu trúc, công nghệ và cách triển khai website thiệp cưới điện tử có tính năng lưu lời chúc và xác nhận tham dự (RSVP).

---

## 1. Tổng quan Dự án

- **Mục tiêu:** Tạo một landing page thiệp cưới sang trọng, tối ưu trên thiết bị di động.
- **Phong cách chủ đạo:** Đỏ & Trắng (Classic Wedding).
- **Tính năng chính:**
  - Hiệu ứng hình ảnh và âm nhạc tự động/thủ công.
  - Đồng hồ đếm ngược (Countdown).
  - Album ảnh cưới (Gallery).
  - Bản đồ chỉ đường (Google Maps).
  - Gửi lời chúc (Guestbook) & Xác nhận tham dự (RSVP) trực tuyến.

---

## 2. Tech Stack (Công nghệ sử dụng)

| Thành phần    | Công nghệ khuyến nghị    | Lý do                                                         |
| :------------ | :----------------------- | :------------------------------------------------------------ |
| **Frontend**  | ReactJS / Next.js        | Hiệu năng tốt, dễ bảo trì, cộng đồng hỗ trợ lớn.              |
| **Styling**   | Tailwind CSS             | Tùy biến giao diện nhanh, tối ưu Mobile-first.                |
| **Animation** | Framer Motion            | Tạo hiệu ứng mượt mà (fade-in, scroll animation).             |
| **Backend**   | Firebase Cloud Firestore | Cơ sở dữ liệu Real-time, không cần viết code server phức tạp. |
| **Hosting**   | Firebase Hosting         | Miễn phí (bản Spark), hỗ trợ HTTPS và Custom Domain.          |

---

## 3. Phân rã Component UI

### 3.1. Hero Section (Mở đầu)

- **Background:** Ảnh bìa chất lượng cao (thường là ảnh cô dâu chú rể).
- **Typography:** Tên cặp đôi dùng font script/handwriting (ví dụ: _Great Vibes_, _Dancing Script_).
- **Audio:** Nút bật/tắt nhạc ở góc màn hình.
- **Effect:** Cánh hoa rơi (Sử dụng `react-confetti` hoặc `particles.js`).

### 3.2. Countdown (Đếm ngược)

- Tính toán thời gian thực dựa trên ngày cưới.
- Giao diện: 4 ô số (Ngày, Giờ, Phút, Giây).

### 3.3. Love Story & Timeline

- Danh sách các sự kiện quan trọng.
- Sử dụng `vertical-timeline-component-react` hoặc tự code CSS Flexbox.

### 3.4. Wedding Gallery

- Bố cục Grid hoặc Masonry.
- Tích hợp `react-image-lightbox` để xem ảnh full màn hình khi click.

### 3.5. RSVP & Guestbook Form

- **Input fields:** Họ tên, Quan hệ, Số điện thoại, Số người tham dự, Nội dung lời chúc.
- **Validation:** Kiểm tra không để trống tên và lời chúc.

---

## 4. Thiết kế Cơ sở Dữ liệu (Firebase Firestore)

Dữ liệu được tổ chức thành các **Collections**:

### Collection: `wishes` (Công khai)

`````

````text?code_stdout&code_event_index=2
Huong_Dan_Trien_Khai_Thiep_Cuoi.md

```json
{
  "name": "Nguyễn Văn A",
  "content": "Chúc hai bạn trăm năm hạnh phúc!",
  "createdAt": "Timestamp (Server)",
  "status": "approved"
}
`````

### Collection: `rsvps` (Riêng tư - Admin xem)

```json
{
  "guest_name": "Trần Thị B",
  "is_attending": true,
  "guest_count": 2,
  "phone": "0901234567",
  "submittedAt": "Timestamp"
}
```

---

## 5. Cấu trúc thư mục (Project Structure)

```text
/src
  /components
    Hero.jsx
    Countdown.jsx
    Gallery.jsx
    RSVPForm.jsx
    Guestbook.jsx
    Map.jsx
  /firebase
    config.js        // Chứa config API Key
    services.js      // Các hàm get/add dữ liệu
  /assets
    /images
    /audio
  App.js
  index.css
```

---

## 6. Hướng dẫn Code Tích hợp Firebase

### 6.1. Cấu hình (`src/firebase/config.js`)

```javascript
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "...",
  appId: "...",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
```

### 6.2. Hàm gửi dữ liệu (`src/firebase/services.js`)

```javascript
import { db } from "./config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export const addWish = async (name, message) => {
  try {
    await addDoc(collection(db, "wishes"), {
      name,
      message,
      createdAt: serverTimestamp(),
    });
  } catch (e) {
    console.error("Lỗi khi gửi lời chúc: ", e);
  }
};
```

---

## 7. Quy trình triển khai (Deployment)

1. **Khởi tạo Firebase:**
   - Truy cập [Firebase Console](https://console.firebase.google.com/).
   - Tạo dự án mới -> Bật Firestore Database & Hosting.
2. **Cài đặt CLI:** `npm install -g firebase-tools`
3. **Login & Init:** `firebase login` -> `firebase init`
4. **Build Dự án:** `npm run build`
5. **Deploy:** `firebase deploy`

---
