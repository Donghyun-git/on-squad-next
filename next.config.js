/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    autoLabel: 'always',
  },

  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: 'http://192.168.1.142:8083/api/v1/:path*',
      },
    ];
  },
};

export default nextConfig;
