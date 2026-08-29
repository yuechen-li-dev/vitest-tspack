import { Packages, Workspace, defineWorkspace } from "tspack/manifest";

/**
 * M80a1 hand-finished TSPack project skeleton.
 *
 * Package roots, identities, and dependency contracts were reviewed from the
 * deterministic migration draft. Package-local generated contracts remain in
 * `.tspack-migration` as a temporary compatibility bridge so the first native
 * check/update/sync loop can exercise the real 41-project graph without
 * pretending build and test semantics have already been authored.
 */
export default defineWorkspace(
  <Workspace name="vitest">
    <Packages
      rows={[
        { name: "@vitest/monorepo", root: ".", manifest: ".tspack-migration/package.manifest.tsx" },
        { name: "docs", root: "docs", manifest: "docs/.tspack-migration/package.manifest.tsx" },
        { name: "@vitest/example-test", root: "examples/basic", manifest: "examples/basic/.tspack-migration/package.manifest.tsx" },
        { name: "@vitest/example-fastify", root: "examples/fastify", manifest: "examples/fastify/.tspack-migration/package.manifest.tsx" },
        { name: "@vitest/example-in-source-test", root: "examples/in-source-test", manifest: "examples/in-source-test/.tspack-migration/package.manifest.tsx" },
        { name: "@vitest/example-lit", root: "examples/lit", manifest: "examples/lit/.tspack-migration/package.manifest.tsx" },
        { name: "@vitest/example-opentelemetry", root: "examples/opentelemetry", manifest: "examples/opentelemetry/.tspack-migration/package.manifest.tsx" },
        { name: "@vitest/example-profiling", root: "examples/profiling", manifest: "examples/profiling/.tspack-migration/package.manifest.tsx" },
        { name: "@vitest/example-projects", root: "examples/projects", manifest: "examples/projects/.tspack-migration/package.manifest.tsx" },
        { name: "@vitest/example-typecheck", root: "examples/typecheck", manifest: "examples/typecheck/.tspack-migration/package.manifest.tsx" },
        { name: "@vitest/browser", root: "packages/browser", manifest: "packages/browser/.tspack-migration/package.manifest.tsx" },
        { name: "@vitest/browser-playwright", root: "packages/browser-playwright", manifest: "packages/browser-playwright/.tspack-migration/package.manifest.tsx" },
        { name: "@vitest/browser-preview", root: "packages/browser-preview", manifest: "packages/browser-preview/.tspack-migration/package.manifest.tsx" },
        { name: "@vitest/coverage-istanbul", root: "packages/coverage-istanbul", manifest: "packages/coverage-istanbul/.tspack-migration/package.manifest.tsx" },
        { name: "@vitest/coverage-v8", root: "packages/coverage-v8", manifest: "packages/coverage-v8/.tspack-migration/package.manifest.tsx" },
        { name: "@vitest/expect", root: "packages/expect", manifest: "packages/expect/.tspack-migration/package.manifest.tsx" },
        { name: "@vitest/mocker", root: "packages/mocker", manifest: "packages/mocker/.tspack-migration/package.manifest.tsx" },
        { name: "@vitest/pretty-format", root: "packages/pretty-format", manifest: "packages/pretty-format/.tspack-migration/package.manifest.tsx" },
        { name: "@vitest/snapshot", root: "packages/snapshot", manifest: "packages/snapshot/.tspack-migration/package.manifest.tsx" },
        { name: "@vitest/spy", root: "packages/spy", manifest: "packages/spy/.tspack-migration/package.manifest.tsx" },
        { name: "@vitest/ui", root: "packages/ui", manifest: "packages/ui/.tspack-migration/package.manifest.tsx" },
        { name: "@vitest/utils", root: "packages/utils", manifest: "packages/utils/.tspack-migration/package.manifest.tsx" },
        { name: "vitest", root: "packages/vitest", manifest: "packages/vitest/.tspack-migration/package.manifest.tsx" },
        { name: "@vitest/web-worker", root: "packages/web-worker", manifest: "packages/web-worker/.tspack-migration/package.manifest.tsx" },
        { name: "@vitest/test-browser", root: "test/browser", manifest: "test/browser/.tspack-migration/package.manifest.tsx" },
        { name: "@vitest/test-coverage", root: "test/coverage-test", manifest: "test/coverage-test/.tspack-migration/package.manifest.tsx" },
        { name: "@vitest/test-e2e", root: "test/e2e", manifest: "test/e2e/.tspack-migration/package.manifest.tsx" },
        { name: "@vitest/test-integration-dts-browser-playwright", root: "test/e2e/dts/browser-playwright", manifest: "test/e2e/dts/browser-playwright/.tspack-migration/package.manifest.tsx" },
        { name: "@vitest/test-integration-dts-config", root: "test/e2e/dts/config", manifest: "test/e2e/dts/config/.tspack-migration/package.manifest.tsx" },
        { name: "@vitest/test-integration-dts-exact-optional-property--tspack-test-e2e-dts-exact-optional-property-no-node", root: "test/e2e/dts/exact-optional-property-no-node", manifest: "test/e2e/dts/exact-optional-property-no-node/.tspack-migration/package.manifest.tsx" },
        { name: "@vitest/test-integration-dts-exact-optional-property--tspack-test-e2e-dts-exact-optional-property-node", root: "test/e2e/dts/exact-optional-property-node", manifest: "test/e2e/dts/exact-optional-property-node/.tspack-migration/package.manifest.tsx" },
        { name: "@vitest/test-integration-dts-fixture-extend", root: "test/e2e/dts/fixture-extend", manifest: "test/e2e/dts/fixture-extend/.tspack-migration/package.manifest.tsx" },
        { name: "@vitest/test-integration-dts-exact-optional-property--tspack-test-e2e-dts-no-dispose", root: "test/e2e/dts/no-dispose", manifest: "test/e2e/dts/no-dispose/.tspack-migration/package.manifest.tsx" },
        { name: "conditions", root: "test/e2e/fixtures/conditions-pkg", manifest: "test/e2e/fixtures/conditions-pkg/.tspack-migration/package.manifest.tsx" },
        { name: "@test/node-runner", root: "test/node-runner", manifest: "test/node-runner/.tspack-migration/package.manifest.tsx" },
        { name: "@vitest/internal-testing-helpers", root: "test/test-utils", manifest: "test/test-utils/.tspack-migration/package.manifest.tsx" },
        { name: "@vitest/test-typescript", root: "test/typescript", manifest: "test/typescript/.tspack-migration/package.manifest.tsx" },
        { name: "@vitest/test-ui", root: "test/ui", manifest: "test/ui/.tspack-migration/package.manifest.tsx" },
        { name: "@vitest/test-unit", root: "test/unit", manifest: "test/unit/.tspack-migration/package.manifest.tsx" },
        { name: "@vitest/test-workspaces", root: "test/workspaces", manifest: "test/workspaces/.tspack-migration/package.manifest.tsx" },
        { name: "@vitest/test-workspaces-browser", root: "test/workspaces-browser", manifest: "test/workspaces-browser/.tspack-migration/package.manifest.tsx" },
      ]}
    />
  </Workspace>,
);
