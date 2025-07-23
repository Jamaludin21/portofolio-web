/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tailwindcss.com",
        pathname: "/plus-assets/**",
      },
      {
        protocol: "https",
        hostname: "pagedone.io",
        pathname: "/asset/uploads/**",
      },
      {
        protocol: "https",
        hostname: "ohl6h4pfccuxujvz.public.blob.vercel-storage.com",
        pathname: "/assets/**",
      },
      {
        protocol: "https",
        hostname: "ohl6h4pfccuxujvz.public.blob.vercel-storage.com",
        pathname: "/upload/**",
      },
      {
        protocol: "https",
        hostname: "ohl6h4pfccuxujvz.public.blob.vercel-storage.com",
        pathname: "/company/**",
      },
      {
        protocol: "https",
        hostname: "ohl6h4pfccuxujvz.public.blob.vercel-storage.com",
        pathname: "/hero/**",
      },
    ],
  },
};

export default nextConfig;
