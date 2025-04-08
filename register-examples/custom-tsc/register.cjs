const { registerLoader } = require('../../source/ts-loader.cjs')

registerLoader({
  tsc: {
    rewriteRelativeImportExtensions: true
  }
})
