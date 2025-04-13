const heraOptions = {
  libPath: "./XXXX.js",
};

const { register } = require("node:module");
const { pathToFileURL } = require("node:url");
register(
  "@danielx/hera/esm",
  pathToFileURL(__filename),
  { data: heraOptions }
);

const { transpileTsToJs } = require("@danielx/hera/esm");
require.extensions[".hera"].heraOptions = heraOptions;
