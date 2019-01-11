'use strict'

const path = require('path')
const {publish} = require('gh-pages')

module.exports = async ctx => new Promise((resolve, reject) => {
	console.log(`Deploying to: ${process.env.DEPLOY_REPO}`)
	publish(path.resolve(__dirname, '../dist'), {
		repo: process.env.GH_TOKEN
			? `https://${process.env.GH_TOKEN}@${process.env.DEPLOY_REPO}.git`
			: `https://${process.env.DEPLOY_REPO}.git`,
		branch: 'master',
		silent: true,
		message: process.env.DEPLOY_MESSAGE || 'Updates',
		user: process.env.DEPLOY_AS_NAME && process.env.DEPLOY_AS_EMAIL
			? {
				name: process.env.DEPLOY_AS_NAME,
				email: process.env.DEPLOY_AS_EMAIL
			}
			: undefined
	}, err => {
		if (err) {
			reject(err)
		} else {
			resolve()
		}
	})
})
