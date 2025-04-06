// A Node.js loader that transpiles hera output from TS->JS so that Node.js can run it.
import * as heraEsm from "./esm.mjs";
import { compileTsToJs, typescript } from "./tsc.mjs";

export const resolve = heraEsm.resolve;

export const load = heraEsm.buildLoadFunction({
  postProcess: (source) =>
    compileTsToJs(source, { module: typescript.ModuleKind.ES2022 }),
});
