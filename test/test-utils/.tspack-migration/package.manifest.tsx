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
 * Generated migration draft for test/test-utils/package.json.
 * Identity and package.json dependency sections are compatibility-derived facts.
 * MIGRATION_TODO_* comments mark unresolved or manually authored semantics.
 */
const deps = defineDeps({
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  tinyexec: tool(npm("tinyexec", "1.3.0")),
  vite: tool(npm("vite", "latest")),
  vitest: tool(workspace("vitest")),
});

// MIGRATION_TODO_TARGETS: Author build, test, run, and publish intent from repository evidence.
export default definePackage(
  <Package
    name="@vitest/internal-testing-helpers"
    version="0.0.0"
    kind="library"
    dependencies={{ values: [deps.tinyexec, deps.vite, deps.vitest] }}
  >
    {/* MIGRATION_TODO_PUBLISH: compatibility-derived include; verify with tspack pack --dry-run. */}
    <Publish include={["dist/**", "README.md", "LICENSE"]} exclude={[]} />
  </Package>,
);
