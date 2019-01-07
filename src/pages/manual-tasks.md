# Writing Tasks
Tasks are simple functions that take the [context](/api/tasks) as first argument and can return a value.
```js
async function task(ctx) {
	console.log('Hello World!')
}
```

## Lifecycle &amp; Resources
Task states are cached by the pipeline. After a task has completed, it can still have resources like file system watchers. Tasks can be disposed to free these resources and reset it's state. This can be done manually, by disabling the pipeline or by pushing updates from dependency tasks.

Disposed tasks are re-executed with a new context when required.<br>
When the entry task is disposed and the pipeline is still enabled, the pipeline will re execute the entry task.

```js
async function task(ctx) {
	// This resource will be alive after the task has completed:
	const watcher = new SomeFSWatcher()

	ctx.on('dispose', () => {
		// Free resources when the task is disposed:
		watcher.close()
	})
}
```

If cleaning up resources is asynchronous, a promise can be attached to delay re-execution of this task.
```js
ctx.on('dispose', addDisposal => {
	addDisposal(somePromise)
})
```

## Dependencies
A task can require dependency tasks.<br>
```js
async function foo(ctx) {
	return 'bar'
}

async function task(ctx) {
	await ctx.use(foo)
}
```

## Push Updates
Every task can manually push updates to it's dependents (or the pipeline if the entry task).
```js
async function task(ctx) {
	setTimeout(() => {
		// Push a new value:
		ctx.push('next result')

		// or a promise:
		ctx.push(somePromise)
	}, 1000)

	return 'initial result'
}
```

## Handling Updates
By default, a task is disposed when a dependency pushes an update which will result in re-execution in the most cases. However, a task can implement it's own logic for handling updates without beeing disposed.
```js
async function task(ctx) {
	const initialResult = await ctx.use(foo)

	ctx.pull(foo, state => {
		state.then(value => {
			// 'value' is the updated result.
		}).catch(err => {
			// In most cases it makes sense to push an update in case of an error:
			ctx.push(Promise.reject(err))
		})
	})
}
```

If it is not needed to get the initial value of the task, `ctx.pullImmediate(..)` can be used instead:
```js
async function task(ctx) {
	ctx.pullImmediate(foo, state => {
		state.then(value => {
			// 'value' is the initial or updated result.
		}).catch(err => {
			// ...
		})
	})
}
```

## Concurrency
Like any other async function, dependency tasks can be executed in parallel
```js
async function task(ctx) {
	await Promise.all([
		ctx.use(a),
		ctx.use(b)
	])
}
```
