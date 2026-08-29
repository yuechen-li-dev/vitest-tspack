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
 * Generated migration draft for examples/lit/package.json.
 * Identity and package.json dependency sections are compatibility-derived facts.
 * MIGRATION_TODO_* comments mark unresolved or manually authored semantics.
 */
const deps = defineDeps({
  lit: dep(npm("lit", "^3.3.3")),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  vitestBrowserPlaywright: tool(npm("@vitest/browser-playwright", "latest"), { key: "@vitest/browser-playwright" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  jsdom: tool(npm("jsdom", "^29.1.1")),
  playwright: tool(npm("playwright", "^1.62.1")),
  vite: tool(npm("vite", "latest")),
  vitest: tool(npm("vitest", "latest")),
});

// MIGRATION_TODO_TARGETS: Author build, test, run, and publish intent from repository evidence.
export default definePackage(
  <Package
    name="@vitest/example-lit"
    version="0.0.0"
    kind="app"
    dependencies={{ values: [deps.lit, deps.vitestBrowserPlaywright, deps.jsdom, deps.playwright, deps.vite, deps.vitest] }}
  />,
);
