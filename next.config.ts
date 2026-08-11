import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets phones on the LAN load /_next/* from the dev server, which Next
  // blocks cross-origin by default. Without it the page ships its HTML but
  // never hydrates, so every scroll reveal stays at opacity 0. Dev only.
  allowedDevOrigins: ["172.20.*.*", "192.168.*.*"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "framerusercontent.com"
      }
    ]
  }
};

export default nextConfig;
