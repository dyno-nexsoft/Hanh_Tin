import WeddingPage from "@/components/layout/WeddingPage";
import { WeddingSide } from "@/lib/types";
import { notFound } from "next/navigation";
import { BRIDE, GROOM, WEDDING_DATA } from "@/lib/config/wedding";
import { format } from "date-fns";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ side: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { side } = await params;
  const weddingSide = (side === "groom" ? "groom" : "bride") as WeddingSide;
  const data = WEDDING_DATA[weddingSide];
  const coupleNames = `${BRIDE.name} & ${GROOM.name}`;
  const dateStr = format(data.weddingDate, "dd.MM.yyyy");

  return {
    title: `Thiệp Cưới ${coupleNames} — ${dateStr}`,
    description: `Trân trọng kính mời bạn đến dự ${data.ceremonyTitle} của ${coupleNames} vào lúc ${data.events[0].time} ngày ${format(data.weddingDate, "dd/MM/yyyy")} tại ${data.venue.name}.`,
    openGraph: {
      title: `Thiệp Cưới ${coupleNames} — ${data.ceremonyTitle}`,
      description: `${dateStr} — ${data.venue.name}`,
      images: ["/images/couple/hero.webp"],
    },
  };
}

export async function generateStaticParams() {
  return [
    { side: 'bride' },
    { side: 'groom' },
  ];
}

export default async function Page({ params }: PageProps) {
  const { side } = await params;

  // Chỉ cho phép 'bride' hoặc 'groom'
  if (side !== "bride" && side !== "groom") {
    notFound();
  }

  return <WeddingPage side={side as WeddingSide} />;
}
