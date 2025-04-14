// Custom tsc compiler options.

// The test: importing ./helper.cts will only succeed if these compiler options are applied
const compilerOptions = {
  rewriteRelativeImportExtensions: true,
};

// ESM
const { register } = require("node:module");
const { pathToFileURL } = require("node:url");
register("@danielx/hera/register/esm", pathToFileURL(__filename));
register("@danielx/hera/register/tsc/esm", pathToFileURL(__filename), {
  data: compilerOptions,
});

// CJS
require("@danielx/hera/register/tsc/cjs").initialize(
  compilerOptions
);
