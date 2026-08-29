# M80a1 — Useful migration draft and first native lifecycle

## Baseline

- Vitest fork: `4c563b64a` on `main` (`e08c45c39` is the upstream code parent).
- TSPack: `e06cd58` on `main`.
- Node: `v26.2.0`.
- PATH pnpm: `7.27.1`; repository declaration: `11.24.0`.
- The untracked M80a report, friction ledger, results JSON, generated draft, and
  migration report are intentional carried-forward evidence. They were read before
  M80a1 implementation and will not be discarded or retroactively rewritten.

## Useful-draft threshold (defined before implementation)

M80a1 will declare `tspack migrate` good enough and switch to hand-authoring as
soon as an unchanged Vitest checkout produces a deterministic draft that:

1. discovers the root plus all 40 package roots selected by Vitest's
   `pnpm-workspace.yaml` (41 projects total), with no missing or duplicate roots;
2. gives every discovered project a stable package identity and package-local
   dependency contract;
3. resolves all unambiguous `workspace:` references by native TSPack workspace
   identity, targeting 85/85 for the current checkout, and emits an explicit stable
   TODO instead of guessing for any ambiguous or missing identity;
4. resolves the ordinary default-catalog references actually used by Vitest into
   native version requirements, targeting 116/116, while preserving unresolved
   catalog syntax as evidence and a TODO;
5. preserves runtime, development/tool, peer, and optional dependency kinds, plus
   existing npm alias/source semantics;
6. is boring to review: packages and dependencies have stable ordering, inferred
   facts are distinct from unresolved/manual semantic work, and a second migrate
   run does not churn output or overwrite hand edits; and
7. leaves only bounded semantic authoring—targets, compiler/test/build intent, and
   other repository-specific lifecycle choices—not wholesale reconstruction of
   package boundaries or dependency edges.

The importer will stop expanding once this threshold is met. Full pnpm semantics,
CI, release behavior, and perfect automatic target inference are explicitly outside
M80a1.

## Results

1. **Baseline revision.** Vitest remained at `4c563b64a` on `main`; TSPack
   started clean at `e06cd58`. Node was `v26.2.0`; PATH pnpm was `7.27.1`
   while Vitest declares `11.24.0`.
2. **M80a state carried forward.** The M80a report, friction ledger, JSON,
   root-only draft, and migration report were retained and read. The old draft
   was not promoted; M80a's oracle and safe-test evidence remain unchanged.
3. **Useful-draft threshold.** The threshold above was written before code. It
   required 41 projects, all safely resolvable workspace/catalog references,
   dependency kinds, stable composition, and repository-only remaining work.
4. **Workspace config discovered.** `pnpm-workspace.yaml` contains six package
   patterns, a default catalog, overrides, patches, lifecycle allowlists, and
   other pnpm policy. Only package discovery and effective dependency facts were
   imported.
5. **Workspace globs supported.** Includes, `!` exclusions, de-duplication,
   exact roots, single-star patterns, bounded double-star patterns, and
   package.json validation are implemented. Vitest uses no exclusions; the
   regression fixture proves exclusion behavior.
6. **Packages discovered / total.** `41/41`. The matched `_shared` DTS directory
   has no package.json and was explicitly validated/skipped. There are no
   duplicate roots.
7. **Workspace references resolved / total.** `85/85`, including declarations
   duplicated across dependency sections. Native output uses `workspace(name)`.
8. **Workspace unresolved cases.** Zero dependency references. Three DTS
   projects share one package.json name; this is a project-identity ambiguity,
   not an unresolved edge.
9. **Catalog configuration discovered.** The default `catalog` was parsed from
   `pnpm-workspace.yaml`. Named `catalogs` are supported by the same bounded
   loader, but Vitest does not exercise them.
10. **Catalog references resolved / total.** `116/116`; generated requirements
    contain the effective versions rather than `catalog:` vocabulary.
11. **Catalog unresolved cases.** Zero. Missing catalog entries would remain
    visible with a stable TODO instead of blocking the workspace draft.
12. **Dependency kinds preserved.** The draft has 418 distinct native rows: 75
    runtime deps, 23 peers, and 320 tools. Peer optionality is preserved. Section
    duplicates prefer peer intent and are counted in recovery metrics.
13. **Alias handling.** Both npm aliases lower to semantic npm targets with
    their local dependency keys; no migration-only alias model was added.
