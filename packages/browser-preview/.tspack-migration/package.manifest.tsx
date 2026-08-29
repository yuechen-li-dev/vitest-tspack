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
 * Generated migration draft for packages/browser-preview/package.json.
 * Identity and package.json dependency sections are compatibility-derived facts.
 * MIGRATION_TODO_* comments mark unresolved or manually authored semantics.
 */
const deps = defineDeps({
  vitest: peer(workspace("vitest")),
  testingLibraryDom: dep(npm("@testing-library/dom", "^10.4.1"), { key: "@testing-library/dom" }),
  testingLibraryUserEvent: dep(npm("@testing-library/user-event", "^14.6.6"), { key: "@testing-library/user-event" }),
  vitestBrowser: dep(workspace("@vitest/browser"), { key: "@vitest/browser" }),
  pathe: tool(npm("pathe", "^2.0.3")),
});

export default definePackage(
  <Package
    name="@vitest/browser-preview"
    version="5.0.0-rc.3"
    license="MIT"
    kind="library"
    dependencies={{ values: [deps.vitest, deps.testingLibraryDom, deps.testingLibraryUserEvent, deps.vitestBrowser, deps.pathe] }}
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
        deps: ["@testing-library/dom", "@testing-library/user-event", "@vitest/browser", "pathe"],
        peers: ["vitest"],
      }]}
    />
    {/* MIGRATION_TODO_PUBLISH: compatibility-derived include; verify with tspack pack --dry-run. */}
    <Publish include={["context.d.ts", "dist"]} exclude={[]} />
  </Package>,
);
