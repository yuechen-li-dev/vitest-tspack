# TSPack Migration Report

## Inputs

- root: `C:\Users\yuech\source\repos\vitest-tspack`
- workspace config: `C:\Users\yuech\source\repos\vitest-tspack\pnpm-workspace.yaml`
- generated root draft: `C:\Users\yuech\source\repos\vitest-tspack\manifest.migrated.tsx`

## Workspace summary

- workspace packages discovered: 41
- workspace references resolved/unresolved: 85/85 resolved, 0 unresolved
- catalog references resolved/unresolved: 116/116 resolved, 0 unresolved
- npm aliases recovered: 2
- local path/link references recovered: 31
- packages requiring manual semantic completion: 41

High-confidence inferred facts: workspace roots, package identities, package versions, dependency section kinds, unambiguous workspace identities, and catalog versions.

## Workspace globs

- include `docs`
- include `packages/*`
- include `examples/*`
- include `test/*`
- include `test/e2e/dts/*`
- include `test/e2e/fixtures/conditions-pkg`

Matched directories without package.json were validated and skipped:
- `test/e2e/dts/_shared`

## Generated package contracts

- `@vitest/monorepo` — root `.`, draft `.tspack-migration/package.manifest.tsx`
- `docs` — root `docs`, draft `docs/.tspack-migration/package.manifest.tsx`
- `@vitest/example-test` — root `examples/basic`, draft `examples/basic/.tspack-migration/package.manifest.tsx`
- `@vitest/example-fastify` — root `examples/fastify`, draft `examples/fastify/.tspack-migration/package.manifest.tsx`
- `@vitest/example-in-source-test` — root `examples/in-source-test`, draft `examples/in-source-test/.tspack-migration/package.manifest.tsx`
- `@vitest/example-lit` — root `examples/lit`, draft `examples/lit/.tspack-migration/package.manifest.tsx`
- `@vitest/example-opentelemetry` — root `examples/opentelemetry`, draft `examples/opentelemetry/.tspack-migration/package.manifest.tsx`
- `@vitest/example-profiling` — root `examples/profiling`, draft `examples/profiling/.tspack-migration/package.manifest.tsx`
- `@vitest/example-projects` — root `examples/projects`, draft `examples/projects/.tspack-migration/package.manifest.tsx`
- `@vitest/example-typecheck` — root `examples/typecheck`, draft `examples/typecheck/.tspack-migration/package.manifest.tsx`
- `@vitest/browser` — root `packages/browser`, draft `packages/browser/.tspack-migration/package.manifest.tsx`
- `@vitest/browser-playwright` — root `packages/browser-playwright`, draft `packages/browser-playwright/.tspack-migration/package.manifest.tsx`
- `@vitest/browser-preview` — root `packages/browser-preview`, draft `packages/browser-preview/.tspack-migration/package.manifest.tsx`
- `@vitest/coverage-istanbul` — root `packages/coverage-istanbul`, draft `packages/coverage-istanbul/.tspack-migration/package.manifest.tsx`
- `@vitest/coverage-v8` — root `packages/coverage-v8`, draft `packages/coverage-v8/.tspack-migration/package.manifest.tsx`
- `@vitest/expect` — root `packages/expect`, draft `packages/expect/.tspack-migration/package.manifest.tsx`
- `@vitest/mocker` — root `packages/mocker`, draft `packages/mocker/.tspack-migration/package.manifest.tsx`
- `@vitest/pretty-format` — root `packages/pretty-format`, draft `packages/pretty-format/.tspack-migration/package.manifest.tsx`
- `@vitest/snapshot` — root `packages/snapshot`, draft `packages/snapshot/.tspack-migration/package.manifest.tsx`
- `@vitest/spy` — root `packages/spy`, draft `packages/spy/.tspack-migration/package.manifest.tsx`
- `@vitest/ui` — root `packages/ui`, draft `packages/ui/.tspack-migration/package.manifest.tsx`
- `@vitest/utils` — root `packages/utils`, draft `packages/utils/.tspack-migration/package.manifest.tsx`
- `vitest` — root `packages/vitest`, draft `packages/vitest/.tspack-migration/package.manifest.tsx`
- `@vitest/web-worker` — root `packages/web-worker`, draft `packages/web-worker/.tspack-migration/package.manifest.tsx`
- `@vitest/test-browser` — root `test/browser`, draft `test/browser/.tspack-migration/package.manifest.tsx`
- `@vitest/test-coverage` — root `test/coverage-test`, draft `test/coverage-test/.tspack-migration/package.manifest.tsx`
- `@vitest/test-e2e` — root `test/e2e`, draft `test/e2e/.tspack-migration/package.manifest.tsx`
- `@vitest/test-integration-dts-browser-playwright` — root `test/e2e/dts/browser-playwright`, draft `test/e2e/dts/browser-playwright/.tspack-migration/package.manifest.tsx`
- `@vitest/test-integration-dts-config` — root `test/e2e/dts/config`, draft `test/e2e/dts/config/.tspack-migration/package.manifest.tsx`
- `@vitest/test-integration-dts-exact-optional-property--tspack-test-e2e-dts-exact-optional-property-no-node` — root `test/e2e/dts/exact-optional-property-no-node`, draft `test/e2e/dts/exact-optional-property-no-node/.tspack-migration/package.manifest.tsx`
- `@vitest/test-integration-dts-exact-optional-property--tspack-test-e2e-dts-exact-optional-property-node` — root `test/e2e/dts/exact-optional-property-node`, draft `test/e2e/dts/exact-optional-property-node/.tspack-migration/package.manifest.tsx`
- `@vitest/test-integration-dts-fixture-extend` — root `test/e2e/dts/fixture-extend`, draft `test/e2e/dts/fixture-extend/.tspack-migration/package.manifest.tsx`
- `@vitest/test-integration-dts-exact-optional-property--tspack-test-e2e-dts-no-dispose` — root `test/e2e/dts/no-dispose`, draft `test/e2e/dts/no-dispose/.tspack-migration/package.manifest.tsx`
- `conditions` — root `test/e2e/fixtures/conditions-pkg`, draft `test/e2e/fixtures/conditions-pkg/.tspack-migration/package.manifest.tsx`
- `@test/node-runner` — root `test/node-runner`, draft `test/node-runner/.tspack-migration/package.manifest.tsx`
- `@vitest/internal-testing-helpers` — root `test/test-utils`, draft `test/test-utils/.tspack-migration/package.manifest.tsx`
- `@vitest/test-typescript` — root `test/typescript`, draft `test/typescript/.tspack-migration/package.manifest.tsx`
- `@vitest/test-ui` — root `test/ui`, draft `test/ui/.tspack-migration/package.manifest.tsx`
- `@vitest/test-unit` — root `test/unit`, draft `test/unit/.tspack-migration/package.manifest.tsx`
- `@vitest/test-workspaces` — root `test/workspaces`, draft `test/workspaces/.tspack-migration/package.manifest.tsx`
- `@vitest/test-workspaces-browser` — root `test/workspaces-browser`, draft `test/workspaces-browser/.tspack-migration/package.manifest.tsx`

