import { resolve, buildLoadFunction } from "./esm.mjs";
import { compileTsToJs } from "./tsc-helper.civet";

let compilerOptions;

function initialize(compilerOpts = {}) {
  compilerOptions = compilerOpts;
}

const load = buildLoadFunction({
  postProcess: (source) => compileTsToJs(source, { compilerOptions }),
});

export { initialize, resolve, load };
