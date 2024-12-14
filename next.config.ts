import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: 'covers.openlibrary.org',
        port: '',
        pathname: '/b/olid/'
      },
    ],
  },
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY
  }
  /* config options here */
};

export default nextConfig;
