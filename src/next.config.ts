
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
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
