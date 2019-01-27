# Pipeline Usage
The pipeline class manages task contexts and states.
```bash
npm i @phylum/pipeline
```
```js
const {Pipeline} = require('@phylum/pipeline')
```

## Entry
The pipeline takes a single entry [task](/manual/tasks).<br>
This task is executed when the pipeline is enabled.
```js
const pipeline = new Pipeline(async ctx => {
	console.log('Hello World!')
})
```

## State
The pipeline can be enabled or disabled.<br>
If the pipeline is enabled and the entry task is disposed, it will re-execute the entry task.
```js
const state = pipeline.enable()
// 'state' is the current state of the entry task.
```

```js
const disposal = pipeline.disable()
// The 'disposal' promise will resolve when all tasks have been disposed.
```

## Output
Every time the entry task resolves (or pushes an update that resolves) an `resolve` event will be emitted:
```js
const pipeline = new Pipeline(async ctx => {
	setTimeout(() => {
		ctx.push('bar')
	}, 100)

	return 'foo'
})

pipeline.on('resolve', result => {
	console.log(result)
})

/*
	Outputs:
	- foo
	- bar
*/
```

## Error Handling
```js
pipeline.on('reject', err => {
	// Emitted when the entry task rejects.
	console.error(err)
})

pipeline.on('dispose-error', err => {
	// Emitted when an error occurs while disposing a task.
	console.error(err)
})
```
