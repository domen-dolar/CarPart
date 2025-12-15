import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/carpart",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
