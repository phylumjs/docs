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
The following example uses [this package](https://www.npmjs.com/package/command-line-args) for parsing.
```js
const parse = require('command-line-args')

function args(ctx) {
	return parse([
		{name: 'message', alias: 'm'}
	])
}

Pipeline.cli({module}, async ctx => {
	const {message} = await ctx.use(args)

	console.log(message)
})
```

```bash
node pipeline -m "Hello World!"
```
