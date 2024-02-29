/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.cardkingdom.com',
            }
        ]
    }
};

export default nextConfig;
