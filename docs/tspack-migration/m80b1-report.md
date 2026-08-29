# M80b1 — Real GitHub CI cutover smoke test

## Decision

**Outcome A — Success.** A clean Ubuntu GitHub runner consumed a published,
checksum-verified TSPack prerelease and ran the same `VitestCoreCI` Flow twice.
Both runs produced the same two Build and two Test effects, 2 expect artifacts,
8 snapshot artifacts, basic 8/0/1, snapshot 16/0/0, and terminal success. No
pnpm install, cache, source-tree TSPack binary, or GitHub-specific semantic
command was used.

No whole legacy workflow/job was deleted. The only overlapping upstream job is
the broad `ci.yml:test` matrix; it also owns Node/platform/coverage/full-unit
coverage that `VitestCoreCI` does not. Deleting it would remove safety nets.
There was no dedicated four-effect legacy job to remove.

## Required report

1. **Baseline revision.** Vitest `d644c5ae4` on `main`; TSPack `7a51530` on
   `main`; both matched origin and were clean. Local Node was `v26.2.0`.
2. **Local M80b regression status.** Before CI edits, current-source TSPack
   passed `check`, lock update (+0/-0), clean sync (1,088 entries), and the
   four-effect Flow with 2/8 artifacts and 8/0/1 plus 16/0/0 tests.
3. **Existing GitHub workflow inventory.** See the complete mapping below.
4. **CI responsibility classification.** Only
   `tspack-vitestcoreci.yml:tspack` is `StillNeededForFlagship`. The broad unit
   matrix partially overlaps but remains `OutOfScopeButStillNeeded`; all other
   jobs are release, browser, platform, security, ecosystem, or repository
   maintenance.
5. **Old workflows/jobs removed.** None. No whole job had only the bounded
   responsibility.
6. **Old workflows/jobs preserved.** Every pre-existing workflow/job; exact
   reasons are in the inventory.
7. **Authority boundary after cleanup.** TSPack owns now: expect package build,
   snapshot package build, basic-threads, snapshot-threads, and their
   `VitestCoreCI` composition. Upstream still owns everything outside that
   slice.
8. **Final thin-runner YAML.** Generated
   `.github/workflows/tspack-vitestcoreci.yml`: checkout, Node 24, setup TSPack,
   version display, clean-state proof, lock-only clean sync, check, and one
   `tspack workflow run VitestCoreCI --ci-provider github` command.
9. **TSPack installation/setup method.** First-party
   `yuechen-li-dev/tspack/.github/actions/setup-tspack@v0.1.9-m80b1.3` downloads
   the platform archive and `checksums.txt` from the matching GitHub Release.
10. **TSPack version/provenance.** `v0.1.9-m80b1.3`, action/source commit
    `428a8f057ad3a1a241796a693b49740a6457bf1b`; normal release run
    `33270485654`; Linux amd64 SHA-256
    `8af1dbc33a28efe38214a8badf2e81829b1a9e8164cddca5e654eb0fc8eb3167`.
11. **Node version.** Requested Node 24; hosted runner resolved `v24.19.0`.
12. **Runner OS.** Ubuntu 24.04.4 LTS, image `ubuntu-24.04` version
    `20260823.283.1`.
13. **Clean checkout proof.** `actions/checkout` used `clean: true`, depth 1,
    and checked out qualification SHA
    `c2ddbd23c8667c23663a823705acb9d5a4b87722`.
14. **No-node_modules proof.** The generated `test ! -e node_modules && test
    ! -e .tspack` step passed before realization in both runs.
15. **Lock/update policy.** `ts-lock.toml` is committed authority. CI runs
    `sync --clean`, never update. Final local update reported +0/-0.
16. **`tspack sync --clean` result.** Both remote runs materialized all 1,116
    locked entries successfully from empty dependency state.
17. **pnpm requirement status.** None in the flagship job. pnpm was used only
    in separate local upstream-oracle validation.
18. **`tspack check` remote result.** Success with the known diagnostics: 23
    multi-version packages and 53 unacknowledged lifecycle scripts (1 consumer,
    52 maintainer); neither became an error.
19. **GitHub workflow command.** `tspack workflow run VitestCoreCI
    --ci-provider github`.
