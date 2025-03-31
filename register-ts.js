// A version of register.js that also transpiles hera output from TS->JS

try {
  const { register } = require('node:module');
  const { pathToFileURL } = require('node:url');

  register('./source/esm-ts.mjs', pathToFileURL(__filename));
} catch (e) {
  // older Node lacking module register
}

if (require.extensions) {
  try {require("@cspotcode/source-map-support/register-hook-require")} catch (e) {}
  const fs = require("fs");
  const { compile } = require("./");

  require.extensions[".hera"] = function (module, filename) {
    const js = compile(fs.readFileSync(filename, 'utf8'), {
      filename,
      inlineMap: true,
    });

    return module._compile(js, filename);
  };
}
