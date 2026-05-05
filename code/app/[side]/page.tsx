import WeddingPage from "@/components/layout/WeddingPage";
import { WeddingSide } from "@/lib/types";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ side: string }>;
}

export async function generateStaticParams() {
  return [
    { side: 'hanh' },
    { side: 'tin' },
  ];
}

export default async function Page({ params }: PageProps) {
  const { side } = await params;

  // Chỉ cho phép 'hanh' hoặc 'tin'
  if (side !== "hanh" && side !== "tin") {
    notFound();
  }

  return <WeddingPage side={side as WeddingSide} />;
}
