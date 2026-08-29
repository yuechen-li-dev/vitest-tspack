# M80a migration friction ledger

M80a1 uses the original taxonomy and adds an explicit milestone status to every
carried-forward entry.

## F-001 — pnpm workspace migration is root-only

Severity: P0

Context:
Vitest is a normal pnpm workspace with 41 workspace projects, 85 `workspace:*` references, 116 `catalog:` references, 55 peer declarations, two npm aliases, overrides, patches, and allowed lifecycle builds.

What TSPack did:
The initial `tspack migrate` read only the root `package.json`, inferred one private app with a fictional `src/main.ts` target, retained `catalog:` and `workspace:*` as npm version strings, and reported 0 runtime, 0 peer, 31 tool dependencies. It did not inspect `pnpm-workspace.yaml` or the 40 other workspace projects.

What Codex expected:
Either workspace-aware migration or an explicit statement that the draft covers only the root and cannot be promoted as workspace truth.

First attempted action:
Ran the plain preview, then `--write`, exactly as help suggested. No manifest was pre-authored.

Diagnostic quality:
Initially Missing. After the M80a TSPack fix: Clear.

Resolution:
TSPack now emits `TSPACK_MIGRATE_PNPM_WORKSPACE_UNSUPPORTED`, records the limitation in the generated report, and tells users to preserve pnpm metadata. Full workspace ingestion is deferred.

Classification: MissingPrimitive and MigrationUX

Scope: Blocked for the primitive; FixedInM80a for truthful diagnostics

M80a1 status: ResolvedM80a1. The bounded importer discovers 41/41 projects,
resolves 85/85 workspace references and 116/116 catalog references, and emits
split package contracts through existing TSPack workspace semantics.

Evidence:
`pnpm-workspace.yaml`, root/package package.json files, `tspack migrate`, and `tspack-migration.md`.

## F-002 — generated lifecycle guidance rejected the draft filename

Severity: P2

Context:
Migration intentionally writes `manifest.migrated.tsx`, while the manifest frontend intentionally accepts only authoritative root `manifest.tsx` for lifecycle commands.

What TSPack did:
The initial report and terminal summary advised `tspack check --manifest manifest.migrated.tsx` (and equivalent update/pack commands). The advised check failed with `TSPACK_MANIFEST_NON_ROOT`.

What Codex expected:
Validate with `tspack migrate --check`, review the inert draft, promote it to `manifest.tsx`, then run lifecycle commands.

First attempted action:
Ran the exact advised check; it failed.

Diagnostic quality:
Misleading.

Resolution:
Generated terminal/report guidance and `docs/migrate.md` now teach the review-and-promote sequence. Regression coverage rejects future suggestions using `--manifest manifest.migrated.tsx`.

Classification: TSPackBug and MigrationUX

Scope: FixedInM80a

M80a1 status: ResolvedM80a1. The generated report still teaches review,
package-contract promotion, root promotion, check, update, and sync.

Evidence:
Initial `tspack check --manifest .\manifest.migrated.tsx` output and TSPack migrate tests.

## F-003 — source-built/installed CLI could not locate the manifest frontend

Severity: P2

Context:
The current Go binary and the installed `tspack v0.1.8` reported no embedded frontend from the Vitest working directory.

What TSPack did:
`tspack migrate --check` failed with `TSPACK_PROJECT_MANIFEST_FRONTEND_FAILED` and searched relative candidates under the Vitest repository or executable ancestors.

What Codex expected:
A normal installed/release CLI should validate manifests without repository-source knowledge.

First attempted action:
Followed the diagnostic and supplied `TSPACK_MANIFEST_FRONTEND` pointing at the current TSPack repository's built frontend.

Diagnostic quality:
Partial. It explained how to build/override, but ordinary users should not need the TSPack source checkout.

Resolution:
Compatibility override used for M80a; packaging/bridge discovery remains deferred.

Classification: MigrationUX

Scope: Deferred

M80a1 status: Deferred. Source-built binaries still require
`TSPACK_MANIFEST_FRONTEND`; the override remained necessary for lifecycle runs.

Evidence:
`tspack migrate --check` frontend candidate list and successful rerun with the override.

