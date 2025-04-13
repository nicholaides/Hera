const { register } = require("node:module");
const { pathToFileURL } = require("node:url");
register("./loader.js", pathToFileURL(__filename));

const { transpileTsToJs } = require("./loader.js");
require.extensions[".hera"].pushTransformSource(
  (source) => source + "; exports.passedThroughCustomLoader = true"
);
