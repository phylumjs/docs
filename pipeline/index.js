'use strict'

const path = require('path')
const fs = require('fs-extra')
const parseCommandLine = require('command-line-args')
const Pipeline = require('@phylum/pipeline')
const bundle = require('./bundle')

async function prepare(ctx) {
	Object.assign(ctx.pipeline.data, parseCommandLine([
		{name: 'watch', alias: 'w', type: Boolean},
		{name: 'dev', alias: 'd', type: Boolean},
		{name: 'run', alias: 'x', type: Boolean},
		{name: 'deploy', type: Boolean}
	]))

	await fs.emptyDir(path.resolve(__dirname, '../dist'))
}

Pipeline.cli(async ctx => {
	await ctx.use(prepare)
	await ctx.use(bundle)
	if (ctx.pipeline.data.run) {
		await ctx.use(require('./dev-server'))
	}
	if (ctx.pipeline.data.deploy) {
		await ctx.use(require('./deploy'))
	}
})
