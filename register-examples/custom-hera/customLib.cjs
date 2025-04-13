// re-export everything from the original machine.js
const lib = require("@danielx/hera/lib");

module.exports = {
  ...lib,
  Validator: () => ({
    ...lib.Validator(),
    validate: () => {
      throw "USING CUSTOM LIB";
    },
  }),
};
