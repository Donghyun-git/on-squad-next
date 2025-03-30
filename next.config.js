/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,

  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',

        destination: 'http://192.168.1.47:8087/api/v1/:path*',
      },
    ];
  },
};

export default nextConfig;
