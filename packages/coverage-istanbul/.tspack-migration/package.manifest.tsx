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
 * Generated migration draft for packages/coverage-istanbul/package.json.
 * Identity and package.json dependency sections are compatibility-derived facts.
 * MIGRATION_TODO_* comments mark unresolved or manually authored semantics.
 */
const deps = defineDeps({
  vitest: peer(workspace("vitest")),
  jridgewellGenMapping: dep(npm("@jridgewell/gen-mapping", "^0.3.13"), { key: "@jridgewell/gen-mapping" }),
  jridgewellTraceMapping: dep(npm("@jridgewell/trace-mapping", "0.3.31"), { key: "@jridgewell/trace-mapping" }),
  vitestIstanbulLibCoverage: dep(npm("@vitest/istanbul-lib-coverage", "^1.0.0"), { key: "@vitest/istanbul-lib-coverage" }),
  vitestIstanbulLibInstrument: dep(npm("@vitest/istanbul-lib-instrument", "^1.0.0"), { key: "@vitest/istanbul-lib-instrument" }),
  vitestIstanbulLibReport: dep(npm("@vitest/istanbul-lib-report", "^1.0.0"), { key: "@vitest/istanbul-lib-report" }),
  vitestIstanbulLibSourceMaps: dep(npm("@vitest/istanbul-lib-source-maps", "^1.0.0"), { key: "@vitest/istanbul-lib-source-maps" }),
  magicast: dep(npm("magicast", "^0.5.4")),
  obug: dep(npm("obug", "^2.1.4")),
  tinyrainbow: dep(npm("tinyrainbow", "^3.1.1")),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  pathe: tool(npm("pathe", "^2.0.3")),
});

export default definePackage(
  <Package
    name="@vitest/coverage-istanbul"
    version="5.0.0-rc.3"
    license="MIT"
    kind="library"
    dependencies={{ values: [deps.vitest, deps.jridgewellGenMapping, deps.jridgewellTraceMapping, deps.vitestIstanbulLibCoverage, deps.vitestIstanbulLibInstrument, deps.vitestIstanbulLibReport, deps.vitestIstanbulLibSourceMaps, deps.magicast, deps.obug, deps.tinyrainbow, deps.pathe] }}
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
        deps: ["@jridgewell/gen-mapping", "@jridgewell/trace-mapping", "@vitest/istanbul-lib-coverage", "@vitest/istanbul-lib-instrument", "@vitest/istanbul-lib-report", "@vitest/istanbul-lib-source-maps", "magicast", "obug", "pathe", "tinyrainbow"],
        peers: ["vitest"],
      }]}
    />
    {/* MIGRATION_TODO_PUBLISH: compatibility-derived include; verify with tspack pack --dry-run. */}
    <Publish include={["dist"]} exclude={[]} />
  </Package>,
);
