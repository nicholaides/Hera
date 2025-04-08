const { registerLoader, typescript } = require('@danielx/hera/ts-loader')

registerLoader({
  tsc: {
    rewriteRelativeImportExtensions: true
  }
})