14. **Peer handling.** Peer declarations remain `peer(...)`; optional peers use
    TSPack's existing optional peer option. They are not flattened into tools.
15. **Generated package contracts.** A root `<Packages>` topology references 41
    full `definePackage` contracts under package-local `.tspack-migration`
    directories. Each records identity, version, kind, dependencies, source
    kind, and a semantic-target TODO.
16. **Draft readability.** The root file is a concise sorted topology. Each
    package owns a small boring dependency contract; no giant helper or clever
    generated metaprogramming was introduced.
17. **Draft determinism.** A forced second run covered all 43 outputs and changed
    zero SHA-256 hashes.
18. **Migration TODO model.** Compatibility-derived facts are described as such;
    unresolved dependency facts get dependency-local TODOs; package semantic
    work gets target/publish comments. There are zero workspace/catalog TODOs,
    338 source TODO markers overall, and 561 conservative report TODO units.
19. **Migration report improvements.** It now summarizes globs, discovered and
    skipped roots, resolved/unresolved workspace and catalog counts, aliases,
    paths, generated contracts, duplicate identities, unsupported policy, and
    next steps.
20. **Next-step guidance.** The report teaches review, package-contract and root
    promotion, `tspack check`, `tspack update`, and `tspack sync`; it does not
    imply that the draft is authoritative automatically.
21. **Idempotence.** Ordering, declarations, TODOs, and report bytes are stable.
    Without `--force`, any one existing output blocks the all-output write before
    validation or mutation.
22. **Migrate TSPack fixes.** Added the bounded pnpm importer, split output,
    workspace/catalog/native-source lowering, metrics, diagnostics, validation
    of all package drafts, and stable report rendering.
23. **Migration regressions added.** The generic fixture proves root inclusion,
    include/negation behavior, catalogs, workspace edges, npm aliases, peers,
    stable package output, and report metrics. The real Vitest case was rerun
    after each meaningful fix.
24. **Point migrate became good enough.** Importer work stopped immediately when
    Vitest reached `41/41`, `85/85`, `116/116`, zero unresolved edges, and passed
    frontend plus IR validation.
25. **Manual manifest completion.** `manifest.tsx` is now the authoritative root
    project description and references the reviewed 41-package contracts.
26. **Manual package edits.** Zero package declarations were reconstructed by
    hand. All 41 generated rows were reviewed; three deterministic fixture
    identity bridges were retained explicitly.
27. **Manual dependency edits.** Zero. The real update pass, including workspace,
    alias, catalog, peer, and local-path cases, validated the generated graph.
28. **Manual semantic authoring.** Root project authority was authored. Build,
    test, compiler, and publish intent remains deliberately unclaimed. Vitest's
    broad typecheck received three exclusion patterns for TSPack manifest TSX.
29. **Draft-vs-final diff.** Package rows and dependency contracts are identical.
    The final root replaces draft language with an authority/bridge explanation.
    Classification: one semantic hand-authoring change, zero migration-deficiency
    corrections, three retained missing-feature identity bridges, and comment
    cleanup only.
30. **Real manifest load result.** Passed. Before a lock existed, real
    `tspack check` produced only `TSPACK_CHECK_LOCKFILE_MISSING`.
31. **tspack check result.** `PartiallyWorking`. After update it reports eight
    intentional multi-version conflicts and 23 blocked lifecycle scripts, with
    no manifest, graph, path, workspace, catalog, or lock-structure errors.
32. **Check diagnostic quality.** The post-load diagnostics are actionable and
    domain-specific. Installed/source frontend discovery still needs an override;
    without it, secondary nil-graph diagnostics remain open friction.
33. **tspack update result.** `Working`. It wrote 153 lock packages: 46 direct
    and 107 transitive closure, including eight referenced workspace packages and
    the `subpackage` local fixture.
34. **tspack sync result.** `Working`. It materialized 362 entries successfully.
35. **Independence from pnpm materialization.** Proven. pnpm's `node_modules` was
    moved to a recoverable repository-local quarantine before sync. Node resolved
    `vitest`, `@vitest/browser`, `typescript`, and `subpackage` from the TSPack
    tree. The oracle was then restored.
36. **tspack build result.** `NotYetConfigured`. It exits 0 silently because no
    targets are authored. This is recorded as a no-op, not claimed as a build.
37. **tspack test result.** `NotYetConfigured`. It safely returns
    `TSPACK_TEST_AMBIGUOUS_WORKSPACE_VITEST` and makes no mutations.
