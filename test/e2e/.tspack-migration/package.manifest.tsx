import {
  Package,
  Publish,
  defineDeps,
  definePackage,
  dep,
  npm,
  path,
  peer,
  tool,
  workspace,
} from "tspack/manifest";

/**
 * Generated migration draft for test/e2e/package.json.
 * Identity and package.json dependency sections are compatibility-derived facts.
 * MIGRATION_TODO_* comments mark unresolved or manually authored semantics.
 */
const deps = defineDeps({
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  opentelemetryApi: tool(npm("@opentelemetry/api", "^1.9.1"), { key: "@opentelemetry/api" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  opentelemetrySdkNode: tool(npm("@opentelemetry/sdk-node", "^0.221.0"), { key: "@opentelemetry/sdk-node" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  opentelemetrySdkTraceWeb: tool(npm("@opentelemetry/sdk-trace-web", "^2.10.0"), { key: "@opentelemetry/sdk-trace-web" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  testPkgReporter: tool(path("deps/pkg-reporter"), { key: "@test/pkg-reporter" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  testTestDepConfig: tool(path("deps/test-dep-config"), { key: "@test/test-dep-config" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  testTestDepError: tool(path("deps/error"), { key: "@test/test-dep-error" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  testTestDepLinked: tool(path("deps/linked"), { key: "@test/test-dep-linked" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  testTestDepMalformedSourceMap: tool(path("deps/malformed-source-map"), { key: "@test/test-dep-malformed-source-map" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  testTestDepUrl: tool(path("deps/dep-url"), { key: "@test/test-dep-url" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  typesWs: tool(npm("@types/ws", "^8.18.1"), { key: "@types/ws" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  vitejsPluginBasicSsl: tool(npm("@vitejs/plugin-basic-ssl", "^2.3.0"), { key: "@vitejs/plugin-basic-ssl" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  vitejsTestDepVirtual: tool(path("deps/test-dep-virtual"), { key: "@vitejs/test-dep-virtual" }),
  vitestBrowserPlaywright: tool(workspace("@vitest/browser-playwright"), { key: "@vitest/browser-playwright" }),
  vitestBrowserPreview: tool(workspace("@vitest/browser-preview"), { key: "@vitest/browser-preview" }),
  vitestCoverageV8: tool(workspace("@vitest/coverage-v8"), { key: "@vitest/coverage-v8" }),
  vitestMocker: tool(workspace("@vitest/mocker"), { key: "@vitest/mocker" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  vitestTestDepOptimizerExternal: tool(path("deps/optimizer/external"), { key: "@vitest/test-dep-optimizer-external" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  vitestTestDepOptimizerOptimized: tool(path("deps/optimizer/optimized"), { key: "@vitest/test-dep-optimizer-optimized" }),
  vitestUtils: tool(workspace("@vitest/utils"), { key: "@vitest/utils" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  ansivision: tool(npm("ansivision", "^0.4.0")),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  flatted: tool(npm("flatted", "^3.4.4")),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  inlineDep: tool(path("deps/vite-ssr-resolve/inline-dep"), { key: "inline-dep" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  jestImageSnapshot: tool(npm("jest-image-snapshot", "^6.5.2"), { key: "jest-image-snapshot" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  obug: tool(npm("obug", "^2.1.4")),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  otherDep: tool(path("deps/vite-ssr-resolve/other-dep"), { key: "other-dep" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  pathe: tool(npm("pathe", "^2.0.3")),
  playwright: tool(npm("playwright", "^1.62.1")),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  ssrNoExternalDep: tool(path("deps/vite-ssr-resolve/ssr-no-external-dep"), { key: "ssr-no-external-dep" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  testDepConditions: tool(path("deps/test-dep-conditions"), { key: "test-dep-conditions" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  testDepInvalid: tool(path("deps/dep-invalid"), { key: "test-dep-invalid" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  testDepSimple: tool(path("deps/dep-simple"), { key: "test-dep-simple" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  testDepSimple2: tool(path("deps/dep-simple2"), { key: "test-dep-simple2" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  tinyexec: tool(npm("tinyexec", "1.3.0")),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  tinyspy: tool(npm("tinyspy", "^4.0.4")),
  typescript: tool(npm("typescript", "^5.9.3")),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  unpluginSwc: tool(npm("unplugin-swc", "^1.5.11"), { key: "unplugin-swc" }),
  vite: tool(npm("vite", "latest")),
  vitest: tool(workspace("vitest")),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  vitestSonarReporter: tool(npm("vitest-sonar-reporter", "3.0.0"), { key: "vitest-sonar-reporter" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  ws: tool(npm("ws", "^8.21.3")),
});

// MIGRATION_TODO_TARGETS: Author build, test, run, and publish intent from repository evidence.
export default definePackage(
  <Package
    name="@vitest/test-e2e"
    version="0.0.0"
    kind="app"
    dependencies={{ values: [deps.opentelemetryApi, deps.opentelemetrySdkNode, deps.opentelemetrySdkTraceWeb, deps.testPkgReporter, deps.testTestDepConfig, deps.testTestDepError, deps.testTestDepLinked, deps.testTestDepMalformedSourceMap, deps.testTestDepUrl, deps.typesWs, deps.vitejsPluginBasicSsl, deps.vitejsTestDepVirtual, deps.vitestBrowserPlaywright, deps.vitestBrowserPreview, deps.vitestCoverageV8, deps.vitestMocker, deps.vitestTestDepOptimizerExternal, deps.vitestTestDepOptimizerOptimized, deps.vitestUtils, deps.ansivision, deps.flatted, deps.inlineDep, deps.jestImageSnapshot, deps.obug, deps.otherDep, deps.pathe, deps.playwright, deps.ssrNoExternalDep, deps.testDepConditions, deps.testDepInvalid, deps.testDepSimple, deps.testDepSimple2, deps.tinyexec, deps.tinyspy, deps.typescript, deps.unpluginSwc, deps.vite, deps.vitest, deps.vitestSonarReporter, deps.ws] }}
  />,
);
