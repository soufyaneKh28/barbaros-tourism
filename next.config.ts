import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    minimumCacheTTL: 2592000, // 30 days (original setting)
    formats: ['image/webp'], // Use WebP format for better compression (25-35% smaller)
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840], // Responsive breakpoints
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // Smaller sizes for icons/thumbnails
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
  experimental: {
    // Use modern output for smaller bundles
    optimizePackageImports: ['lucide-react', 'motion'],
  },
};

export default nextConfig;
