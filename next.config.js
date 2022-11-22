/** @type {import('next').NextConfig} */
module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: ['prefixIds'],
            },
          },
        },
      ],
    });
    config.experiments = { topLevelAwait: true };
    return config;
  },
  reactStrictMode: true,
  // assetPrefix: "./",
  trailingSlash: true,
  swcMinify: true,
};
