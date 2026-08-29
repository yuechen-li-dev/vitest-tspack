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
 * Generated migration draft for examples/typecheck/package.json.
 * Identity and package.json dependency sections are compatibility-derived facts.
 * MIGRATION_TODO_* comments mark unresolved or manually authored semantics.
 */
const deps = defineDeps({
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  typesNode: tool(npm("@types/node", "^24.13.3"), { key: "@types/node" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  vitestUi: tool(npm("@vitest/ui", "latest"), { key: "@vitest/ui" }),
  typescript: tool(npm("typescript", "^5.9.3")),
  vite: tool(npm("vite", "latest")),
  vitest: tool(npm("vitest", "latest")),
});

// MIGRATION_TODO_TARGETS: Author build, test, run, and publish intent from repository evidence.
export default definePackage(
  <Package
    name="@vitest/example-typecheck"
    version="0.0.0"
    license="MIT"
    kind="library"
    dependencies={{ values: [deps.typesNode, deps.vitestUi, deps.typescript, deps.vite, deps.vitest] }}
  >
    {/* MIGRATION_TODO_PUBLISH: compatibility-derived include; verify with tspack pack --dry-run. */}
    <Publish include={["dist/**", "README.md", "LICENSE"]} exclude={[]} />
  </Package>,
);
