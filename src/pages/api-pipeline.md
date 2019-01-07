# Pipeline API
```js
const Pipeline = require('@phylum/pipeline')
```

### `new Pipeline(entry[, options])`
Create a new pipeline instance.
```js
const pipeline = new Pipeline(entry)
```
+ entry `<function>` - The entry task.
+ options `<object>` - Optional. An object with the following options:
	+ autoDisposeUnused `<boolean>` - Optional. Automatically dispose unused tasks when the pipeline resolves or rejects. If disabled, unused tasks will stay alive until `pipeline.destroyUnused()` is called. Default is `true`

### `pipeline.data`
An object to store custom data.<br>
This object can be accessed by tasks via `ctx.pipeline.data`
```js
pipeline.data.foo = 'bar'
```

### `pipeline.isEnabled`
Check wether this pipeline is enabled or not.<br/>
Calls to `.enable(..)` or `.disable(..)` will change this value immediately.

```js
pipeline.enable()
// Results in:
pipeline.isEnabled === true
```

### `pipeline.enable()`
Enable the pipeline if not enabled.
```js
await pipeline.enable()
```
+ returns `<Promise>` - The current state of the entry task.

### `pipeline.disable()`
Disable the pipeline if enabled and dispose all tasks.
```js
await pipeline.disable()
```
+ returns `<Promise>` - A promise that resolves when all tasks have been disposed.

### `pipeline.disposeUnused()`
Manually dispose unused tasks.<br/>
*This can be used to dispose unused tasks while the pipeline is still enabled.*
```js
await pipeline.disposeUnused()
```
+ returns `<Promise>` - A promise that resolves when all tasks have been disposed.

### `pipeline.cli([options])`
Utility for implementing a simple cli that runs this pipeline.
+ The pipeline will be disabled when the process receives a 'SIGINT'.
+ The process will exit with code..
	+ ..**0** - if the pipeline resolved and the event loop is empty.
	+ ..**1** - if the pipeline rejected and the event loop is empty.
	+ ..**1** - if an unhandled rejection occurs.
	+ ..**1** - if the process receives a 'SIGINT' while the pipeline is disabled.

```js
pipeline.cli({module})
```
+ options `<object>` - Optional. An object with the following options:
	+ module `<Module>` - Optional. If specified and the module is not the main module, the pipeline will be exported by that module instead of running it.

### `Pipeline.cli([options, ]entry)`
Shorthand for creating a new pipeline and calling `.cli(..)` on it.
```js
const {cli} = require('@phylum/pipeline')

cli({module}, async ctx => {
	console.log('Hello World!')
})
```
+ options `<object>` - Optional. An object with options passed to the pipeline and the cli function.
+ entry `<function>` - The pipeline entry.

### `Event: 'resolve'`
The `resolve` event is emitted when the entry task resolves.
```js
pipeline.on('resolve', value => {
	console.log(value)
})
```

### `Event: 'reject'`
The `reject` event is emitted when the entry task rejects.
```js
pipeline.on('reject', err => {
	console.error(err)
})
```

### `Event: 'dispose-error'`
The `dispose-error` event is emitted when an error occurs while disposing a task.
```js
pipeline.on('dispose-error', err => {
	console.error(err)
})
```
