
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  /* config options here */
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'botpager.com',
      },
      {
        protocol: 'https'
        ,
        hostname: 'picsum.photos',
      }
    ],
  },
};

export default nextConfig;
