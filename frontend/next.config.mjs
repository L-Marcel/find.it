/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: process.env.API_URL,
    API_DOMAIN: process.env.API_DOMAIN,
  },
  eslint: {
    dirs: ["app", "components", "errors", "context"],
  },
  sassOptions: {
    silenceDeprecations: ["legacy-js-api"],
  },
  images: {
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
