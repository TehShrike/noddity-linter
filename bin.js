#!/usr/bin/env node

require('babel-polyfill')
require('babel-register')({
	plugins: [
		'transform-async-to-generator',
	]
})
require('ractive').DEBUG = false
const lint = require('./index.js')

const noddityRoot = process.argv[2]
const pattern = process.argv[3]

if (noddityRoot) {
	console.log(`Linting ${noddityRoot}`)
} else {
	throw new Error('Usage: noddity-linter noddityRootDir [pattern]')
}

lint({ noddityRoot, pattern }).then(validatorResults => {
	const errors = validatorResults
		.filter(({ error }) => error)

	if (errors.length) {
		errors.forEach(({ error, filePath }) => console.log(`#### ${filePath}:\n\t${error.message}`))
		console.error(errors.length, 'posts are invalid')
		process.exit(1)
	} else {
		console.log('Checked', validatorResults.length, 'posts')
	}
}).catch(error => {
	console.log('error while linting', error)
	process.exit(1)
})
