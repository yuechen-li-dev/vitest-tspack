# M80a2 — first real Build and Test verticals

## Outcome

M80a2 reaches **Outcome A — Success** for the bounded flagship. TSPack now
understands how `@vitest/expect` is built and how the
`@vitest/test-unit:basic-threads` topology is tested. Neither vertical delegates
to a package-manager lifecycle script.

## Required report

1. **Baseline.** Vitest started clean on `main` at `0788ad833`; TSPack started
   clean on `main` at `a740151`. Node is `v26.2.0`; PATH pnpm is `7.27.1`, while
   the repository declares pnpm `11.24.0`.
2. **M80a1 lifecycle state.** The PATH TSPack binary dated 2026-08-08 reproduced
   an old embedded-frontend failure. A release-equivalent current binary with
   embedded bridges restored the M80a1 result: check/update/sync work, with only
   the recorded conflict and lifecycle warnings.
3. **Selected Build package.** `@vitest/expect` in `packages/expect`.
4. **Why selected.** It has 12 TypeScript source modules, a real dual-output
   package build, meaningful public artifacts, two workspace dependencies, six
   runtime dependencies, and no release-only machinery.
5. **Upstream Build oracle.** `npx --yes pnpm@11.24.0 --filter
   @vitest/expect run build` passed in 3,875 ms after the declared pnpm restored
   the oracle materialization.
6. **Build contract audit.** `src/index.ts` is transformed to Node-20 ESM through
   Rollup/Oxc; isolated declarations are generated and bundled through
   `rollup-plugin-dts`; package dependencies and all Vitest imports are external.
7. **Zero-target behavior before.** `tspack build` exited 0 with no output.
8. **Zero-target fix.** `TSPACK_BUILD_NO_TARGETS` now exits 1 and reports every
   selected package plus its zero-target count and an authoring/selection fix.
9. **Build target authoring.** One `package` target was added to the existing
   `@vitest/expect` package contract: explicit compiler, config, inputs, entry,
   JS artifact, declaration artifact, and dependency refs.
10. **External build tools.** TSPack invokes the project-managed Rollup binary
    directly with the declared config. It never invokes `pnpm run build`.
11. **Build dependency ordering.** The target declares all six package
    dependency refs, including `@vitest/spy` and `@vitest/utils`. Rollup
    externalizes them, so no dependency artifact target is required before this
    target; the native workspace graph remains the source of dependency truth.
12. **Artifact contract.** `@vitest/expect:package:javaScript` owns
    `dist/index.js`; `@vitest/expect:package:typeDeclarations` owns
    `dist/index.d.ts`. TSPack verifies existence and records SHA-256 hashes.
13. **TSPack Build command.** `tspack build --package @vitest/expect package`.
14. **Build result.** Passed in 1,664 ms in the controlled clean proof.
15. **Artifact fidelity.** Both builds produced exactly two expected entry
    artifacts with matching package export shape. JS was 72,716 bytes with hash
    `0ea093fde666e47ee71056ce39f9b6c4acd8c6e6c81e8befa1c3b9415029633a`;
    DTS was 31,811 bytes with hash
    `5019ec6f96dd6b601f8b3d0dbe0c393fbf94c438a05b99ffbc54e018c430ad64`.
    Byte identity is valid here because neither output contains nondeterministic
    metadata.
16. **Clean-build proof.** The old `packages/expect/dist` was moved to
    `C:/Users/yuech/AppData/Local/Temp/vitest-tspack-m80a2-expect-dist-246f22996f1c4730b924d17bf5eec93b`.
    TSPack recreated both artifacts from an absent output directory.
17. **Build friction.** Resolved: missing external bundler adapter and silent
    zero-target success. Still open: multi-entry artifact enumeration.
