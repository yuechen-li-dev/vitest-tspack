import {
  Package,
  Publish,
  Targets,
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
 * Generated migration draft for packages/web-worker/package.json.
 * Identity and package.json dependency sections are compatibility-derived facts.
 * MIGRATION_TODO_* comments mark unresolved or manually authored semantics.
 */
const deps = defineDeps({
  vitest: peer(workspace("vitest")),
  obug: dep(npm("obug", "^2.1.4")),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  typesUngapStructuredClone: tool(npm("@types/ungap__structured-clone", "^1.2.0"), { key: "@types/ungap__structured-clone" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  ungapStructuredClone: tool(npm("@ungap/structured-clone", "1.3.3"), { key: "@ungap/structured-clone" }),
});

export default definePackage(
  <Package
    name="@vitest/web-worker"
    version="5.0.0-rc.3"
    license="MIT"
    kind="library"
    dependencies={{ values: [deps.vitest, deps.obug, deps.typesUngapStructuredClone, deps.ungapStructuredClone] }}
  >
    <Targets
      rows={[{
        name: "package",
        language: "typescript",
        compiler: "rollup",
        compilerConfig: "rollup.config.js",
        inputs: ["src/**/*.ts", "rollup.config.js"],
        artifact: "javaScript",
        export: ".",
        entry: "src/index.ts",
        runtime: "dist/index.js",
        types: "dist/pure.d.ts",
        artifacts: [
          { name: "runtime", kind: "javaScript", path: "dist/*.js", role: "runtimeEntry" },
          { name: "types", kind: "typeDeclarations", path: "dist/*.d.ts", role: "typeDeclaration" },
        ],
        deps: ["@types/ungap__structured-clone", "@ungap/structured-clone", "obug"],
        peers: ["vitest"],
      }]}
    />
    {/* MIGRATION_TODO_PUBLISH: compatibility-derived include; verify with tspack pack --dry-run. */}
    <Publish include={["*.d.ts", "dist"]} exclude={[]} />
  </Package>,
);
