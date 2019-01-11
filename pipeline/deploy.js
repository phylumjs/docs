'use strict'

const path = require('path')
const {publish} = require('gh-pages')

module.exports = async ctx => {
	await new Promise((resolve, reject) => {
		publish(path.resolve(__dirname, '../dist'), {
			repo: `https://${process.env.GH_TOKEN}@${process.env.DEPLOY_REPO}.git`,
			branch: 'master',
			silent: true,
			message: process.env.DEPLOY_MESSAGE,
			user: {
				name: process.env.DEPLOY_AS_NAME,
				email: process.env.DEPLOY_AS_EMAIL
			}
		}, err => {
			if (err) {
				reject(err)
			} else {
				resolve()
			}
		})
	})
}
