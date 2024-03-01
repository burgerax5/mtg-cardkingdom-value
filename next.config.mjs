/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.cardkingdom.com',
            },
            {
                protocol: 'https',
                hostname: 'cardkingdom.imgix.net',
            },
        ]
    }
};

export default nextConfig;
