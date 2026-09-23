import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
  },
  async redirects() {
    return [
      // Old unlinked duplicate of the Simplified Tajweed page
      { source: "/course-details", destination: "/our-course", permanent: true },
    ];
  },
};

export default nextConfig;
