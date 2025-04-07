// This module requires the loader in ./loader.mjs to be registered.
// E.g. via `node --import=./custom-loader.mjs index.mjs`
//
// `yarn test:example-register` will test this example

import assert from "node:assert"
import { parse, passedThroughCustomLoader } from "../samples/math.hera"

// sanity check-- the parser still works
assert(parse("2+2") === 4)

// the custom loader should have added an export to math.hera's module
assert(passedThroughCustomLoader)

console.log("ok")
