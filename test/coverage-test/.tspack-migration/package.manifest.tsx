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
 * Generated migration draft for test/coverage-test/package.json.
 * Identity and package.json dependency sections are compatibility-derived facts.
 * MIGRATION_TODO_* comments mark unresolved or manually authored semantics.
 */
const deps = defineDeps({
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  jridgewellRemapping: tool(npm("@jridgewell/remapping", "^2.3.5"), { key: "@jridgewell/remapping" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  vitejsPluginVue: tool(npm("@vitejs/plugin-vue", "^6.0.8"), { key: "@vitejs/plugin-vue" }),
  vitestBrowserPlaywright: tool(workspace("@vitest/browser-playwright"), { key: "@vitest/browser-playwright" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  vitestCjsLib: tool(path("../browser/cjs-lib"), { key: "@vitest/cjs-lib" }),
  vitestCoverageIstanbul: tool(workspace("@vitest/coverage-istanbul"), { key: "@vitest/coverage-istanbul" }),
  vitestCoverageV8: tool(workspace("@vitest/coverage-v8"), { key: "@vitest/coverage-v8" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  vitestIstanbulLibCoverage: tool(npm("@vitest/istanbul-lib-coverage", "^1.0.0"), { key: "@vitest/istanbul-lib-coverage" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  vitestIstanbulLibReport: tool(npm("@vitest/istanbul-lib-report", "^1.0.0"), { key: "@vitest/istanbul-lib-report" }),
  vitestUtils: tool(workspace("@vitest/utils"), { key: "@vitest/utils" }),
  vitestWebWorker: tool(workspace("@vitest/web-worker"), { key: "@vitest/web-worker" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  vueTestUtils: tool(npm("@vue/test-utils", "^2.4.11"), { key: "@vue/test-utils" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  happyDom: tool(npm("happy-dom", "^20.11.6"), { key: "happy-dom" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  magicString: tool(npm("magic-string", "^1.2.2"), { key: "magic-string" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  magicast: tool(npm("magicast", "^0.5.4")),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  sassEmbedded: tool(npm("sass-embedded", "^1.103.1"), { key: "sass-embedded" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  unpluginSwc: tool(npm("unplugin-swc", "^1.5.11"), { key: "unplugin-swc" }),
  vite: tool(npm("vite", "latest")),
  vitest: tool(workspace("vitest")),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  vue: tool(npm("vue", "^3.5.41")),
});

// MIGRATION_TODO_TARGETS: Author build, test, run, and publish intent from repository evidence.
export default definePackage(
  <Package
    name="@vitest/test-coverage"
    version="0.0.0"
    kind="app"
    dependencies={{ values: [deps.jridgewellRemapping, deps.vitejsPluginVue, deps.vitestBrowserPlaywright, deps.vitestCjsLib, deps.vitestCoverageIstanbul, deps.vitestCoverageV8, deps.vitestIstanbulLibCoverage, deps.vitestIstanbulLibReport, deps.vitestUtils, deps.vitestWebWorker, deps.vueTestUtils, deps.happyDom, deps.magicString, deps.magicast, deps.sassEmbedded, deps.unpluginSwc, deps.vite, deps.vitest, deps.vue] }}
  />,
);
