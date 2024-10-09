/** @type {import('next').NextConfig} */

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'uploads.mangadex.org'
      },
      {
        hostname: 'placehold.co'
      }
    ],
  },
};

export default nextConfig;
