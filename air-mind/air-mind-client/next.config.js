/** @type {import('next').NextConfig} */
const Dotenv = require('dotenv-webpack');

const securityHeaders = [
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
];

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  webpack: config => {
    config.plugins.push(new Dotenv({ silent: true }));
    return config;
  },
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;
