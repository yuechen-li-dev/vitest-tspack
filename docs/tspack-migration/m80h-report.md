# M80h — adaptive unit expansion and the peer-context boundary

## Outcome

M80h is **Outcome B: meaningful progression**. Three adjacent Vitest unit
families became native TSPack authority: 175 newly assigned files produced
2,075 passed, 0 failed, and 67 skipped results, with exact upstream parity.
Together with the prior 40-file slice, TSPack now owns all 210 runtime test
files under `test/unit`. The clean Windows proof materialized 1,613 entries
without pnpm installation and all seven authoritative workflows passed.

The next adjacent responsibility is precise rather than speculative. The two
remaining package builds are Vite applications. TSPack can now invoke Vite as a
general configured bundler and enumerate regular-file static assets, but its
clean dependency projection gives Vite multiple physical module instances for
the same peer-context package. The UI build therefore transforms 628 modules
where upstream pnpm transforms 411 and does not produce the same JavaScript.
No alias, `dedupe`, package-specific field, or hidden pnpm step was retained.

## 1–8. Baseline, inventory, and checkpoints

| Evidence | Result |
| --- | --- |
| Baseline TSPack | `7ae098728dfc69a43c222a50a3b4b994d0a8af51`; `v0.1.13-m80g.1`; `main` clean |
| Baseline Vitest | `983dcbf3c419668ca2cf982ae0a769292166b6ec`; `main` clean |
| Host | Windows amd64; Node `v26.2.0` |
| Initial targets | 12 BuildTargets; 11 TestTargets |
| Initial workflows | Core, package build, fixture, built fixture, node unit, CLI unit |
| Initial authority | TSPack: 12/14 package builds and six bounded test families; legacy: broad unit, coverage, runtime/platform, browser/UI/e2e, docs/release |
| Qualified executable | Embedded-bridges build from the baseline TSPack revision; provider release `v0.1.13-m80g.1` |
| Start-green proof | clean sync 1,597 entries; Core 24/0/1; 12 builds; fixture 87/0/0; built fixture 258/0/1; node 109/0/3; CLI 35/0/0 |

Four self-checkpoints were used:

1. **Ordinary built-core runtime.** The largest obviously compositional group
   was 78 ordinary runtime files. Existing TestTarget requirements, two target
   prerequisites, and two BuiltArtifactFixtures were expected to suffice. The
   upstream oracle and native target both returned 1,345/0/31.
2. **Remaining runtime.** The remaining 92 `.ts`, `.js`, and `.mjs` runtime
   files shared the same semantic model but needed explicit environment and
   helper packages plus mocker/utils built fixtures. Both paths returned
   718/0/36.
3. **Typecheck and in-source tests.** Two in-source files and three declaration
   tests formed one type-aware target. Both paths returned 12/0/0.
4. **Remaining package builds.** Browser and UI were tested as Vite builds.
   General Vite execution and static-file artifact enumeration worked, but UI
   module-instance fidelity failed at 628 versus 411 modules. This checkpoint
   stopped without claiming build authority and defines M80i.

## 9–20. Responsibility inventory and actual stride

| Family | Current owner | Oracle / requirements | M80h disposition |
| --- | --- | --- | --- |
| CLI/module diagnostics | TSPack | Vitest threads, built package fixtures | Already complete; no new files |
| Package builds | Shared | Rollup or Vite, declarations/static assets | 12/14 remain authoritative; browser/UI blocked by peer-context identity |
| Unit runtime | TSPack for selected files; legacy broad lane retained | Vitest threads, Node, jsdom/happy-dom/edge runtime, built fixtures | All 210 runtime files now explicitly covered |
| Unit type/in-source | TSPack plus retained broad legacy lane | Vitest typecheck, TypeScript/Vue TypeScript | Five files migrated |
| Coverage | Legacy | instrumentation, reports, threshold/upload | Untouched; needs evidence before a coverage model |
| Runtime qualification | Legacy/provider | Node 24/26 selection | Untouched; no runtime-matrix semantic added |
| Platform qualification | Legacy/provider | Linux/Windows/macOS behavior | Windows local and Ubuntu remote for this slice only |
| Browser/UI tests | Legacy | browser provisioning, browser environment, artifacts | Untouched; build investigation only |
| E2E/integration/examples | Legacy | nested projects and program-under-test tools | Untouched |
| Docs/release/publish/meta | Legacy or release-only | provider/release credentials and aggregation | Untouched; publishing not authorized |

