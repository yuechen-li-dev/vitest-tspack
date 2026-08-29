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
