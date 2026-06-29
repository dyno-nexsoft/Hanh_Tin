import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true, // Cần thiết cho static export trên Firebase
  },
  trailingSlash: true,
  generateBuildId: async () => {
    // Tránh trùng lặp hash version trên Firebase Hosting khi build cùng một commit nhiều lần
    return `build-${Date.now()}`;
  },
};

export default nextConfig;