No additional CLI responsibility, coverage, runtime-version intent, platform
matrix, browser test semantics, e2e, example, or docs responsibility migrated.
The substantial stride was the complete remaining `test/unit` runtime surface
plus the bounded type/in-source family. Broad legacy jobs were retained because
they still own coverage and qualification dimensions.

## 21–38. Native model, fixtures, and general TSPack work

M80h adds no BuildTarget and adds three TestTargets:
`ordinary-core-built-threads`, `remaining-runtime-built-threads`, and
`unit-typecheck-in-source-threads`. `VitestUnitExpansionCI` sequences them
because all three real Vitest processes bind the configured API port 3023.
Inspection reports 12 BuildTargets, 14 TestTargets, one current-host region,
three Test effects, and no duplicated
build-before-test Flow choreography.

The targets reuse Requirement Tape, TestTarget, qualified target prerequisites,
PackageFixture, BuiltArtifactFixture, named artifact sets, typed Vitest JSON
ingestion, Flow fan-out, and current-host platform semantics. They use package
fixtures and four built-fixture bindings across expect, utils, and mocker.
They do not need SourceFixture, directory artifacts, multi-artifact composition
within one fixture binding, services, coverage semantics, runtime-matrix
semantics, or browser-test semantics. No newly migrated target consumes the
patched `cac` realization; prior patched authority and provenance remain green.

Two bugs exposed by investigation were fixed generally:

- exact patch selection formerly failed if another version with the same source
  and name appeared earlier in the lock; it now selects the declared exact
  version and reports a mismatch only when that version is absent;
- import discovery treated `import`-shaped text inside template literals as a
  dependency; template literal raw text is now blanked while preserving lines.

The build checkpoint added two small general capabilities: `vite` as a
configured-bundler compiler alongside Rollup, and `staticAsset` as a regular-file
artifact kind/role. Vite remains project-managed, validates its config and entry,
cleans bounded declared files, hashes every matched output, and projects declared
workspace artifacts. These primitives are general because neither contains a
Vitest package name, config special case, or UI-specific path. They are retained
with direct tests, but no new package-build authority is claimed until artifact
fidelity is achieved.

## 39–51. Clean proof, fidelity, and controlled failures

The authoritative workflow has 0 Process effects, 0 ShellScript effects, 0 pnpm
lifecycle invocations, 0 pretest builds, and 0 incidental `dist` copies. The
three Flow effects execute sequentially because the harness config owns one
fixed API port; target prerequisites remain in the target graph. Provider YAML
contains checkout, Node setup, released TSPack
setup, clean-state verification, sync/check, and one workflow invocation only.

A repository with pnpm-created `node_modules` and `.tspack` quarantined outside
the checkout completed `tspack sync --clean`, materializing 1,613 entries. The
final TSPack-only replay again materialized 1,613 and returned:

- Core 24/0/1;
- 12/12 authored package builds;
- fixture package 87/0/0;
- built fixture 258/0/1;
- Node unit 109/0/3;
- CLI/module 35/0/0;
- unit expansion 1,345/0/31, 718/0/36, and 12/0/0.

Upstream `pnpm run typecheck` passed and the broad upstream build completed all
14 packages. Each new upstream test oracle exactly matched TSPack: total
2,075/0/67, including file identities and expected skips. A forced math
assertion failure retained `math.test.ts::sum`, returned 1,344/1/31, and emitted
`TSPACK_TEST_ASSERTION_FAILED`. A forced type mismatch returned 11/1/0 with its
source identity and TypeScript diagnostic. Both mutations were restored.

