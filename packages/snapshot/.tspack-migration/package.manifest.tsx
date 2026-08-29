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
 * Generated migration draft for packages/snapshot/package.json.
 * Identity and package.json dependency sections are compatibility-derived facts.
 * MIGRATION_TODO_* comments mark unresolved or manually authored semantics.
 */
const deps = defineDeps({
  vitestPrettyFormat: dep(workspace("@vitest/pretty-format"), { key: "@vitest/pretty-format" }),
  vitestUtils: dep(workspace("@vitest/utils"), { key: "@vitest/utils" }),
  magicString: dep(npm("magic-string", "^1.2.2"), { key: "magic-string" }),
  pathe: dep(npm("pathe", "^2.0.3")),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  typesNaturalCompare: tool(npm("@types/natural-compare", "^1.4.3"), { key: "@types/natural-compare" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  naturalCompare: dep(npm("natural-compare", "^1.4.0"), { key: "natural-compare" }),
});

export default definePackage(
  <Package
    name="@vitest/snapshot"
    version="5.0.0-rc.3"
    license="MIT"
    kind="library"
    dependencies={{ values: [deps.vitestPrettyFormat, deps.vitestUtils, deps.magicString, deps.pathe, deps.typesNaturalCompare, deps.naturalCompare] }}
  >
    <Targets
      rows={[
        {
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
            { name: "environment-js", kind: "javaScript", path: "dist/environment.js", role: "runtimeEntry" },
            { name: "index-js", kind: "javaScript", path: "dist/index.js", role: "runtimeEntry" },
            { name: "manager-js", kind: "javaScript", path: "dist/manager.js", role: "runtimeEntry" },
            { name: "runtime-chunk", kind: "javaScript", path: "dist/chunk-*.js", role: "runtimeChunk" },
            { name: "environment-dts", kind: "typeDeclarations", path: "dist/environment.d.ts", role: "typeDeclaration" },
            { name: "index-dts", kind: "typeDeclarations", path: "dist/index.d.ts", role: "typeDeclaration" },
            { name: "manager-dts", kind: "typeDeclarations", path: "dist/manager.d.ts", role: "typeDeclaration" },
            { name: "declaration-chunk", kind: "typeDeclarations", path: "dist/index.d-*.d.ts", role: "declarationChunk" },
          ],
          deps: [
            "@vitest/pretty-format",
            "@vitest/utils",
            "magic-string",
            "pathe",
            "natural-compare",
          ],
          peers: [],
        },
      ]}
    />
    {/* MIGRATION_TODO_PUBLISH: compatibility-derived include; verify with tspack pack --dry-run. */}
    <Publish include={["*.d.ts", "dist"]} exclude={[]} />
  </Package>,
);
