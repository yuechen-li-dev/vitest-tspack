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
 * Generated migration draft for packages/coverage-v8/package.json.
 * Identity and package.json dependency sections are compatibility-derived facts.
 * MIGRATION_TODO_* comments mark unresolved or manually authored semantics.
 */
const deps = defineDeps({
  vitestBrowser: peer(workspace("@vitest/browser"), { key: "@vitest/browser", optional: true }),
  vitest: peer(workspace("vitest")),
  bcoeV8Coverage: dep(npm("@bcoe/v8-coverage", "^1.0.2"), { key: "@bcoe/v8-coverage" }),
  vitestIstanbulLibCoverage: dep(npm("@vitest/istanbul-lib-coverage", "^1.0.0"), { key: "@vitest/istanbul-lib-coverage" }),
  vitestIstanbulLibReport: dep(npm("@vitest/istanbul-lib-report", "^1.0.0"), { key: "@vitest/istanbul-lib-report" }),
  astV8ToIstanbul: dep(npm("ast-v8-to-istanbul", "^1.0.5"), { key: "ast-v8-to-istanbul" }),
  magicast: dep(npm("magicast", "^0.5.4")),
  obug: dep(npm("obug", "^2.1.4")),
  stdEnv: dep(npm("std-env", "^4.2.0"), { key: "std-env" }),
  tinyrainbow: dep(npm("tinyrainbow", "^3.1.1")),
  vitestBrowserPlaywright: tool(workspace("@vitest/browser-playwright"), { key: "@vitest/browser-playwright" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  pathe: tool(npm("pathe", "^2.0.3")),
});

export default definePackage(
  <Package
    name="@vitest/coverage-v8"
    version="5.0.0-rc.3"
    license="MIT"
    kind="library"
    dependencies={{ values: [deps.vitestBrowser, deps.vitest, deps.bcoeV8Coverage, deps.vitestIstanbulLibCoverage, deps.vitestIstanbulLibReport, deps.astV8ToIstanbul, deps.magicast, deps.obug, deps.stdEnv, deps.tinyrainbow, deps.vitestBrowserPlaywright, deps.pathe] }}
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
        dependsOn: ["@vitest/browser-playwright:package"],
        deps: ["@bcoe/v8-coverage", "@vitest/browser-playwright", "@vitest/istanbul-lib-coverage", "@vitest/istanbul-lib-report", "ast-v8-to-istanbul", "magicast", "obug", "pathe", "std-env", "tinyrainbow"],
        peers: ["@vitest/browser", "vitest"],
      }]}
    />
    {/* MIGRATION_TODO_PUBLISH: compatibility-derived include; verify with tspack pack --dry-run. */}
    <Publish include={["dist"]} exclude={[]} />
  </Package>,
);
