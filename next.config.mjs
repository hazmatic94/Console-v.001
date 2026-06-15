const nextConfig = {
  distDir: ".next-preview",
  devIndicators: false,
  outputFileTracingRoot: import.meta.dirname,
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;
