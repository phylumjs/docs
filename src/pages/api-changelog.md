# Changelog
Any changes like new features and removed or deprecated api will be documented on this page.<br>
+ Bold entries denote breaking changes.
+ Deprecated api may be removed in the next major version.

## v3.2.0
+ Add pipeline and context extension api.

## v3.1.0
+ Add context argument to `resolve`, `reject`, `dispose-error` events and update handlers.

## v3.0.0
+ **Move pipeline class to named export.**
+ **Move static cli utility from pipeline to named export.**
+ **Remove `addDisposl` for context `dispose` event handlers.**

## v2.0.0
+ **Remove `ctx.data`.**
+ Allow context 'dispose' event handlers to return a promise.
+ Deprecated `addDisposal` for context 'dispose' event handlers.
+ Add `pipeline.getContext(..)`
+ Add `ctx.exports` as replacement for `ctx.data`.
+ Add `ctx.isDisposed`
+ Add `ctx.isDependency(..)`
+ Add `ctx.isDependent(..)`
+ Add `ctx.disposeAfterPipeline`
+ Add context support for `ctx.use(..)`
+ Add context support for `ctx.pull(..)`
+ Add context support for `ctx.pullImmediate(..)`
+ Add context support for `ctx.isPulling(..)`
+ Add context support for `ctx.drop(..)`
+ Cli: exit with code `1` when the pipeline never resolves.

## v1.4.0
+ Deprecated `ctx.data`
