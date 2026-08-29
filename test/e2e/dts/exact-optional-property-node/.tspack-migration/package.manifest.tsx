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
 * Generated migration draft for test/e2e/dts/exact-optional-property-node/package.json.
 * Identity and package.json dependency sections are compatibility-derived facts.
 * MIGRATION_TODO_* comments mark unresolved or manually authored semantics.
 */
const deps = defineDeps({
  vitest: tool(workspace("vitest")),
});

// MIGRATION_TODO_TARGETS: Author build, test, run, and publish intent from repository evidence.
export default definePackage(
  <Package
    name="@vitest/test-integration-dts-exact-optional-property--tspack-test-e2e-dts-exact-optional-property-node"
    version="0.0.0"
    kind="app"
    dependencies={{ values: [deps.vitest] }}
  />,
);
