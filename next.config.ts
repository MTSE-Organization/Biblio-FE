import type { NextConfig } from 'next';
import createBundleAnalyzer from '@next/bundle-analyzer';
import path from 'path';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'api-book.moviehub.biz',
        pathname: '/**'
      }
    ],
    qualities: [75, 100]
  },
  outputFileTracingRoot: path.join(__dirname, '../..')
};

const withBundleAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true'
});

export default withBundleAnalyzer(nextConfig);
