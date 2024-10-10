/** @type {import('next').NextConfig} */

import { hostname } from 'os';

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'uploads.mangadex.org'
      },
      {
        hostname: 'placehold.co'
      },
      {
        hostname: 'mangaice-proxy.vercel.app',
      },
    ],
  },
};

export default nextConfig;
