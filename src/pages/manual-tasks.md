# Writing Tasks
Tasks are simple functions that take the [context](/api/tasks) as first argument and can return a value.
```js
async function task(ctx) {
	console.log('Hello World!')
}
```

## Lifecycle &amp; Resources
Task states are cached by the pipeline. After a task has completed, it can still have resources like file system watchers. Tasks can be disposed to free these resources and reset it's state. This can be done manually, by disabling the pipeline or by dependency tasks pushing updates.

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

If needed, 'dispose' event listeners may return a promise.<br>
*This will delay the re-execution of this task and the promise returned by pipeline.disable(..)*
```js
ctx.on('dispose', async () => {
	await watcher.close()
})
```

## Dependencies
A task can use other tasks as dependencies.<br/>
This will basically ensure that the current task is updated when a dependency updates.
```js
async function entry(ctx) {
	await Promise.all([
		ctx.use(taskA),
		ctx.use(taskB)
	])
}

async function taskA(ctx) {
	await ctx.use(taskC)
}

async function taskB(ctx) {
	await Promise.all([
		ctx.use(taskC),
		ctx.use(taskD)
	])
}

async function taskC() { }
async function taskD() { }
```

**Note**, that it is recommended to run distinct tasks in parallel using `Promise.all` to improve speed.

##### Example

![](/images/tasks_dependencies.svg)

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

##### Example

![](/images/tasks_push_updates.svg)

## Handling Updates
By default, a task is disposed when a dependency pushes an update which will result in re-execution in the most cases. However, a task can implement it's own logic for handling updates without beeing disposed.
```js
async function bar(ctx) {
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

As an alternative `ctx.pullImmediate(..)` can be used which will also start the dependency and call the handler with the initial (or current) state.
```js
async function bar(ctx) {
	ctx.pullImmediate(foo, state => {
		state.then(value => {
			// 'value' is the initial or updated result.
		}).catch(err => {
			// ...
		})
	})
}
```

##### Example

![](/images/tasks_handle_updates.svg)
