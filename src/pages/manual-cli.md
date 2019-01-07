# Writing a CLI
PhylumJS does not provide a cli by itself. Instead it provides a utility for writing a highly customizable pipeline cli.<br>

The following node module (`pipeline.js`) implements a very basic cli:
```js
#!/usr/bin/env node
'use strict'

const Pipeline = require('@phylum/pipeline')

Pipeline.cli({module}, async ctx => {
	console.log('Hello World!')
})
```
This module can be executed using node
```bash
node pipeline
```
or can be required by another module
```js
const pipeline = require('./pipeline')
```

### Command line args
Command line args can be parsed from within the pipeline.<br>
By parsing command line args in a seperate task, it is ensured, that they are not parsed multiple times when the entry task is re-executed.<br>
The following example uses [this package](https://www.npmjs.com/package/command-line-args) for parsing.
```js
const parse = require('command-line-args')

function commandLineArgs(ctx) {
	const args = parse([
		{name: 'message', alias: 'm'}
	])
	ctx.pipeline.data.message = args.message
}

Pipeline.cli({module}, async ctx => {
	await ctx.use(commandLineArgs)

	console.log(ctx.pipeline.data.message)
})
```

```bash
node pipeline -m "Hello World!"
```
