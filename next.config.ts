import type { NextConfig } from 'next';

const isSpaMode = process.env.EXPORT_MODE === 'true';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.learnbycards.com',
        pathname: '/**',
      },
    ],
    // Add fallback for export mode
    ...(isSpaMode && {
      unoptimized: true,
    }),
  },
  // Only use static export when EXPORT_MODE is set
  ...(isSpaMode && {
    output: 'export',
    trailingSlash: true,
    reactStrictMode: true,
    distDir: 'build',
    // For true SPA, disable static generation
    skipTrailingSlashRedirect: true,
  }),

  // Use rewrites in development or when not exporting
  async rewrites() {
    if (process.env.NODE_ENV === 'development' || !isSpaMode) {
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

  // Generate static params for SPA mode
  ...(isSpaMode && {
    generateStaticParams: true,
  }),
};

export default nextConfig;
