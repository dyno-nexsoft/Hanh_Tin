/// Tất cả thông tin đám cưới — nguồn duy nhất (single source of truth).
/// Thay đổi ở đây sẽ ảnh hưởng toàn bộ website.
export const BRIDE = {
  name: 'Hạnh',
  fullName: 'Đoàn Thị Hạnh',
  father: 'Đoàn Bảo Trị',
  mother: 'Phan Thị Mỹ Hương',
  photo: '/images/couple/bride.webp',
};

export const GROOM = {
  name: 'Tin',
  fullName: 'Trần Hữu Tin',
  father: 'Trần Hữu Định',
  mother: 'Trần Thị Thu Tâm',
  photo: '/images/couple/groom.webp',
};

/// Ngày giờ mục tiêu đếm ngược — Tiệc cưới nhà gái.
export const WEDDING_DATE = new Date('2026-06-06T17:30:00');

export const EVENTS = [
  {
    id: 'ceremony',
    title: 'Lễ Thành Hôn',
    time: '17:30',
    date: 'Thứ Bảy, 06 tháng 06 năm 2026',
    venue: 'Tiệc Cưới Tuấn Hà',
    address: 'TP. Hồ Chí Minh', // ← cập nhật địa chỉ thật
    icon: '💍',
  },
  {
    id: 'party',
    title: 'Tiệc Mừng Nhà Gái',
    time: '17:30',
    date: 'Thứ Bảy, 06 tháng 06 năm 2026',
    venue: 'Tiệc Cưới Tuấn Hà',
    address: 'TP. Hồ Chí Minh', // ← cập nhật địa chỉ thật
    icon: '🥂',
  },
];

export const VENUE = {
  name: 'Tiệc Cưới Tuấn Hà',
  address: 'TP. Hồ Chí Minh', // ← cập nhật địa chỉ đầy đủ
  mapsUrl: 'https://maps.google.com', // ← cập nhật link Google Maps thật
  // Embed URL từ Google Maps → Share → Embed a map → copy src="..."
  embedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919!2d106.6297!3d10.8231!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDQ5JzIzLjIiTiAxMDbCsDM3JzQ2LjkiRQ!5e0!3m2!1svi!2s!4v1000000000',
};

/// Thông tin ngân hàng — dùng cho modal QR mừng cưới.
export const BANK = {
  owner: 'TRAN HUU TIN',
  number: '1234567890', // ← cập nhật số tài khoản thật
  bankName: 'Vietcombank',
  branch: 'CN TP.HCM',
  qrImage: '/images/qr-code.png', // ← thêm QR vào public/images/
};

/// Danh sách ảnh gallery — 23 ảnh.
export const GALLERY_IMAGES = Array.from({ length: 23 }, (_, i) => ({
  src: `/images/gallery/${String(i + 1).padStart(2, '0')}.webp`,
  alt: `Ảnh cưới ${i + 1}`,
}));

/// Couple photos cho hero và love story section.
export const COUPLE_PHOTOS = {
  hero: '/images/couple/hero.webp',
  close: '/images/couple/close.webp',
};
