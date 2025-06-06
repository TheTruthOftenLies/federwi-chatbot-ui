const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
})

const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === 'development' || process.env.ELECTRON === 'true'
})

const isElectron = process.env.ELECTRON === 'true'

module.exports = withBundleAnalyzer(
  withPWA({
    reactStrictMode: true,
    output: isElectron ? 'export' : undefined,
    trailingSlash: isElectron,
    distDir: isElectron ? 'out' : '.next',
    images: {
      unoptimized: isElectron,
      remotePatterns: [
        {
          protocol: "http",
          hostname: "localhost"
        },
        {
          protocol: "http",
          hostname: "127.0.0.1"
        },
        {
          protocol: "https",
          hostname: "**"
        }
      ]
    },
    experimental: {
      serverComponentsExternalPackages: ["sharp", "onnxruntime-node"]
    }
  })
)
