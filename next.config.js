const path = require('path');

const isProduction = process.env.NEXT_ENV === 'PRODUCTION';
const basePath = isProduction ? '/development-tools' : '';
const assetPrefix = isProduction ? '/development-tools' : '';

let nextConfig = {
  output: 'export',
  basePath: basePath,
  assetPrefix: assetPrefix,
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  env: {
    NEXT_ENV: process.env.NEXT_ENV,
  },
  poweredByHeader: false,
  images: {
    unoptimized: true,
    domains: ['betterbug-storage.s3.amazonaws.com'],
  },
};

// next-pwa is not compatible with static export or Cloudflare Pages
// Keep it only for local development if needed in future
module.exports = nextConfig;
