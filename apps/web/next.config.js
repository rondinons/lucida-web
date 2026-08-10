/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@lucida/shared", "@lucida/database"],
};

module.exports = nextConfig;
