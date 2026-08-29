# M80b — first real TSPack Workflow slice

## Outcome

**Outcome A — Success.** `VitestCoreCI` is a real native Flow workflow and
works locally through the existing two BuildTargets and two TestTargets. Typed
success, failure, timeout, cancellation, concurrency, JSON, and thin GitHub
export are proven. The M80b follow-up now projects compiler and harness tool
requirements into the authoritative lock and materialization, so a clean
`tspack update` plus `tspack sync --clean` run succeeds without pnpm. No
package-script workaround was added.

## Required report

1. **Baseline.** `vitest-tspack` started clean on `main` at `31946138e`; TSPack started clean on `main` at `52c8d8d`. Node was `v26.2.0`; PATH pnpm was `7.27.1`; the repository declares pnpm `11.24.0`.
2. **M80a3 regression status.** Using a release-equivalent binary built from current TSPack with embedded bridges, `inspect targets`, `check`, both builds, and both tests passed. The stale PATH `v0.1.8` binary was rejected as an invalid baseline because it did not know `TestTargets`.
3. **Upstream CI slice selected.** The build/test portion of `.github/workflows/ci.yml`'s `test` job: checkout/setup/install, `pnpm run build`, then `pnpm run test:ci:unit`. M80b narrows that broad job to expect, snapshot, basic-threads, and snapshot-threads.
4. **Upstream CI intent audit.** Expect and snapshot use `premove dist && rollup -c`; the root recursive build selects packages through pnpm filters. Unit CI recursively selects test packages; the chosen files run through Vitest's `threads` project.
5. **Provider mechanics classification.** Checkout, Node/setup-cache, pnpm install, matrix OS/Node, artifact upload, and timeout are provider/bootstrap mechanics. The recursive pnpm filters and package scripts are historical choreography. Rollup and Vitest are legitimate specialized tools. Building the two packages and running the two TestTargets are semantic intent.
6. **Flagship workflow identity.** `VitestCoreCI`.
7. **Final Flow authoring syntax.** `Sequence(Parallel(Branch(..., Build(...)), Branch(..., Build(...))), Parallel(Branch(..., Test(...)), Branch(..., Test(...))))` with a manual trigger.
8. **Build target references.** `@vitest/expect:package` and `@vitest/snapshot:package` via `packages` plus `targets`; no paths, Rollup commands, scripts, or artifact paths occur in Workflow source.
9. **Test target references.** `@vitest/test-unit:basic-threads` and `@vitest/test-unit:snapshot-threads` via `packages` plus `target`; no file list, Vitest argv, or project flag occurs in Workflow source.
10. **Target prerequisite interaction.** Both current BuildTargets have audited empty prerequisites because workspace imports are externalized. Flow may schedule them concurrently. TSPack's existing build application layer still resolves future `dependsOn` graphs; Flow does not duplicate them.
11. **Workflow inspect output.** Schema 4 lowers to two build branches and join, then two test branches and join, with four typed values and explicit success/failure/cancel/timeout transitions. Human inspect now shows every qualified target identity.
12. **Local workflow command.** `tspack workflow run VitestCoreCI --jobs 4`.
13. **Local result.** Succeeded from a clean TSPack-controlled materialization; final repeated JSON runs were 3,214 ms and 3,126 ms.
14. **Build results in workflow.** Expect returned one successful Rollup target and 2 hashed artifacts; snapshot returned one successful Rollup target and 8 hashed artifacts with stable member identities.
15. **Test results in workflow.** Basic returned 8 passed, 0 failed, 1 skipped plus nine assertion records. Snapshot returned 16 passed, 0 failed, 0 skipped plus sixteen assertion records.
16. **Human output.** Coherent workflow/branch start and completion lines, artifact identities/paths, concise test totals, and `Workflow VitestCoreCI succeeded`. Compiler warnings remain visible in human mode.
17. **JSON output.** After the M80b fix, all 20 records parse independently as JSONL: 19 typed events and one typed terminal result. Raw Rollup/Vitest strings no longer contaminate stdout. Values retain target/artifact hashes and assertion evidence.
18. **Failure proof.** A temporary controlled basic assertion produced 7/1/1 and a typed failed Test result. The independent snapshot branch still completed 16/0/0 and succeeded; workflow state became `failed`. Source was restored.
19. **Parallelism proof.** Trace steps 2 and 3 start both Build effects before either completes; after the build join, steps 6 and 7 start both Test effects before either completes. Stable node ordering, not physical completion order, determines semantic truth.
20. **Cancellation proof.** A temporary long basic assertion was cancelled with Ctrl+C while the real TestTarget ran. The machine reported `node/004-test cancelled` and `Workflow VitestCoreCI cancelled`; a process-table check found zero matching Node/TSPack orphans. Source was restored.
21. **Timeout proof.** A temporary three-second basic delay plus a one-second Test effect timeout reached typed terminal state `timedOut` with zero active effects. Windows process shutdown made the wall time longer than the semantic bound; this is recorded as friction, not hidden.
22. **Finally usage/status.** Not used; the chosen topology owns no separate resource needing cleanup.
23. **MatchResult usage/status.** Not used; default typed failure propagation is the real CI intent.
24. **Workflow discovery UX.** `tspack workflow list` returns `VitestCoreCI`; inspect works in human and JSON modes without source grep.
25. **Target identity display.** Inspect shows internal/public package identity and target as qualified names. JSON carries `packages`, plural build `targets`, and singular test `target` fields.
26. **Upstream-vs-TSPack CI comparison.** See the table below.
27. **Removed choreography.** The Workflow no longer knows recursive pnpm filters, package scripts, `premove`, Rollup configs, output paths, test files, Vitest `--project`, JSON reporter flags, or cross-target build planning.
28. **Upstream CI preservation.** Existing Actions and package scripts are unchanged; the generated TSPack workflow is additive.
29. **GitHub export command.** `tspack workflow export github VitestCoreCI`.
30. **Generated YAML shape.** One `ubuntu-latest` job with checkout, setup-tspack, and `tspack workflow run VitestCoreCI --ci-provider github`.
31. **Thin-runner proof.** Generated YAML contains no pnpm, Rollup, Vitest, build/test target, artifact path, `needs`, or provider expression that reconstructs lifecycle intent.
32. **Provider bootstrap status.** Checkout and the first-party setup action are present. A realistic provider run needs a public TSPack release containing the M80b target/workflow and materialization fixes; this is release/bootstrap timing, not leaked Flow semantics.
33. **pnpm requirement status.** The Workflow and all four lifecycle effects require no pnpm installation. Rollup, TypeScript, Vite, Vitest, and config plugins are now selected by target intent or explicit tool declarations and materialized by TSPack.
34. **Clean controlled run.** Selected `dist` directories were moved recoverably and confirmed absent. `tspack update` produced a 332-package authoritative lock, `tspack sync --clean` materialized Rollup and Vitest shims, and the Workflow rebuilt 2/8 artifacts and passed both tests. The temporary backups were removed after qualification.
35. **Artifact provenance.** All successful workflow artifacts come directly from `project.RunBuild` and the declared BuildTarget adapter, including stable SHA-256 hashes. No alternate workflow step regenerates them.
36. **Test evidence provenance.** `project.RunTest` receives the declared package and TestTarget, selects its configured sources/project, and parses Vitest JSON. There is no root-wide hidden orchestration.
37. **Repeated-run determinism.** Two final runs used the same schema, node/value identities, 9 semantic steps, 2/8 artifact counts, and 8/0/1 plus 16/0/0 results.
38. **Cache/fingerprint behavior.** Build outputs and hashes are stable, but Rollup reruns on every workflow invocation; no cache claim is made.
39. **Test rerun behavior.** Both final workflow runs executed fresh Vitest processes and produced new durations/evidence; stable target identity does not deduplicate tests.
40. **Performance.** Final workflow wall times were 3,214 and 3,126 ms. The equivalent four direct TSPack commands previously took approximately 5.1 seconds sequentially; Flow gains justified branch overlap. Planning/manifest startup is under one second and workflow overhead is negligible beside lifecycle work.
41. **Friction ledger changes.** F-018 TestTarget interop, F-019 JSON stdout, F-020 inspect identity, and F-021 authoritative tool materialization are resolved. F-021 records the follow-up resolver, materializer, store, and Windows shim findings.
42. **Source dives required.** Twelve focused dives: Workflow docs/types, frontend lowering, manifest WorkflowStep IR, Flow plan/lowering, executor native seams, TestTarget application contract, human renderer, target-tool projection, npm metadata decoding, optional-peer resolution, local store integrity, and Windows shim lookup.
43. **Hand-authoring amount.** Workflow source remains 59 manifest lines with zero provider boilerplate or compatibility commands. The follow-up added only actual tool intent: six root Rollup-config tool selections and three unit-test Vite-config tool selections; compiler/harness identities are inferred from BuildTarget/TestTarget semantics.
44. **New TSPack features added.** No new Flow language construct. In addition to M80b's TestTarget selection, inspect, and JSON fixes, the follow-up added target-level compiler/harness tool projection, optional-peer correctness, tolerant historical npm metadata decoding, local artifact hash verification/repair, and Windows `.cmd` Vitest shim lookup.
45. **Third-target workflow spot-check.** `@vitest/pretty-format` still uses the same Rollup/Oxc/DTS backend and would be authoring-only once declared; it was not added to this bounded Workflow.
46. **Final workflow semantic review.** Source contains `Sequence`, `Parallel`, `Branch`, `Build`, and `Test`; it contains no pnpm filters, shell, GitHub `needs`, runner expressions, paths, or lifecycle argv.
47. **Flagship docs.** README now names the bounded migration, discovery commands, run command, and remaining upstream authority. This report and structured results artifact provide full evidence.
48. **TSPack validation.** `go test ./cmd/... ./internal/... ./tools/...` passed. The manifest frontend passed 255 tests with 2 skipped, build, and manifest API typecheck. VS Code compiled and passed 35 tests. Manifest type drift, setup-action tests, compat/workflow/export coverage, and GitHub export drift check passed.
49. **Vitest validation.** Upstream expect/snapshot builds pass; TSPack expect/snapshot builds pass; upstream tests are 8/0/1 and 16/0/0; TSPack tests match; the flagship Workflow passes twice.
50. **`git diff --check`.** Passed in both repositories after final qualification.
51. **CI readiness decision.** The native Workflow path is credible enough for one more bounded Vitest CI slice. Production authority inversion should wait for a released TSPack build and an actual thin-runner provider smoke test.
52. **Outcome A/B/C.** **A — Success.** The clean local lifecycle, typed Flow semantics, deterministic reruns, discovery, and thin export all pass without lifecycle duplication or pnpm compatibility materialization.
53. **Deviations.** Rollup/Vitest are inferred from declared target semantics, while tools imported directly by the real Rollup/Vite config files are explicitly selected with `Tools(...)`. No fake prerequisite, Finally, MatchResult, full-CI migration, production-CI deletion, release, or publish work was introduced.
54. **Exact recommendation.** Proceed to M80b1 with one additional bounded CI slice and include a GitHub thin-runner smoke test once a TSPack release contains these fixes. Keep M80c authority inversion deferred until that provider-bootstrap proof is green.

