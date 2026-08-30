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
 * Generated migration draft for packages/vitest/package.json.
 * Identity and package.json dependency sections are compatibility-derived facts.
 * MIGRATION_TODO_* comments mark unresolved or manually authored semantics.
 */
const deps = defineDeps({
  edgeRuntimeVm: peer(npm("@edge-runtime/vm", "*"), { key: "@edge-runtime/vm", optional: true }),
  opentelemetryApi: peer(npm("@opentelemetry/api", "^1.9.0"), { key: "@opentelemetry/api", optional: true }),
  typesNode: peer(npm("@types/node", "^22.0.0 || >=24.0.0"), { key: "@types/node", optional: true }),
  vitestBrowserPlaywright: peer(workspace("@vitest/browser-playwright"), { key: "@vitest/browser-playwright", optional: true }),
  vitestBrowserPreview: peer(workspace("@vitest/browser-preview"), { key: "@vitest/browser-preview", optional: true }),
  vitestBrowserWebdriverio: peer(npm("@vitest/browser-webdriverio", "^5.0.0-beta.5 || >=5.0.0"), { key: "@vitest/browser-webdriverio", optional: true }),
  vitestCoverageIstanbul: peer(workspace("@vitest/coverage-istanbul"), { key: "@vitest/coverage-istanbul", optional: true }),
  vitestCoverageV8: peer(workspace("@vitest/coverage-v8"), { key: "@vitest/coverage-v8", optional: true }),
  vitestUi: peer(workspace("@vitest/ui"), { key: "@vitest/ui", optional: true }),
  happyDom: peer(npm("happy-dom", "*"), { key: "happy-dom", optional: true }),
  jsdom: peer(npm("jsdom", "*"), { optional: true }),
  vite: peer(npm("vite", "^6.4.0 || ^7.0.0 || ^8.0.0")),
  typesChai: dep(npm("@types/chai", "^5.2.2"), { key: "@types/chai" }),
  vitestMocker: dep(workspace("@vitest/mocker"), { key: "@vitest/mocker" }),
  chai: dep(npm("chai", "^6.2.2")),
  esModuleLexer: dep(npm("es-module-lexer", "^2.3.2"), { key: "es-module-lexer" }),
  expectType: dep(npm("expect-type", "^1.4.0"), { key: "expect-type" }),
  magicString: dep(npm("magic-string", "1.2.2"), { key: "magic-string" }),
  obug: dep(npm("obug", "^2.1.4")),
  picomatch: dep(npm("picomatch", "^4.0.7")),
  stdEnv: dep(npm("std-env", "^4.2.0"), { key: "std-env" }),
  tinybench: dep(npm("tinybench", "6.1.3")),
  tinyexec: dep(npm("tinyexec", "1.3.0")),
  tinyglobby: dep(npm("tinyglobby", "^0.2.17")),
  whyIsNodeRunning: dep(npm("why-is-node-running", "^2.3.0"), { key: "why-is-node-running" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  antfuInstallPkg: tool(npm("@antfu/install-pkg", "^2.0.1"), { key: "@antfu/install-pkg" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  bombShTab: tool(npm("@bomb.sh/tab", "^0.0.22"), { key: "@bomb.sh/tab" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  jridgewellTraceMapping: tool(npm("@jridgewell/trace-mapping", "0.3.31"), { key: "@jridgewell/trace-mapping" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  sinonjsFakeTimers: tool(npm("@sinonjs/fake-timers", "15.4.0"), { key: "@sinonjs/fake-timers" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  typesJsdom: tool(npm("@types/jsdom", "^28.0.3"), { key: "@types/jsdom" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  typesPicomatch: tool(npm("@types/picomatch", "^4.0.3"), { key: "@types/picomatch" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  typesPrompts: tool(npm("@types/prompts", "^2.4.9"), { key: "@types/prompts" }),
  vitestExpect: tool(workspace("@vitest/expect"), { key: "@vitest/expect" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  vitestIstanbulLibCoverage: tool(npm("@vitest/istanbul-lib-coverage", "^1.0.0"), { key: "@vitest/istanbul-lib-coverage" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  vitestIstanbulLibReport: tool(npm("@vitest/istanbul-lib-report", "^1.0.0"), { key: "@vitest/istanbul-lib-report" }),
  vitestPrettyFormat: tool(workspace("@vitest/pretty-format"), { key: "@vitest/pretty-format" }),
  vitestSnapshot: tool(workspace("@vitest/snapshot"), { key: "@vitest/snapshot" }),
  vitestSpy: tool(workspace("@vitest/spy"), { key: "@vitest/spy" }),
  vitestUtils: tool(workspace("@vitest/utils"), { key: "@vitest/utils" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  acorn: tool(npm("acorn", "8.11.3")),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  acornWalk: tool(npm("acorn-walk", "^8.3.5"), { key: "acorn-walk" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  birpc: tool(npm("birpc", "^4.2.0")),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  cac: tool(npm("cac", "^6.7.14"), {
    patch: {
      path: "patches/cac@6.7.14.patch",
      version: "6.7.14",
    },
  }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  flatted: tool(npm("flatted", "^3.4.4")),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  localPkg: tool(npm("local-pkg", "^1.2.1"), { key: "local-pkg" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  mime: tool(npm("mime", "^4.1.0")),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  pathe: tool(npm("pathe", "^2.0.3")),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  prompts: tool(npm("prompts", "^2.4.2")),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  stripLiteral: tool(npm("strip-literal", "^3.1.0"), { key: "strip-literal" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  tinyhighlight: tool(npm("tinyhighlight", "^0.3.2")),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  tinyrainbow: tool(npm("tinyrainbow", "^3.1.1")),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  ws: tool(npm("ws", "^8.21.3")),
});

export default definePackage(
  <Package
    name="vitest"
    version="5.0.0-rc.3"
    license="MIT"
    kind="library"
    dependencies={{ values: [deps.edgeRuntimeVm, deps.opentelemetryApi, deps.typesNode, deps.vitestBrowserPlaywright, deps.vitestBrowserPreview, deps.vitestBrowserWebdriverio, deps.vitestCoverageIstanbul, deps.vitestCoverageV8, deps.vitestUi, deps.happyDom, deps.jsdom, deps.vite, deps.typesChai, deps.vitestMocker, deps.chai, deps.esModuleLexer, deps.expectType, deps.magicString, deps.obug, deps.picomatch, deps.stdEnv, deps.tinybench, deps.tinyexec, deps.tinyglobby, deps.whyIsNodeRunning, deps.antfuInstallPkg, deps.bombShTab, deps.jridgewellTraceMapping, deps.sinonjsFakeTimers, deps.typesJsdom, deps.typesPicomatch, deps.typesPrompts, deps.vitestExpect, deps.vitestIstanbulLibCoverage, deps.vitestIstanbulLibReport, deps.vitestPrettyFormat, deps.vitestSnapshot, deps.vitestSpy, deps.vitestUtils, deps.acorn, deps.acornWalk, deps.birpc, deps.cac, deps.flatted, deps.localPkg, deps.mime, deps.pathe, deps.prompts, deps.stripLiteral, deps.tinyhighlight, deps.tinyrainbow, deps.ws] }}
  >
    <Targets
      rows={[{
        name: "package",
        language: "typescript",
        compiler: "rollup",
        compilerConfig: "rollup.config.js",
        inputs: ["src/**/*.ts", "rollup.config.js", "suppress-warnings.cjs", "vitest.mjs"],
        artifact: "javaScript",
        export: ".",
        entry: "src/public/index.ts",
        runtime: "dist/index.js",
        types: "dist/index.d.ts",
        artifacts: [
          { name: "runtime", kind: "javaScript", path: "dist/*.js", role: "runtimeEntry" },
          { name: "runtime-chunks", kind: "javaScript", path: "dist/chunks/*.js", role: "runtimeChunk" },
          { name: "runtime-workers", kind: "javaScript", path: "dist/workers/*.js", role: "runtimeEntry" },
          { name: "commonjs", kind: "javaScript", path: "dist/*.cjs", role: "runtimeEntry" },
          { name: "launcher", kind: "javaScript", path: "vitest.mjs", role: "runtimeEntry" },
          { name: "suppress-warnings", kind: "javaScript", path: "suppress-warnings.cjs", role: "runtimeChunk" },
          { name: "types", kind: "typeDeclarations", path: "dist/*.d.ts", role: "typeDeclaration" },
          { name: "type-chunks", kind: "typeDeclarations", path: "dist/chunks/*.d.ts", role: "declarationChunk" },
        ],
        dependsOn: [
          "@vitest/expect:package",
          "@vitest/mocker:package",
          "@vitest/pretty-format:package",
          "@vitest/snapshot:package",
          "@vitest/spy:package",
          "@vitest/utils:package",
        ],
        deps: ["@antfu/install-pkg", "@bomb.sh/tab", "@jridgewell/trace-mapping", "@sinonjs/fake-timers", "@types/chai", "@types/jsdom", "@types/picomatch", "@types/prompts", "@vitest/expect", "@vitest/istanbul-lib-coverage", "@vitest/istanbul-lib-report", "@vitest/mocker", "@vitest/pretty-format", "@vitest/snapshot", "@vitest/spy", "@vitest/utils", "acorn", "acorn-walk", "birpc", "cac", "chai", "es-module-lexer", "expect-type", "flatted", "local-pkg", "magic-string", "mime", "obug", "pathe", "picomatch", "prompts", "std-env", "strip-literal", "tinybench", "tinyexec", "tinyglobby", "tinyhighlight", "tinyrainbow", "why-is-node-running", "ws"],
        peers: ["@edge-runtime/vm", "@opentelemetry/api", "@types/node", "@vitest/browser-playwright", "@vitest/browser-preview", "@vitest/browser-webdriverio", "@vitest/coverage-istanbul", "@vitest/coverage-v8", "@vitest/ui", "happy-dom", "jsdom", "vite"],
      }]}
    />
    {/* MIGRATION_TODO_PUBLISH: compatibility-derived include; verify with tspack pack --dry-run. */}
    <Publish include={["*.cjs", "*.d.cts", "*.d.ts", "*.mjs", "bin", "browser", "dist"]} exclude={[]} />
  </Package>,
);
