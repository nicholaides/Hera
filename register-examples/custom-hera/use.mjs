// `yarn test:example-register` will test this example

import assert from "node:assert"
import parser from "../../samples/math.hera"

try {
  parser.parse("uh oh")
} catch (e) {
  assert.equal(e, "USING CUSTOM LIB")
  console.log('ok')
  process.exit(0)
}

assert.fail("Should have thrown")
