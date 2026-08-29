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
 * Generated migration draft for test/typescript/package.json.
 * Identity and package.json dependency sections are compatibility-derived facts.
 * MIGRATION_TODO_* comments mark unresolved or manually authored semantics.
 */
const deps = defineDeps({
  vitest: dep(workspace("vitest")),
  typescript: tool(npm("typescript", "^5.9.3")),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  vueTsc: tool(npm("vue-tsc", "^3.3.11"), { key: "vue-tsc" }),
});

// MIGRATION_TODO_TARGETS: Author build, test, run, and publish intent from repository evidence.
export default definePackage(
  <Package
    name="@vitest/test-typescript"
    version="0.0.0"
    kind="library"
    dependencies={{ values: [deps.vitest, deps.typescript, deps.vueTsc] }}
  >
    {/* MIGRATION_TODO_PUBLISH: compatibility-derived include; verify with tspack pack --dry-run. */}
    <Publish include={["dist/**", "README.md", "LICENSE"]} exclude={[]} />
  </Package>,
);