38. **Basic developer loop status.** `PartiallyWorking`: migrate, manifest load,
    update, and independent sync work; check exposes policy work; package build
    and test topology remain semantic authoring.
39. **Upstream oracle health.** `pnpm run build` passed. The first typecheck
    correctly exposed manifest TSX inclusion; after the Vitest-specific exclude,
    `pnpm run typecheck` passed.
40. **TSPack bugs fixed.** Split workspaces can include a root package; sibling
    path dependencies may traverse within (but never outside) the workspace; the
    generated workspace validates as a unit.
41. **Migration UX fixes.** Stable metrics, classified evidence/TODOs, composed
    output, collision safety, identity adjustment reporting, and lifecycle
    guidance remove the need to inspect generator internals for ordinary facts.
42. **Deferred large frictions.** Installed frontend discovery, project identity
    distinct from package/publish identity, explicit no-target build diagnostics,
    and full Vitest build/test topology are deferred.
43. **Friction ledger status.** F-001, F-002, F-005, F-006, F-008, and F-010 are
    `ResolvedM80a1`; F-003 and F-009 are `Deferred`; F-004 is `StillOpen`; F-007
    is a documented deferred primitive/bridge.
44. **Packages still incomplete.** All 41 still need package-specific lifecycle
    review; this is semantic work, not missing mechanical workspace reconstruction.
45. **TODOs still remaining.** Zero workspace/catalog TODOs; three identity
    review items; 41 target TODO markers; 235 conservative dependency
    classification markers; 338 source markers total.
46. **Source dives required.** Four focused TSPack implementation dives: migrate
    placement/output, split-workspace frontend rules, M70 alias identity, and
    local path resolver/validation. This is lower and more bounded than M80a's
    repeated diagnostic/recovery dives.
47. **Manual edits count/classification.** ExpectedSemanticAuthoring: 1;
    MissingMigrationInference: 0; MissingTSPackPrimitive bridges: 3;
    TemporaryCompatibilityBridge: 2; VitestSpecific: 1.
48. **Migrate usefulness metrics.** It eliminated 41 package declarations, 418
    dependency rows, 85 workspace-edge interpretations, 116 catalog lookups, 31
    local-path conversions, and two alias conversions from manual reconstruction.
49. **TSPack validation.** Focused tests passed; manifest frontend passed 253
    tests with two skipped and built; broad
    `go test ./cmd/... ./internal/... ./tools/...` passed; VS Code passed 35 tests;
    compat diff reported all five surfaces up to date.
50. **Vitest validation.** Upstream build and typecheck pass with the original
    pnpm oracle restored. Full upstream tests were not repeated because M80a
    already captured their oracle and M80a1 did not change Vitest runtime code.
51. **git diff --check.** Passed in both repositories.
52. **Outcome A/B/C.** **B — Meaningful progression.** The M80a blocker is gone,
    the real manifest/check/update/sync loop works through independent
    materialization, and the next blocker is isolated to semantic build/test
    topology plus policy decisions.
53. **Deviations.** Package contracts remain in `.tspack-migration` rather than
    being copied to 41 package-root files; this keeps draft-vs-final comparison
    explicit and is recorded as a temporary compatibility bridge. TSPack-generated
    materialization/store were moved to recoverable temp quarantine after proof;
    pnpm's oracle was restored.
54. **Exact recommendation.** Use **M80a2**, not M80b: author one bounded real
    build target and one package-scoped test topology, add a clear no-target
    build diagnostic, decide project identity vs package identity for duplicate
    fixture projects, and fix installed frontend discovery. Begin M80b CI work
    only after those native commands do real work.

## Command status summary

| Command | Status | Evidence |
|---|---|---|
| `tspack migrate` | Working | 41/41, 85/85, 116/116; frontend/IR valid |
| `tspack check` | PartiallyWorking | coherent graph; conflict/security policy diagnostics |
| `tspack update` | Working | 153 lock packages |
| `tspack sync` | Working | 362 entries without pnpm materialization |
| `tspack build` | NotYetConfigured | zero-target silent no-op |
| `tspack test` | NotYetConfigured | safe ambiguous-root refusal |

The answer to M80a1's product question is **yes**: migrate removed essentially
all mechanical workspace and dependency reconstruction. The remaining work is
bounded semantic authoring visible from the Vitest repository.
