import type { Metadata } from "next";
import { Great_Vibes, Lora, Inter } from "next/font/google";
import "./globals.css";

const greatVibes = Great_Vibes({
  subsets: ["latin", "vietnamese"],
  weight: "400",
  variable: "--font-great-vibes",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-lora",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hanh-tin-wedding.web.app"),
  title: "Thiệp Cưới Hạnh & Tín — 06.06.2026",
  description:
    "Chúng tôi trân trọng kính mời bạn đến chung vui trong ngày lễ thành hôn của Hạnh & Tín. Tiệc cưới tổ chức lúc 17h30 ngày 06/06/2026 tại Tiệc Cưới Tuấn Hà.",
  keywords: ["thiệp cưới", "Hạnh Tin", "wedding", "đám cưới 2026"],
  openGraph: {
    title: "Thiệp Cưới Hạnh & Tín",
    description: "06.06.2026 — Tiệc Cưới Tuấn Hà",
    images: ["/images/couple/hero.webp"], // Sửa lại extension nếu cần, trong wedding-data dùng .webp
    type: "website",
  },
  icons: {
    icon: "/icon.webp",
    apple: "/apple-icon.webp",
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
      className={`${greatVibes.variable} ${lora.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
