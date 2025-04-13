require("@danielx/hera/register");

const compilerOptions = {
  rewriteRelativeImportExtensions: true,
};

const { register } = require("node:module");
const { pathToFileURL } = require("node:url");
register("@danielx/hera/register/tsc/hooks", pathToFileURL(__filename), {
  data: compilerOptions,
});

require("@danielx/hera/register/tsc/hooks").pushTranspileStepToCjsLoader(
  compilerOptions
);
