/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: 'http://192.168.0.11:8080/api/v1/:path*',
      },
    ];
  },
};

export default nextConfig;
