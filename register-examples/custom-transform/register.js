require("@danielx/hera/register"); // set up the basic Hera loaders for both ESM and CJS

// ESM
const { register } = require("node:module");
const { pathToFileURL } = require("node:url");
// register a custom loader that transforms the output of the Hera loader
register("./loader.js", pathToFileURL(__filename));

// CJS
require.extensions[".hera"].pushTransformSource( // add a transform step to the Hera loader
  (source) => source + "; exports.passedThroughCustomLoader = true"
);
