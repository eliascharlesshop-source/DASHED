/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // App metadata
  experimental: {
    appDir: true,
  },
  env: {
    APP_NAME: 'DASHED',
    APP_VERSION: '1.1.0',
  },
}

export default nextConfig
