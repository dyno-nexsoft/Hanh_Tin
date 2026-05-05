import type { Metadata } from 'next';
import { Great_Vibes, Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-great-vibes',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://hanh-tin-wedding.web.app'),
  title: 'Thiệp Cưới Hạnh & Tin — 06.06.2026',
  description:
    'Chúng tôi trân trọng kính mời bạn đến chung vui trong ngày lễ thành hôn của Hạnh & Tin. Tiệc cưới tổ chức lúc 17h30 ngày 06/06/2026 tại Tiệc Cưới Tuấn Hà.',
  keywords: ['thiệp cưới', 'Hạnh Tin', 'wedding', 'đám cưới 2026'],
  openGraph: {
    title: 'Thiệp Cưới Hạnh & Tin',
    description: '06.06.2026 — Tiệc Cưới Tuấn Hà',
    images: ['/images/couple/hero.webp'], // Sửa lại extension nếu cần, trong wedding-data dùng .webp
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

/// Root layout — load Google Fonts và cung cấp font variables cho toàn app.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="vi"
      className={`${greatVibes.variable} ${cormorant.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
