import * as heraEsm from "./esm.mjs";
import { compileTsToJs, typescript } from "./tsc-helper.mjs";

export const resolve = heraEsm.resolve;

export const load = heraEsm.buildLoadFunction({
  postProcess: (source) =>
    compileTsToJs(source, {
      compilerOptions: { module: typescript.ModuleKind.ES2022 },
    }),
});
