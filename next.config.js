/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.GITHUB_ACTIONS && "/",
  reactStrictMode: false,
};

module.exports = nextConfig;
