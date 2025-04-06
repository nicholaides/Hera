import ts from "typescript";

export const typescript = ts;

export function compileTsToJs(tsSource, {
  log = console.error,
  compilerOptions = {} } = {}) {
  const { outputText, diagnostics } = ts.transpileModule(tsSource, {
    compilerOptions,
    reportDiagnostics: true,
  });

  // It's possible that when using transpileModule that it will never give
  // warnings, only errors, but I'm not sure, so we'll log all diagnostics and
  // only throw if there are errors.
  if (diagnostics?.length) {
    // always log diagnositcs
    log(
      ts.formatDiagnosticsWithColorAndContext(diagnostics, {
        getCanonicalFileName: (path) => path,
        getCurrentDirectory: ts.sys.getCurrentDirectory,
        getNewLine: () => ts.sys.newLine,
      })
    );

    // throw an exeption if there are errors
    if (diagnostics.find((d) => d.category === ts.DiagnosticCategory.Error))
      throw new Error(`TypeScript compilation failed`);
  }

  return outputText;
}
