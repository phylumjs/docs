# Pipeline
The Phylum Pipeline is a flexible async task runner that is designed to run in a node environment.

## Concept
To easily combine processes like webpack builds and application packaging in a way that fits both development and production, these processes are organized in atomic tasks that can use other tasks as dependencies. Tasks can push updates (like new stats from webpack in watch mode) to their dependents. Updates can be handled manually or tasks are re-executed automatically.

## Installation
```bash
npm i @phylum/pipeline
```
