# M80a3 — second flagship build/test verticals and target discovery

## Outcome

**Outcome A — Success.** The first Vitest package was not a one-off. A second
package uses the same Rollup BuildTarget, adds one general artifact-set contract,
and reproduces all upstream outputs. A second test topology reuses TestTarget
unchanged and reproduces upstream semantic evidence. Targets are discoverable
without reading manifest source.

## Required report

1. **Baseline.** `vitest-tspack` started clean on `main` at `1bd46d0e2`; TSPack started clean on `main` at `e5baeda`. Node is `v26.2.0`; PATH pnpm is `7.27.1`; the repository declares pnpm `11.24.0`.
2. **M80a2 regression status.** The release-tagged embedded binary passed `check`; expect retained its two hashes; basic-threads retained 8 passed, 0 failed, 1 skipped and nine assertion identities.
3. **Second Build package selected.** `@vitest/snapshot` in `packages/snapshot`.
4. **Selection rationale.** Its real Rollup config has three JS entries, three public DTS entries, one runtime chunk, and one hashed declaration chunk. It adds multi-entry pressure without changing compiler family.
5. **Upstream second-build oracle.** `npx --yes pnpm@11.24.0 --filter @vitest/snapshot run build`; passed in 3,719 ms during oracle capture and 3,649 ms in final qualification; eight files.
6. **Comparison with `@vitest/expect`.** Both use project Rollup, Oxc Node-20 transforms, isolated declarations, `rollup-plugin-dts`, and external package imports. Snapshot parameterizes the same model with three entries and shared chunks; only artifact-set enumeration was new.
7. **Multi-entry artifact requirement.** One target owns the complete related output set, including public entries and deterministic shared chunks; claiming only `dist/index.js`/`index.d.ts` would be incomplete.
8. **Artifact-set model.** `Target.artifacts` contains named `{kind, role, path}` members. A bounded path glob covers content-named chunks. Existing singular runtime/types fields remain compatible.
9. **Artifact roles.** Only semantically useful roles were added: runtime entry/chunk, type declaration/declaration chunk, source map, and metadata.
10. **Artifact identities.** Identity is `package:target:member-name`; glob expansions are sorted and, if plural, use relative-path suffixes. Enumeration order cannot change identity.
11. **Artifact validation.** TSPack validates safe unique member names/paths, materialization, roles, kinds, and SHA-256 content hashes. Missing outputs fail the build.
12. **Clean-build proof.** Upstream `dist` moved to `%TEMP%/vitest-tspack-m80a3-snapshot-oracle-1cd78108e6744f0491643ecb664f7a4b`; TSPack recreated all eight files from no directory in 1,369 ms.
13. **Cross-package prerequisite audit.** Snapshot imports `@vitest/pretty-format` and `@vitest/utils`, but Rollup externalizes workspace packages. Source/package resolution is sufficient; no built workspace artifact is consumed. `scripts/build-utils.js` is a source-level tool input.
14. **Target dependency model.** `dependsOn` accepts local names or explicit qualified `package:target` references. Planning executes each prerequisite once before its consumer.
15. **Derived-vs-explicit decision.** Package dependencies do not imply build dependencies. Only semantically certain artifact consumption may become an explicit target edge; no hidden pnpm ordering heuristic was added.
16. **Cycle validation.** Manifest regressions cover unknown, self, and cross-package cyclic edges; application coverage proves qualified ordering and deduplication.
17. **Incremental prerequisite behavior.** Synthetic graph coverage reuses one prerequisite for the selected downstream plan. Snapshot has no real prerequisite. A repeat snapshot build reran Rollup in 1,280 ms and reproduced the identical hash set; caching remains deferred.
18. **Target discovery UX before.** Users had to inspect split manifest source or trigger an error to learn target names.
19. **Final target discovery UX.** `tspack inspect targets [--kind build|test] [--json]` is the single coherent surface.
20. **Human listing.** Four rows show kind, internal package, root, target, compiler/harness, artifact/scope count, prerequisites, and artifact paths/roles.
21. **JSON listing.** Deterministic JSON exposes typed identities, owner/publication/root, tool, artifacts, prerequisites, sources, and harness project with no prose on stdout.
22. **Unknown-target diagnostics.** `packag` suggests `package`; `snapshot-thread` suggests `snapshot-threads`; suggestions are distance-bounded and capped at three.
23. **Package identity display.** Internal identity is primary; differing publication identity appears explicitly; root is always separate. Discovery regression covers this projection.
24. **Second BuildTarget authoring.** 36 added and 2 removed manifest lines declare compiler config, inputs, primary compatibility fields, eight artifacts, and five runtime dependency refs. No package script is invoked.
25. **TSPack second build result.** Clean build passed in 1,369 ms; final qualification passed in 1,332 ms.
26. **Artifact parity.** All eight upstream/TSPack files are byte-identical: `chunk-utils.js`, `environment.{js,d.ts}`, `index.{js,d.ts}`, hashed declaration chunk, and `manager.{js,d.ts}`.
27. **Systemic TSPack changes required.** Planned generic work: artifact sets, qualified target graph, unified discovery, fuzzy diagnostics. Diagnostic-driven bug fix: one `.js`-specifier DTS resolution rule. Vitest correction: `natural-compare` is runtime, not tool.
28. **Third-package spot check.** `@vitest/pretty-format` uses the same Rollup/Oxc/DTS backend with one entry and two outputs. Yes: it plausibly needs only manifest authoring.
29. **Second Test topology selected.** `@vitest/test-unit:snapshot-threads` selects `snapshot.test.ts` and `snapshot-custom-serializer.test.ts` in the threads project.
30. **Selection rationale.** It differs from basic-threads through multi-file selection and real snapshot/custom-serializer behavior while remaining bounded and non-browser.
31. **Upstream second-test oracle.** Direct Vitest command with both files, `--project threads`, JSON reporter: 2 suites, 16 passed, 0 failed, 0 skipped; 3,706 ms oracle wall time.
32. **Comparison with basic-threads.** Same Vitest harness, config, project, parser, and owner; different two-file scope and snapshot behavior. No new RunTarget, environment, or fixture primitive.
33. **TestTarget reuse/extensions.** Reused unchanged. The existing `sources: string[]` already represented the topology.
34. **Package/test ownership semantics.** The TestTarget belongs to `@vitest/test-unit`, exercises two declared files under `test/unit/test`, and uses their colocated snapshots/serializers; ownership comes from the declaration, not containment inference.
35. **Self-hosting boundary.** Vitest is the implementation under test and legitimate bounded runner. TSPack owns outer selection, lifecycle, structured ingestion, and exit semantics.
36. **TSPack second test result.** Final: 16 passed, 0 failed, 0 skipped, 153.3 ms semantic duration, 1,159 ms wall, with all 16 assertion identities.
37. **Test parity.** Same two files, threads project, 16/0/0 result, and critical snapshot/serializer identities as upstream.
38. **Failure evidence proof.** A temporary `expect(1).toBe(2)` produced 15 passed/1 failed and preserved `snapshot-custom-serializer.test.ts::basic`; the source was restored exactly.
39. **Test discovery UX.** The unified listing shows owner, target, Vitest harness, two-source scope, and `project=threads` without enumerating test internals.
40. **Build/Test unified discovery.** One inspect projection covers both kinds; `--kind` filters rather than creating overlapping verbs.
41. **Installed frontend proof.** Final check/list/build/test ran through a `tspack_embedded_bridges` binary from `%TEMP%`, with no frontend override.
42. **Duplicate fixture regression.** Existing unique internal identities and repeatable publication identities remain valid; discovery keeps identity/publication/root separate and `check` passes the 41-project graph.
43. **`tspack check` status.** Passes with exactly 8 legitimate compatible multi-version warnings and 23 blocked lifecycle scripts; no new warning.
44. **Lifecycle-script interpretation.** The 23 remain two optional native consumer installs plus 21 maintainer publish/prepare scripts. None is required by either native vertical; none was enabled.
45. **Compatibility glue observations.** Native targets replace the intent of `premove dist && rollup -c` and direct Vitest package scripts for these slices. Upstream scripts remain intact as historical orchestration.
46. **Two-build/two-test loop.** `check`, expect build, snapshot build, basic-threads, and snapshot-threads all pass using discoverable identities.
47. **Build graph inspect.** Discovery shows expect and snapshot Rollup targets, complete artifacts, and `prerequisites: []`; the absence of an edge is the audited externalization result.
48. **Test graph inspect.** Discovery shows both TestTargets, owner, Vitest harness, project, and bounded source scopes; neither needs a built target.
49. **Friction ledger changes.** F-014 resolved; F-015 discovery, F-016 DTS resolution, and F-017 qualified prerequisites added/resolved; root-wide/browser/caching work remains deferred.
50. **Convergence metrics vs M80a2.** First build required five diagnostic-driven systemic fixes plus first target/test abstractions. Second build required mostly 36 lines of authoring, the milestone's three planned general primitives/UX surface, and one diagnostic-driven resolver fix. Second test required 10 authoring lines and zero primitive changes.
51. **Source dives required.** Seven focused dives: M80a2 evidence, manifest target IR, build executor, project lifecycle ordering, inspect routing, type-surface resolution, and frontend distribution. Future target choice now needs discovery rather than these implementation dives.
52. **Escape-hatch ledger.** Both builds: direct project Rollup, legitimate backend. Both tests: direct workspace Vitest, legitimate implementation under test. No package-script, pnpm, npm, shell, or opaque process delegation exists in target authoring.
53. **Performance.** Installed target discovery/planning/list projection: 748 ms for 41 projects/four targets. Clean snapshot compile plus eight-file hash validation: 1,369 ms. Prerequisite planning is in-memory and covered at the project layer; Rollup dominates build time.
54. **Cache/fingerprint behavior.** Rollup targets currently rerun; unchanged repeat output is hash-stable. No false cache claim or optimization milestone was introduced.
55. **Test repeat behavior.** Two consecutive TSPack runs executed the tests independently: 16/0/0 at 154.3 ms and 16/0/0 at 148.3 ms.
56. **Upstream oracle hygiene.** Oracle outputs were quarantined recoverably; TSPack clean proof used an absent directory. Final broad-build license side effects were removed exactly; current `dist` is final TSPack output.
57. **TSPack validation.** Broad Go command passed; frontend 255 passed/2 skipped, build and manifest API typecheck passed; VS Code compile and 35 tests passed; generated manifest type drift checks passed.
58. **Vitest validation.** Root typecheck passed in 10,636 ms; broad 14-package build passed in 11,896 ms; all four selected upstream and four selected TSPack operations passed.
59. **`git diff --check`.** Passed in both repositories.
60. **CI readiness assessment.** Yes for selected bounded steps: project semantics are credible enough for M80b to model a small Workflow replacement. Root-wide Build/Test, browser services, release, and publish remain out of scope.
61. **Outcome A/B/C.** **A — Success.** Both second verticals match upstream and discovery/graph/artifact contracts are reusable.
62. **Deviations.** Snapshot genuinely has no built workspace prerequisite, so no false flagship edge was authored. PATH pnpm remains old, so upstream used declared pnpm through `npx`. A plain `go build` still lacks embedded bridges by design; installed-path proof used the release tag.
63. **Exact recommendation.** Proceed to **M80b**: author one bounded CI Workflow that discovers and runs these two builds plus two tests, preserves structured artifacts/results, and compares local vs exported CI planning. Do not expand to all 41 projects or browser/release workflows yet.

