const { register } = require("node:module");
const { pathToFileURL } = require("node:url");

register("./ts.mjs", pathToFileURL(__filename));

const { stripTypeScriptTypes } = require("node:module");
require.extensions[".hera"].pushTransformSource(stripTypeScriptTypes);
