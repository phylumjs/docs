# Output Streams
```js
const {outputStream} = require('@phylum/pipeline')
```

### `outputStream(executor)`
Create a task that automatically pushes updates when resolved or rejected multiple times.
```js
const example = outputStream((ctx, resolve, reject) => {
	resolve('foo')
	reject('bar')
	resolve('baz')
})

// The example task will:
//  - resolve with 'foo'
//  - push an update that rejects with 'bar'
//  - push an update that resolves with 'baz'
```
+ ctx `<Context>` - The task context.
+ executor `<function>` - The task executor.
	+ ctx `<Context>` - The task context.
	+ resolve `<function>` - Resolve the task.
	+ reject `<function>` - Reject the task.
	+ If an error is thrown from the executor, the task will reject.
+ returns `<function>` - A task function.
