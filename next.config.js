/** @type {import('next').NextConfig} */

const nextConfig = {    
    images: {
        remotePatterns:[{
            hostname: "tecdn.b-cdn.net",
        },
      ],
    },
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
      },
    output: "standalone",   //This is for Docker Image
      
}

module.exports = nextConfig
