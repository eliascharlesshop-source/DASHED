/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ['image/webp', 'image/avif'], // Modern formats for better compression
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840], // Responsive breakpoints
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // Common icon sizes
    dangerouslyAllowSVG: true, // Allow SVG images
    contentDispositionType: 'attachment', // Better caching
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;", // Security
    localPatterns: [
      {
        pathname: '/placeholder.svg',
        search: '.*',
      },
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
      },
    ],
  },
  experimental: {
    scrollRestoration: true, // Better UX
    disableOptimizedLoading: true, // Disable client reference manifest
  },
  turbopack: {}, // Empty turbopack config to disable webpack warnings
  // Performance optimizations
  compress: true, // Enable gzip compression
  poweredByHeader: false, // Remove X-Powered-By header
  reactStrictMode: true, // Better development experience
  env: {
    APP_NAME: 'DASHED',
    APP_VERSION: '1.1.0',
  },
  // Bundle analysis and optimization
  webpack: (config, { dev, isServer }) => {
    // Optimize bundle splitting
    if (!dev && !isServer) {
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 10,
        },
        radix: {
          test: /[\\/]node_modules[\\/]@radix-ui[\\/]/,
          name: 'radix-ui',
          chunks: 'all',
          priority: 20,
        },
        lucide: {
          test: /[\\/]node_modules[\\/]lucide-react[\\/]/,
          name: 'lucide-icons',
          chunks: 'all',
          priority: 20,
        },
      };
    }

    // Add performance hints
    if (!dev) {
      config.performance = {
        hints: 'warning',
        maxAssetSize: 512000, // 512kb
        maxEntrypointSize: 512000, // 512kb
      };
    }

    return config;
  },
}

export default nextConfig
