/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['github.com', 'example.com'], // Add any image domains you need
    formats: ['image/webp'],
  },
  // Enable compression
  compress: true,
  // Optimize output directory
  distDir: 'dist',
  // Enable trailing slash if needed
  trailingSlash: false,
  // Optimize bundle analyzer (remove for production)
  // output: 'export', // Uncomment for static export if needed
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Client-side specific config
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false, // Disable fs module for client
      };
    }
    return config;
  },
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
