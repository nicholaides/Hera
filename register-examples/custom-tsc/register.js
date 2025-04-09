const { registerLoader } = require('@danielx/hera/ts-loader')

registerLoader({
  tsc: {
    rewriteRelativeImportExtensions: true
  }
})
