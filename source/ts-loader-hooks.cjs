const { resolve, buildLoadFunction } = require("./esm.cjs");
const { compileTsToJs } = require("./tsc-helper.cjs");

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
