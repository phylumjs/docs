# Extension API
Pipeline and context classes can be extended to add or modify behaviour.

## Pipeline
```js
const {Pipeline} = require('@phylum/pipeline')

class CustomPipeline extends Pipeline {
	// Override public api as needed.
}
```

## Context
```js
const {Pipeline, Context} = require('@phylum/pipeline')

class CustomPipeline extends Pipeline {
	createContext(fn) {
		// The default constructor takes the pipeline
		// and the task function as arguments.
		return new CustomContext(this, fn)
	}
}

class CustomContext extends Context {
	// Override public api as needed.
}
```
