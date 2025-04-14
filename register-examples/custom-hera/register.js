// Custom Hera compiler options
const heraOptions = {
  // relative to the hera file
  libPath: "./customLib.cjs",
};

// ESM
const { register } = require("node:module");
const { pathToFileURL } = require("node:url");
// register the Hera ESM loader with custom Hera compiler options
register("@danielx/hera/register/esm", pathToFileURL(__filename), { data: heraOptions });

// CJS
require("@danielx/hera/register/cjs").options.hera = heraOptions;
