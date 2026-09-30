import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Trim the fingerprinting header and keep gzip/br compression on.
  poweredByHeader: false,
  compress: true,
  images: {
    // Serve modern formats; cache optimized remote images for a day.
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "lh4.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "lh5.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "lh6.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
      {
        protocol: "https",
        hostname: "cdn.simpleicons.org",
      },
    ],
  },
};

export default nextConfig;
