# M80f — adaptive test/CI expansion after built-fixture composition

## Outcome

M80f is **Outcome B: meaningful progression**. One additional 11-file,
112-result node/runtime unit family is now TSPack-owned, green from an absolute
clean checkout on Windows and Ubuntu, and represented without Process,
ShellScript, pnpm lifecycle, pretest build, or incidental `dist` copying.

The next adjacent CLI family exposed the next nontrivial general semantic
concept: **patched dependency content must participate in Requirement Tape
identity, locking, verification, and materialization**. Vitest's
`patches/cac@6.7.14.patch` is behaviorally observable, while TSPack currently
materializes the unpatched npm tarball. M80f stops at that evidence instead of
delegating patch application to pnpm.

## 1–3. Baseline revisions, qualified release, and initial authority

| Item | Baseline | Qualified code revision |
| --- | --- | --- |
| TSPack | `c2a57e177e8c38b295be05e0e9e41e983083a8df` | `53960191afce9e00851131fb69148192871dbd86` |
| Vitest fork | `0b98115eef00b79d993769b9eb61be923f4db835` | `f0f9ef23d7e97554b5cb3d3d0722eb3e7bc3b785` |
| Node | `v26.2.0` | `v26.2.0` local; `v24.19.0` remote |
| installed TSPack | stale PATH `v0.1.8`; baseline qualified with embedded bridges `v0.1.11-m80e.3` | release `v0.1.12-m80f.2` |

Initial authority was TSPack for 12 package BuildTargets, CoreCI's two builds
and two tests, M80d's 19-file fixture slice, and M80e's five-file built-fixture
slice. The broad upstream unit job still overlapped those files. Legacy CI
remained authoritative for all other unit, e2e, coverage, runtime/platform
matrices, browser/UI, typecheck/lint/docs, examples, report aggregation, and
release responsibilities. Checkout, runtime installation, release download,
browser/image provisioning, and artifact transport were provider-only.

Baseline was green: clean sync materialized 1,597 entries; CoreCI reported
24 passed and one skip; PackageBuildCI completed 12 targets; M80d reported
87 passed; and M80e reported 258 passed and one skip.

## 4. Remaining responsibility inventory and classification

| Responsibility | Current owner/tool and meaningful dimensions | M80f classification |
| --- | --- | --- |
| Remaining ordinary unit tests | Vitest threads/forks projects; package, source, and built fixtures | `AlreadyRepresentable` until patched CLI content |
| CLI and nested module-diagnostic tests | Built Vitest CLI plus patched `cac@6.7.14` | `NeedsNewPrimitive` |
| Remaining package builds | `@vitest/browser` and `@vitest/ui`; Rollup plus Vite client builds | `RepresentableWithAuthoring`, not selected before the closer boundary |
| Coverage | test mode, collection, reports, threshold policy, upload, retention | `Unknown`; deliberately not collapsed into one concept |
| Node 22/24/26 qualification | runtime selected by provider, semantic target qualification | `Unknown` / likely authoring plus runtime qualification work |
| Linux/Windows/macOS qualification | upstream job matrix and platform-specific skips | `AlreadyRepresentable` in part; broader ownership retained |
| Browser/UI | Playwright/WebdriverIO, browser binaries, display/bootstrap, shards, screenshots | `ProviderBootstrapOnly` plus unclassified project semantics |
| E2E/integration | nested projects and CLI/tool execution; some service/process lifetimes | `Unknown` |
| Typecheck/lint/docs/examples | direct tools and generated-output checks | `RepresentableWithAuthoring` or `HistoricalGlue`, not migrated |
| Blob merge/report aggregation | Vitest report artifacts and provider transport | `Unknown` / provider transport split required |
| Publish/release | secrets, npm provenance, tags, GitHub release | `ReleaseOnly` |

The legacy CI file also contains changed-file routing, a Playwright dependency
image, Vite 7 compatibility lanes, browser shards, and report merging. No
provider YAML syntax was treated as proof of a project primitive.

## 5–7. Self-selected checkpoints

### Checkpoint 1

```text
responsibility: adjacent built Vitest node/runtime unit behavior
upstream oracle: upstream unit jobs on Node 24/26 Linux and Node 24 Windows
expected primitives: BuildTarget, TestTarget, target prerequisites,
  TargetArtifact, BuiltArtifactFixture, Requirement Tape, Flow
legacy potentially redundant: the exact 11-file overlap, not the broad unit job
acceptance: structured identities/counts, hash provenance, clean local and Ubuntu
```

