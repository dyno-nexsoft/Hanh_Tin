# Cấu Hình Thông Tin Đám Cưới

> File nguồn duy nhất cho mọi thông tin đám cưới.
> Chỉnh sửa tại: `hanh-tin/lib/constants/wedding-data.ts`

---

## Thông Tin Cặp Đôi

| Trường | Chú Rể | Cô Dâu |
|---|---|---|
| Họ tên | Nguyễn Văn Tin | Trần Thị Hạnh |
| Tên gọi ngắn | **Tin** | **Hạnh** |
| Bố | Nguyễn Văn A | Trần Văn B |
| Mẹ | Nguyễn Thị C | Trần Thị D |

> [!IMPORTANT]
> Cập nhật tên thực của bố mẹ hai bên vào `wedding-data.ts` trước khi deploy.

---

## Lịch Trình Ngày Cưới

| Sự kiện | Thời gian | Địa điểm |
|---|---|---|
| **Lễ Thành Hôn** | 14:00, Thứ Bảy, 21/06/2025 | Nhà Thờ ABC |
| **Tiệc Mừng Nhà Trai** | 18:00, Thứ Bảy, 21/06/2025 | Nhà Hàng XYZ |
| **Tiệc Mừng Nhà Gái** | 11:00, Chủ Nhật, 22/06/2025 | Nhà Hàng DEF |

> [!IMPORTANT]
> Ngày cưới thực tế cần được xác nhận và cập nhật vào `wedding-data.ts` → `WEDDING_DATE`.

---

## Địa Điểm

```
Địa điểm tiệc: [Tên nhà hàng]
Địa chỉ: [Địa chỉ đầy đủ]
Google Maps Link: https://maps.google.com/?q=[lat],[lng]
Google Maps Embed URL: https://www.google.com/maps/embed?pb=...
```

---

## Thông Tin Mừng Cưới (Ngân Hàng)

```
Chủ tài khoản: NGUYEN VAN TIN
Số tài khoản: 1234567890
Ngân hàng: Vietcombank — CN TP.HCM
```

> [!WARNING]
> **KHÔNG** commit thông tin tài khoản ngân hàng thực lên Git public repo.
> Nên dùng environment variable hoặc để trong file riêng được `.gitignore`.

---

## Design Tokens

| Token | Màu | Hex |
|---|---|---|
| `wedding-red` | Đỏ cổ điển | `#8B0000` |
| `wedding-red-light` | Đỏ nhạt | `#C41E3A` |
| `wedding-gold` | Vàng | `#B8960C` |
| `wedding-gold-light` | Vàng nhạt | `#D4AF37` |
| `wedding-cream` | Kem | `#FDF8F0` |
| `wedding-dark` | Nâu tối | `#1A0A0A` |

---

## Typography

| Dùng cho | Font | Nguồn |
|---|---|---|
| Tên cặp đôi, tiêu đề lãng mạn | **Great Vibes** | Google Fonts |
| Tiêu đề section | **Cormorant Garamond** | Google Fonts |
| Body text, UI | **Inter** | Google Fonts |

---

## Âm Nhạc

Nhạc nền đặt tại: `public/audio/wedding-song.mp3`

Nhạc đề xuất:
- "Chúc Mừng Hạnh Phúc" (instrumental)
- "A Thousand Years" — Christina Perri (instrumental cover)
- Hoặc bất kỳ bản nhạc không có bản quyền

---

## Mapping với Code

```typescript
// hanh-tin/lib/constants/wedding-data.ts
export const WEDDING_CONFIG = {
  groom: { name: "Văn Tin", fullName: "Nguyễn Văn Tin", ... },
  bride: { name: "Thị Hạnh", fullName: "Trần Thị Hạnh", ... },
  weddingDate: new Date("2025-06-21T14:00:00"),
  venue: { name: "...", address: "...", mapsUrl: "...", embedUrl: "..." },
  bank: { owner: "NGUYEN VAN TIN", number: "...", bank: "Vietcombank" },
};
```
