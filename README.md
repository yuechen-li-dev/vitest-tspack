<p align="center">
  <br>
  <br>
  <a href="https://vitest.dev" target="_blank" rel="noopener noreferrer">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://vitest.dev/vitest-light.svg">
      <source media="(prefers-color-scheme: light)" srcset="https://vitest.dev/vitest-dark.svg">
      <img alt="Vitest logo" src="https://vitest.dev/vitest-dark.svg" height="60">
    </picture>
  </a>
  <br>
  <br>
  <br>
</p>

<h1 align="center">
Vitest
</h1>
<p align="center">
Next generation testing framework powered by Vite.
<p>
<p align="center">
  <a href="https://npmx.dev/package/vitest"><img src="https://img.shields.io/npm/v/vitest?color=729B1B&label=" alt="current vitest version badge"></a>
<p>

<p align="center">
<a href="https://chat.vitest.dev"><b>Get involved!</b></a>
</p>
<p align="center">
 <a href="https://vitest.dev">Documentation</a> | <a href="https://vitest.dev/guide/">Getting Started</a> | <a href="https://vitest.dev/guide/#examples">Examples</a> | <a href="https://vitest.dev/guide/why">Why Vitest?</a>
</p>
<p align="center">
<a href="https://cn.vitest.dev">中文文档</a>
</p>

<h4 align="center">

</h4>
<br>
<br>

## TSPack flagship workflow slice

This fork contains a bounded TSPack migration proof, not a complete Vitest
port. `VitestCoreCI` builds the native `@vitest/expect:package` and
`@vitest/snapshot:package` BuildTargets, then runs the native
`@vitest/test-unit:basic-threads` and
`@vitest/test-unit:snapshot-threads` TestTargets.

`VitestBuiltFixtureCI` is the built-output composition proof. Its Flow contains
only three native Test effects. Those TestTargets declare graph prerequisites
on the existing `@vitest/web-worker:package`, `@vitest/utils:package`, and
`@vitest/pretty-format:package` BuildTargets and bind their declared `runtime`
artifacts as package-shaped fixtures. The five selected test files therefore
need no pretest script, pnpm lifecycle, or incidental checked-out `dist` tree.

```powershell
tspack inspect targets
tspack workflow list
tspack workflow inspect VitestCoreCI
tspack sync --clean
tspack check
tspack workflow run VitestCoreCI --jobs 4
tspack workflow run VitestBuiltFixtureCI --jobs 4
```

GitHub runs the same Flow through the generated
`.github/workflows/tspack-vitestcoreci.yml` thin runner. It pins Node 24 and the
checksum-verified TSPack `v0.1.9-m80b1.3` prerelease, verifies an empty
dependency state, materializes the committed `ts-lock.toml`, checks the
project, and invokes only `tspack workflow run VitestCoreCI` for lifecycle
semantics. It does not run pnpm.

TSPack now owns only this bounded build/test slice. The broad upstream unit
matrix still carries additional Node and Windows coverage, so no whole legacy
job can be deleted without losing a safety net. Broader package builds,
typecheck/lint, browser, coverage, platform, release, publish, ecosystem, and
repository-maintenance workflows remain upstream authority. See
[`docs/tspack-migration/m80b1-report.md`](docs/tspack-migration/m80b1-report.md)
for the earlier remote qualification and exact workflow inventory. See
[`docs/tspack-migration/m80e-report.md`](docs/tspack-migration/m80e-report.md)
for built-fixture provenance and the current authority map; this is not a claim
of complete Vitest CI migration.

## Features

- [Vite](https://vitejs.dev/)'s config, transformers, resolvers, and plugins. Use the same setup from your app!
- [Jest Snapshot](https://jestjs.io/docs/snapshot-testing)
- [Chai](https://www.chaijs.com/) built-in for assertions, with [Jest expect](https://jestjs.io/docs/expect) compatible APIs
- [Smart & instant watch mode](https://vitest.dev/guide/features.html#watch-mode), like HMR for tests!
- [Native code coverage](https://vitest.dev/guide/features.html#coverage) via [`v8`](https://v8.dev/blog/javascript-code-coverage) or [`istanbul`](https://istanbul.js.org/).
- Jest-compatible mocking, stubbing, and spies.
- [JSDOM](https://github.com/jsdom/jsdom) and [happy-dom](https://github.com/capricorn86/happy-dom) for DOM and browser API mocking
- [Browser Mode](https://vitest.dev/guide/browser/) for running component tests in the browser
- Components testing ([Vue](https://github.com/vitest-tests/browser-examples/tree/main/examples/vue), [React](https://github.com/vitest-tests/browser-examples/tree/main/examples/react), [Svelte](https://github.com/vitest-tests/browser-examples/tree/main/examples/svelte), [Lit](./examples/lit), [Marko](https://github.com/marko-js/examples/tree/master/examples/library-ts))
- Benchmarking support with [Tinybench](https://github.com/tinylibs/tinybench)
- [Projects](https://vitest.dev/guide/projects) support
- [expect-type](https://github.com/mmkal/expect-type) for type-level testing
- ESM first, top level await
- Out-of-box TypeScript / JSX support
- Filtering, timeouts, concurrent for suite and tests
- Sharding support
- Reporting Uncaught Errors
- Run your tests in the browser natively

> Vitest requires Vite >=v6.4.0 and Node >=v22.12.0

```ts
import { assert, describe, expect, it } from 'vitest'

describe('suite name', () => {
  it('foo', () => {
    expect(1 + 1).toEqual(2)
    expect(true).to.be.true
  })

  it('bar', () => {
    assert.equal(Math.sqrt(4), 2)
  })

  it('snapshot', () => {
    expect({ foo: 'bar' }).toMatchSnapshot()
  })
})
```

```bash
$ npx vitest
```

## Sponsors

<p align="center">
  <a href="https://cdn.jsdelivr.net/gh/sheremet-va/static/vitest/sponsors.svg">
    <img src='https://cdn.jsdelivr.net/gh/sheremet-va/static/vitest/sponsors.svg' alt="vitest's sponsors"/>
  </a>
</p>

## Credits

Thanks to:

- [The Jest team and community](https://jestjs.io/) for creating a delightful testing API
- [@lukeed](https://github.com/lukeed) for the work on [uvu](https://github.com/lukeed/uvu) where we are inspired a lot from.
- [@pi0](https://github.com/pi0) for the idea and implementation of using Vite to transform and bundle the server code.
- [The Vite team](https://github.com/vitejs/vite) for brainstorming the initial idea.
- [@patak-dev](https://github.com/patak-dev) for the awesome package name!

## Contribution

See [Contributing Guide](https://github.com/vitest-dev/vitest/blob/main/CONTRIBUTING.md).

## License

[MIT](./LICENSE) License © 2021-Present VoidZero Inc. and Vitest contributors
