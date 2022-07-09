/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: { images: { allowFutureImage: true } },
  images: {
    domains: [
      "www.reddit.com",
      "v.redd.it",
      "external-preview.redd.it",
      "preview.redd.it",
      "i.redd.it"
    ]
  }
};

module.exports = nextConfig;
