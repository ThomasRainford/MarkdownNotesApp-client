const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    config.resolve.alias["@codemirror/state"] = path.resolve(
      __dirname,
      "node_modules/@codemirror/state"
    );
    return config;
  },
};

module.exports = nextConfig;
