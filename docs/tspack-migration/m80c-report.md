# M80c — adaptive CI authority expansion

## Outcome

M80c is **Outcome B: meaningful progression**. TSPack now owns the complete
Rollup-only package-build family that fits the current BuildTarget model: 12 of
14 Vitest packages, including ten newly authoritative build responsibilities.
The checkpoint is green locally, has a generated thin GitHub runner, and uses
the released `v0.1.9-m80c.3` distribution. The next adjacent unit-test family
stops at a precise missing primitive: TestTarget-scoped npm dependencies and
local fixture package mappings.

This is a semantic expansion, not a transcription of `pnpm run build`. The
workflow contains five native Build effects. Qualified target prerequisites
expand those leaf requests into all twelve builds; Flow does not duplicate the
package dependency graph.

## Baseline and checkpoint definition

The repositories were clean at the start. TSPack was `main` at `428a8f0`
(`Allow checks before generated outputs exist`); Vitest was `main` at
`9a301f9fe`. The qualified distribution was `v0.1.9-m80b1.3`, the host runtime
was Node `v26.2.0`, and the active native workflow was `VitestCoreCI`. Its local
replay remained green: clean sync realized 1,116 entries; expect emitted two
artifacts, snapshot emitted eight, basic-threads reported 8 passed and 1
skipped, and snapshot-threads reported 16 passed.

The selected checkpoint was:

| Field | Definition |
| --- | --- |
| Responsibility | Complete Rollup-only package build family, excluding the browser and UI client pipelines |
| Upstream oracle | `pnpm@11.24.0 install --frozen-lockfile --filter '!docs'` followed by the repository build |
| TSPack owner | Package BuildTargets, qualified `dependsOn`, and `VitestPackageBuildCI` |
| Acceptance | Clean realization, successful native workflow twice, complete artifact-set comparison, current export, released setup path, and a clean GitHub run |
| Removable legacy CI | None yet; upstream `ci.yml:test` also owns tests, coverage, runtime qualification, examples, and report aggregation |

This stride was chosen because twelve package builds share one real compiler
contract and complete output semantics. The two omitted builds (`@vitest/browser`
and `@vitest/ui`) add client/Vite pipelines and are not merely more Rollup
rows. After the build checkpoint, a broad threads-suite probe found the next
semantic boundary, so expanding further by adding root dependencies or shell
setup would have weakened authority.

## Remaining CI responsibility inventory

| Responsibility | Current owner | Inputs/outputs and dimensions | Classification | Decision |
| --- | --- | --- | --- | --- |
| Package Rollup builds | `ci.yml` lint/test build setup | TypeScript, Rollup configs; JS/CJS/declarations/chunks | AlreadyRepresentable plus small general fixes | 12/14 now TSPack-owned |
| Browser/UI client builds | root build choreography | Vite/client assets and generated packages | NeedsSmallGeneralTSPackFix or additional target authoring | Retained |
| ESLint and formatting | `ci.yml:lint` | source/config diagnostics | NeedsNewPrimitive/Check design | Retained |
| TypeScript typecheck | `ci.yml:lint` | package and UI configs; diagnostics | RepresentableWithManifestAuthoring, but broad environment not yet modeled | Retained |
| Unit partitions | `ci.yml:test` | semantic projects, fixture packages, reports, Node matrix | NeedsNewPrimitive (target dependency environment) | Retained |
| E2E/examples/UI tests | `ci.yml:test` and merge job | nested program-under-test fixtures and blob reports | NeedsNewPrimitive/Intentional nested Vitest | Retained |
| Coverage | `ci.yml:test` | test mode, coverage artifacts, merge/upload | NeedsNewPrimitive plus ProviderOnly upload | Retained |
| Node 20/22/24 qualification | `ci.yml:test` | runtime dimension | NeedsNewPrimitive/provider runtime bootstrap | Retained |
| Windows/Linux browser tests | browser jobs | browser environment, image/Xvfb/provisioning, shards | NeedsNewPrimitive plus ProviderBootstrap | Retained |
| Vite 7 compatibility | `ci.yml:test-vite7` | compatibility rewrite and install | InteropRequirement | Retained |
| Report aggregation | `ci.yml:merge-reports` | downloaded blob reports | ProviderOnly plus future artifact aggregation | Retained |
| Knip | `knip.yml` | dependency/source diagnostics | RepresentableWithManifestAuthoring/Check | Retained |
| Package preview publication | `cr.yml` | package build and external publication | ReleaseOnly | Retained |
| Prepare/publish | publish workflows | secrets, registry and release mutation | ReleaseOnly | Retained and not exercised |
| Semgrep/Zizmor | dedicated workflows | provider security scanners | ProviderOnly | Retained |
| Issue automation and ecosystem triggers | dedicated workflows | GitHub events, permissions and comments | ProviderOnly | Retained |

