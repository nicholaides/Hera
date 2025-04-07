const { registerLoader, typescript } = require('@danielx/hera/ts-loader')

registerLoader({
  module: typescript.ModuleKind.ES2022,
})
