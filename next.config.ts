import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets local tooling (e.g. headless Chrome on 127.0.0.1) load dev assets.
  allowedDevOrigins: ["127.0.0.1"],
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
