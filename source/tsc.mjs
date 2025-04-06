import ts from "typescript";

export const typescript = ts;

export function compileTsToJs(tsSource, compilerOptions = {}) {
  const { outputText, diagnostics } = ts.transpileModule(tsSource, {
    compilerOptions: { noCheck: true, ...compilerOptions },
    reportDiagnostics: true,
  });

  if (diagnostics?.length) {
    console.error(
      ts.formatDiagnosticsWithColorAndContext(diagnostics, {
        getCanonicalFileName: (path) => path,
        getCurrentDirectory: ts.sys.getCurrentDirectory,
        getNewLine: () => ts.sys.newLine,
      })
    );

    if (diagnostics.find((d) => d.category === ts.DiagnosticCategory.Error))
      throw new Error(`TypeScript compilation failed`);
  }

  return outputText;
}
