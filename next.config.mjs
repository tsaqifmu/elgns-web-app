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
};

export default nextConfig;
