import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/money-saving-website",
  distDir: "docs",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
