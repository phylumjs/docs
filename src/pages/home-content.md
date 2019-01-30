# Installation
```bash
npm i @phylum/pipeline
```

### Concept
PhylumJS is a powerful async task runner for [nodejs](https://nodejs.org/) that is designed for implementing large and complex build systems. It has a dynamic dependency tracking mechanism between tasks that makes task states reusable, provides a pull-push system for state updates and automatically re-executes tasks when needed.

#### Progressive
PhylumJS is progressive! It can be used to replace small parts of an existing build chain or to create an entire build chain from scratch. If you are using gulp, you can embed a pipeline in your existing set of gulp tasks or you can run gulp tasks from a pipeline. See [official packages](/ecosystem/packages) for more info.

#### Independent
The pipeline core library has no dependencies, is performant and 100% tested.<br>
So you can use it not only for build systems, bot also for all other projects that need a task runner that performs at runtime.
