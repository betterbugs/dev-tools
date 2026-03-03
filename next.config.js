const path = require('path');
const runtimeCaching = require('next-pwa/cache');

const isProduction = process.env.NEXT_ENV === 'PRODUCTION';
const basePath = isProduction ? '/development-tools' : '';
const assetPrefix = isProduction ? '/development-tools' : '';

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

let nextConfig = {
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
    domains: ['betterbug-storage.s3.amazonaws.com'],
  },
};

if (process.env.NEXT_ENV !== 'local') {
  const withPWA = require('next-pwa')({
    dest: 'public',
    runtimeCaching,
  });

  module.exports = withBundleAnalyzer(withPWA(nextConfig));
} else {
  module.exports = withBundleAnalyzer(nextConfig);
}