## F-004 — check emits secondary nil-graph errors

Severity: P3

Context:
No authoritative `manifest.tsx` or `ts-lock.toml` exists because the root-only draft cannot honestly be promoted.

What TSPack did:
`tspack check` reported the missing/failed frontend and lockfile, plus `TSPACK_BOUNDARY_INTERNAL_ERROR: nil graph` and `TSPACK_TYPE_INTERNAL_ERROR: nil graph`.

What Codex expected:
Stop dependent checks after project loading fails and emphasize the actionable primary diagnostic.

Diagnostic quality:
Partial.

Resolution:
Deferred as a bounded diagnostic cleanup independent of the pnpm workspace primitive.

Classification: TSPackBug

Scope: Deferred

M80a1 status: StillOpen. The secondary errors still appear when frontend loading
fails, but disappear when the real manifest loads; this is diagnostic cleanup,
not a blocker for the native graph.

Evidence:
M80a `tspack check` transcript summary in the report.

## F-005 — test backend auto-detection ran all Vitest fixtures as root tests

Severity: P1

Context:
Vitest intentionally uses package-scoped test orchestration. The root has no Vite/Vitest config; its `test` script filters `test-unit`.

What TSPack did:
The initial `tspack test` treated the presence of `node_modules/.bin/vitest` as repository-level intent, launched unconfigured root Vitest, collected fixtures and expected-failure samples, modified snapshots, created temporary directories, emitted over 1 MB of output, and did not finish within two minutes.

What Codex expected:
No automatic trust inversion. The outer layer must require explicit repository test intent, while Vitest remains legitimate inside self-hosting cases.

First attempted action:
Allowed one bounded run, stopped it after two minutes, restored all tracked changes, and quarantined generated artifacts.

Diagnostic quality:
Initially Missing. After the M80a TSPack fix: Clear.

Resolution:
Auto-detection now refuses a pnpm workspace root with no root Vite/Vitest config and emits `TSPACK_TEST_AMBIGUOUS_WORKSPACE_VITEST`. Explicit `--vitest` remains an escape hatch. The real Vitest acceptance path exits safely in 0.41 seconds without mutations.

Classification: TSPackBug and MigrationUX

Scope: FixedInM80a

M80a1 status: ResolvedM80a1. The real `tspack test` attempt refused safely with
the same diagnostic and made no repository mutations.

Evidence:
Captured transcript in the local temp directory, TSPack `internal/testcmd` regression tests, and the post-fix flagship rerun.

## F-006 — sync cannot begin without a workspace model and TSPack lock

Severity: P1

Context:
The pnpm install created a correct foreign materialization, but M80a forbids treating it as proof of TSPack ownership.

What TSPack did:
`tspack sync` exited with `TSPACK_SYNC_LOCKFILE_MISSING: lockfile is required; run tspack update`.

What Codex expected:
Migration must first produce an honest workspace contract that `update` can resolve, including catalogs and workspace edges.

Diagnostic quality:
Clear in isolation, but `update` is not actionable until F-001 is solved.

Resolution:
No fake sync claim. Deferred with the pnpm workspace migration primitive.

Classification: MissingPrimitive

Scope: Blocked

M80a1 status: ResolvedM80a1. The real manifest enabled `tspack update` to write
a 153-package lock and a pnpm-independent `tspack sync` to materialize 362
entries successfully.

Evidence:
No `ts-lock.toml`; only pnpm-owned `node_modules` exists.

## F-007 — duplicate fixture package identities need project identity

Severity: P2

Context:
Three DTS fixture projects intentionally use the same package.json name,
`@vitest/test-integration-dts-exact-optional-property`.

What TSPack did:
Split workspace package rows require unique names, so a literal import cannot
represent all three project roots.

Resolution:
Migrate preserves the package.json identity in the report and gives each root a
deterministic, visibly draft-only TSPack identity. No dependency points at the
ambiguous identity. The final skeleton retains the mappings for the first loop.

Classification: MissingTSPackPrimitive and TemporaryCompatibilityBridge

M80a1 status: Deferred. A future project identity distinct from publish/package
identity is the clean semantic capability; no pnpm emulation is warranted.

