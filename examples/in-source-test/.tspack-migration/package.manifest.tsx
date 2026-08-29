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
 * Generated migration draft for examples/in-source-test/package.json.
 * Identity and package.json dependency sections are compatibility-derived facts.
 * MIGRATION_TODO_* comments mark unresolved or manually authored semantics.
 */
const deps = defineDeps({
  typescript: tool(npm("typescript", "^5.9.3")),
  vitest: tool(npm("vitest", "latest")),
});

// MIGRATION_TODO_TARGETS: Author build, test, run, and publish intent from repository evidence.
export default definePackage(
  <Package
    name="@vitest/example-in-source-test"
    version="0.0.0"
    kind="app"
    dependencies={{ values: [deps.typescript, deps.vitest] }}
  />,
);
