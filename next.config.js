const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias["@codemirror/state"] = path.resolve(
      __dirname,
      "/node_modules/@codemirror/state/dist/index.cjs"
    );
    return config;
  },
};

module.exports = nextConfig;
