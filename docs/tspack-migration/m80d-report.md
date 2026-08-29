# M80d — test realization semantics

## Outcome

M80d is **Outcome B: meaningful progression**. TestTarget-scoped package
requirements and local package/source fixture mappings are now first-class,
locked, materialized, inspectable, and consumed by the native test path. A
clean Ubuntu runner used the released `v0.1.10-m80d.3` setup path to realize
1,594 entries without pnpm and execute the new `VitestFixturePackageCI` Flow:
85 passed, two skipped, and zero failed.

The adjacent boundary is now precise. Five excluded tests require outputs of
workspace BuildTargets: three web-worker tests need
`@vitest/web-worker:build:package`, `expect.test.ts` needs the utils artifact,
and `pretty-format.test.ts` needs the pretty-format artifact. Source links or
locked package copies would lie about that contract. The next milestone should
let a TestTarget require a qualified BuildTarget and bind a declared artifact
as a built fixture, using the existing build graph and artifact identity.

## Baseline and characterized family

The clean baseline was TSPack `765adb7e` and Vitest `23a8cfa`, with Node
`v26.2.0` and qualified TSPack `v0.1.9-m80c.4`. M80c owned 12 Rollup package
builds and two bounded TestTargets. Its blocked adjacent family was Vitest's
threads unit partition: a 2,045-test probe had 20 collection failures caused by
test-only packages and local fixture topology.

Representative investigation separated these requirement classes:

| Class | Flagship evidence | M80d decision |
| --- | --- | --- |
| Package/TestHarness requirement | sinon, sinon-chai, jsdom, React aliases | Implement through target-scoped Requirement Tape entries |
| LocalProjectFixture | dep-cjs, dep1/dep2, http-client, Vite external fixtures | Implement typed package and source mappings |
| BuildTarget requirement | web-worker, utils, pretty-format outputs | Preserve as the next primitive; do not emulate with source/package mode |
| Generated/mutable fixture | No selected test required one | Not implemented |
| External tool/runtime environment | Existing Vitest compiler/harness and Flow platform model sufficed | No new primitive |

The upstream pnpm `11.24.0` oracle ran the first two-file target with 21 passed
and a broader 19-file characterization with 300 passed. pnpm was comparison
authority only; it was never delegated an outer TSPack lifecycle or used to
form the final fixture topology.

## Public and internal model

TestTarget rows now accept typed dependency references in `requirements` and
typed `localFixture(...)` values in `fixtures`:

```tsx
{
  name: "requirements-fixtures-threads",
  harness: "vitest",
  config: "vite.config.ts",
  sources: ["test/chai-style-assertions-sinon.test.ts", "test/interop.test.ts"],
  project: "threads",
  requirements: [deps.sinon, deps.sinonChai, deps.vitestTestDepCjs],
  fixtures: [
    localFixture(deps.vitestTestDepCjs, {
      name: "dep-cjs",
      binding: "@vitest/test-dep-cjs",
    }),
  ],
}
```

`requirements` lower to normalized dependency keys on `manifest.TestTarget`.
`fixtures` lower independently to `manifest.TestFixture` values containing
name, producer dependency key, binding, and `package | source` mode. The graph
then attaches authoritative dependency nodes to each qualified test identity;
fixture binding remains test-realization IR rather than Requirement Tape.

Package requirements enter the existing resolver as `target-explicit`
requirements and target-qualified `pkg:test:target` lock edges. They have
explicit precedence between package/project intent and overrides, compose with
aliases, peers, optional peers, npm, JSR, path, and workspace identity, and do
not become publication dependencies. `update` resolves them, lock consistency
detects missing or unexpected edges, and `sync` materializes their complete
closure before fixture planning. There is no second runner-local resolver.

The authoring types accept `TargetDependencyRefLike`; package and source
fixtures must refer to a declared path/workspace dependency and must also occur
in `requirements`. Validation rejects unknown/duplicate requirements, invalid
or duplicate fixture names/bindings, unknown/invalid producers,
self-reference, missing requirements, and invalid modes with deterministic
`TSPACK_TEST_REQUIREMENT_*` and `TSPACK_TEST_FIXTURE_*` diagnostics. Generated
declarations and templates have one synchronized definition.

## Realization semantics

