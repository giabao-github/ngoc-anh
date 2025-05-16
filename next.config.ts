import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.zarla.com',
      },
      {
        protocol: 'https',
        hostname: 'file.hstatic.net',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'www.worldatlas.com',
      },
      {
        protocol: 'https',
        hostname: 'static.vecteezy.com',
      },
      {
        protocol: 'https',
        hostname: 'file.hstatic.net',
      },
      {
        protocol: 'https',
        hostname: 'product.hstatic.net',
      },
      {
        protocol: 'https',
        hostname: 'www.mahalaxmifoods.com',
      },
      {
        protocol: 'https',
        hostname: 'getillustrations.b-cdn.net',
      },
    ],
  },
};

export default nextConfig;