No legacy job was deleted. The monolithic upstream build invocations also
prepare responsibilities that are not yet replaced, so there is no complete
job-level deletion proof. Keeping them preserves coverage rather than leaving
dead duplicate CI indefinitely.

## Checkpoint log

### Checkpoint 1 — native package-build family

- Chosen scope: all twelve packages whose authoritative compiler path is the
  existing Rollup adapter.
- Why this stride: ten adjacent packages lowered mechanically after expect and
  snapshot; the two client builds did not.
- Migrated: spy, pretty-format, utils, expect, mocker, snapshot,
  browser-preview, browser-playwright, coverage-v8, vitest,
  coverage-istanbul, and web-worker.
- Failures uncovered: compiler-only dependencies were not build-visible; npm
  aliases lost/pruned their install identity; comment examples were scanned as
  imports; stale hashed chunks survived rebuilds; independent Flow branches
  raced undeclared package build prerequisites.
- General TSPack changes: separate build-visible dependencies, alias-preserving
  resolution and materialization, comment-aware import scanning, declared
  Rollup output cleanup, and regressions for each behavior.
- Legacy removal: none, because no upstream job owned only these builds.
- Decision: continue through a released provider proof.

### Checkpoint 2 — consumable provider proof and stop-boundary probe

- Chosen scope: export the successful package Flow using a real prerelease,
  qualify it on a clean Ubuntu GitHub runner, and probe the adjacent threads
  unit partition.
- Why this stride: remote execution is mandatory once CI authority materially
  changes; the unit probe tests whether the same abstractions continue to
  lower cleanly.
- Migrated: provider authority for the build workflow; no additional test
  target was claimed.
- Probe result: 2,045 tests discovered, 1,949 passed, 5 failed, 66 pending; 20
  suites failed collection because their target-only packages or local fixture
  mappings were absent.
- TSPack change: none for the new primitive; designing it inside this
  checkpoint would be speculative.
- Legacy removal: none.
- Decision: stop under condition B and scope the next milestone around a
  target-scoped test dependency/fixture environment.

## Authored project and workflow intent

Ten new `package` BuildTargets join the existing expect and snapshot targets.
Every target owns its source/config inputs, compiler, package identity,
build-only tools, and complete declared output globs. Vitest's target depends
on expect, mocker, pretty-format, snapshot, spy, and utils; mocker depends on
utils; coverage-v8 depends on browser-playwright. Stable artifact identities
cover all 174 emitted files.

`VitestPackageBuildCI` is a manual CurrentHost Flow with one parallel fan-out
and five leaf Build effects: browser-preview, coverage-v8, vitest,
coverage-istanbul, and web-worker. The build graph supplies the seven
transitive prerequisite targets. The workflow uses five typed Build results,
one join, and the standard succeeded/failed/cancelled/timed-out terminals. It
does not use Process, ShellScript, provider expressions, nested fan-out,
regions beyond CurrentHost, artifact transfer, or log parsing.

The generated GitHub file contains only checkout, Node 24 setup, the pinned
setup action, a clean-state assertion, `tspack sync --clean`, `tspack check`,
and one `tspack workflow run` invocation. There are zero pnpm lifecycle calls,
duplicated package paths, duplicated artifact globs, or manual dependency
ordering steps in provider YAML.

## Proof

The pinned upstream oracle used pnpm only as a comparison authority. Its broad
build completed successfully. The native workflow completed successfully from
a clean 1,190-entry TSPack materialization, and a second execution produced the
same target/file identities and terminal state. Timing varied, as expected.

Complete comparison covered all 174 files. Nine package outputs were
byte-identical. Pretty-format differed only in Rollup-local identifiers for the
two React aliases. Utils used the valid newly-resolved
`@jridgewell/sourcemap-codec@1.6.0` implementation while pnpm's frozen lock
retained `1.5.5`. Vitest therefore had the same 78-file shape with 32 renamed
hashed chunks and 14 changed stable entries. These differences are fully
attributed dependency/identifier differences, not missing or stale artifacts.
Browser preview, browser Playwright, and web-worker became byte-identical after
their dependency authority was corrected.

Clean checks retain six typed warnings for deliberately non-literal dynamic
imports plus existing lock-version and lifecycle-script findings. They do not
produce errors. Cache was not used for correctness. Local clean materialization
grew from 1,116 to 1,190 entries because the complete build tool/dependency
closure is now explicit.

Remote evidence for the final Vitest checkpoint is recorded in
`artifacts/tspack-migration/m80c-results.json`. TSPack release run `33274688052`
passed all five platform builds, Linux browser qualification, the embedded
no-dist smoke, and publication. The Linux amd64 archive SHA-256 is
`c697f12d3ff01bc74c9edae1326d9f326e1d5b71fc4eca6fd16182cd8dd6a6e1`;
the Windows archive was published as
`3e115dac93a8352981ade3a57119450834922eb5f21074bd711ac9e97814f440`.
The final Vitest run is `PENDING_REMOTE` until checkpoint dispatch completes.