The default `package` mode copies/projects the immutable locked package tree
from TSPack's materialized root into the consumer package's Node resolution
binding. `source` mode creates a TSPack-owned Unix directory link or Windows
junction to the authoritative local path/workspace root; Vitest needs this for
Vite realpath behavior. Both modes derive destinations from semantic consumer,
producer, and npm binding identities. Neither makes a raw author path the
primary identity.

Destinations are deterministic consumer `node_modules/<binding>` projections.
The sorted plan records qualified target, fixture, producer ID, binding, mode,
source, and destination in `.tspack/test-fixtures/materialization.json` with a
SHA-256 digest. An unchanged digest plus present projections is a no-op; a
changed producer plan removes only paths recorded as TSPack-owned. Existing
unmanaged destinations are rejected unless clean/force semantics explicitly
authorize replacement.

Lexical containment and resolved-existing-path checks reject traversal,
absolute escape, and symlink/junction escape on Windows and Unix. Source and
destination must remain in the workspace. Portable extraction and the existing
store/link machinery remain authoritative. Immutable projections are safe for
parallel TestTargets. Mutable/per-run isolation and built artifact staging were
not implemented because the migrated evidence did not require them.

Before process start, the native test operation validates every realized
binding and emits `TSPACK_TEST_FIXTURE_MISSING` with consumer target, binding,
and producer context. Vitest executables are resolved to an absolute path
before switching to package cwd. Assertion failures become
`TSPACK_TEST_ASSERTION_FAILED`; collection failures become
`TSPACK_TEST_SUITE_FAILED`, preserving qualified target, test/suite identity,
diagnostic details, and nonzero exit semantics.

`tspack inspect targets` and `--json` expose target requirements, fixture
identity, authoritative producer, binding, mode, and derived realized path.
Human output summarizes requirement/fixture counts and prints each fixture.
Two final JSON inspections were identical, with SHA-256
`9dd07cb56dcf5d98f586508f01963c74e6cc7d93bbac0f15bb24aa51b7962338`.

## Vitest adoption and result fidelity

The first proof target, `requirements-fixtures-threads`, combined sinon and
sinon-chai target requirements with a local dep-cjs package binding. Both the
pnpm oracle and TSPack reported the same 21 passed identities. A controlled
inline-snapshot mismatch then produced 20 passed, one failed, exit code 1, and
`TSPACK_TEST_ASSERTION_FAILED` naming
`@vitest/test-unit:test:requirements-fixtures-threads`, the `interop` test, and
the snapshot mismatch. The source was restored and no failure is committed.

The boring adjacent scope expanded into three native parallel branches:

| TestTarget | Files | Local result | Clean Ubuntu result |
| --- | ---: | ---: | ---: |
| `fixture-package-family-threads` | 16 | 65 passed | 65 passed |
| `react18-threads` | 1 | 1 passed | 1 passed |
| `additional-package-fixtures-threads` | 2 | 21 passed | 19 passed, 2 skipped |
| **Total** | **19** | **87 passed** | **85 passed, 2 skipped** |

The representative two-file target is a subset of the 16-file family and is
not double-counted. The new workflow references only qualified TestTargets;
fixture paths, source lists, harness packages, and flags stay in target intent.
It has three Test effects in one Parallel, zero Process, zero ShellScript, and
zero pnpm lifecycle invocations. The two remote skips are platform behavior;
test identities and the 87-result total match local execution.

## Clean, regression, and remote proof

Final local clean sync realized 1,594 of 1,594 entries. A warm sync took
876.5 ms. The final local workflow took about 2.2 seconds on the slowest branch
and reported 87 passed, zero failed, zero skipped. `tspack check` passed with
the known six non-literal dynamic-import warnings, 77 version-conflict summary,
and lifecycle-script policy warnings.

`VitestCoreCI` remained green (basic: 8 passed, one skipped; snapshot: 16
passed), and `VitestPackageBuildCI` remained green for all 12 builds. The broad
upstream package build had already passed. A direct clean upstream typecheck
did not: it reported TS2688 for missing Node type definitions because the broad
typecheck environment is not yet target-owned. That responsibility was not
claimed by this bounded test migration.

