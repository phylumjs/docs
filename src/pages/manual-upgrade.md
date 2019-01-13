# Upgrade to version v2.0.0

### `ctx.data`
`ctx.data` is now removed because of it's missleading name.<br>
If you previously stored internal data on it, use local variables instead.

If you were exposing public api to code outside the task, use `ctx.exports`:
```js
// Removed api:
async function task(ctx) {
	ctx.data.foo = 'bar'
	ctx.data.bar = () => console.log('Hello World!')
}

// Should be replaced with:
async function task(ctx) {
	let foo = 'bar'
	ctx.exports.bar = () => console.log('Hello World!')
}
```
In addition, context objects can now be accessed from the pipeline:
```js
pieline.getContext(task).exports.bar()
// -> 'Hello World!'
```

### `Event: 'dispose'`
The `addDisposal` function is now deprecated and will be removed in the next major version.<br>
Return a promise from the event listener instead.
```js
// Deprecated api:
async function task(ctx) {
	ctx.on('dispose', addDisposal => {
		addDisposal(somePromise)
	})
}

// Should be transformed into:
async function task(ctx) {
	ctx.on('dispose', () => {
		return somePromise
	})
	// or
	ctx.on('dispose', async () => {
		await somePromise
	})
}
```
