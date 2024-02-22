/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns:[{
            hostname: "tecdn.b-cdn.net",
        },
      ],
    }
}

module.exports = nextConfig


// webpack: (config) => {
//     config.resolve.fallback = {
//       "mongodb-client-encryption": false ,
//       "aws4": false
//     },