## F-008 — sibling file/link dependencies were rejected

Severity: P1

Context:
Vitest uses normal local fixture dependencies such as
`test/e2e/fixtures/conditions-pkg -> ../conditions-subpackage`.

What TSPack did:
Manifest validation rejected parent segments, and the resolver required a path
to remain beneath the declaring package rather than merely inside the workspace.

Resolution:
Dependency paths may now traverse to siblings while resolution proves the final
path remains inside the workspace. Focused manifest/path/resolver tests cover
the behavior. `tspack update` then captured the real `subpackage` fixture.

Classification: TSPackBug

M80a1 status: ResolvedM80a1.

## M80a2 status update

- **F-004 installed frontend discovery — ResolvedM80a2.** A release-equivalent
  binary with embedded bridges loaded the Vitest workspace from outside the
  TSPack source tree with no environment override. The installed PATH binary was
  stale, which is distribution drift rather than current source behavior.
- **F-007 duplicate fixture identity — ResolvedM80a2.** Unique internal project
  identity is now independent from repeatable `publicationName`; all three DTS
  fixtures preserve their shared package.json name without renaming upstream.
- **F-009 silent no-target Build — ResolvedM80a2.** Build exits nonzero with
  `TSPACK_BUILD_NO_TARGETS`, selected package identity, count, and fix guidance.

## F-011 — mature TypeScript packages need a bounded external bundler adapter

Classification: MissingBuildPrimitive and ExternalToolInterop

M80a2 status: ResolvedM80a2. `compiler: "rollup"` invokes the project-managed
Rollup binary with the declared config, validates declared JS/DTS artifacts, and
records typed identity plus content hash. It cannot invoke package scripts.

## F-012 — package-scoped Test needs explicit ownership

Classification: MissingTestPrimitive

M80a2 status: ResolvedM80a2 for one bounded topology. `TestTarget` owns harness,
config, sources, and harness project. Directory containment is not ownership.

## F-013 — Vitest result ingestion flattened evidence

Classification: TSPackBug and ExternalToolInterop

M80a2 status: ResolvedM80a2. The Vitest adapter requests JSON, maps counts and
duration into typed `TestResult`, and preserves suite-qualified assertion
identity plus failure messages.

## F-014 — multi-entry package artifacts are not enumerable

Classification: MissingBuildPrimitive

M80a2 status: Deferred. `@vitest/snapshot` proves the compiler adapter
generalizes but needs three JS/DTS pairs. Add first-class artifact sets before
configuring that second package; do not flatten it to one primary output.

## F-009 — build with no authored targets is a silent no-op

Severity: P2

Context:
The M80a1 skeleton intentionally does not infer 41 packages' build semantics.

What TSPack did:
`tspack build` exited 0 with no output and no work.

Resolution:
Recorded as `NotYetConfigured`, not as a working build. Adding a clear no-target
diagnostic is a bounded future lifecycle UX milestone; inventing targets in
migrate would be dishonest.

Classification: MigrationUX

M80a1 status: Deferred.

## F-010 — upstream TypeScript included TSPack TSX manifests

Severity: P2

Context:
Vitest's broad `tsconfig.check.json` included new root and package-local TSX
manifests without TSPack JSX/types configuration.

What TSPack did:
This is target-repository compatibility behavior rather than a TSPack compiler
failure. The first upstream typecheck exposed it clearly.

Resolution:
The Vitest check config now excludes the two root manifest files and generated
`.tspack-migration` directories. The upstream typecheck passes again.

Classification: VitestSpecific and TemporaryCompatibilityBridge

M80a1 status: ResolvedM80a1.

## M80a3 status update

- **F-003 installed frontend discovery — ResolvedM80a3 regression proof.** The
  release-tagged binary listed targets and ran both new verticals from the
  Vitest checkout with no frontend override or TSPack source-relative lookup.
- **F-007 duplicate fixture identity — ResolvedM80a3 regression proof.** Target
  discovery projects internal identity, optional publication identity, and
  root separately. The three shared-publication DTS fixtures remain distinct.
