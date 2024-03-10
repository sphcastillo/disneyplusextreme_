/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'image.tmdb.org',
            },
        ]
    }
}

module.exports = nextConfig;
