import type { Metadata } from "next";
import { Great_Vibes, Lora, Inter } from "next/font/google";
import "./globals.css";
import { BRIDE, GROOM, WEDDING_DATA } from "@/lib/config/wedding";
import { format } from "date-fns";

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

const brideData = WEDDING_DATA.bride;
const weddingDateStr = format(brideData.weddingDate, "dd.MM.yyyy");
const coupleNames = `${BRIDE.name} & ${GROOM.name}`;

export const metadata: Metadata = {
  metadataBase: new URL("https://hanh-tin-wedding.web.app"),
  title: `Thiệp Cưới ${coupleNames} — ${weddingDateStr}`,
  description:
    `Chúng tôi trân trọng kính mời bạn đến chung vui trong ngày lễ thành hôn của ${coupleNames}. Tiệc cưới tổ chức lúc ${brideData.events[0].time} ngày ${format(brideData.weddingDate, "dd/MM/yyyy")} tại ${brideData.venue.name}.`,
  keywords: ["thiệp cưới", coupleNames, "wedding", `đám cưới ${brideData.weddingDate.getFullYear()}`],
  openGraph: {
    title: `Thiệp Cưới ${coupleNames}`,
    description: `${weddingDateStr} — ${brideData.venue.name}`,
    images: ["/images/couple/hero.webp"],
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
