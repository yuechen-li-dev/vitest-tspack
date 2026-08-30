# M80e — built fixture composition

## Outcome

M80e is **Outcome A: success**. A TestTarget can now declare a qualified
BuildTarget prerequisite and independently bind one of that target's declared
artifact identities as an immutable built fixture. The existing target/build
application path executes and qualifies producers; the TestTarget graph owns
the dependency; the actual BuildResult owns the selected files and hashes.
There is no pretest shell build, package-manager lifecycle delegation, or
incidental `dist` scan.

All five M80d-blocked Vitest files migrated. The local and clean Ubuntu
workflows both reported 258 passed, zero failed, and one intentional skip.
GitHub run [33283861040](https://github.com/yuechen-li-dev/vitest-tspack/actions/runs/33283861040)
used released TSPack `v0.1.11-m80e.3`, began without `node_modules` or
`.tspack`, materialized 1,597 locked entries, built three previously absent
producer `dist` trees through their qualified BuildTargets, and completed the
native three-Test-effect Flow.

## 1–5. Baseline, blocked cases, producers, and artifacts

The clean baselines were TSPack `60bb5d68d2ed9c302e304befc22ce9cf4b96e6a1`
and Vitest `66c0be57a6da5b1e5de96dca0f66f2287a02aa5f` on `main`, Node
`v26.2.0`, and installed-style TSPack `v0.1.10-m80d.3`. The PATH binary was an
older `v0.1.8`, so baseline and development checks used embedded-bridge
release-equivalent binaries. `check`, clean sync, `VitestCoreCI`,
`VitestPackageBuildCI`, and `VitestFixturePackageCI` were green before changes.

| Consumer TestTarget | Blocked files | Producer target(s) | Declared artifact | Consumption |
| --- | --- | --- | --- | --- |
| `web-worker-built-threads` | `web-worker-jsdom`, `web-worker-mock`, `web-worker-node` | `@vitest/web-worker:package` | `runtime = dist/*.js` | Immutable publication layout; two regular JS files |
| `expect-built-threads` | `expect.test.ts` | `@vitest/pretty-format:package`, `@vitest/utils:package` | each named `runtime` | Immutable publication layouts; one file plus a 13-file set |
| `pretty-format-built-threads` | `pretty-format.test.ts` | `@vitest/pretty-format:package`, `@vitest/utils:package` | each named `runtime` | Immutable publication layouts; one file plus a 13-file set |

Upstream's mechanism was `premove dist && rollup -c` package build ordering,
with tests then resolving package export layouts from incidental workspace
outputs. The tests do not need a mutable build workspace, service, generated
source tree, or whole installed closure. They are exactly TestTargets consuming
declared BuildTarget artifact sets.

## 6–18. Public model, IR, graph, qualification, and realization

The public authoring keeps requirement and binding separate:

```tsx
{
  name: "web-worker-built-threads",
  harness: "vitest",
  sources: [/* three files */],
  project: "threads",
  dependsOn: ["@vitest/web-worker:package"],
  builtFixtures: [
    builtArtifactFixture("@vitest/web-worker:package", {
      name: "web-worker-runtime",
      artifact: "runtime",
      binding: "@vitest/web-worker",
    }),
  ],
}
```

Normalized `manifest.TestTarget` contains `DependsOn []string` and
`BuiltFixtures []BuiltArtifactFixture`. Each fixture records stable name,
qualified producer target, declared artifact selector, and npm-safe binding.
The graph's TestTarget node carries qualified prerequisite identities and
fixture nodes; package dependency/publication metadata is unchanged.

The application plans prerequisites before starting Vitest and invokes each
through existing `RunBuild`, including ordinary BuildTarget dependency
ordering. A process-local `BuildCoordinator` coalesces the same qualified
producer across parallel consumers. Build failure, cancellation, timeout, an
empty result, or an unsuccessful target blocks the consumer. Successful build
is necessary but not sufficient: fixture selection requires an exact artifact
identity or the qualified members of that named artifact set.

Rollup artifact sets already have stable identities: the set is
`package:target:declared-name`, and multiple members append the producer-relative
path. M80e supports a single named regular-file artifact and a named set of
regular files. It deliberately rejects directories; no flagship case required
a directory tree, and treating one as a file would weaken verification.

Realization creates a package-shaped projection at the deterministic consumer
`node_modules/<binding>` location. It copies the producer `package.json` as the
resolution envelope and only files present in the selected qualified
BuildResult, preserving producer-relative paths. This is a portable copy, not
a raw producer-path contract. Staging occurs in a same-parent temporary
directory followed by atomic rename. Existing unmanaged destinations fail.

## 19–24. Safety, hashes, stale output, incrementality, and sharing

Every selected source must be a regular file inside both producer package and
workspace under lexical and resolved-symlink checks. Destinations and staging
must stay inside the workspace. Bindings use the existing safe package-name
validation, so traversal cannot choose a fixture location.

The binder recomputes SHA-256 and requires equality with the BuildResult's
content hash before copying. Rollup removes all currently matched declared
artifact files before building, so a stale preexisting member cannot enter the
new qualified result merely by retaining a matching path. Removed/renamed
artifact declarations fail static validation; a successful build that does not
return the selected identity fails with
`TSPACK_TEST_BUILT_FIXTURE_ARTIFACT_MISSING` before Vitest starts.

Each projection has a `.tspack-built-fixture.json` marker containing producer,
artifact, binding, package metadata hash, ordered file paths, and content
hashes. Repeated unchanged projection verifies all bytes and reports
`reused=true`; changed content replaces only TSPack-owned output. BuildTargets
still execute once per workflow run because TSPack has no cross-run build cache.
That favors current qualification correctness; projection rematerialization is
already incremental.

Destination-scoped locks prevent fixture races. Marker equivalence intentionally
excludes consumer TestTarget identity, allowing two TestTargets in the same
package to share one immutable binding. Result provenance still records each
consumer. The parallel flagship proved web-worker built once, utils once, and
pretty-format once even though the latter two each had two consumers.

## 25–32. Inspect and diagnostic UX

Human `tspack inspect targets` shows prerequisite counts/identities and, for
each built fixture, name, realized path, producer target, and artifact selector.
JSON exposes `prerequisites` plus `builtFixtures` entries containing `name`,
`producerTarget`, `artifact`, `artifactIdentity`, `binding`, and
`realizedPath`. Two local JSON reads were byte-identical with SHA-256
`315f84b1aa5f6371f56d92a142df9b05aef5d8293ee6f4a2ec7423329358beff`.

Frontend/IR validation distinguishes unknown/duplicate BuildTargets, missing
fixture requirements, unknown artifacts, duplicate fixture names/bindings, and
invalid names/bindings. Execution distinguishes build diagnostics,
`ARTIFACT_MISSING`, `VERIFICATION_FAILED`, containment escape, unmanaged
destination, invalid package envelope, and materialization failure. Consumer,
producer, requested artifact identity, binding, and expected realization are
included where applicable.

Workflow human output now reports each prerequisite and built fixture with
artifact identity, ordered content hashes, binding, and reuse state. JSON
results additionally retain the complete prerequisite BuildTarget results and
structured test identities. Workflow inspect remains the authoritative Flow
view; target inspect expands target-owned prerequisites. F-038 records a P3
possible combined view rather than duplicating target edges into Flow.

The first flagship proof was `web-worker-built-threads`. Direct upstream Vitest
over all five files reported five files passed, 257 passed, one expected fail,
and one skipped. TSPack reports expected-fail assertions as successful semantic
results, hence the parity total of 258 passed and one skipped.

A controlled producer executor failure returned
`TSPACK_COMPILER_BUILD_FAILED`, named consumer `tests:test:unit`, and produced
zero tests. A successful producer with no selected artifact returned
`TSPACK_TEST_BUILT_FIXTURE_ARTIFACT_MISSING`; a content mismatch returned
`TSPACK_TEST_BUILT_FIXTURE_VERIFICATION_FAILED`. Focused tests also prove
verified reuse and single producer execution for concurrent consumers.

## 33–43. Migrated scope, workflow shape, clean and deterministic proof

Exactly five formerly blocked files migrated, with no additional adjacent file
claim. The identified M80d boundary is fully exhausted; further unit expansion
requires fresh requirement classification rather than more built-fixture
syntax.

`VitestBuiltFixtureCI` is one Parallel with three Test branches. It contains:

| Semantic operation | Count |
| --- | ---: |
| Test effects | 3 |
| explicit Build effects | 0 |
| Process effects | 0 |
| ShellScript effects | 0 |
| pnpm lifecycle invocations | 0 |
| pretest build scripts | 0 |
| incidental `dist` copies/scans | 0 |

Local clean proof removed root/test `node_modules`, `.tspack`, and all three
producer `dist` trees. `sync --clean` materialized 1,597 of 1,597 entries
without pnpm. Producer outputs remained absent after sync and appeared only
during the TestTarget prerequisite phase. The clean workflow completed in
about 4.8 seconds wall time; branch durations were approximately 2.95, 3.61,
and 3.76 seconds. A warm rerun completed in 4.24 seconds; all projections were
verified/reused and terminal counts stayed 258/0/1. Both inspect hashes matched.

## 44–50. GitHub and release qualification

Final Vitest run [33283861040](https://github.com/yuechen-li-dev/vitest-tspack/actions/runs/33283861040),
job `99183514519`, passed on Ubuntu 24.04.4, runner image
`ubuntu-24.04@20260823.283.1`, runner `2.336.0`, and Node `v24.19.0`. It used
TSPack `v0.1.11-m80e.3` from commit
`c2a57e177e8c38b295be05e0e9e41e983083a8df`. The checksum-verified release was
qualified by TSPack run [33283801083](https://github.com/yuechen-li-dev/tspack/actions/runs/33283801083);
Linux amd64 archive SHA-256 is
`accc2a108b8c46ab3569bfc6cc30e5edfc5e46d0d7be43b8631e5582f1290c44`.

The runner proved an empty dependency state, fetched 785 store artifacts,
materialized 1,597 entries, passed check, and then reported 258 passed, zero
failed, one skipped. Remote counts equal local counts. A remote provenance
sample is:

```text
consumer: test-web-worker-built-threads
producer: @vitest/web-worker:package
artifact: @vitest/web-worker:package:runtime
binding: @vitest/web-worker
hashes: f1ecf9c...04f7f, bde4e882...dec6a4
```

The same log reports `reused=false` on the first web-worker projection and
qualified producer success. A prior attempt of run 33283565533 failed before
project execution when registry hydration timed out reading `vite@8.2.2` after
784/785 fetches; its unchanged retry passed. This is retained as
ProviderBootstrap evidence, not hidden as a product result.

## 51–65. Regressions, authority, performance, and friction

`VitestCoreCI` remains green: basic eight passed/one skipped and snapshot 16
passed. `VitestPackageBuildCI` remains green for all 12 prerequisite-expanded
package builds. `VitestFixturePackageCI` remains green locally with 87 passed.
The broad upstream package-build authority is therefore unchanged.

No legacy pretest choreography existed as a discrete safe-to-delete fork file;
the migrated authority simply stops relying on upstream package-script order.
No legacy CI job was removed or shrunk. Broad unit coverage, runtime/platform
matrices, browser, e2e, typecheck, coverage, aggregation, and release remain
legacy authority.

| Authority | Responsibility after M80e |
| --- | --- |
| TSPack authoritative | 12 package builds, core targets, M80d 19-file slice, and five-file built-fixture slice |
| Shared transition | Broad upstream unit jobs still overlap selected files while carrying other responsibilities |
| Legacy authoritative | Remaining unit/e2e/browser/typecheck/coverage/matrices/aggregation |
| Provider-only | Checkout, Node/runner provisioning, release download, report transport |

No pathological duplicate producer was observed. Build time dominated fixture
binding: remote web-worker build/test branch took 2.51 seconds, expect 2.99,
pretty-format 3.17; local clean slowest branch was 3.76 seconds. Atomic copies
cover 16 runtime files total and warm projections are verified no-ops. TSPack
does not add a second artifact cache.

F-036 is resolved. F-037 records and resolves consumer-independent immutable
projection sharing. F-038 records the accepted P3 combined-plan UX follow-up.
One initial remote registry timeout is ProviderBootstrap. No Vitest-specific
semantic branch entered TSPack; publication-shaped binding is generic. Six
focused source dives were required: manifest normalization/validation, graph
projection, BuildResult artifact qualification, test application execution,
fixture materialization/containment, and workflow/inspect rendering.

## 66–72. Validation inventory

- TSPack focused manifest, graph, project, workflow, and CLI tests passed,
  including cross-project binding, unknown/missing/stale artifacts, producer
  failure, concurrent consumers, deterministic discovery, and generated types.
- `go test ./cmd/... ./internal/... ./tools/...` passed.
- Manifest frontend build and manifest API typecheck passed; final suite was
  257 passed and two environment skips. One earlier browser watch run hit a
  transient frame-detach reload; the focused rerun and complete rerun passed.
- VS Code compile passed; 35 tests passed.
- setup-tspack tests, GitHub export check, embedded release matrix, and Linux
  no-dist smoke passed.
- Vitest upstream five-file oracle, clean sync/check/new workflow, deterministic
  rerun, CoreCI, PackageBuildCI, and M80d workflow passed.
- Final TSPack and Vitest `git diff --check` passed.

## 73–75. Final state and next boundary

Outcome A is satisfied. Build outputs are qualified data with stable identity,
and TestTargets consume them through the graph without shell choreography or
filesystem folklore.

The exact stopping boundary is immutable regular-file artifacts and named
regular-file artifact sets. Directory artifacts are explicitly rejected; no
current flagship test needs them. The next recommended step is not another
built-fixture milestone. Re-characterize the next bounded Vitest unit family;
only introduce directory-artifact projection or another primitive when a real
consumer proves it is necessary.
