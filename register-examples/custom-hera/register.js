const heraOptions = {
  // relative to the hera file
  libPath: "../register-examples/custom-hera/customLib.cjs",
};

// register ESM loader
const { register } = require("node:module");
const { pathToFileURL } = require("node:url");
// register the Hera ESM loader, and provide custom Hera compiler options
register("@danielx/hera/esm", pathToFileURL(__filename), { data: heraOptions });

// register CJS loader
require("@danielx/hera/register/cjs"); // set up the Hera loader
require.extensions[".hera"].heraOptions = heraOptions; // set the custom Hera options