18. **Second-package generalization audit.** `@vitest/snapshot` uses the same
    Rollup/Oxc/DTS model and ordinary config parameters, but has three JS/DTS
    entry pairs. The compiler model generalizes; first-class multi-output
    artifact enumeration is the next bounded Build primitive.
19. **Duplicate DTS fixture analysis.** The three roots are intentional isolated
    type fixtures with the same package.json publication name and different
    compiler conditions. This was not a workspace-discovery bug.
20. **Final project identity law.** `Package.name` is the unique internal
    workspace/project identity. Optional `Package.publicationName` records npm
    publication identity and may repeat across isolated fixtures. Root-relative
    location remains separate. All three fixtures now retain both facts.
21. **Installed frontend discovery problem.** The PATH binary carried a stale
    embedded frontend and failed the root-package manifest-path law, producing
    secondary nil-graph diagnostics.
22. **Installed frontend fix/status.** Current TSPack release builds embed the
    frontend and xTest bridges. The isolated `tspack-m80a2.exe` was built with
    that release path and ran from the Vitest checkout without source-location
    variables. Existing bridge-resolution regressions plus the real run prove
    installed-user behavior; the old PATH binary itself was not overwritten.
23. **Selected Test topology.** `@vitest/test-unit:basic-threads`.
24. **Why selected.** `test/basic.test.ts` is a real self-hosting Vitest unit
    slice covering assertions, environment defaults, suites, skip semantics,
    timeout behavior, callback compatibility, and escaping under the real
    `threads` project.
25. **Upstream Test oracle.** `npx --yes pnpm@11.24.0 --filter
    @vitest/test-unit exec vitest run test/basic.test.ts --project threads
    --reporter=json --outputFile=<temp>` passed: 8 passed, 0 failed, 1 skipped.
26. **Bootstrap/self-test analysis.** Vitest is legitimately the program under
    test. TSPack is the outer selector/result owner; Vitest is the bounded runner.
27. **Package-scoped Test semantics.** A test belongs to a package only when a
    declared `TestTarget` owned by that package selects it. Directory containment
    alone is not ownership.
28. **TestTarget decision.** A narrow first-class target was added with owner,
    name, harness, config, sources, and optional harness project.
29. **Test target authoring.** One `basic-threads` target declares Vitest,
    `vite.config.ts`, `test/basic.test.ts`, and project `threads`.
30. **TSPack Test command.** `tspack test --package @vitest/test-unit --target
    basic-threads`.
31. **Test result/count/evidence.** Passed with 8 passed, 0 failed, 1 skipped;
    the final Vitest JSON duration was 247.7 ms and wall time was about 1.56 seconds.
    TSPack prints all nine suite-qualified assertion identities.
32. **Upstream-vs-TSPack fidelity.** Source, config, project, environment, and
    8/0/1 result match the oracle exactly.
33. **Remaining legitimate Vitest self-use.** The declared adapter executes the
    workspace Vitest binary because Vitest behavior is the test subject.
34. **xTest usage/status.** No xTest was added; it would not add independent
    confidence to this self-hosting slice.
35. **Check version-conflict status.** Eight multi-version warnings are real
    compatible transitive resolutions, not migration artifacts. They remain
    visible and do not fail check.
36. **Lifecycle policy status.** Twenty-one maintainer publish/prepare scripts
    are irrelevant to consumer correctness. `bufferutil` and `utf-8-validate`
    install scripts provide optional native websocket acceleration and are not
    required by these verticals. All execution remains blocked; nothing was
    globally enabled or silenced.
37. **First developer loop.** `sync`, `check`, selected build, and selected test
    all work. A target-authoring lock refresh is required after manifest change.
38. **Package selection UX.** Both commands accept explicit, stable package
    identities through `--package`; the no-target diagnostic echoes selection.
39. **Target discovery UX.** Target names are explicit manifest facts. The new
    error makes absence discoverable, but a normal list/inspect projection for
    build and test targets remains deferred UX.
