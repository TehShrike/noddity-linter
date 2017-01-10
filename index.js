const levelmem = require('level-mem')
const denodeify = require('then-denodeify')
const glob = denodeify(require('glob'))

const Butler = require('noddity-butler')
const Retrieval = require('noddity-fs-retrieval')
const Linkifier = require('noddity-linkifier')
const Validator = require('validate-noddity-post')

const promiseMap = require('p-map')

module.exports = function lint({ noddityRoot, pattern = '**/*.m?(m)d', data = {}, template }) {
	const db = levelmem('wheee')
	const retrieval = new Retrieval(noddityRoot)
	const butler = new Butler(retrieval, db)
	const linkifier = new Linkifier('/')

	const validatePost = Validator({
		butler,
		linkifier,
		data,
		template
	})

	return glob(pattern, { cwd: noddityRoot }).then(filePaths => {
		return promiseMap(filePaths, filePath => {
			return validatePost(filePath).then(({ error }) => ({ error, filePath }))
		}, { concurrency: 2 })
	})
}
