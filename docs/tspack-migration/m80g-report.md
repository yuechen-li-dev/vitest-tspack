# M80g — patched dependency identity

## Outcome

M80g is **Outcome A: success**. TSPack now treats a verified upstream package
plus an exact verified patch as a separate immutable realization. Vitest's 21
patch-correlated CLI failures disappeared without pnpm install, pnpm patch,
lifecycle execution, Process, or ShellScript effects. The adjacent five
module-diagnostic tests were ordinary and migrated into the same native test
effect, yielding 35 passed, 0 failed.

## 1–8. Baseline and upstream oracle

| Evidence | Result |
| --- | --- |
| TSPack baseline | `53960191afce9e00851131fb69148192871dbd86`, `v0.1.12-m80f.2`, main clean |
| Vitest baseline | `cff9cfd0c019ce7bf150daad821202b875b4b148`, main clean |
| Host | Windows amd64, Node `v26.2.0`, Go `1.27.0` |
| Lock/store baseline | format 1; package ID and content hash keyed the raw extracted archive |
| Upstream declaration | pnpm `patchedDependencies`: `cac@6.7.14: patches/cac@6.7.14.patch` |
| Patch target/path | exact `npm:cac@6.7.14`; `patches/cac@6.7.14.patch` |
| Patch SHA-256 | `a8f0f3517a47ce716ed90c0cfe6ae382ab763b021a664ada2a608477d0621588` (matches pnpm lock) |
| Upstream patched oracle | threads: CLI 30/0/0 plus module diagnostic 5/0/0 |
| Raw TSPack causal probe | CLI 9 passed, 21 patch-correlated failures |

The upstream patch changes boolean nesting, repeated-option arrays, and path
normalization. pnpm applies one exact-version-bound patch here and fails its
installation path when application fails. pnpm is only the oracle in this
milestone; it is not part of TSPack realization.

## 9–16. Identity, lock, update, and sync

Source identity remains `npm:cac@6.7.14`, with verified source content hash
`sha256:d6dba561aa03eb1ee42e174eebdf1692d74e7af289b9b381400226813b4952be`.
Patch identity is canonical-LF SHA-256 plus algorithm
`unified-text-v1-exact`, attached to that source-qualified exact version.
Realization identity is:

```text
npm:cac@6.7.14#patch=unified-text-v1-exact.a8f0f3517a47ce716ed90c0cfe6ae382ab763b021a664ada2a608477d0621588
```

The resulting independently content-addressed tree is
`sha256:8481cddfe768ee778ee1ee6c2f12edc1b9a4b37c94dd7b2d5e0aeed498990f4a`.
M80g intentionally supports one patch per exact source package; an ordered
multi-patch set is deferred until evidence requires it.

Lock format remains version 1 with additive source identity/hash,
realization identity/hash, patch path, digest, and algorithm fields. Semantic
validation proves that the realization ID is derived from the exact source,
algorithm, and digest. Serialization is deterministic. A path-only rename
updates provenance but preserves realization identity; content mutation changes
the identity. `update` resolves through Requirement Tape first, then validates
and records the transformation. `sync` verifies the raw source, patch bytes,
algorithm, exact application, resulting tree, and only then projects it.

## 17–31. Verification, application, and store behavior

Raw source integrity remains mandatory before transformation. Patch bytes are
canonicalized from CRLF to LF for both digest and application. The bounded
application engine accepts exact existing text-file hunks only. Offset and fuzz
are rejected. Creates, deletes, renames, binary/mode metadata, no-newline
markers, malformed hunks, already-applied/mismatched context, absolute paths,
drive-letter paths, traversal, and symlinked trees fail closed with typed patch
diagnostics.

The raw archive is immutable. Patched output is staged and written as a
`patched-tree` artifact, rehashed on verification, and keyed by its own tree
digest. Internal tests prove raw plus patched coexistence and same source plus
patch A/patch B non-aliasing. Identical source/digest/algorithm can reuse the
same immutable entry; changed bytes cannot. Existing lock-hash reachability
makes patched entries participate in normal GC. Audit continues to use the
source package name/version and does not claim that a patch removes advisories.

## 32–43. Resolution composition, authoring, migration, and inspection

Patching is a post-selection realization transform in the existing Requirement
Tape path. Peer, optional-peer, override, and alias selection therefore retain
their existing semantics. An alias attaches to the selected source package,
not its surface requirement key. Source-qualified identity prevents alternate
registries with equal name/version from collapsing.

Native authoring is:

```tsx
tool(npm("cac", "^6.7.14"), {
  patch: { path: "patches/cac@6.7.14.patch", version: "6.7.14" },
})
```

Frontend types require path and exact version; manifest validation rejects
unsupported sources, unsafe paths, missing versions, and non-exact versions.
Update reports missing files, conflicts, target mismatch, stale lock, digest
mismatch, unsupported algorithm, application failures, and patched-store
verification failures with package/version/source/path context.

