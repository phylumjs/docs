# Workers (preview)

## Concept
In case you want to implement tasks that perform heavy computation or you are using a library that uses blocking io, you should move these tasks to worker processes. Each worker process has it's own independent pipeline that pushes updates to the parent process. In addition, you can provide a worker with a hash of tasks that the worker may invoke on the parent process.

![](/images/workers.svg)

## API Preview

**main.js**
```js
const Pipeline = require('@phylum/pipeline')

const worker = Pipeline.worker({
	entry: require.resolve('./worker.js'),
	tasks: {foo}
})

async function foo(ctx) {
	return 6
}

Pipeline.cli(async ctx => {
	const result = await ctx.use(worker)
	console.log(result)
})
```

**worker.js**
```js
module.exports = async ctx => {
	const a = await ctx.use('foo')
	const b = await ctx.use(bar)
	return a * b
}

async function bar(ctx) {
	return 7
}
```

```bash
node main.js
# 42
```