- **F-012 package-scoped Test ownership — ResolvedM80a3.** The same generic
  `TestTarget` now selects two files and preserves 16 assertion identities; no
  snapshot-specific test semantics were introduced.
- **F-014 multi-entry package artifacts — ResolvedM80a3.** A target can declare
  a deterministic artifact set with stable member name, kind, role, and path or
  bounded path glob. Snapshot validates all eight JS/DTS outputs and hashes.

## F-015 — build and test targets require source archaeology

Classification: MigrationUX and LLMTooling

M80a3 status: ResolvedM80a3. `tspack inspect targets` is the single discovery
surface for BuildTargets and TestTargets. Human output shows owner, root, name,
tool, artifact/scope summary, and prerequisites. `--json` emits deterministic
typed data without prose. `--kind build|test` filters the same model.

## F-016 — bundled declarations use JavaScript import specifiers

Classification: TSPackBug

M80a3 status: ResolvedM80a3. Rollup's `index.d.ts` legitimately imports a
hashed declaration chunk through a `.js` specifier. Type-surface traversal now
applies TypeScript's `.js`/`.mjs`/`.cjs` to declaration-file resolution rule.

## F-017 — target prerequisites were package-local only

Classification: MissingBuildPrimitive

M80a3 status: ResolvedM80a3. `dependsOn` accepts local target names and explicit
qualified `package:target` identities. Manifest validation rejects unknown,
self, and cyclic edges; application planning executes each prerequisite once
before its downstream target. Package dependency edges are not guessed to be
build edges. Snapshot has no built prerequisite because its workspace imports
are externalized.

## Deferred after M80a3

- Root-wide Build/Test selection and browser/service topologies remain deferred.
- Rollup result caching remains deferred; repeat builds rerun the compiler but
  reproduce a stable artifact set.
- Automatic target-dependency derivation remains deferred until artifact
  consumption makes an edge semantically certain.

## M80b status update

- **F-018 Workflow TestTarget selection — ResolvedM80b.** `Test` effects now
  preserve one declared package plus TestTarget identity through manifest IR,
  Flow planning, validation, and `project.RunTest`. This is generic target
  interop; no Vitest command or file selection is copied into the workflow.
  Classification: TargetInterop and FlowBug.
- **F-019 workflow JSON included raw child output — ResolvedM80b.** Structured
  workflow mode suppresses raw Rollup/Vitest chatter on stdout while retaining
  typed artifacts, diagnostics, counts, assertion evidence, events, trace, and
  terminal snapshot. Twenty JSONL records parse independently on a successful
  flagship run. Classification: WorkflowUX and FlowBug.
- **F-020 human inspect hid target identities — ResolvedM80b.** Human Flow
  inspection now prints qualified Build/Test selection such as
  `@vitest/expect:package` and `@vitest/test-unit:basic-threads`.
  Classification: WorkflowUX.

## F-021 — target tools were absent from authoritative materialization

Severity: P1

Context:
The initial real Workflow ran only after pnpm materialization. A controlled
`tspack sync` replaced root tool shims with the 153-package bounded TSPack
materialization, whose lock did not contain the Rollup or Vitest requirements
implied by the authored BuildTargets/TestTargets.

Evidence:
The first clean run failed both build branches with
`TSPACK_COMPILER_TOOL_MISSING` for `node_modules/.bin/rollup.cmd`; the old
`tspack update` reported `+0 -0`. The follow-up also exposed four narrower
interop defects: historical npm metadata with non-string `scripts`, optional
peers being auto-installed, stale partial workspace artifacts being trusted by
directory existence alone, and Windows Vitest lookup ignoring `.cmd` shims.

Resolution:
Resolved in the target/resolver/materializer path. BuildTarget compiler and
TestTarget harness identities are projected as tool roots; config-imported
plugins remain explicit `Tools(...)` intent. Optional peers are no longer
invented, old registry script metadata is decoded tolerantly, local artifacts
are content-verified and repaired, and Windows uses materialized `.cmd` shims.
A clean update now produces a 332-package lock, clean sync materializes Rollup
and Vitest, and the four-effect Workflow succeeds twice without pnpm.

Classification: ProviderBootstrap and TargetInterop

