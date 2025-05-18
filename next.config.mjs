/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'http://localhost:1337/'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;

