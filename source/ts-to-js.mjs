import theTs from "typescript";

export const ts = theTs;

export function compileTsToJs(tsSource, compilerOptions = {}) {
  return ts.transpileModule(tsSource, {
    compilerOptions: { noCheck: true, ...compilerOptions },
  }).outputText;
}
