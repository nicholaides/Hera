const { register } = require("node:module");
const { pathToFileURL } = require("node:url");
const typescript = require("typescript");

exports.typescript = typescript;
exports.registerLoader = function registerLoader(compilerOptions) {
  return register("./ts-loader-hooks.cjs", pathToFileURL(__filename), {
    data: compilerOptions,
  });
};
