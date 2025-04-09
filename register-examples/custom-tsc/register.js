const { registerLoader } = require('../../source/ts-loader.js')

registerLoader({
  tsc: {
    rewriteRelativeImportExtensions: true
  }
})
