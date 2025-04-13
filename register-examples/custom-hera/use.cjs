// `yarn test:example-register` will test this example

const assert = require("node:assert")
const parser = require("./grammar.hera")

try {
  parser.parse("uh oh")
} catch (e) {
  assert.equal(e, "USING CUSTOM LIB")
  console.log('ok')
  process.exit(0)
}

assert.fail("Should have thrown")
