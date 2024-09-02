/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["baru.azizfath.com"],
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "baru.azizfath.com",
        port: "4040",
        pathname: "/data/**",
      },
    ],
  },
};

export default nextConfig;