The pnpm importer recovers exact `patchedDependencies` selectors into this
native form deterministically and does not recover ranges or arbitrary
postinstall mutations. `tspack inspect packages` and `--json` expose source
identity/hash, patch path/digest/algorithm, and realization identity/hash.

## 44–50. Invalidation, clean realization, and performance

A missing local patch fails update/sync even if a prior patched store entry
exists. Patch mutation changes the lock realization; a path-only move followed
by update preserves identity; source-version mismatch fails exactly. A clean
repository plus lock plus patch reproduces the tree without embedded patch bytes.
The clean Windows proof removed `node_modules` and `.tspack`, then `update` and
`sync --clean` materialized 1,597 entries without pnpm. Cached sync verifies and
reuses the patched entry. For this one-file patch, hashing/application was not a
visible runtime driver; the combined target's seven native builds and test run
completed in about 9.45 seconds locally.

## 51–68. Vitest causality, workflow, and authority

The controlled comparison is direct: raw `cac` produced 9/21; patched `cac`
produced all 30 CLI passes. All 21 correlated failures were eliminated. The
adjacent five module-diagnostic tests then passed after the Vitest build target
explicitly preserved and published its static `suppress-warnings.cjs` runtime
artifact. This required one small generic build fix: an exact declared artifact
that is also an exact declared input is preserved rather than cleaned.

`VitestCLIUnitCI` contains seven native Build prerequisites and one native Test
effect over two source files. It has 0 Process, 0 ShellScript, 0 pnpm lifecycle,
and 0 pretest build effects. Provider YAML owns checkout, Node 24 selection,
released TSPack setup, and transport only. TSPack is authoritative for this
30-test CLI plus five-test module-diagnostic slice. Legacy broad unit jobs remain
authoritative for all unselected unit/platform/runtime dimensions; no broad CI
was deleted or weakened.

Remote CLI qualification: `https://github.com/yuechen-li-dev/vitest-tspack/actions/runs/33292858113` on `ubuntu-latest`, using the
setup action and `v0.1.13-m80g.1`, starts with no `node_modules` or `.tspack`,
runs `sync --clean`, then the native workflow. Release/setup qualification:
`https://github.com/yuechen-li-dev/tspack/actions/runs/33292764030`; the published
release is `https://github.com/yuechen-li-dev/tspack/releases/tag/v0.1.13-m80g.1`.
Its Windows amd64 archive digest is
`f4ca801b15730baa357e2f8d94e9f5faa918d440ad765a82d72ebab0c43b6397`.
The remote run succeeded: clean sync materialized 1,597 entries in roughly 93
seconds, and the native workflow reported 35/0/0 in 12.356 seconds.

## 69–83. Friction and validation

F-041 (`MissingPrimitive`, P1) is resolved. The additional TSPack bug was exact
declared static artifacts being removed by Rollup target cleanup when they were
also inputs; it is fixed generically. The Vitest-specific requirement is that
`suppress-warnings.cjs` is published beside the built CLI. No new historical
choreography or provider bootstrap was introduced.

Validation evidence:

- `go test ./cmd/... ./internal/... ./tools/...`: passed.
- Patch, lock, store, project, resolver, CLI, and pnpm migration focused tests: passed.
- Frontend build and both typechecks: passed.
- Frontend suite: 258 passed/2 skipped. An earlier run hit transient Windows
  `ERR_NO_BUFFER_SPACE`; its exact failed browser integration and the subsequent
  complete suite both passed. The new authoring test passed (62-test slice).
- Generated type sync repeated without byte drift.
- VS Code compile and 35 tests: passed.
- Setup-action tests and full five-platform release matrix: passed.
- Upstream relevant tests: 35/0/0.
- Local TSPack workflows: Core 24/0/1; package builds 12 targets; M80d 87/0/0;
  M80e 258/0/1; M80f 109/0/3; M80g 35/0/0.
- `git diff --check`: passed in both repositories.

Internal coverage includes deterministic serialization and lock validation;
raw/patched and two-patch isolation; content/path mutation identity; exact
failure, malformed/unsupported operations, traversal, Windows drive paths,
symlinks, and CRLF/LF; patched tree verification/reuse; inspect provenance; and
exact pnpm selector recovery. Windows local tests and clean flagship execution
cover filesystem/text semantics; the release matrix additionally packages
Windows amd64.

## 84–86. Outcome, boundary, and next step

Outcome A is satisfied. The exact stopping boundary is no longer dependency
realization: the selected CLI/module-diagnostic family is green locally and on
clean Ubuntu, and all prior workflows remain green. The next step should be a
fresh adaptive Vitest responsibility inventory and the next ordinary adjacent
unit/CLI slice; do not preselect another dependency or workflow abstraction.
