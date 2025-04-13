require("@danielx/hera/register"); // set up the Hera loader for both ESM and CJS

// ESM loader
const { register } = require("node:module");
const { pathToFileURL } = require("node:url");
// register another loader that transpiles the output of the Hera loader
register("./loader.js", pathToFileURL(__filename));

// CJS loader
require.extensions[".hera"].pushTransformSource( // add a transform step to the Hera loader
  (source) => source + "; exports.passedThroughCustomLoader = true"
);
