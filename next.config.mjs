/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_ENDPOINT_URL: process.env.API_ENDPOINT_URL,
  },
};

export default nextConfig;
