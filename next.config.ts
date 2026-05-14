import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'docs',
  basePath: '/money-saving-website',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
