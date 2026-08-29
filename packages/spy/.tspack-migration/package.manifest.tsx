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
 * Generated migration draft for packages/spy/package.json.
 * Identity and package.json dependency sections are compatibility-derived facts.
 * MIGRATION_TODO_* comments mark unresolved or manually authored semantics.
 */
export default definePackage(
  <Package
    name="@vitest/spy"
    version="5.0.0-rc.3"
    license="MIT"
    kind="library"
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
        types: "dist/index.d.ts",
        artifacts: [
          { name: "runtime", kind: "javaScript", path: "dist/*.js", role: "runtimeEntry" },
          { name: "types", kind: "typeDeclarations", path: "dist/*.d.ts", role: "typeDeclaration" },
        ],
        deps: [],
        peers: [],
      }]}
    />
    {/* MIGRATION_TODO_PUBLISH: compatibility-derived include; verify with tspack pack --dry-run. */}
    <Publish include={["dist", "optional-types.d.ts"]} exclude={[]} />
  </Package>,
);
