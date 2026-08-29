# M80a — Vitest flagship migration report

Date: 2026-08-28 (America/Los_Angeles)

Outcome: **C — Honest stop**

## Executive answer

No—not yet for a serious pnpm monorepo. An LLM can discover and safely run `tspack migrate`, and the draft is structurally valid, but current migration models only the root `package.json`. It cannot ingest Vitest's normal workspace topology, catalogs, workspace dependencies, package targets, or package-scoped test orchestration. Promoting the generated one-package app draft would replace project truth with a TSPack-shaped fiction.

M80a did improve the product materially: migration now says this limitation explicitly and preserves pnpm as compatibility truth; generated next steps are executable; and `tspack test` no longer auto-runs an unconfigured Vitest workspace root. The next blocker is a standalone pnpm workspace migration milestone, not another Vitest manifest tweak.

## 1. Pinned baseline and local divergence

- Flagship revision: `4c563b64a` (`main`, `origin/main`).
- Upstream-equivalent Vitest code revision: parent `e08c45c39` (`perf(expect): lazily format spy matcher failures (#11090)`).
- Intentional local policy divergence in `4c563b64a`: replace the upstream root agent guide with the convergence rule and remove `docs/AGENTS.md`. `git show HEAD` changed only those two policy files.
- Initial worktree: clean. No unrelated local changes.
- TSPack revision used: `a6896f0` on `main`; a current source binary was built as `tspack v0.1.8` with commit/build metadata unavailable.

## 2. Environment and versions

| Tool | Version / state |
|---|---|
| OS | Windows, PowerShell |
| Node | `v26.2.0` |
| Corepack | not installed/on PATH |
| PATH pnpm | `7.27.1` |
| Declared pnpm | `pnpm@11.24.0` |
| TypeScript | `5.9.3` |
| Vite | `8.0.11` |
| Vitest | `5.0.0-rc.3` |
| TSPack | `v0.1.8`, current source at `a6896f0` |

The documented plain `pnpm install --frozen-lockfile` failed in 0.32s because pnpm 7 cannot read the pnpm 11 lockfile. Recovery used `npx --yes pnpm@11.24.0`; repository metadata was not changed.

## 3. Workspace and project topology

- `pnpm-workspace.yaml` declares `docs`, `packages/*`, `examples/*`, `test/*`, six DTS fixture packages, and one conditions fixture: 41 workspace projects including the root.
- 96 package.json files exist in the tree; 86 are named. Many non-workspace package files are intentional test fixtures and must not become workspace packages.
- Workspace member dependency evidence: 85 `workspace:*` references, 116 `catalog:` references, 55 peer declarations, and two npm aliases (`react-18` and `react-is-18`).
- The pnpm config also carries a default catalog, overrides, four patched dependencies, peer rules, build allowlists, minimum-release-age/trust policy, and cyclic workspace edges among browser/vitest/browser-playwright.
- 17 workspace projects declare build scripts; 25 declare test scripts.
- TypeScript topology: 51 `tsconfig*.json` files. Root `tsconfig.base.json`, `tsconfig.build.json`, and `tsconfig.check.json` feed package/test configs; dedicated DTS fixtures include array `extends` and project-reference cases.
- Build topology: root pnpm recursively selects `@vitest/ui` and `packages/**`; individual packages use Rollup, Vite, declaration bundling, and generated client assets. Build ordering follows workspace dependencies.
- Test topology: unit, e2e, coverage, TypeScript/DTS, node-runner, UI/Playwright, browser, workspaces, workspace-browser, examples, fixtures, snapshots, and expected-failure samples. Fixture package.json/config files are not repository-level test targets.
- Docs, examples, release/publish scripts, patches, and GitHub workflows remain foreign evidence. CI and release mechanics were inspected but not migrated.

## 4. Upstream oracle

| Command | Result | Duration / evidence |
|---|---|---|
| `pnpm install --frozen-lockfile` with PATH pnpm 7 | failed: lockfile breaking change | 0.32s |
| `npx --yes pnpm@11.24.0 install --frozen-lockfile` | passed; 41 projects, 1,688 packages materialized; pnpm lock supply-chain policy passed | 28.13s |
| pinned `pnpm typecheck` before build | failed on missing workspace `dist` exports | 16.98s; establishes build prerequisite |
| pinned `pnpm build` | passed; 14 selected package projects built through real Rollup/Vite paths | 15.00s |
| pinned `pnpm typecheck` after build | passed | 11.21s |
| pinned `pnpm test:ci:unit` | core phase passed: 643 files passed, 2 skipped; 6,168 passed, 63 expected failures, 252 skipped, 75 todo; no type errors | core duration 25.60s |
| same `test:ci:unit`, UI phase | 67 Playwright tests passed, one flaky, one failed (`browser-preview` page navigation ended) | whole command 140.25s, exit 1; traces/error contexts under `test/ui/test-results` during the run |