M80b status: ResolvedFollowup; Outcome A qualification passed.

## M80b1 status update

### F-022 — the generated provider bootstrap referenced an unavailable action and release

Severity: P0

Context:
The M80b runner referenced `setup-tspack@v1`, but no `v1` ref existed, and the
latest released CLI (`v0.1.8`) predated Workflows, Build/Test effects, and the
clean target-tool materialization fixes.

Evidence:
The installed `v0.1.8` reported unknown `Workflows`, `Workflow`, `Build`,
`Test`, and Flow helpers. `git ls-remote` found no `refs/tags/v1` or
`refs/heads/v1`.

Resolution:
TSPack's GitHub export now pins Node 24, the first-party setup action, and the
binary to `v0.1.9-m80b1.3`; prints binary provenance; proves `node_modules` and
`.tspack` are absent; runs lock-only `sync --clean`; checks the project; then
runs the one semantic Workflow command. The prerelease is built by the normal
release matrix, publishes `checksums.txt`, and the setup action verifies the
Linux archive before extraction.

Classification: ProviderBootstrap and InstalledTSPack

M80b1 status: Resolved.

### F-028 — build targets could not declare compiler-only package dependencies

Severity: P1

Context:
The Rollup package family needs plugins and source-imported packages while it
builds, without making those packages runtime dependencies of the published
library. Target `deps` rejected tool-kind declarations and therefore could not
express this ordinary build environment.

Evidence:
The first expanded graph diagnosed target tool dependencies as invalid, while
running Rollup without them produced unresolved imports and missing plugin
failures.

Resolution:
TSPack target nodes now carry build-visible dependencies separately from
runtime dependencies. The npm resolver realizes them with tool edges, target
import validation accepts them, and runtime dependency semantics remain
unchanged. A graph regression proves the separation.

Classification: TSPackBug and BuildTarget

M80c status: Resolved in `v0.1.9-m80c.2`.

### F-029 — direct npm aliases lost identity and were pruned after sync

Severity: P1

Context:
`@vitest/pretty-format` uses both `react-is` and the npm alias `react-is-18`.
The resolver initially dropped the direct dependency reference. After that was
fixed, materialization still pruned the alias because root visibility tracked
only the canonical package name.

Evidence:
`ts-lock.toml` contained the correct `Reference = 'react-is-18'`, clean sync
reported materializing `react-is@18.3.1`, but `node_modules/react-is-18` was
absent and Rollup treated it as external.

Resolution:
Direct requests retain their dependency key as the lock edge reference. Root
materialization planning, marker sanity checks, and pruning now retain the
actual install name. Regression coverage proves a root alias survives the full
materialize-and-prune path.

Classification: TSPackBug and DependencyRealization

M80c status: Resolved in `v0.1.9-m80c.2`.

### F-030 — import discovery treated comments as source imports

Severity: P2

Context:
JSDoc examples and explanatory comments in Vitest contain import-shaped text.
The lightweight scanner matched those strings and reported dependencies such
as `./example.js` and `./ns` that do not exist in the program.

Evidence:
`tspack check` failed in the mocker automocker source and Vitest public API
sources even though neither module was executable code.

Resolution:
The scanner now removes line and block comments with a string-aware state
machine before applying import patterns. A regression covers static, dynamic,
and require-shaped examples in comments.

Classification: TSPackBug and MigrationUX

M80c status: Resolved in `v0.1.9-m80c.2`.

### F-031 — successful Rollup targets could retain stale hashed chunks

Severity: P1

Context:
Rollup changes content-hashed filenames between dependency environments. A
successful target build did not remove outputs from the previous invocation,
so complete artifact enumeration could report both old and new chunks.

Evidence:
Repeated Vitest package builds accumulated chunk names that were absent from a
fresh upstream `premove dist && rollup -c` build.

Resolution:
The Rollup adapter resolves and removes only files matched by the target's
declared artifact contracts before invoking Rollup. It refuses directory
matches and emits a typed cleanup diagnostic on failure. Focused CLI coverage
proves unrelated files are preserved.

Classification: TSPackBug and ArtifactSemantics

