const { register } = require('node:module')
const { pathToFileURL } = require('node:url')

register('./custom-loader.mjs', pathToFileURL(__filename))