Full `test:ci`, browser suites, lint, and docs/release suites were not run. The substantial core oracle was green; the one UI failure is recorded as baseline/environment evidence and was not weakened or skipped in source.

## 5. Initial migration product experience

Initial command: `tspack migrate` from the untouched Vitest root.

Initial result (exit 0, 0.46s):

- Previewed `manifest.migrated.tsx` and `tspack-migration.md`; wrote nothing.
- Correctly identified root name/version and 31 root dev dependencies as tools.
- Inferred one private app, one placeholder `src/main.ts` target, 31 scripts, and 58 TODOs.
- Reported no `package-lock.json` and no default root source directory.
- Taught `--write`, but did not mention the pnpm workspace, catalogs, other packages, peers, aliases, or package topology.

`tspack migrate --write` then generated exactly the two previewed files in 0.02s. It did not modify package.json, pnpm metadata, source, CI, or lockfiles.

## 6. Generated model audit

| Area | Repository truth | Generated draft | Status |
|---|---|---|---|
| Packages | 41 workspace projects | one root package | P0 missing primitive |
| Root kind | private orchestration workspace | app | incorrect semantic inference |
| Targets | 17 build-script projects and specialized package exports | one fictional `src/main.ts` app target | unusable |
| Workspace deps | 85 refs | four root refs retained as `npm(..., "workspace:*")` | not modeled |
| Catalog deps | 116 refs plus catalog values | root refs retained as `npm(..., "catalog:")` | not resolved |
| Peers | 55 declarations | zero (root has none) | package data omitted |
| Aliases | two normal npm aliases | zero | package data omitted |
| Registry/source | registry versions, workspace sources, catalogs, patches | raw root strings only | incomplete |
| Compiler | 51 configs | strict generic policy, no compiler targets | incomplete |
| Build | recursive dependency-aware package builds | placeholder app target | incorrect |
| Test | package-scoped heterogeneous suites | no declared test flow | absent |

The draft passes manifest frontend and Go IR structural validation when `TSPACK_MANIFEST_FRONTEND` points to the current built frontend. Structural validity does not make it semantically promotable.

## 7. Migration UX, retry, and idempotence

- A second `migrate --write` preserved both files and failed clearly with `TSPACK_MIGRATE_OUTPUT_EXISTS`; it did not duplicate or rewrite them.
- `--force` was used only after TSPack fixes to regenerate the two mechanical outputs. No intentional draft edits existed to preserve.
- `migrate --check` initially required a source-tree frontend override. With the override it passed both frontend and IR validation.
- Initial generated guidance advised lifecycle commands with `--manifest manifest.migrated.tsx`; the frontend rejected that name with `TSPACK_MANIFEST_NON_ROOT`. This was fixed in TSPack: migration now teaches review, promotion to root `manifest.tsx`, then update/check.
- After the workspace UX fix, the exact flagship command emits `TSPACK_MIGRATE_PNPM_WORKSPACE_UNSUPPORTED`, names `pnpm-workspace.yaml` and `pnpm@11.24.0`, and says the draft covers only root package.json.

## 8. Lifecycle results

### Sync

`tspack sync` exited 1 in 0.38s with `TSPACK_SYNC_LOCKFILE_MISSING: lockfile is required; run tspack update`.

No TSPack lock, store, cache, lifecycle execution, or dependency materialization was produced. Existing `node_modules` is entirely pnpm-owned and is explicitly **not** sync ownership proof.

### Check

`tspack check` exited 1 in 0.35s because authoritative `manifest.tsx` and `ts-lock.toml` do not exist. The primary frontend/missing-lock facts are valid, but secondary nil-graph boundary/type diagnostics are inscrutable and logged as F-004.

`tspack migrate --check` is meaningful only as structural validation of the inert draft; it is not project checking or equivalence to TypeScript typecheck.

### Build

