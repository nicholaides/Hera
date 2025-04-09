const { resolve, buildLoadFunction } = require("./esm.js");
const { compileTsToJs } = require("./tsc-helper.js");

let registerOptions;

function initialize(data = {}) {
  registerOptions = data;
}

const load = buildLoadFunction({
  getOptions: () => registerOptions,
  postProcess: (source) =>
    compileTsToJs(source, { compilerOptions: registerOptions.tsc }),
});

module.exports = { initialize, resolve, load };
