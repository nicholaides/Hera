// A Node.js loader that transpiles hera output from TS->JS so that Node.js can run it.
import * as heraEsm from "./esm.mjs";
import { compileTsToJs, ts } from "./ts-to-js.mjs";

export const resolve = heraEsm.resolve;

export const load = heraEsm.buildLoadFunction({
  postProcess: (source) =>
    compileTsToJs(source, { module: ts.ModuleKind.ES2022 }),
});
