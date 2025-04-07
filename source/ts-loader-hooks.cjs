const { resolve, buildLoadFunction } = require("./esm.cjs");
const { compileTsToJs } = require("./tsc-helper.cjs");

let compilerOptions;

function initialize(compilerOpts = {}) {
  compilerOptions = compilerOpts;
}

const load = buildLoadFunction({
  postProcess: (source) => compileTsToJs(source, { compilerOptions }),
});

module.exports = { initialize, resolve, load };
