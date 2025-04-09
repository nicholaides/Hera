const { registerLoader } = require('@danielx/hera/register/tsc/loader')

registerLoader({
  tsc: {
    rewriteRelativeImportExtensions: true
  }
})
