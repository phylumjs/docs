# Installation
```bash
npm i @phylum/pipeline
```

# Pipeline
The PhylumJS pipeline is a powerful async task runner that is designed for running builds with high concurrency. Every task has it's own context to use other tasks as dependencies, manage resources like file system watchers for development or to push updates output to dependent tasks. When a task pushes updates to dependent tasks, they are re-executed by default. Tasks can also implement custom logic for handling updates.

### State
Task states are cached by the pipeline and are reused to prevent running the same task multiple times. In addition, tasks can implement logic for cleaning up resources when they are no longer needed or when the pipeline is disabled.

## API
+ [Pipeline](/api/pipeline)
+ [Tasks](/api/tasks)

## Ecosystem
+ [Webpack Task](/ecosystem/webpack-task) - Task for integrating webpack.
+ [Process Task](/ecosystem/process-task) - Utility for running child processes.
