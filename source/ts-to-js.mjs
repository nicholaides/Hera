import ts from "typescript";
import path from "path";

const tsConfig = ts.readConfigFile("tsconfig.json", ts.sys.readFile);

export function compileTsToJs(tsSource, options = {}) {
  return ts.transpileModule(tsSource, {
    compilerOptions: {
      ...tsConfig.config,
      module: options.module ? ts.ModuleKind.ESNext : ts.ModuleKind.CommonJS,
      noCheck: true,
    },
  }).outputText;
}
