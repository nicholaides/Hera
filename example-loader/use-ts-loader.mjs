import { registerLoader, typescript } from '@danielx/hera/ts-loader'

registerLoader({
  module: typescript.ModuleKind.ES2022,
});
