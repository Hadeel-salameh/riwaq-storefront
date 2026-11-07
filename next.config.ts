import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The storefront lives under /[lang] — send visitors to the Arabic home
  // when they open the bare domain. No cloud-specific paths anywhere.
  async redirects() {
    return [{ source: "/", destination: "/ar", permanent: false }];
  },
  images: {
    remotePatterns: [
      // High-resolution product photography hosted on Pexels CDN.
      { protocol: "https", hostname: "images.pexels.com" },
    ],
  },
};

export default nextConfig;