The first probe chose `test/cli-test.test.ts` because it is the nearest
nontrivial consumer of the built Vitest package. Composing one binding from
several named regular-file artifact sets was a small general gap, so TSPack now
accepts exclusive `artifact` or `artifacts` fixture declarations. It verifies
each selected file, rejects collisions, records all artifact identities, and
projects the union atomically. Fixture producers may be reached through the
transitive BuildTarget prerequisite closure, so the manifest declares only
`vitest:package` rather than reconstructing its graph.

The CLI probe then produced 9 passes and 21 failures whose behavior matched
the unapplied `cac@6.7.14` patch. Before stopping, the checkpoint moved to the
largest adjacent family that did not cross that boundary: browser sessions,
doctor candidates, duration breakdown, environment diagnostics, external
module directory, file paths, import diagnostics, package-scope type lookup,
CJS-condition parsing, file-URL resolution, and sequencers. This target passed
109 tests with three expected Windows skips.

### Checkpoint 2

```text
responsibility: absolute clean materialization qualification
upstream oracle: no node_modules, no .tspack, then sync --clean
expected primitives: Requirement Tape and existing source-fixture projection
legacy potentially redundant: none
acceptance: 1,597 entries on Windows and Ubuntu from the released binary
```

An absolute Windows replay exposed dependency bindings that existed before
source-fixture projection. Clean mode authorized replacement but did not remove
the exact junction first. TSPack now removes only the contained destination in
clean/force mode; ordinary sync still rejects unmanaged content. A focused
regression and the full suite cover the rule. Release `.2` then passed the
five-lane release matrix and both clean local and Ubuntu sync.

Decision: stop. The next CLI and nested module-diagnostic family requires
patched dependency identity, a general Requirement Tape primitive substantial
enough for M80g.

## 8–20. Migrated targets, workflow, fixtures, and results

- Build responsibilities migrated: no new BuildTarget; the existing
  `vitest:package` closure is reused and executes each of seven producers once.
- Test responsibilities migrated: one TestTarget,
  `@vitest/test-unit:test:node-runtime-built-threads`, containing 11 files.
- New workflow: `VitestNodeUnitCI`, one semantic Test effect and no explicit
  Build effect. The target graph owns producer execution.
- Coverage, new platform lanes, runtime matrices, browser, and e2e
  responsibilities migrated: none.
- Package fixtures and source fixtures newly added: none; the existing M80d
  fixtures remain green.
- Built fixture bindings: expect `javaScript`; mocker `runtime`; pretty-format
  `runtime`; snapshot's four named JS/runtime sets; spy `runtime`; utils'
  runtime and source-map sets; and Vitest's commonjs/runtime/chunks/workers sets.
- Typed results retain target, pass/fail/skip, diagnostics, prerequisites,
  producer target, artifact identities, content hashes, binding, and reuse.

Local final results with the released `.2` binary:

| Proof | Result |
| --- | --- |
| `tspack sync --clean` | 1,597 entries, 23.354 seconds |
| `tspack check` | success with the known 6 dynamic-import, 77-version-conflict, and lifecycle advisories |
| `VitestCoreCI` | 24 passed, 0 failed, 1 skipped |
| `VitestPackageBuildCI` | 12 authoritative package targets succeeded |
| `VitestFixturePackageCI` | 87 passed, 0 failed, 0 skipped |
| `VitestBuiltFixtureCI` | 258 passed, 0 failed, 1 skipped |
| `VitestNodeUnitCI` | 109 passed, 0 failed, 3 skipped; 9.540 seconds |

## 21–30. TSPack fixes and semantic boundary

TSPack changes are general:

1. A built fixture can atomically compose multiple named regular-file artifact
   sets while preserving singular compatibility and full provenance.
2. A fixture producer can be validated through the qualified transitive build
   prerequisite closure, removing duplicated dependency declarations.
3. Equivalent transitive BuildResult observations are deduplicated before
   artifact selection.
4. Clean/forced source-fixture projection replaces the exact contained
   dependency binding before materialization.

No directory artifact is required. Identity remains with named immutable file
sets; no symlinks or mutable tree contract was invented. No service or managed
process is required by the selected family. Coverage and runtime-matrix
semantics remain deliberately undecomposed/unimplemented.

The missing primitive is patched package content. It is general because the
same name/version/source tarball can have different executable semantics after
a repository-declared patch in any package ecosystem. M80g should make patch
source hash and canonical patch content part of resolution and lock identity,
verify the raw input and derived output, apply deterministically with path and
line-ending safety, reject missing/drifted patches, and materialize without
delegating to pnpm. Importing pnpm `patchedDependencies` can remain secondary.

## 31–35. Escape-hatch and choreography counts

| Metric | New M80f authority |
| --- | ---: |
| Process effects | 0 |
| ShellScript effects | 0 |
| pnpm lifecycle calls | 0 |
| pretest builds | 0 |
| incidental `dist` copies | 0 |

