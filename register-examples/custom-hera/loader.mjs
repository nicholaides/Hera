// A simple loader that compiles .hera files and also adds an import called passedThroughCustomLoader to the generated module
import * as heraEsm from "../../source/esm.js"

export const resolve = heraEsm.resolve

export const load = heraEsm.buildLoadFunction({
  getOptions: () => ({ hera: { module: true } }),
  postProcess: (source) =>
    source + "; export const passedThroughCustomLoader = true",
});