`tspack build` exited 1 in 0.35s at missing authoritative manifest. No native targets, ordering, artifacts, or cache results exist to compare. The upstream build remains the only build oracle and completed successfully in 15s.

### Test and bootstrap trust boundary

Before the M80a fix, default `tspack test` auto-detected Vitest solely from `node_modules/.bin/vitest` and launched it at the repository root. It ignored upstream package boundaries, collected expected-failure fixtures as tests, produced over 1 MB of failures, mutated snapshots, created temporary directories, and was stopped after two minutes. All tracked mutations were restored; generated artifacts were moved to recoverable quarantine at `C:\Users\yuech\AppData\Local\Temp\vitest-tspack-m80a-artifacts-20260828`.

After the fix, the exact real command exits 1 in 0.41s with `TSPACK_TEST_AMBIGUOUS_WORKSPACE_VITEST` and leaves the tree unchanged. This is a successful safety/diagnostic improvement, not a working test port.

Vitest remains legitimate inside tests whose subject is Vitest behavior, fixture projects, browser provider behavior, and compatibility. It must not automatically remain the trusted repository-level outer orchestrator. Native xTest is suitable for future package/workflow orchestration, lifecycle/security probes, and selected infrastructure tests, but rewriting thousands of self-hosting tests is intentionally outside M80a.

## 9. Foreign tools, historical glue, and TSPack-native candidates

Legitimate specialized foreign tools:

- Rollup/Vite for package and client bundling.
- TypeScript for compiler/type conformance.
- Playwright for browser/UI execution.
- ESLint/Knip for lint and unused-code policy.
- VitePress/docs, release, changeset/version, and publish tooling.

Historical glue and TSPack-native candidates:

- recursive package selection and build ordering;
- workspace/catalog dependency choreography;
- outer suite selection, ordering, and environment policy;
- generated compatibility sequencing;
- future CI graph/matrix expression (not migrated in M80a).

## 10. Friction summary

| ID | Severity | Classification | Scope |
|---|---|---|---|
| F-001 pnpm workspace root-only migration | P0 | MissingPrimitive, MigrationUX | primitive blocked; diagnostic fixed |
| F-002 impossible draft lifecycle guidance | P2 | TSPackBug, MigrationUX | fixed |
| F-003 frontend bridge unavailable from installed/source binary | P2 | MigrationUX | deferred |
| F-004 check nil-graph follow-on errors | P3 | TSPackBug | deferred |
| F-005 unsafe root Vitest auto-detection | P1 | TSPackBug, MigrationUX | fixed |
| F-006 no honest update/sync path | P1 | MissingPrimitive | blocked by F-001 |

P0: one. P1: two. P2: two. P3: one. Counts are prioritization aids, not a score. Full entries are in `m80a-friction-ledger.md`.

## 11. TSPack changes and validation

Changes in `yuechen-li-dev/tspack`:

1. Detect pnpm workspace roots during migration and emit/report a root-only limitation.
2. Replace rejected `--manifest manifest.migrated.tsx` lifecycle advice with an explicit review-and-promote sequence; document it.
3. Refuse automatic unconfigured Vitest execution at a pnpm workspace root; retain explicit `--vitest` override.
4. Add focused migrate and testcmd regression coverage.

Flagship acceptance reruns:

- `tspack migrate` now gives the workspace limitation and remains exit 0.
- `tspack migrate --write --check --force` passes frontend and IR validation and regenerates only the two migration outputs.
- `tspack test` now fails safely in 0.41s without file mutations.

TSPack validation results are recorded in the final validation section below.

## 12. LLM workflow telemetry

| Step | Choice and reason | Product guidance/recovery |
|---|---|---|
| Baseline | documented pnpm commands, pinned tool after PATH mismatch | ecosystem diagnostic was enough |
| Migration preview | plain `tspack migrate`, the first help example | clear preview/write UX, incomplete workspace truth |
| Write | `migrate --write` | clear and non-destructive |
| Validate | `migrate --check`, then frontend override | source checkout knowledge required |
| Next check | exact generated `check --manifest` | advice was wrong; source dive required |
| Lifecycle | sync/check/build/test without promoting false draft | sync/check/build blockers clear enough; test behavior unsafe |
| Recovery | stop broad test, restore mutations, inspect backend selection | source dive required; diagnostics alone could not prevent/recover |

Source dives required: two material dives—manifest filename/guidance behavior, and test backend auto-detection. Help/docs/source searches also confirmed migrate's documented monorepo non-goal.

