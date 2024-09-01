/** @type {import('next').NextConfig} */
const nextConfig = {
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
