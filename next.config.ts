import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    minimumCacheTTL: 2592000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'vcwfdoljqhthsknwxjbl.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'yourdomain.com',
      },
    ],
  },
};

export default nextConfig;
