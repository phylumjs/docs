# Installation
```bash
npm i @phylum/pipeline
```

# Concept
The PhylumJS pipeline is a powerful async task runner for [nodejs](https://nodejs.org/) that is designed for running tasks at high concurrency. It has a dependency tracking mechanism between tasks to handle task updates by only re-executing the right tasks. Unchanged task outputs are cached and can be reused.
