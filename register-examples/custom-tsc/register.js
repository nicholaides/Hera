require('@danielx/hera/register')

const compilerOptions = {
  rewriteRelativeImportExtensions: true,
};

const { register } = require("node:module");
const { pathToFileURL } = require("node:url");
register(
  "@danielx/hera/register/tsc/hooks",
  pathToFileURL(__filename),
  { data: compilerOptions }
);

const { transpileTsToJs } = require("@danielx/hera/register/tsc/hooks");
require.extensions[".hera"].pushTransformSource((source) =>
  transpileTsToJs(source, compilerOptions)
);
