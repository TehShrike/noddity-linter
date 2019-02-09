#!/usr/bin/env node

const mri = require(`mri`)
const lint = require(`./index.js`)

const {
	useIndex,
	_: [ noddityRoot, pattern ],
} = mri(process.argv.slice(2), {
	default: {
		useIndex: true,
	},
})

if (noddityRoot) {
	console.log(`Linting ${ noddityRoot }`)
} else {
	throw new Error(`Usage: noddity-linter [--useIndex] noddityRootDir [pattern]`)
}

lint({ noddityRoot, pattern, useIndex }).then(validatorResults => {
	const errors = validatorResults
		.filter(({ error }) => error)

	if (errors.length) {
		errors.forEach(({ error, filePath }) => console.log(`#### ${ filePath }:\n\t${ error.message }`))
		console.error(`${ errors.length } posts are invalid`)
		process.exit(1)
	} else {
		console.log(`Checked ${ validatorResults.length } posts`)
	}
}).catch(error => {
	console.log(`error while linting`, error)
	process.exit(1)
})
