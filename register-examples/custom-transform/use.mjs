import assert from "node:assert"
import { parse, passedThroughCustomLoader } from "./grammar.hera"

// sanity check-- the parser still works
assert.equal(parse("a"), "ok")

// the custom loader should have added an export to the parser module
assert(passedThroughCustomLoader)

console.log("ok")