The first remote attempt, run `33274372976` at commit `fdb49b9e8`, is retained
as failure evidence. It passed clean setup, 1,190-entry sync, and check, then
failed mocker after successfully building utils: Linux resolved the materialized
workspace package copy, which did not yet contain the live prerequisite output.
TSPack now projects declared successful workspace artifacts into that copy;
the general regression and full Go suite pass in `v0.1.9-m80c.3`.

## Product pressure-test results

TSPack bugs fixed generally:

1. Tool-kind target dependencies were not build-visible.
2. Direct alias references were lost and alias root paths were pruned.
3. The import scanner matched import-shaped comments.
4. Declared Rollup artifact sets were not cleaned before rebuild.
5. Materialized workspace copies did not observe prerequisite build output on
   a clean Linux runner.

No new TSPack abstraction was added. Each repair strengthens an existing
BuildTarget, resolver, materializer, scanner, or artifact contract and is
covered at its owning layer. The workflow API itself was sufficient.

The primary authoring friction was dependency archaeology across Rollup config,
source imports, package metadata, and pnpm's frozen resolution. Target discovery
remains useful and deterministic at 14 total targets (12 build, 2 test).
Workflow list/inspect remains legible with two workflows. The per-package
manifest repetition is still reviewable and makes target identity explicit;
two client-package exceptions are evidence against prematurely adding a broad
generator/helper.

The friction ledger adds F-028 through F-035. Summary: zero P0, five resolved
P1 TSPack/build issues, one open P1 missing primitive, two P2 migration/interop
issues, and zero new P3 issues.

## Final authority map and metrics

| Authority | Responsibilities |
| --- | --- |
| TSPack authoritative | 12 Rollup package builds; expect/snapshot bounded test slices from M80b1 |
| Shared/transition | Root package build setup remains upstream because it also builds browser/UI clients and prepares broad tests |
| Legacy GitHub authoritative | lint, typecheck, broad unit/e2e/examples/UI, coverage, Node matrix, browser/platform/Vite compatibility, report merge, Knip |
| Provider-only | checkout/runtime/browser machine provisioning, security scanners, issue automation, ecosystem triggers, report transport |
| Release-only | CR preview, prepare publish, package publishing |

Semantic ownership after M80c:

- Build: 12/14 package build responsibilities (86%).
- Test: 2 bounded semantic targets; broad upstream partitions remain legacy
  authoritative.
- Check: project/manifest/import/dependency check is native; lint and broad
  TypeScript qualification remain upstream.
- Coverage, runtime qualification, platform qualification, and real browser
  execution: 0 migrated in M80c.
- Release: 0 migrated by design.

Choreography removed from the new authority path: twelve package-script calls,
eleven explicit package selections beyond the five semantic leaves, seven
manual prerequisite orderings, and all pnpm/bootstrap orchestration. Escape
hatches: zero Process, zero ShellScript, zero manual compatibility files, and
only the generated provider bootstrap described above.

Coarse local runtime is about 8–10 seconds for the dominant native Vitest leaf
after clean dependencies exist. Clean sync dominates first-run cost because it
realizes 1,190 entries. The upstream broad build covers two additional client
pipelines and is therefore not a like-for-like runtime benchmark; correctness,
not speed, is the checkpoint claim.

## Validation and stop decision

- TSPack: `go test ./cmd/... ./internal/... ./tools/...` passed.
- Focused TSPack graph, resolver, materializer, import scanner, workflow and
  CLI regressions passed.
- Vitest: update converged, clean sync succeeded, check succeeded with known
  warnings, `VitestCoreCI` remained green, and `VitestPackageBuildCI` passed
  twice locally.
- Upstream: frozen pnpm install and broad build passed.
- Export: generated from manifest authority and pinned to
  `v0.1.9-m80c.3`; drift check passed.
- Repository whitespace: `git diff --check` passed.
- Failure evidence: target/package identities survive build failure; test
  probe evidence retained suite counts and the exact missing dependency/fixture
  boundary rather than only exit code 1.

The exact stop reason is condition B: the next meaningful test family requires
a general target-scoped test dependency and local-fixture environment contract
that current TestTarget IR cannot express. The exact recommended next step is
M80d: design that minimal TestTarget environment primitive, materialize it
without promoting test packages to published runtime dependencies, add
deterministic discovery/lock identity, and rerun the threads partition before
expanding into coverage, runtime, or browser dimensions.

## Required final-report index

The numbered request is covered as follows: 1–3 baseline; 4–6 inventory; 7–9
checkpoint log; 10–18 authority map; 19–28 authored intent; 29–37 product
pressure-test results; 38–40 legacy retention; 41–54 proof; 55–60 ergonomics
and friction; 61–65 final map/export/release; 66–68 validation; and 69–72 stop
decision, outcome, reason, and recommendation.
