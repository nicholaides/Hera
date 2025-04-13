// A simple loader that compiles .hera files and also adds an import called passedThroughCustomLoader to the generated module
const { transformLoadHook } = require("@danielx/hera/esm");

exports.load = transformLoadHook(
  (url) => /\.hera$/.test(url),
  (source) => source + "; exports.passedThroughCustomLoader = true"
);
