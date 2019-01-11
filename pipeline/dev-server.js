'use strict'

const path = require('path')
const http = require('http')
const express = require('express')
const WebSocket = require('ws')
const bundle = require('./bundle')

module.exports = ctx => {
	const app = express()
	app.use(express.static(path.join(__dirname, '../dist')))
	app.use(express.static(path.join(__dirname, '../src/static')))

	const server = http.createServer(app)
	const wss = new WebSocket.Server({server})

	server.listen(8080)
	console.log('Dev server listening on port 8080')

	ctx.on('dispose', addDisposal => {
		addDisposal(new Promise((resolve, reject) => {
			server.on('error', reject)
			server.close(resolve)
		}))

		addDisposal(new Promise((resolve, reject) => {
			wss.on('error', reject)
			wss.close(resolve)
		}))
	})

	ctx.pull(bundle, s => s.then(() => {
		for (const client of wss.clients) {
			if (client.readyState === WebSocket.OPEN) {
				client.send('hot-update')
			}
		}
	}, () => {}))
}