Manual project-intent edits required after migrate: zero. The generated draft/report were not hand-corrected. Expected project intent cannot be expressed without the missing workspace primitive. Evidence docs are authored manually; TSPack implementation fixes are product changes, not Vitest workarounds.

Escape hatches:

- pnpm used for the upstream oracle only (legitimate compatibility evidence).
- Environment override used for the local manifest frontend (temporary bridge).
- TSPack's implicit Vitest delegation was unsafe and fixed; it is not counted as a successful outer test path.
- No Process/ShellScript/legacy pnpm delegation was added to a TSPack manifest.

LLM recovery quality: good for preview/write/idempotence, partial for frontend/check, poor for workspace truth and initial test selection. The new diagnostics improve the latter two cases but do not supply the missing semantics.

## 13. Upstream versus preliminary TSPack lifecycle

| Lifecycle | Upstream way | TSPack preliminary way | Status |
|---|---|---|---|
| Install | pinned `pnpm install --frozen-lockfile` | `tspack sync` | blocked; no TSPack lock/ownership |
| Check | build prerequisite, then `pnpm typecheck` | `tspack check` | blocked; draft structural check only |
| Build | recursive package Rollup/Vite scripts | `tspack build` | blocked; no package targets |
| Test | package-filtered heterogeneous scripts | `tspack test` | safe refusal after fix; no outer flow |
| Lint | ESLint/Knip | future TSPack-owned intent invoking tools | intentionally foreign implementation |
| CI/release | GitHub workflows and pnpm scripts | future Workflow | not migrated |

Basic developer loop status:

- `tspack migrate`: useful and truthful after fixes, but root-only.
- `tspack sync`: blocked.
- `tspack check`: blocked; draft structural validation works.
- `tspack build`: blocked.
- `tspack test`: safely diagnosed, not working.

## 14. Minimal onboarding thought experiment

A new contributor still needs Node, pinned pnpm 11.24.0, pnpm install, upstream build ordering, and package-specific test knowledge. The desired five-command TSPack onboarding is not honest yet.

## 15. Preliminary-port files

- `manifest.migrated.tsx`: inert mechanical root-only draft; deliberately not authoritative.
- `tspack-migration.md`: generated mechanical report with explicit workspace limitation and corrected next steps.
- `docs/tspack-migration/m80a-friction-ledger.md`: durable classified evidence.
- `docs/tspack-migration/m80a-report.md`: this report.
- `artifacts/tspack-migration/m80a-results.json`: machine-readable summary.

No package.json, pnpm config/lock, source behavior, tests, CI, release, or publish mechanics were changed.

## 16. Deferred milestone and exact recommendation

Do **not** begin M80b CI migration yet. First run a standalone TSPack M80a.1 milestone:

1. Parse pnpm workspace package globs without treating nested fixture package.json files as members.
2. Import default catalog values and preserve source identities; model `workspace:*`, peers, aliases, overrides, and patch/allow-build evidence.
3. Generate a split root workspace contract plus package contracts/annotations alongside existing package.json files.
4. Infer package exports/compiler/build/test evidence conservatively, with explicit TODOs for specialized tools.
5. Prove `tspack update` and `tspack sync` from a controlled state independent of pnpm `node_modules`.
6. Re-enter this flagship and reach honest check plus one substantial native build or outer-test slice.

Only after that acceptance path is stable should M80b migrate workflow/CI sequencing.

## 17. Final validation

To be completed with the final command results:

- TSPack broad Go validation: `go test ./cmd/... ./internal/... ./tools/...` passed in 56.93s.
- TSPack focused migrate/testcmd tests: passed before acceptance reruns.
- Vitest generated draft structural validation: passed.
- Vitest upstream build/typecheck/core test oracle: passed as described; UI subphase has one recorded baseline failure.
- `git diff --check`: passed in both repositories; the evidence JSON also parsed successfully.

## Deviations

- Full `pnpm test:ci`, lint, browser, docs, and release suites were not run because the core oracle plus UI phase already provided substantial evidence and M80a does not change Vitest behavior.
- No authoritative TSPack manifest was created because the generated root-only app model is materially false.
- Sync/check/build could not progress semantically; their exact entry failures were recorded.
- The unsafe initial TSPack test was interrupted after two minutes to prevent further fixture mutation; all tracked changes were restored and generated artifacts quarantined.