M80c status: Resolved in `v0.1.9-m80c.2`.

### F-032 — parallel leaf builds exposed undeclared package ordering

Severity: P2

Context:
The first package-build Flow ran all twelve Build effects independently.
Vitest package builds consume declaration and runtime output from sibling
packages, so parallel execution raced those outputs.

Evidence:
The first clean workflow failed while a sibling prerequisite had not yet
created its declarations. Running the same packages serially hid the issue.

Resolution:
Qualified `dependsOn` edges now encode the package build graph. The Flow has
five genuinely independent leaf effects; Build recursively schedules the
twelve targets in prerequisite order. No ordering was duplicated in Flow.

Classification: MigrationUX and HistoricalGlue

M80c status: Resolved in the Vitest manifests.

### F-033 — broad test lanes need target-scoped dependency environments

Severity: P1

Context:
The next adjacent responsibility is the real threads unit partition. Its tests
use test-only npm packages and local fixture packages that are not dependencies
of the published Vitest library and should not become repository-global
runtime authority.

Evidence:
An upstream threads probe discovered 2,045 tests and executed 1,949
successfully, but 20 suites failed during collection on missing test-only
packages or local fixture package mappings. Current TestTarget authoring has
harness/config/source/project identity but no target-scoped dependency set or
fixture mapping contract.

Resolution:
Not patched in M80c. Encoding these dependencies as root runtime dependencies
or provider shell setup would blur package and test authority. This is the
first genuinely new semantic primitive and the stop boundary for the current
milestone.

Classification: MissingPrimitive

M80c status: Open; recommended scope for M80d.

### F-034 — valid registry resolution can differ from the frozen pnpm oracle

Severity: P2

Context:
TSPack resolves declared semver ranges independently, while the upstream pnpm
oracle retains older valid transitive versions in its frozen lock. That can
change bundled implementation bytes without changing source or public
artifacts.

Evidence:
All twelve native builds produced the complete expected file sets. Nine were
byte-identical; browser preview, browser Playwright, and web-worker became
identical after dependency-authority fixes. The remaining utility source-map
implementation uses `@jridgewell/sourcemap-codec@1.6.0` versus pnpm's locked
`1.5.5`, and this plus Rollup-local symbol naming changes Vitest chunk hashes.

Resolution:
The comparison is recorded completely rather than hidden. Exact direct oracle
versions were pinned where required by the target, but transitive lock import
or lock-policy convergence is a separate interoperability decision. Semantic
file-set and build parity are required for this checkpoint; no source-specific
hack was added.

Classification: InteropRequirement

M80c status: Accepted and isolated; not the authority-expansion stop reason.

### F-035 — clean Linux builds could not consume prerequisite workspace output

Severity: P1

Context:
Workspace store snapshots deliberately exclude generated `dist` trees. A
dependent build resolves its workspace package through the materialized
`node_modules` copy, while its prerequisite writes new artifacts to the live
workspace package. Developer pnpm links masked that split locally.

Evidence:
Vitest run `33274372976` proved clean setup, release installation, 1,190-entry
realization, and project check, then built utils successfully and failed mocker
because `node_modules/@vitest/utils/dist/helpers.js` was absent. The typed
failure retained both target identities and the missing path.

Resolution:
The first repair projected only declared output, which let mocker build. Run
`33274791563` then showed Vitest's intentional `__vitest_source__` export
condition resolving TypeScript under the copied `node_modules` path, outside
the compiler plugin's source boundary. TSPack now links workspace packages to
their live roots on Unix and via Windows junctions; output projection remains a
safe fallback for existing materialized copies. Source/store inputs remain
immutable, path escapes are rejected, and regressions cover both live output
visibility and stale projection cleanup.

Classification: TSPackBug and DependencyRealization

M80c status: Resolved in `v0.1.9-m80c.4`.

### F-027 — pre-build project checks required generated type outputs

Severity: P1

Context:
The generated runner correctly checks the project before executing the Flow.
The two bounded package targets declare generated declaration outputs, so a
clean checkout cannot contain those paths until their Build effects run.

