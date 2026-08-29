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
 * Generated migration draft for packages/browser-playwright/package.json.
 * Identity and package.json dependency sections are compatibility-derived facts.
 * MIGRATION_TODO_* comments mark unresolved or manually authored semantics.
 */
const deps = defineDeps({
  playwright: peer(npm("playwright", "*")),
  vitest: peer(workspace("vitest")),
  vitestBrowser: dep(workspace("@vitest/browser"), { key: "@vitest/browser" }),
  vitestMocker: dep(workspace("@vitest/mocker"), { key: "@vitest/mocker" }),
  pathe: tool(npm("pathe", "^2.0.3")),
  tinyrainbow: dep(npm("tinyrainbow", "^3.1.1")),
});

export default definePackage(
  <Package
    name="@vitest/browser-playwright"
    version="5.0.0-rc.3"
    license="MIT"
    kind="library"
    dependencies={{ values: [deps.playwright, deps.vitest, deps.vitestBrowser, deps.vitestMocker, deps.pathe, deps.tinyrainbow] }}
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
        deps: ["@vitest/browser", "@vitest/mocker", "pathe", "tinyrainbow"],
        peers: ["playwright", "vitest"],
      }]}
    />
    {/* MIGRATION_TODO_PUBLISH: compatibility-derived include; verify with tspack pack --dry-run. */}
    <Publish include={["context.d.ts", "dist"]} exclude={[]} />
  </Package>,
);
