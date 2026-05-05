/// Tất cả thông tin đám cưới — hỗ trợ phân chia Nhà Trai / Nhà Gái.
export const BRIDE = {
  name: 'Hạnh',
  fullName: 'Đoàn Thị Mỹ Hạnh',
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

export type WeddingSide = 'hanh' | 'tin';

export const WEDDING_DATA = {
  hanh: {
    sideName: 'Nhà Gái',
    weddingDate: new Date('2026-06-06T17:30:00'),
    events: [
      {
        id: 'party-hanh',
        title: 'Tiệc Mừng Nhà Gái',
        time: '17:30',
        date: 'Thứ Bảy, 06 tháng 06 năm 2026',
        venue: 'Tiệc Cưới Tuấn Hà',
        address: 'Phú Bình, Cam Lâm, Khánh Hòa',
        icon: '🥂',
      },
    ],
    venue: {
      name: 'Tiệc Cưới Tuấn Hà',
      address: '44F4+C3P, Phú Bình, Cam Lâm, Khánh Hòa',
      mapsUrl: 'https://maps.app.goo.gl/Skz8jdAMVdQxqm138',
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3905.811568285554!2d109.1362!3d11.954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317094943f65e237%3A0xc3f98018e6e87364!2zVGnhu4djIGPGsOG7m2kgVXXhuqVuIEjDoA!5e0!3m2!1svi!2s!4v1714800000000',
    },
    bank: {
      owner: 'DOAN THI MY HANH',
      number: '109874643600',
      bankName: 'VietinBank',
      bankId: 'ICB',
      qrImage: '/images/qr-hanh.png',
    }
  },
  tin: {
    sideName: 'Nhà Trai',
    weddingDate: new Date('2026-06-13T11:00:00'),
    events: [
      {
        id: 'party-tin',
        title: 'Tiệc Mừng Nhà Trai',
        time: '11:00',
        date: 'Thứ Bảy, 13 tháng 06 năm 2026',
        venue: 'Nhà Hàng Tiệc Cưới Công Quang',
        address: 'Đại Lãnh, Khánh Hòa',
        icon: '🥂',
      },
    ],
    venue: {
      name: 'Nhà Hàng Tiệc Cưới Công Quang',
      address: 'R9Q7+2WG, QL1, Đại Lãnh, Khánh Hòa',
      mapsUrl: 'https://maps.app.goo.gl/q9DhYewqVFW7T9PK6',
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3898.1565432!2d109.3562!3d12.854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDUxJzE0LjQiTiAxMDnCsDIxJzEwLjMiRQ!5e0!3m2!1svi!2s!4v1714800000000',
    },
    bank: {
      owner: 'TRAN HUU TIN',
      number: '0061001149165',
      bankName: 'Vietcombank',
      bankId: 'VCB',
      qrImage: '/images/qr-tin.png',
    }
  }
};

export const GALLERY_IMAGES = Array.from({ length: 23 }, (_, i) => ({
  src: `/images/gallery/${String(i + 1).padStart(2, '0')}.webp`,
  alt: `Ảnh cưới ${i + 1}`,
}));

export const COUPLE_PHOTOS = {
  hero: '/images/couple/hero.webp',
  close: '/images/couple/close.webp',
};
