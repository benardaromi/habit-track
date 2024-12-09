/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental : {
        serverActions: {
            allowedOrigins: ['https://ideal-space-spoon-g44g7j7gpwq5cwgpp-3000.app.github.dev/', 'localhost:3000']
        }
    }
};

export default nextConfig;
