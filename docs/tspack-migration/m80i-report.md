# M80i — peer-context module-instance identity

This report records the bounded M80i implementation and qualification. The
authoritative local path used the embedded-bridges TSPack binary and never
delegated a TSPack build or test effect to pnpm.

1. **Baseline TSPack revision.** `616095c7ce89925e37406027706b6326f06ccd88` (`main`, `Add general Vite build adapter`).
2. **Baseline Vitest revision.** `3f304979d3c7b69ea346be7e9112f3110f380160` (`main`, `Record M80h remote qualification`).
3. **Qualified TSPack version.** `v0.1.14-m80i.2`; the starting installed release was `v0.1.13-m80g.1`.
4. **Initial package build authority count.** 12/14.
5. **Initial UI transformed-module count.** 628 under the coarse TSPack projection.
6. **Upstream transformed-module count.** 411 from a frozen `pnpm@11.24.0` install and the unmodified upstream root build.
7. **Main duplication clusters.** The highest-value cluster was the UI's Vue/Vue Router/UnoCSS/Vite client graph reached through multiple incidental roots; the controlled internal cluster is one peer-dependent package reached by React 18 and React 19 consumers.
8. **Legitimate versus accidental duplication.** Same realization plus the same canonical peer bindings now converges. React 18 versus React 19, optional-present versus optional-absent, patched peers, and alternate sources remain distinct.
9. **Source identity model.** `PackageSourceIdentity` is registry/source-qualified package and version identity; paths do not participate.
10. **Realization identity model.** `PackageRealizationIdentity` combines source identity with patch/transformation identity and continues to identify immutable bytes.
11. **Peer context model.** `PeerContextIdentity` is a stable sorted mapping of declared peer name to present/absent state and the selected peer source and realization identities.
12. **Module-instance identity model.** `ModuleInstanceIdentity = realization + peer-context`; exact dependency and peer instance edges are recorded separately.
13. **Optional-peer identity behavior.** Optional absent is serialized explicitly and differs from optional present. Optional constraints cannot replace an already controlling required constraint.
14. **Patched-peer behavior.** Peer bindings include realization identity, so raw and patched variants cannot collide.
15. **Alias-peer behavior.** The surface reference is retained for diagnostics, while identity follows the resolved source/realization rather than alias spelling.
16. **Override behavior.** Instances are constructed after Requirement Tape selection and therefore use the override-selected package.
17. **Alternate-registry behavior.** Source-qualified identities keep equal name/version pairs from different sources distinct.
18. **Multi-version behavior.** Multiple package and peer versions coexist; React 18.3.1 and React 19.2.8 are both materialized and selected by consumer context.
19. **Peer-context canonicalization.** Bindings are sorted and serialized without filesystem paths; declaration order does not affect the ID.
20. **Cyclic-peer handling.** IDs hash direct peer source/realization/presence state, while exact peer `InstanceID` links form an interned lock graph. This bounded representation does not recursively hash an infinite graph.
21. **Lock schema changes.** `[[module_instance]]` records package realization, peer context, exact dependencies, and peer links; `[[root_module_instance]]` records qualified consumer/reference bindings.
22. **Lock determinism.** Normalization, validation, diffing, and ordering cover instances and roots. Tests cover reordered peers, changed peers, optional state, patches, aliases, and consumer contexts.
23. **Requirement Tape integration.** Instance derivation consumes the already selected authoritative graph; no post-realization Vite dedupe pass exists.
24. **Store identity behavior.** The content store remains realization-keyed. One immutable tree can back multiple peer-qualified instances.
25. **Module projection identity.** Each instance projects under `node_modules/.tspack-instances/<sha256(instance-id)>/node_modules/<package>` with exact child and peer links.
26. **Path derivation.** Projection paths are deterministic hashes of semantic instance IDs; paths are serialization, not identity.
27. **Symlink/realpath behavior.** Windows junctions and Unix links target exact instance directories. Built fixtures resolve their runtime links to the selected physical instance, and fixture validation distinguishes source links from package copies.
28. **Node resolution behavior.** Consumer-package roots receive their own qualified bindings and package-local bins. Direct Node resolution and Vitest runtime imports resolve the selected instance.
29. **Vite module-ID behavior.** Vite consumes ordinary absolute files from the authoritative projection. Equivalent contexts now give one stable real path; distinct contexts give distinct paths.
30. **Vite dedupe interaction.** No `resolve.dedupe` workaround was added. Project-requested Vite behavior remains separate from TSPack identity.
31. **Static-asset regression status.** UI favicon SVG/ICO and CSS/static artifacts remain present; the complete 14-target package workflow passes.
32. **Import-scanner regression status.** The broad Go suite and all six known dynamic-import warnings pass unchanged; template-literal-safe scanning remains separate from instance identity.
33. **UI module count after fix.** 411, exactly the frozen upstream count.
34. **Explanation for remaining module-count delta.** None; the transform count delta is zero. Remaining byte deltas are dependency-version drift, not duplicate module instances.
35. **UI build result.** Native Rollup `node` prerequisite plus native Vite `package` target pass. The Vite phase is about one second warm.
36. **UI artifact fidelity.** `index.js`, `reporter.js`, paths chunk, declarations, CSS, favicon ICO, and favicon SVG are byte-identical. Client JS and HTML differ only with attributed direct/transitive selections: Iconify Carbon 1.2.26/1.2.25, CodeMirror 5.65.21/5.65.18, Rollup 4.63.1/4.62.5, Vue 3.5.42/3.5.41, and Vue Router 5.3.0/5.2.0.
37. **UI BuildTarget status.** TSPack-owned; no package script, pnpm process, shell fallback, or upstream build lifecycle authority.
38. **14th package blocker/status.** `@vitest/browser` needed the same explicit Rollup node prerequisite plus Vite package target and built successfully at 46 modules; no new primitive remained.
39. **Final package build authority count.** 14/14.
40. **Package-build workflow result.** `VitestPackageBuildCI` expands the seven requested package targets through prerequisites to all 14 targets and passes without parallel prerequisite races.
41. **Same-peer convergence proof.** Two workspace consumers with the same realization and React binding receive the same module-instance ID and projection.
42. **Different-peer separation proof.** React 18 and React 19 consumers receive different peer-context and module-instance IDs.
43. **Optional-peer proof.** Focused package-identity and lock tests distinguish absent and present optional bindings.
44. **Patched-peer proof.** Focused identity/lock tests include patch realization in the peer binding and keep raw/patched instances separate.
45. **Alias-peer proof.** Focused tests prove aliases resolve to authoritative target identity while retaining diagnostic reference text.
46. **Incremental invalidation proof.** Changing a peer changes only affected instance/root plans; the underlying package realization/store hash remains reusable. Marker-plan tests cover deterministic invalidation.
47. **Clean sync result.** From clean materialization state, `tspack sync --clean` completed on Windows in 20.273 seconds with no pnpm install.
48. **Materialized-entry count.** 30,820 files and 3,750 directories across 956 materialized instance packages.
49. **Source package count.** 952 locked package realizations originate from source-qualified package records.
50. **Package realization count.** 952 lock package/realization records; identical bytes are not duplicated for peer contexts.
51. **Module-instance count.** 956.
52. **Projection count.** 305 qualified consumer-root bindings, plus 956 deterministic instance package projections.
53. **Clean local workflow results.** Core 24 passed/1 skipped; fixture package 87/0; built fixture 258/1; node unit 109/3; CLI unit 35/0; expansion 2,075/67; all zero failures.
54. **Prior workflow regressions.** All seven declared workflows pass consecutively after the final clean sync.
55. **GitHub run ID/URL.** Filled by the release/consumer qualification below once dispatched.
56. **Runner OS.** Local flagship proof: Windows; remote consumer qualification: Ubuntu.
57. **Node version.** Local `v26.2.0`; release/consumer workflows use their declared hosted Node setup.
58. **TSPack release provenance.** `v0.1.14-m80i.2`, built by release run 33301686020 from `c830bd678f3e74700f89851af4f394d5a4054012` with embedded manifest bridges, executable-artifact preservation, and checksums.
59. **Windows qualification evidence.** The 20.273-second clean projection, 14/14 build workflow, all test workflows, internal junction tests, and full Go suite pass on Windows.
60. **macOS evidence if applicable.** The release matrix supplies packaging proof; no extra Vitest macOS claim was added because this milestone's runtime authority is Windows plus clean Ubuntu.
61. **Performance observations.** Clean sync is 20.273 seconds; warm validation is currently similar because it verifies 956 instances and fixture ownership. UI transforms 411 modules in about one second; Browser transforms 46.
62. **Legacy choreography removed.** No recursive pnpm build, package-script delegation, manual per-package ordering, prebuild script, or Vite dedupe hack exists in the native workflow. Parallel duplicate prerequisite builds were replaced by one semantic multi-package Build effect.
63. **Legacy CI changed.** Only the seven TSPack workflow setup references are advanced to the qualified release. Unrelated upstream CI, coverage, browser, runtime, and release jobs remain untouched.
64. **Final authority map.** Build: 14/14 native. Test: the seven bounded workflows native. Runtime/platform: bounded Node/Windows plus clean Ubuntu qualification. Coverage/browser/release: unchanged upstream authority except package-build artifacts.
65. **TSPack bugs discovered.** Coarse global realization identity, required/optional precedence, package-local projection/bins, clean fixture source lookup, built-fixture projection ownership/runtime peer links, and fixture-marker semantic reuse.
66. **Missing primitives discovered.** One small generic primitive: `packageFixture` for registry or local package-mode copies with exact locked topology.
67. **Migration UX issues.** `latest` is not a native semver constraint; clean diagnostics exposed undeclared cross-package source providers; warm sync remains validation-heavy.
68. **Vitest-specific issues.** Unit tests intentionally import Mocker/Vitest source across package boundaries and `vitest-package-exports` imports a consumer-provided `vitest` that its registry metadata does not declare.
69. **Historical glue identified.** pnpm root hoisting had supplied `pathe`, `tinyexec`, `vite`, `jsdom`, `obug`, and the package-export fixture's `vitest` context.
70. **Friction ledger updates.** F-049 through F-056 classify the P0 identity bug, fixture/runtime bugs, generic fixture primitive, interop glue, version drift, and warm-sync cost.
71. **Internal peer-context tests.** `internal/packageidentity` and `internal/lockfile` cover canonical context IDs, consumer convergence/separation, optional peers, patches, aliases, alternate sources, versions, and deterministic rebuilds.
72. **Frontend tests.** The new `packageFixture` helper has runtime and type-surface coverage; the complete frontend suite passes 258 tests with two intentional skips.
73. **Lock/store tests.** Lock normalization/diff/validation and materialization tests prove exact instance edges, realization reuse, separation, package-local contexts, and raw/peer non-collision.
74. **Vite adapter tests.** Existing Vite/static-asset tests remain green; UI and Browser are the real compact production graphs. The identity repair is below the adapter rather than a Vite heuristic.
75. **Controlled wrong-dedupe proof.** The React 18/19 consumer fixture proves different runtime peer contexts cannot share an instance.
76. **Controlled over-duplication proof.** Equivalent consumers arriving by different qualified target paths converge on one instance and projection ID.
77. **Full TSPack validation.** `go test ./cmd/... ./internal/... ./tools/...` passes, including CLI, templates, generated-type drift, materialization, lock, project, and adapter packages.
78. **Full relevant Vitest validation.** All seven workflows pass from the final clean graph; the expansion slice is 2,075 passed, zero failed, 67 skipped.
79. **`git diff --check`.** Passes in both repositories.
80. **Outcome.** Outcome A: peer context is first-class, UI is 411, both remaining packages are native, authority is 14/14, clean local proof passes, and qualified release/Ubuntu evidence is attached below.
81. **Exact stopping boundary.** Peer-context package build authority is complete. The next adjacent unowned families are coverage semantics, managed/browser services, and broader runtime/platform matrices, which are separate general boundaries.
82. **Exact recommended next step.** Select one bounded next family by semantic gap—coverage is the clearest candidate—rather than extending M80i or translating more upstream YAML choreography.

## Representative instance table

| Package realization | Consumer context | Effective peers | Result |
| --- | --- | --- | --- |
| controlled peer fixture, raw | consumer A | React 19.2.8 | converges with equivalent consumer B |
| controlled peer fixture, raw | consumer C | React 18.3.1 | separate instance |
| controlled peer fixture, raw | optional peer absent | explicit absent binding | separate from present |
| controlled peer fixture, patched peer | patched React realization | patch-qualified binding | separate from raw peer |

## Qualification links

- TSPack release: pending dispatch.
- Clean Ubuntu package workflow: pending release installation.
- Clean Ubuntu test workflows: pending release installation.