There are no background shells, manual target ordering, package-script
delegations, or GitHub matrix objects in semantic IR. The only provider steps
are checkout, Node selection, released TSPack setup, clean-state assertion,
sync/check, and workflow invocation.

## 36–47. Fidelity, determinism, performance, and remote proof

All producer files are SHA-256 verified against their BuildResults before
projection. Composite artifact identity is deterministic; two target-inspect
runs were byte-identical with SHA-256
`693bd058777b69cce9e0a9810256f437e5b66079eda0e6005c47b156b404753a`.
Local and remote test counts are identical at 109/0/3. The upstream legacy unit
oracle passed on Linux Node 24 and 26 and Windows Node 24; its Linux Node 24
broad result was 6,159 passed, 63 expected failures, 261 skipped, and 75 todo.

The new Flow has one bounded Test effect. The prerequisite graph coalesces each
producer once; existing CoreCI still demonstrates concurrent independent
branches. Caching was not added. Clean sync correctness precedes optimization;
local clean sync was 23.354 seconds, the local workflow 9.540 seconds, remote
sync 89 seconds, remote workflow 12 seconds, and the complete remote job 108
seconds.

Release qualification:

- TSPack release run
  [33286114221](https://github.com/yuechen-li-dev/tspack/actions/runs/33286114221)
  built Linux amd64/arm64, Windows amd64, and macOS amd64/arm64, smoked the
  Linux no-dist binary, generated checksums, and published `.2`.
- Final Vitest run
  [33286308315](https://github.com/yuechen-li-dev/vitest-tspack/actions/runs/33286308315)
  at `f0f9ef23d...` used Ubuntu 24.04.4 image `20260823.283.1`, runner
  `2.336.0`, Node `v24.19.0`, and `v0.1.12-m80f.2` from commit `53960191...`.
  It verified an empty dependency state, materialized 1,597 entries, and
  finished 109/0/3.
- Transitional `.1` release/run `33285712292` and Vitest run `33285825992`
  also passed; `.2` supersedes them after the Windows clean-sync fix.

## 48–63. Authority, retained CI, UX, and friction

No legacy job was deleted or shrunk because the upstream unit job still owns
thousands of other results plus runtime/platform qualification. The exact
11-file target is TSPack authoritative; the broad legacy unit job remains
shared transition coverage. Remaining ordinary unit, e2e, coverage,
runtime/platform matrices, browser/UI, examples, lint/typecheck/docs,
aggregation, and release jobs remain legacy authoritative. Provider bootstrap
and release-only ownership are unchanged.

Choreography reduction for the new slice is one direct TestTarget replacing
package-script selection, build ordering, and generated-output assumptions;
seven build producers and seven fixture bindings are discoverable from target
semantics. `inspect targets`, `workflow list`, and `workflow inspect` remained
usable and deterministic at the current 10-TestTarget scale. A fresh agent can
find the files, prerequisite closure, artifact identities, bindings, and Flow
without reading package scripts. The main archaeology cost was proving that
the CLI divergence came from `patchedDependencies`, not from build artifacts.

Friction ledger additions:

- F-039: multi-artifact fixture composition, P1 `MigrationUX`, resolved.
- F-040: clean source-fixture binding replacement, P1 `TSPackBug`, resolved.
- F-041: patched dependency identity, P1 `MissingPrimitive`, open.

Vitest-specific issues: none in the migrated family. Historical glue found:
matrix and package-script choreography that remains intentionally untouched
until its full responsibility is replaced. The legacy lint job still fails on
pre-existing generated migration-draft formatting, and a Node 26 e2e lane has
an unrelated async-handle race; all three upstream unit lanes passed.

## 64–70. Final validation and stop

TSPack validation passed:

- `go test ./cmd/... ./internal/... ./tools/...` after both general changes;
- manifest frontend build and 257 passed / 2 skipped tests;
- generated manifest-type sync with no drift;
- VS Code compile and 35 tests;
- setup-action tests, workflow/export tests, release qualification, and
  `git diff --check`.

Vitest validation passed for `tspack check`, released clean sync, every
authoritative TSPack workflow, deterministic inspect output, three upstream
unit oracle lanes, the new clean Ubuntu workflow, and `git diff --check`.
The existing broad upstream build completed in the legacy CI before its
unrelated lint/e2e failures; browser lanes also remained green.

**Outcome B.** Exact stopping boundary: the next adjacent built CLI consumer
requires a patched `cac@6.7.14` package, but Requirement Tape identifies and
materializes only the raw npm package. Exact reason: continuing would either
produce known-wrong CLI semantics or reintroduce pnpm as outer authority.
Exact next step: M80g should implement deterministic patched-dependency
identity and materialization, then resume `cli-test.test.ts` and
`module-diagnostic.test.ts` before selecting the next ordinary family.
