import { readFileSync } from 'fs';

/** @type {import('next').NextConfig} */
const basePath = process.env.BASE_PATH || '';
const packageJson = JSON.parse(readFileSync('./package.json', 'utf8'));

const config = {
  // Enable static export only for production builds
  output: process.env.NODE_ENV === "production" ? "export" : "standalone",
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true }, // required for static export + <Image>
  trailingSlash: true, // use trailing slashes for Arweave gateway compatibility
  // Support GitHub Pages subdirectory deployment
  basePath: basePath,
  assetPrefix: basePath,
  env: {
    NEXT_PUBLIC_APP_VERSION: packageJson.version,
  },
};

export default config;
