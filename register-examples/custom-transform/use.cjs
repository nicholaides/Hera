const assert = require("node:assert")
const { parse, passedThroughCustomLoader } = require("./grammar.hera")

// sanity check-- the parser still works
assert.equal(parse("a"), "ok")

// the custom loader should have added an export to the parser module
assert(passedThroughCustomLoader)

console.log("ok")