20. **GitHub run ID/URL.** First:
    [33270604470](https://github.com/yuechen-li-dev/vitest-tspack/actions/runs/33270604470),
    job `99148284950`. Repeat:
    [33270649801](https://github.com/yuechen-li-dev/vitest-tspack/actions/runs/33270649801),
    job `99148405220`.
21. **GitHub terminal result.** Both jobs and every required step succeeded;
    durations were 45 seconds and 77 seconds.
22. **Expect build result.** `@vitest/expect:package` succeeded through native
    BuildTarget/Rollup.
23. **Snapshot build result.** `@vitest/snapshot:package` succeeded through
    native BuildTarget/Rollup.
24. **Build artifact counts.** Expect 2; snapshot 8, in both human logs.
25. **Build artifact fidelity.** The BuildTargets validated the complete
    declared sets. Final local JSON hashes match the retained M80a3/M80b oracle;
    remote human mode exposed all member paths. Remote hashes were not retained
    separately.
26. **Basic-threads result.** 8 passed, 0 failed, 1 skipped in both remote
    runs.
27. **Snapshot-threads result.** 16 passed, 0 failed, 0 skipped in both remote
    runs.
28. **Test evidence preservation.** Native TestTarget parsing retained typed
    counts and assertion identities. Actual failed qualification runs retained
    exact TSPack diagnostic codes and paths; controlled assertion evidence from
    M80b remains the assertion-level failure proof.
29. **Human log quality.** Target/branch starts, artifact paths, test totals,
    compiler diagnostics, and terminal workflow state are directly readable.
    Per-entry sync progress is verbose and is logged as P3 friction.
30. **JSON output status.** Final local `--json` output parsed and retained the
    same typed effect values. The remote human workflow was intentionally not
    duplicated with a second semantic run or permanent artifact upload; each
    TestTarget still wrote its bounded temporary Vitest JSON report.
31. **Local-vs-remote parity.** Same Flow identity, four effect identities,
    2/8 artifact counts, 8/0/1 and 16/0/0 tests, branch parallelism, and
    terminal `succeeded` state.
32. **Failure triage.** Run `33269030681`: `DependencyRealization` and
    `FilesystemBehavior` (workspace hashes and tar directory modes). Clean
    local replay: `DependencyRealization`/`TestTarget` (ignored harness build).
    Run `33270177934`: `InstalledTSPack`/`BuildTarget` (pre-build check required
    generated declarations). Each received one bounded general fix before the
    same runner was retried.
33. **Parallelism behavior.** The two Build effects started together. After
    both builds, the two Test effects started together; both remote runs
    preserved this topology.
34. **Cancellation status.** Remote manual cancellation deferred because the
    final job completes in seconds after realization. M80b locally proved
    cancellation and zero orphan process trees.
35. **Timeout status.** No remote workflow timeout. M80b's bounded local
    timeout contract remains green.
36. **Setup-action validation.** Exact tag selection; release/archive and
    checksums download; SHA-256 verification before extraction; PATH/output
    setup; Linux/darwin x64+arm64 and Windows x64 mapping; actionable
    unsupported-platform, download, checksum, extraction, version-floor, and
    smoke failures. Setup-action tests passed.
37. **Supply-chain/integrity handling.** Immutable release tag selected the
    action commit; the archive is verified against same-release
    `checksums.txt` before extraction. No curl-pipe-shell or unpublished
    artifact is involved.
38. **Export drift.** `tspack workflow export github VitestCoreCI --check`
    reports the provider artifact current.
39. **Generated/handwritten boundary.** `manifest.tsx` and Flow are semantic
    truth. The generated YAML is provider plumbing. The setup action is the
    reusable handwritten distribution adapter, not lifecycle semantics.
40. **Provider-specific hacks count.** Zero semantic hacks outside the
    adapter/export layer.
41. **Friction ledger changes.** Added F-022 through F-027 for installability,
    hosted browser qualification, portable workspace/tar realization, clean
    harness selection, release races, and pre-build check behavior.
42. **PVT severity.** P0: unavailable released setup path (resolved). P1:
    workspace/tar portability, clean harness, and pre-build check (resolved).
    P2: hosted browser timing/race qualification (resolved). P3: verbose sync
    logs and GitHub's Node-20-action-runtime deprecation annotation (open UX).
43. **Source dives required.** Three remote failure classes required TSPack
    source inspection: artifact/store extraction, harness realization, and
    project check/type-surface policy. Diagnostics isolated exact failing
    paths/codes, but this remains PVT friction.
44. **Cache status.** No GitHub cache configured or required.
45. **Repeat remote run result.** Run `33270649801` passed unchanged at the
    same Vitest and TSPack SHAs with identical semantic results.
46. **Upstream oracle health.** Root `pnpm run typecheck` passed; broad root
    `pnpm run build` passed for 14 packages. Final TSPack clean sync then
    replaced that materialization before target validation.
47. **Local TSPack validation.** `go test ./cmd/... ./internal/... ./tools/...`
    passed; manifest frontend 255 passed/2 skipped plus build and source/API
    typechecks; VS Code compile and 35 tests; setup-action tests; affected
    check/store/workflow/export tests passed.
48. **Vitest validation.** Final update +0/-0, clean sync, check, both
    individual builds, both individual tests, and `VitestCoreCI --jobs 4`
    passed with expected artifacts/counts.
49. **`git diff --check`.** Passed in both repositories.
50. **Authority inversion decision.** `KeepRemoved`: there is no dedicated old
    bounded job to restore. Keep the generated job authoritative for the slice
    and keep the broad upstream matrix until its remaining semantics migrate.
51. **M80c gate decision.** Open. Actual thin-runner consumption works through
    an installable release, and local/remote semantics agree twice.
52. **Outcome.** A — Success.
53. **Deviations.** Zero old jobs were deleted because audit found no safely
    separable whole job. Remote cancellation and remote workflow-level JSON
    artifact retention were deferred; neither is needed for the clean green
    gate. The release is a bounded prerelease, not an unrelated stable release.
54. **Exact recommended next step.** Begin M80c only by selecting one additional
    currently upstream-owned semantic slice; do not remove `ci.yml:test` until
    all responsibilities of the chosen job are explicitly mapped and replaced.

## Workflow responsibility inventory

| Workflow/job | Current purpose | Covered by VitestCoreCI? | Classification | Action |
|---|---|---:|---|---|
| `ci.yml:lint` | lint, typecheck, format, build validation | No | OutOfScopeButStillNeeded | Preserve |
| `ci.yml:changed` | changed-suite discovery | No | OutOfScopeButStillNeeded | Preserve |
| `ci.yml:playwright-deps-image` | browser dependency image | No | BrowserOnly | Preserve |
| `ci.yml:test` | broad unit/coverage/Node/OS matrix | Partially, only four effects | OutOfScopeButStillNeeded | Preserve; not safely deletable |
| `ci.yml:test-browser-windows` | Windows browser matrix | No | PlatformSpecific / BrowserOnly | Preserve |
| `ci.yml:test-browser-linux` | Linux browser matrix | No | BrowserOnly | Preserve |
| `ci.yml:test-vite7` | Vite 7 compatibility suites | No | OutOfScopeButStillNeeded | Preserve |
| `ci.yml:merge-reports` | coverage/report aggregation | No | OutOfScopeButStillNeeded | Preserve |
| `cr.yml:release` | pkg.pr.new continuous release | No | ReleaseOnly | Preserve |
| `ecosystem-ci-trigger.yml:trigger` | ecosystem CI dispatch | No | OutOfScopeButStillNeeded | Preserve |
| `issue-close-require.yml:close-stale` | issue/PR maintenance | No | OutOfScopeButStillNeeded | Preserve |
| `issue-labeled.yml:*` | issue/PR label automation | No | OutOfScopeButStillNeeded | Preserve |
| `knip.yml:knip` | dead-code analysis | No | OutOfScopeButStillNeeded | Preserve |
| `lock-closed-issues.yml:action` | issue locking | No | OutOfScopeButStillNeeded | Preserve |
| `pr-labeled-automated.yml:agentscan` | automated-PR security labeling | No | OutOfScopeButStillNeeded | Preserve |
| `prepare-publish.yml:prepare` | release PR preparation | No | ReleaseOnly | Preserve |
| `publish.yml:detect,publish` | package publication | No | ReleaseOnly | Preserve |
| `semgrep.yml:semgrep` | security scanning | No | OutOfScopeButStillNeeded | Preserve |
| `zizmor.yml:zizmor` | Actions security analysis | No | OutOfScopeButStillNeeded | Preserve |
| `tspack-vitestcoreci.yml:tspack` | bounded native Flow | Yes | StillNeededForFlagship | Keep generated authority |

## Authority boundary

```text
TSPack-owned now:
  VitestCoreCI bounded build/test slice

Still upstream-owned:
  everything outside that slice
```

