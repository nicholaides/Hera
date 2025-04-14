// ESM
const { register } = require("node:module");
const { pathToFileURL } = require("node:url");
// register a custom loader that transforms the output of the Hera loader
register("@danielx/hera/register/esm", pathToFileURL(__filename));
register("./loader.js", pathToFileURL(__filename));

// CJS
require("@danielx/hera/register/cjs").pushTransformSource(
  (source) => source + "; exports.passedThroughCustomLoader = true"
);
