const ts = require("typescript");

function compileTsToJs(
  tsSource,
  { log = console.error, compilerOptions = {} } = {}
) {
  const { outputText, diagnostics } = ts.transpileModule(tsSource, {
    compilerOptions,
    reportDiagnostics: true,
  });

  // It's possible that when using transpileModule that it will never give
  // warnings, only errors, but I'm not sure, so we'll log all diagnostics and
  // only throw if there are errors.
  if (diagnostics?.length) {
    // always log diagnositcs
    if (log) {
      log(
        ts.formatDiagnosticsWithColorAndContext(diagnostics, {
          getCanonicalFileName: (path) => path,
          getCurrentDirectory: ts.sys.getCurrentDirectory,
          getNewLine: () => ts.sys.newLine,
        })
      );
    }

    // throw an exeption if there are errors
    if (diagnostics.find(($) => $.category === ts.DiagnosticCategory.Error)) {
      throw new Error("TypeScript compilation failed");
    }
  }

  return outputText;
}

module.exports = { typescript: ts, compileTsToJs };
