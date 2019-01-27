# Tasks
Tasks are simple functions that may return a promise.<br/>
The task context is passed with the first argument:
```js
async function example(ctx) {
	console.log('Hello World!')
}
```

### `ctx.pipeline`
A reference to the pipeline.<br>
This can be used to access the `pipeline.data` object:
```js
ctx.pipeline.data.foo = 'bar'
```

### `ctx.isEntry`
True if this task is the entry task of the pipeline.
```js
new Pipeline(async ctx => {
	ctx.isEntry === true
	// For any other task, ctx.isEntry will be false.
})
```

### `ctx.exports`
An object for exposing an api that is meant to be used when the task runs.
```js
async function foo(ctx) {
	ctx.exports.hello = () => console.log('Hello World!')
}

pipeline.getContext(foo).exports.hello()
// -> Hello World!
```

### `ctx.isDisposed`
True if this task is disposed (or currently disposing).

### `ctx.isUnused`
True if this task is not used by another task.<br/>
Unused tasks will be disposed when the entry task resolves or rejects if the pipeline option `autoDisposeUnused` is enabled.

### `ctx.disposeAfterPipeline`
Get or set if this task should be disposed when the pipeline resolves or rejects.<br>
*Note that the task will be disposed silently.*
```js
async function foo(ctx) {
	ctx.disposeAfterPipeline = true
}
```
+ Set to any `<truthy>` value to dispose when the pipeline resolves or rejects.
+ Returns `<boolean>`

### `ctx.use(fn)`
Use another task as dependency.<br>
If the dependency is disposed or updates, the current task is also disposed except it implements an update handler using `ctx.pull(..)` or `ctx.pullImmediate(..)`
```js
async function foo(ctx) {
	return 'Hello World!'
}

async function bar(ctx) {
	await ctx.use(foo) // -> 'Hello World!'
}
```
+ fn `<function> | <Pipeline.Context>` - The dependency task.

### `ctx.isDependency(fn)`
Check if another task is a dependency of this task.
```js
async function foo(ctx) { }

async function bar(ctx) {
	await ctx.use(foo)
	ctx.isDependency(foo) === true
}
```
+ fn `<function> | <Pipeline.Context>` - The task.
+ returns `<boolean>` - True if the task is a dependency.

### `ctx.isDependent(fn)`
Check if this task is a dependency of another task.
```js
async function foo(ctx) {
	ctx.isDependent(bar) === true
}

async function bar(ctx) {
	await ctx.use(foo)
}
```
+ fn `<function> | <Pipeline.Context>` - The task.
+ returns `<boolean>` - True if this task is a dependency.

### `ctx.push(state)`
Push an update to all dependents (and the pipeline if this task is the entry task).
```js
async function example(ctx) {
	setTimeout(() => {
		ctx.push('updated value')
	}, 1000)

	return 'initial value'
}
```
+ state `<Promise> | <any>` - The new state. If not a promise, it will be converted to a resolved promise with the specific value.
	+ Rejections are ignored until the state is picked up by a dependent task or the pipeline.

### `ctx.pull(fn, handler)`
Accept updates from a dependency.<br>
Using only .pull(..) does not run the dependency and the handler is only called for future states, not the current one.
```js
async function example(ctx) {
	ctx.pull(foo, state => {
		// 'foo' has updated.
	})
}
```
+ fn `<function> | <Pipeline.Context>` - The dependency task.
+ handler `<function>` - The function to handle updates.
	+ state `<Promise>` - The new state of the dependency after the update.

### `ctx.pullImmediate(fn, handler)`
Use another task as dependency and accept updates.<br>
The handler will be called [immediately](https://nodejs.org/dist/latest/docs/api/timers.html#timers_setimmediate_callback_args) with the current state of the task.
```js
async function example(ctx) {
	ctx.pullImmediate(foo, state => {
		// 'foo' has been started or updated.
	})
}
```
+ fn `<function> | <Pipeline.Context>` - The dependency task.
+ handler `<function>` - The function to handle the initial state and updates.
	+ state `<Promise>` - The initial or new state of the dependency.

### `ctx.isPulling(fn)`
Check if an update handler was registered using `.pull(..)` or `.pullImmediate(..)`
```js
async function example(ctx) {
	ctx.isPulling(foo) === false
	ctx.pull(foo, () => { ... })
	ctx.isPulling(foo) === true
}
```
+ fn `<function> | <Pipeline.Context>` - The dependency task.
+ returns `<boolean>` - True if an update handler is registered for the specified task. Otherwise false.

### `ctx.drop(fn)`
Remove a dependency and possible update handlers so that this task is no longer affected by updates of the specified task.<br>
Dropping a dependency will not dispose it automatically. See pipeline options and `pipeline.disposeUnused(..)` for more information.
```js
async function example(ctx) {
	// ...
	ctx.drop(foo)
}
```
+ fn `<function> | <Pipeline.Context>` - The dependency task.

### `ctx.dispose([silent])`
Dispose this task.<br/>
This will detach the task from all dependencies and dependents.
```js
async function example(ctx) {
	setTimeout(() => {
		ctx.dispose()
	}, 1000)
}
```
+ silent `<any>` - If truthy, dependent tasks and the pipeline will not be notified about the disposal. Otherwise dependent tasks will be updated and the task will be re-executed if this is the pipeline entry and the pipeline is enabled. Default is `false`

### `Event: 'dispose'`
The `dispose` event is emitted when this task is disposed.<br/>
This event should be used to destroy resources like file system watchers.
```js
async function example(ctx) {
	const watcher = new SomeFSWatcher()
	watcher.on('change', () => {
		ctx.push('something changed')
	})

	ctx.on('dispose', async () => {
		await watcher.destroy()
	})

	return 'nothing changed'
}
```
+ return `<any> | <Promise>` - A promise to delay the re-execution of the task or the promise returned by `pipeline.disable()`.
