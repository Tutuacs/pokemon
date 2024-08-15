/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        { protocol: 'https', hostname: 'img.artiz.ai' },
        { protocol: 'http', hostname: 'img.artiz.ai' },
        { protocol: 'https', hostname: 'utfs.io' },
        { protocol: 'http', hostname: 'utfs.io' },
        // { protocol: 'http', hostname: 'render.fineartamerica' },
        // { protocol: 'https', hostname: 'render.fineartamerica' },
        // { protocol: 'http', hostname: 'render.fineartamerica.com' },
        // { protocol: 'https', hostname: 'render.fineartamerica.com' },
        // { protocol: 'https', hostname: 'tcg.pokemon' },
        // { protocol: 'http', hostname: 'tcg.pokemon' },
        // { protocol: 'https', hostname: 'rtcg.pokemon.com' },
        // { protocol: 'http', hostname: 'tcg.pokemon.com' },
      ],
    },
  };
  
  
  export default nextConfig;