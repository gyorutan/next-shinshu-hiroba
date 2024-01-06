/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SERVER_API: process.env.SERVER_API,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gyorutan-images.s3.ap-northeast-1.amazonaws.com",
      },
    ],
  },
};

module.exports = nextConfig;