GitHub run [33279242166](https://github.com/yuechen-li-dev/vitest-tspack/actions/runs/33279242166)
at Vitest commit `67fa04076` passed in 95 seconds on Ubuntu 24.04.4, runner
image `ubuntu-24.04@20260823.283.1`, with Node `v24.19.0`. It began from no
`node_modules` and no `.tspack`, installed no pnpm dependencies, used
`v0.1.10-m80d.3`, realized 1,594 entries, passed check, produced 85 passed plus
two skipped structured results, and ended with
`Workflow VitestFixturePackageCI succeeded`.

The final release is TSPack commit `60bb5d68`, qualified by successful release
run [33279009319](https://github.com/yuechen-li-dev/tspack/actions/runs/33279009319).
Linux amd64 SHA-256 is
`8dc7bb623d09330d0caa65f1f941f346ca0836c410fb828b447232c30aab1c5a`;
Windows amd64 is
`dda4ea6ee07a9d0239c3ff3d35d9e6279da77679ee8024b217db7a8d2733dd1d`.
The generated workflow pins that release and retains only checkout, Node setup,
setup-tspack, clean-state assertion, sync, check, and one native workflow run.

Two failed remote runs are retained as product evidence. Run 33278851725
exposed collection failures that exit-only reporting could not identify. The
released suite-failure diagnostic made run 33279104517 identify missing utils
and pretty-format build artifacts precisely, enabling the clean scope boundary
instead of a speculative fixture hack.

## Product pressure test and authority

General TSPack fixes included target-qualified lock/resolution, alias-preserving
target requirements (including JSR materialization), deterministic fixture
ownership/containment, absolute harness executable resolution on Windows, and
structured assertion/collection diagnostics. Five focused source dives were
needed: frontend normalization, requirement resolver/lock, fixture
materializer, test diagnostics, and workflow/release exporter. Inspect and
diagnostic improvements now expose those paths without source reading.

The friction ledger marks F-033 resolved for package/source fixtures and adds
F-036 for built fixture composition. Vitest-specific realpath behavior justified
two source links; the other mappings use package mode. Historical pnpm fixture
topology is removed for the migrated scope. No legacy CI job was removed or
shrunk: the broad job still owns coverage, runtime/platform matrices, browser,
e2e, examples, typecheck, and report aggregation.

| Authority | Responsibilities after M80d |
| --- | --- |
| TSPack authoritative | 12 package builds; prior core tests; 19-file/87-result fixture-package test slice |
| Shared transition | Broad unit job still overlaps migrated files while retaining unmodeled responsibilities |
| Legacy authoritative | Remaining unit/e2e/browser/typecheck/coverage/matrices/aggregation |
| Provider-only | Checkout, runtime and machine provisioning, report transport, external automation |

## Validation inventory

- `go test ./cmd/... ./internal/... ./tools/...`: passed after the final
  collection-diagnostic commit.
- Manifest frontend: build/typecheck passed; 256 passed and two skipped tests.
- VS Code extension: compile passed; 35 tests passed.
- Generated manifest declaration drift: passed.
- Workflow/export tests and setup-action test: passed.
- Focused manifest, graph, resolver, lockfile, materializer, project, testcmd,
  and workflow regressions: passed, including containment, incremental reuse,
  parallel immutable consumers, aliases, failure propagation, and JSON inspect.
- Vitest clean sync/check/new workflow, CoreCI, and PackageBuildCI: passed.
- Final TSPack and Vitest `git diff --check`: passed.

Built fixtures, mutable fixtures, and dependency-cycle additions were not
claimed as implemented tests. Existing graph-cycle validation remains in
force; M80d's dependency subset adds ordinary lock edges and introduced no
separate cycle-capable graph.

## Exact stopping boundary and next step

Stop after package/source fixture semantics. The next adjacent tests require a
different semantic class: a TestTarget must depend on a qualified BuildTarget
and bind one of its declared artifacts after successful build. The next focused
milestone should add that composition to normalized test intent, planning,
inspect JSON, Flow prerequisite ordering, clean staging, and missing-output
diagnostics, then re-adopt the three web-worker tests plus `expect.test.ts` and
`pretty-format.test.ts`. It must reuse BuildTarget identity and artifact sets;
it must not add a pretest shell build or copy incidental `dist` directories.
