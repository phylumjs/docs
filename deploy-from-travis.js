'use strict'

require('gh-pages').publish('dist', {
	repo: `https://${process.env.GH_TOKEN}@github.com/phylumjs/phylumjs.github.io.git`,
	silent: true,
	branch: 'master',
	user: {
		name: 'Max J. Polster',
		email: 'max.polster@id-p.de'
	}
}, err => {
	if (err) {
		console.error(err)
		process.exit(1)
	}
})
