import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable Webpack caching
  webpack(config, { isServer }) {
    config.cache = false;
    return config;
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "logo-generator-sadi.s3.ap-southeast-2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "cdn.example.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
