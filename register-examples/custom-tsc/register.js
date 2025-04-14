require("@danielx/hera/register");

// Custom tsc compiler options.
// The test: importing ./helper.cts will only succeed if these compiler options are applied
const compilerOptions = {
  rewriteRelativeImportExtensions: true,
};

const { register } = require("node:module");
const { pathToFileURL } = require("node:url");
register("@danielx/hera/register/tsc/esm", pathToFileURL(__filename), {
  data: compilerOptions,
});

require("@danielx/hera/register/tsc/cjs").pushTranspileStepToCjsLoader(
  compilerOptions
);
