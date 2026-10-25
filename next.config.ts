import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The old project index; the home page lists the work now.
  redirects() {
    return [{ source: "/projects", destination: "/#work", permanent: true }];
  },
  // Add remote image domains here if project covers move off /public.
  images: {
    remotePatterns: [],
  },
};

export default nextConfig;
