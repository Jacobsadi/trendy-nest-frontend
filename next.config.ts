import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "logo-generator-sadi.s3.ap-southeast-2.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
