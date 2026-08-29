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
 * Generated migration draft for test/workspaces/package.json.
 * Identity and package.json dependency sections are compatibility-derived facts.
 * MIGRATION_TODO_* comments mark unresolved or manually authored semantics.
 */
const deps = defineDeps({
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  jridgewellRemapping: tool(npm("@jridgewell/remapping", "^2.3.5"), { key: "@jridgewell/remapping" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  vitestIstanbulLibCoverage: tool(npm("@vitest/istanbul-lib-coverage", "^1.0.0"), { key: "@vitest/istanbul-lib-coverage" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  jsdom: tool(npm("jsdom", "^29.1.1")),
  vitest: tool(workspace("vitest")),
});

// MIGRATION_TODO_TARGETS: Author build, test, run, and publish intent from repository evidence.
export default definePackage(
  <Package
    name="@vitest/test-workspaces"
    version="0.0.0"
    kind="app"
    dependencies={{ values: [deps.jridgewellRemapping, deps.vitestIstanbulLibCoverage, deps.jsdom, deps.vitest] }}
  />,
);
