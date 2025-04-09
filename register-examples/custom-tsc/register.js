const { registerLoader } = require('@danielx/hera/tsc-loader')

registerLoader({
  tsc: {
    rewriteRelativeImportExtensions: true
  }
})
