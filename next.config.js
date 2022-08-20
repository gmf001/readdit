/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: { images: { allowFutureImage: true } },
  images: {
    domains: [
      'www.reddit.com',
      'v.redd.it',
      'external-preview.redd.it',
      'preview.redd.it',
      'i.redd.it',
      'i.imgur.com',
      'res.cloudinary.com',
      'b.thumbs.redditmedia.com',
      'a.thumbs.redditmedia.com',
      'user-images.githubusercontent.com'
    ]
  }
};

module.exports = nextConfig;
