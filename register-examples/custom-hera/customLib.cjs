// A version of machine.js that we can prove is set by the custom Hera loader

// re-export everything from the original machine.js
const lib = require("@danielx/hera/lib");

module.exports = {
  ...lib,
  // replace the Validator with one that throws an error
  //   that we can catch in the test
  Validator: () => ({
    ...lib.Validator(),
    validate() {
      throw "USING CUSTOM LIB";
    },
  }),
};
