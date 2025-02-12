const isProd = process.env.NODE_ENV === 'production';
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Disable default image optimization
  },
  assetPrefix: isProd ? '/pokemon-signature-tournament-results/' : '',
  basePath: isProd ? '/pokemon-signature-tournament-results' : '',
  output: 'export'
};

export default nextConfig;