import type { NextConfig } from "next";

const config: NextConfig = {
  transpilePackages: ["@nekoru/ui", "@nekoru/design-tokens"],
  poweredByHeader: false,
  devIndicators: false,
  allowedDevOrigins: ["127.0.0.1"],
};
export default config;
