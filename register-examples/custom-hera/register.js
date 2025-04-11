const { register } = require('node:module')
const { pathToFileURL } = require('node:url')
const { registerHooksAsCjs } = require('@danielx/hera/register/cjs')


register('./loader.cjs', pathToFileURL(__filename))
registerHooksAsCjs(require('./loader.cjs'), { data: {} })