Target/workflow JSON inspection is deterministic. Regular-file build artifacts
remain content hashed. The Vite experiment achieved exact CSS fidelity, but UI
JavaScript is intentionally not called equivalent: upstream transformed 411
modules while clean TSPack transformed 628 because equal peer-context packages
were materialized at several nested physical paths. UI byte sizes were also
nondeterministic between valid upstream builds, so the stable module-instance
boundary is stronger evidence than one byte comparison.

## 52–75. Qualification, authority, UX, and validation

The first remote run (`33295618815`) proved clean realization and project check,
then exposed hidden local-state assumptions: pretty-format and spy outputs were
not explicit built fixtures, and concurrent Vitest processes contended for API
port 3023. The repaired targets declare the existing pretty-format and spy
BuildTargets and fixtures; the Flow sequences the three tests. The successful remote proof is
recorded in the results artifact and final qualification commit.
It runs `ubuntu-latest`, Node 24, and qualified TSPack `v0.1.13-m80g.1`; the
TSPack changes discovered during the non-authoritative build checkpoint are not
required by the three new TestTargets. Windows evidence is the clean local
realization plus all seven workflows. No macOS authority is claimed.

Final authority is:

- **TSPack authoritative:** 12/14 package builds; 14 explicit TestTargets;
  all 210 `test/unit` runtime files; the bounded type/in-source files; all prior
  M80 workflows.
- **Legacy authoritative:** coverage; Node-version and broader platform lanes;
  browser/UI tests; e2e/integration/examples; docs; release validation.
- **Shared/transition:** ordinary unit assertions remain in legacy broad jobs
  because those jobs still carry qualification and coverage responsibilities.
- **Provider-only:** checkout, Node installation, runner allocation, and TSPack
  installation.
- **Release-only:** publish and production release operations.

No legacy CI or source choreography was deleted. The new authority removes the
need for any new duplicated test filters, recursive pnpm orchestration, pretest
scripts, or fixture copying. The escape-hatch inventory is empty for the new
workflow. Inspect remains usable at 26 total targets and directly answers target
kind, ownership, prerequisite, fixtures, and workflow effects. The only notable
source dive was recovering environment-package needs from Vitest configs; normal
TypeScript helpers kept the 170-file runtime declaration reviewable.

Coarse local target times before remote serialization were approximately 2.3
seconds for type/in-source, 6.3 seconds for ordinary core, and 7.4 seconds for remaining
runtime. The final Flow trades that overlap for correct ownership of the shared
fixed port. Clean correctness was additionally proved with all 14 workspace
package `dist` trees absent; no cache authority claim or optimization was made.
Friction entries F-042 through F-045
record the exact-patch selection bug, template-literal import false positive,
peer-context materialization gap, and clean runtime-fixture/port discovery.

Validation evidence:

- `go test ./cmd/... ./internal/... ./tools/...`: passed;
- manifest frontend build and bridge typechecks: passed;
- manifest frontend: 258 passed, 2 skipped;
- VS Code compile and tests: 35 passed;
- generated declaration copies and workflow export: no drift;
- upstream typecheck and broad 14-package build: passed;
- all seven local authoritative workflows: passed from TSPack-only state;
- `git diff --check`: passed in both repositories.

## 76–79. Outcome, exact boundary, and M80i

**Outcome B** is satisfied: substantial adjacent authority is green locally and
remotely, prior authority remains intact, and the next gap is one reproducible
general dependency-realization property.

The exact stopping boundary is the browser/UI package-build pair. Their Vite
configs, inputs, and regular-file outputs are representable; peer-sensitive
module-instance identity is not. Clean materialization currently gives a
bundler distinct physical instances of semantically shared Vue peer-context
packages, producing 628 transformed modules versus upstream's 411 and divergent
JavaScript. Continuing with `resolve.dedupe`, aliases, pnpm links, or a Vitest UI
field would be brittle and would hide the project-model defect.

The exact recommended M80i step is to model and preserve peer-context
module-instance identity during clean dependency materialization, then rerun the
browser and UI Vite builds and compare the complete declared artifact sets.
Only after both reach attributed upstream equivalence should package-build
authority move from 12/14 to 14/14.