40. **No-target diagnostic UX.** Build now refuses zero work. Explicit Test
    selection without a declared/matching target returns `TSPACK_TEST_NO_TARGETS`.
41. **TSPack bugs fixed.** Silent build success, missing Rollup realization,
    missing package-scoped test ownership, absent Vitest structured ingestion,
    and conflated fixture publication identity.
42. **TSPack regressions added.** Application zero-target selection and frontend
    project/publication/TestTarget composition are covered; broad existing
    frontend, manifest, project, testcmd, and CLI suites exercise the new paths.
43. **Large deferred Build blockers.** Multi-entry/multi-output artifact sets and
    cross-package prerequisite build targets should be one future milestone;
    neither was required for the selected externalized single-entry build.
44. **Large deferred Test blockers.** Root-wide target composition, browser
    service topology, and multi-package ownership are deferred.
45. **Friction ledger changes.** F-004/F-007/F-009 are resolved for the flagship;
    F-011 through F-014 record M80a2-specific findings.
46. **Manual authoring amount.** The two verticals add 40 semantic manifest lines
    (26 build, 14 test). Classification: normal semantic authoring 40;
    migration inference opportunity 0; missing primitive bridge 0 after TSPack
    fixes; temporary lifecycle bridge 0. Three additional one-line publication
    facts resolve the fixture identity bridge.
47. **Source dives required.** Six focused dives: Build application selection,
    compiler adapters, manifest target IR, test backend discovery, structured
    test results, and bridge distribution.
48. **Escape-hatch ledger.** Selected build: direct Rollup (`-c` declared config),
    legitimate bounded compiler. Selected test: direct Vitest (`run`, one file,
    one project, JSON reporter), legitimate program under test. No `Process`,
    `ShellScript`, package script, pnpm, npm, or tsx invocation exists in either
    manifest vertical. `npx pnpm@11.24.0` was used only for upstream oracle setup.
49. **Upstream/TSPack comparison.** See the table below.
50. **CI stages now representable.** The `@vitest/expect` package build slice and
    the basic unit/threads test slice can replace equivalent substeps eventually;
    no workflow files were changed.
51. **TSPack validation.** `go test ./cmd/... ./internal/... ./tools/...` passed;
    manifest frontend passed 254 tests with 2 skipped and built; VS Code compiled
    and passed 35 tests; compat/type-support drift regressions passed.
52. **Vitest validation.** Root typecheck passed; the broad 14-package upstream
    build passed in 11,361 ms; selected upstream and native Build/Test reruns all
    passed. Human Vitest output distinguishes 7 ordinary passes plus 1 expected
    failure; its JSON semantic result and TSPack typed result count that expected
    failure as a passed assertion, yielding 8 passed and 1 skipped.
53. **git diff --check.** Passed in both repositories.
54. **Outcome A/B/C.** **A — Success**, bounded to one build and one test vertical.
55. **Deviations.** PATH pnpm was too old and Corepack was unavailable, so
    `npx pnpm@11.24.0` restored the declared upstream materialization. The
    old PATH TSPack binary was not replaced. Target listing remains deferred.
56. **Recommendation.** Use **M80a3**, not M80b: add multi-output artifact sets,
    explicit cross-package build prerequisites, and target listing/inspect UX;
    then configure `@vitest/snapshot` and one second non-browser test target.

## Comparison

| Operation | Upstream | TSPack | Status |
| --- | --- | --- | --- |
| Install | `pnpm install` | `tspack sync` | Working; both materializations proved separately |
| Check | root `typecheck` plus compatibility policy | `tspack check` | Working with 8 conflict and 23 blocked-lifecycle warnings |
| Selected build | filtered `@vitest/expect` package build | `tspack build --package @vitest/expect package` | Working; identical JS/DTS hashes |
| Selected test | Vitest basic file, threads project | `tspack test --package @vitest/test-unit --target basic-threads` | Working; identical 8/0/1 result |
