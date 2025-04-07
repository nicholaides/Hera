import * as heraEsm from "./esm.mjs"
import { compileTsToJs } from "./tsc-helper.civet"

let compilerOptions

export function initialize(compilerOpts = {}) {
  compilerOptions = compilerOpts
}

export const resolve = heraEsm.resolve

export const load = heraEsm.buildLoadFunction({
  postProcess: (source) => compileTsToJs(source, { compilerOptions })
})