Evidence:
Vitest run `33270177934` installed and checksum-verified
`v0.1.9-m80b1.2`, proved an empty dependency state, and completed clean
lock-only realization of 1,116 entries. `tspack check` then emitted
`TSPACK_TYPE_MISSING_OUTPUT` for the expect and snapshot declaration outputs.

Resolution:
Project-level check, update, and outdated operations now validate declared
type surfaces while allowing generated outputs to be absent. Packaging keeps
the strict behavior because it consumes those outputs. Focused regressions and
the full Go suite cover both branches, and the clean local runner reaches the
same successful four-effect Flow after the pre-build check.

Classification: InstalledTSPack and BuildTarget

M80b1 status: Resolved in `v0.1.9-m80b1.3`.

### F-023 — release qualification browser tests used workstation-sized timeouts

Severity: P2

Context:
The first prerelease run reached the normal Linux release qualification but two
real-browser integration cases exceeded Vitest's default five-second timeout
on the hosted runner. The same cases passed locally in under two seconds.

Evidence:
TSPack release run `33268831925`, Linux amd64 job `99143547862`, timed out at
the two named integration tests before packaging. Four non-Linux matrix lanes
had already packaged successfully; the release job was correctly withheld.

Resolution:
Only the two browser-bearing integration cases received an explicit 15-second
bound. The focused local test passed 4/4, and release run `33268914548` then
passed all five build lanes, the Linux no-dist smoke, checksum generation, and
release publication.

Classification: ProviderBootstrap and CIUX

M80b1 status: Resolved.

### F-024 — local workspace artifacts encoded ignored build output

Severity: P1

Context:
The first clean Vitest runner had no ignored workspace `dist` trees. The M80b
lock had been authored after local builds, so seven workspace hashes included
files that do not exist in a clean checkout. The same run also exposed an npm
tarball whose directory headers used mode `0666`, which is not traversable on
Linux.

Evidence:
Vitest run `33269030681` installed `v0.1.9-m80b1.1`, proved the checkout had no
`node_modules` or `.tspack`, fetched 332 artifacts, then reported seven exact
workspace integrity mismatches and a `pngjs@7.0.0` hydration failure.

Resolution:
Workspace artifacts now exclude generated `dist` trees, local text hashing is
line-ending canonical, and tar extraction derives directory execute bits from
read bits. Update and sync use the same workspace artifact kind, and hydration
now retains the underlying store diagnostic. The Vitest lock changed only the
seven affected workspace identities. Focused regressions and the full Go suite
cover these rules.

Classification: DependencyRealization and FilesystemBehavior

M80b1 status: Resolved in `v0.1.9-m80b1.2`.

### F-025 — the test harness depended on ignored workspace build output

Severity: P1

Context:
After portable workspace realization, the bounded TestTargets selected the
workspace `vitest` package. Its executable imports `dist/cli.js`, which is
created by the broader upstream build and absent from a clean checkout.

Evidence:
A clean local replay reached both TestTargets after the two native package
builds, then failed with `ERR_MODULE_NOT_FOUND` for
`node_modules/vitest/dist/cli.js`.

Resolution:
The test-unit and TypeScript-test package manifests now pin the published
`vitest@5.0.0-rc.3` package as their authoritative harness/dependency. This
keeps the Flow at the same two Build and two Test effects, avoids a hidden
prebuild, and succeeds after lock-only clean sync without pnpm.

Classification: TargetInterop and DependencyRealization

M80b1 status: Resolved.

### F-026 — release browser qualification had two hosted-runner races

Severity: P2

Context:
The release gate's real-browser suite was load-sensitive on Linux. One watch
case could overlap its initial cycle with a queued filesystem cycle, and a Vite
production build occasionally exceeded the prior 15-second hosted bound.

Evidence:
Release run `33269708014` observed three watch callbacks where two were
expected. After serializing the initial cycle, run `33269798902` proved that
fix and independently timed out the production-artifact case at 15 seconds.

Resolution:
The initial watch cycle now participates in the same promise chain as change
cycles, with five focused local repetitions passing. The real-browser build
bound is 30 seconds; no retries or ignored failures were added.

Classification: ProviderBootstrap and CIUX

M80b1 status: Resolved.
