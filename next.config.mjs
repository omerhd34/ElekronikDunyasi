/** @type {import('next').NextConfig} */
const nextConfig = {
 /* config options here */
 reactCompiler: true,
 experimental: {
  serverActions: {
   bodySizeLimit: "10mb",
  },
 },
 images: {
  remotePatterns: [
   {
    protocol: "https",
    hostname: "picsum.photos",
   },
   {
    protocol: "https",
    hostname: "cdn.jsdelivr.net",
   },
  ],
 },
};

export default nextConfig;
