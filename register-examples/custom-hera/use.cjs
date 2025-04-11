// `yarn test:example-register` will test this example

const assert = require("node:assert")
const { parse, passedThroughCustomLoader } = require("../../samples/math.hera")

// sanity check-- the parser still works
assert(parse("2+2") === 4)

// the custom loader should have added an export to math.hera's module
assert(passedThroughCustomLoader)

console.log("ok")
