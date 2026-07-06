import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/tips/:path*',
        destination: '/blog/comic-strip-guide',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
