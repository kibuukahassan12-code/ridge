import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
    qualities: [100, 75],
  },
  webpack: (config, { isServer }) => {
    // Custom webpack config if needed
    return config;
  },
};

export default nextConfig;
