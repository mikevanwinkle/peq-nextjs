module.exports = {
  trailingSlash: true,
  output: 'standalone',
  experimental: {
    outputStandalone: true,
    // this includes files from the monorepo base two directories up
    outputFileTracingRoot: __dirname,
  },
}