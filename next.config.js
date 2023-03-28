/** @type {import('next').NextConfig} */

const { parsed: env } = require("dotenv").config();

const nextConfig = {
  experimental: {
    appDir: true,
  },
  env
}

module.exports = nextConfig
