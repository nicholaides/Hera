// A simple loader that compiles .hera files and also adds an import called passedThroughCustomLoader to the generated module
import * as heraEsm from "@danielx/hera/esm"

export const resolve = heraEsm.resolve

export const load = heraEsm.buildLoadFunction({
  getOptions: () => ({ hera: { module: true } }),
  postProcess: (source) =>
    source + "; export const passedThroughCustomLoader = true",
});