## Unresolved facts and TODOs

TSPack package identities must be unique. These duplicate compatibility identities received deterministic draft-only identities and require semantic review:
- `test/e2e/dts/exact-optional-property-no-node`: package.json `@vitest/test-integration-dts-exact-optional-property` -> draft `@vitest/test-integration-dts-exact-optional-property--tspack-test-e2e-dts-exact-optional-property-no-node`
- `test/e2e/dts/exact-optional-property-node`: package.json `@vitest/test-integration-dts-exact-optional-property` -> draft `@vitest/test-integration-dts-exact-optional-property--tspack-test-e2e-dts-exact-optional-property-node`
- `test/e2e/dts/no-dispose`: package.json `@vitest/test-integration-dts-exact-optional-property` -> draft `@vitest/test-integration-dts-exact-optional-property--tspack-test-e2e-dts-no-dispose`

No workspace or catalog references were unresolved. Package-local semantic TODOs remain.

## Unsupported constructs

- pnpm overrides, patches, lifecycle allowlists, release/CI policy, and arbitrary scripts remain compatibility evidence; they are not imported as TSPack semantic truth.
- optional runtime dependencies are emitted as reviewable deps because TSPack currently has optional semantics only for peers.
- targets, compiler configuration, build topology, and test topology require repository-aware semantic authoring.

## Validation

Status: passed. The composed draft passed the manifest frontend and Go IR validation.
- Remaining conservative TODO units: 561

## Suggested next steps

1. Review `manifest.migrated.tsx` and each `.tspack-migration/package.manifest.tsx` draft.
2. Resolve 0 workspace/catalog TODOs plus package-local semantic TODOs.
3. Promote the reviewed root to `manifest.tsx` and package drafts to package-local `package.manifest.tsx`; lifecycle commands intentionally reject the root draft filename.
4. Run `tspack check`.
5. Run `tspack update`, then `tspack sync`, as appropriate for native dependency realization.

This is a mechanical migration draft, not a claim of complete project semantics.
