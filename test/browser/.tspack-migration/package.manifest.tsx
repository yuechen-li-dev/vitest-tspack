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
 * Generated migration draft for test/browser/package.json.
 * Identity and package.json dependency sections are compatibility-derived facts.
 * MIGRATION_TODO_* comments mark unresolved or manually authored semantics.
 */
const deps = defineDeps({
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  typesReact: tool(npm("@types/react", "^19.2.18"), { key: "@types/react" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  typesYauzl: tool(npm("@types/yauzl", "^3.4.0"), { key: "@types/yauzl" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  vitejsPluginBasicSsl: tool(npm("@vitejs/plugin-basic-ssl", "^2.3.0"), { key: "@vitejs/plugin-basic-ssl" }),
  vitestBrowser: tool(workspace("@vitest/browser"), { key: "@vitest/browser" }),
  vitestBrowserPlaywright: tool(workspace("@vitest/browser-playwright"), { key: "@vitest/browser-playwright" }),
  vitestBrowserPreview: tool(workspace("@vitest/browser-preview"), { key: "@vitest/browser-preview" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  vitestBundledLib: tool(path("bundled-lib"), { key: "@vitest/bundled-lib" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  vitestCjsLib: tool(path("cjs-lib"), { key: "@vitest/cjs-lib" }),
  playwright: tool(npm("playwright", "^1.62.1")),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  react: tool(npm("react", "^19.2.8")),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  reactDom: tool(npm("react-dom", "^19.2.8"), { key: "react-dom" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  testDepError: tool(path("deps/test-dep-error"), { key: "test-dep-error" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  tinyexec: tool(npm("tinyexec", "1.3.0")),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  url: tool(npm("url", "^0.11.4")),
  vitest: tool(workspace("vitest")),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  vitestBrowserReact: tool(npm("vitest-browser-react", "^2.2.0"), { key: "vitest-browser-react" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  ws: tool(npm("ws", "^8.21.3")),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  yauzl: tool(npm("yauzl", "^3.4.0")),
});

// MIGRATION_TODO_TARGETS: Author build, test, run, and publish intent from repository evidence.
export default definePackage(
  <Package
    name="@vitest/test-browser"
    version="0.0.0"
    kind="app"
    dependencies={{ values: [deps.typesReact, deps.typesYauzl, deps.vitejsPluginBasicSsl, deps.vitestBrowser, deps.vitestBrowserPlaywright, deps.vitestBrowserPreview, deps.vitestBundledLib, deps.vitestCjsLib, deps.playwright, deps.react, deps.reactDom, deps.testDepError, deps.tinyexec, deps.url, deps.vitest, deps.vitestBrowserReact, deps.ws, deps.yauzl] }}
  />,
);
