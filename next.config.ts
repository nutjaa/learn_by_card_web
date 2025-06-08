import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['img.learnbycards.com'],
    // Add fallback for export mode
    ...(process.env.EXPORT_MODE === 'true' && {
      unoptimized: true,
    }),
  },
  // Only use static export when EXPORT_MODE is set
  ...(process.env.EXPORT_MODE === 'true' && {
    output: 'export',
    trailingSlash: true,
  }),

  // Use rewrites in development or when not exporting
  async rewrites() {
    if (
      process.env.NODE_ENV === 'development' ||
      process.env.EXPORT_MODE !== 'true'
    ) {
      return [
        {
          source: '/api/proxy/public/:path*',
          destination: 'https://www.learnbycards.com/api/public/v1/:path*',
        },
        {
          source: '/api/proxy/auth/:path*',
          destination: 'https://www.learnbycards.com/api/auth/v1/:path*',
        },
      ];
    }
    return [];
  },
};

export default nextConfig;
