/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        { protocol: 'https', hostname: 'img.artiz.ai' },
        { protocol: 'http', hostname: 'img.artiz.ai' },
      ],
    },
  };
  
  
  export default nextConfig;