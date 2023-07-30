/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.GITHUB_ACTIONS && "/meet-time",
  reactStrictMode: false,
};

module.exports = nextConfig;
