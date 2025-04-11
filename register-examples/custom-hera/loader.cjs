// A simple loader that compiles .hera files and also adds an import called passedThroughCustomLoader to the generated module
const { buildLoadFunction, ...hooks } = require("@danielx/hera/esm")

module.exports = {
  ...hooks,
  load: buildLoadFunction({
    getOptions: () => ({ hera: { module: false } }),
    postProcess: (source) =>
      source + "; exports.passedThroughCustomLoader = true",
  })
}