## Upstream versus TSPack

| Intent | Upstream mechanism | TSPack |
| --- | --- | --- |
| Build expect | `pnpm -r --filter='./packages/**' run build` → `premove dist && rollup -c` | `Build({ packages: ["@vitest/expect"], targets: ["package"] })` |
| Build snapshot | same recursive command → package `build` script | `Build({ packages: ["@vitest/snapshot"], targets: ["package"] })` |
| Test basic threads | `pnpm run test:ci:unit` → recursive package `test` → Vitest | `Test({ packages: ["@vitest/test-unit"], target: "basic-threads" })` |
| Test snapshot threads | same broad unit job and Vitest mechanism | `Test({ packages: ["@vitest/test-unit"], target: "snapshot-threads" })` |
| Ordering | GitHub job plus pnpm recursive/script choreography | Flow sequence/parallel plus BuildTarget prerequisites |
| Results | provider/process logs and uploaded reports | typed Build/Test results, events, values, trace, terminal snapshot |

## Final Flow source

```tsx
Sequence(
  Parallel(
    Branch("build-expect", Build({ packages: ["@vitest/expect"], targets: ["package"] })),
    Branch("build-snapshot", Build({ packages: ["@vitest/snapshot"], targets: ["package"] })),
  ),
  Parallel(
    Branch("test-basic-threads", Test({ packages: ["@vitest/test-unit"], target: "basic-threads" })),
    Branch("test-snapshot-threads", Test({ packages: ["@vitest/test-unit"], target: "snapshot-threads" })),
  ),
)
```
