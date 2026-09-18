import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Add remote image domains here if project covers move off /public.
  images: {
    remotePatterns: [],
  },
};

export default nextConfig;
