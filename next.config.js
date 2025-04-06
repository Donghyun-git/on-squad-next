/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: [
      'onsquad-bucket.s3.ap-northeast-2.amazonaws.com',
      't1.daumcdn.net',
    ],
  },
  api: {
    bodyParser: true,
    externalResolver: true,
  },
};

export default nextConfig;