## Snapshot artifact oracle

| Artifact | Bytes | SHA-256 |
| --- | ---: | --- |
| `chunk-utils.js` | 8,984 | `5dd1b4ddae0870d5efdf4e39a13a09c3107868b8bd8431308882469a71729e8f` |
| `environment.d.ts` | 823 | `12823692023b517278e232bb98afae8939a5e0675df646e0d80f90c3b3d528b9` |
| `environment.js` | 1,269 | `a617db831b3e202a8d5542025a9d7f84530bb7ac4a2108211c53f523b9748954` |
| `index.d-CuPTsptM.d.ts` | 6,829 | `cbd78a3459c52c3378200601766459de2d764c173754d8906b8f50b4cfafdf49` |
| `index.d.ts` | 2,797 | `f3875e1799339c704993d481c23c6a24f0e459c98386b5be44fb2637ae3bd6e6` |
| `index.js` | 32,460 | `c497349d44090171fa20c2d66950a1c339a80c802996031d498c10f5cf7e0261` |
| `manager.d.ts` | 793 | `ba5a5807a057ce6c48698a92883c3b50168418d6422604e52e05cb1a4b7c4d31` |
| `manager.js` | 1,839 | `08e0c47c9aebba5146edab60f203cfb35465b2e81b00b20d602827f5f5f824e5` |
