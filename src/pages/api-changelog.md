# Changelog
Any changes like new features and removed or deprecated api will be documented on this page.<br>
+ Bold entries denote breaking changes.
+ Deprecated api may be removed in the next major version.

## v2.0.0 (planned)
+ **Add promise executor support for `addDisposal`.**
+ **Removed `ctx.data`.** because of it's missleading name.
+ Add `pipeline.getContext(..)`
+ Add `ctx.exports` as replacement for `ctx.data`.
+ Add `ctx.isDisposed`
+ Add `ctx.isDependency(..)`
+ Add `ctx.isDependent(..)`
+ Add context support for `ctx.use(..)`
+ Add context support for `ctx.pull(..)`
+ Add context support for `ctx.pullImmediate(..)`
+ Add context support for `ctx.isPulling(..)`
+ **Add context support for `ctx.drop(..)`**
+ Cli: exit with code `1` when the pipeline never resolves.

## v1.4.0
+ Deprecated `ctx.data`
