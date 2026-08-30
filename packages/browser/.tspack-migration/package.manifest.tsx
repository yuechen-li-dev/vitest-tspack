import {
  Package,
  Publish,
  Targets,
  Tools,
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
 * Generated migration draft for packages/browser/package.json.
 * Identity and package.json dependency sections are compatibility-derived facts.
 * MIGRATION_TODO_* comments mark unresolved or manually authored semantics.
 */
const deps = defineDeps({
  vitest: peer(workspace("vitest")),
  blazediffCore: dep(npm("@blazediff/core", "1.10.0"), { key: "@blazediff/core" }),
  vitestMocker: dep(workspace("@vitest/mocker"), { key: "@vitest/mocker" }),
  vitestUi: dep(workspace("@vitest/ui"), { key: "@vitest/ui" }),
  vitestUtils: dep(workspace("@vitest/utils"), { key: "@vitest/utils" }),
  magicString: dep(npm("magic-string", "^1.2.2"), { key: "magic-string" }),
  pngjs: dep(npm("pngjs", "^7.0.0")),
  sirv: dep(npm("sirv", "^3.0.2")),
  tinyrainbow: dep(npm("tinyrainbow", "^3.1.1")),
  ws: dep(npm("ws", "^8.21.3")),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  opentelemetryApi: tool(npm("@opentelemetry/api", "^1.9.1"), { key: "@opentelemetry/api" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  testingLibraryUserEvent: tool(npm("@testing-library/user-event", "^14.6.6"), { key: "@testing-library/user-event" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  typesNode: tool(npm("@types/node", "24.13.3"), { key: "@types/node" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  typesPngjs: tool(npm("@types/pngjs", "^6.0.5"), { key: "@types/pngjs" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  typesWs: tool(npm("@types/ws", "^8.18.1"), { key: "@types/ws" }),
  vitestSnapshot: tool(workspace("@vitest/snapshot"), { key: "@vitest/snapshot" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  birpc: tool(npm("birpc", "^4.2.0")),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  flatted: tool(npm("flatted", "^3.4.4")),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  ivya: tool(npm("ivya", "^1.8.2")),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  mime: tool(npm("mime", "^4.1.0")),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  pathe: tool(npm("pathe", "^2.0.3")),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  rrwebSnapshot: tool(npm("rrweb-snapshot", "2.1.1"), { key: "rrweb-snapshot" }),
});

// MIGRATION_TODO_TARGETS: Author build, test, run, and publish intent from repository evidence.
export default definePackage(
  <Package
    name="@vitest/browser"
    version="5.0.0-rc.3"
    license="MIT"
    kind="library"
    dependencies={{ values: [deps.vitest, deps.blazediffCore, deps.vitestMocker, deps.vitestUi, deps.vitestUtils, deps.magicString, deps.pngjs, deps.sirv, deps.tinyrainbow, deps.ws, deps.opentelemetryApi, deps.testingLibraryUserEvent, deps.typesNode, deps.typesPngjs, deps.typesWs, deps.vitestSnapshot, deps.birpc, deps.flatted, deps.ivya, deps.mime, deps.pathe, deps.rrwebSnapshot] }}
  >
    <Tools
      values={[
        deps.opentelemetryApi,
        deps.testingLibraryUserEvent,
        deps.typesNode,
        deps.typesPngjs,
        deps.typesWs,
        deps.vitestSnapshot,
        deps.birpc,
        deps.flatted,
        deps.ivya,
        deps.mime,
        deps.pathe,
        deps.rrwebSnapshot,
      ]}
    />
    <Targets
      rows={[
        {
          name: "node",
          language: "typescript",
          compiler: "rollup",
          compilerConfig: "rollup.config.js",
          inputs: ["src/**/*.ts", "rollup.config.js"],
          artifact: "javaScript",
          export: ".",
          entry: "src/node/index.ts",
          runtime: "dist/index.js",
          types: "dist/index.d.ts",
          artifacts: [
            { name: "browser-javascript", kind: "javaScript", path: "dist/*.js", role: "runtimeEntry" },
            { name: "browser-declarations", kind: "typeDeclarations", path: "dist/*.d.ts", role: "typeDeclaration" },
          ],
          dependsOn: [
            "@vitest/mocker:package",
            "@vitest/snapshot:package",
            "@vitest/ui:node",
            "@vitest/utils:package",
          ],
          deps: [
            "@blazediff/core",
            "@opentelemetry/api",
            "@testing-library/user-event",
            "@types/node",
            "@types/pngjs",
            "@types/ws",
            "@vitest/mocker",
            "@vitest/snapshot",
            "@vitest/ui",
            "@vitest/utils",
            "birpc",
            "flatted",
            "ivya",
            "magic-string",
            "mime",
            "pathe",
            "pngjs",
            "rrweb-snapshot",
            "sirv",
            "tinyrainbow",
            "ws",
          ],
          peers: ["vitest"],
        },
        {
          name: "package",
          language: "typescript",
          compiler: "vite",
          compilerConfig: "src/client/vite.config.ts",
          artifact: "staticAsset",
          export: "./client",
          entry: "src/client/orchestrator.html",
          runtime: "dist/client/orchestrator.html",
          types: "",
          artifacts: [
            { name: "browser-client-manifest", kind: "staticAsset", path: "dist/client/.vite/manifest.json", role: "runtimeEntry" },
            { name: "browser-client-assets", kind: "staticAsset", path: "dist/client/__vitest_browser__/*", role: "staticAsset" },
          ],
          dependsOn: ["node"],
          deps: ["pathe"],
          peers: ["vitest"],
        },
      ]}
    />
    {/* MIGRATION_TODO_PUBLISH: compatibility-derived include; verify with tspack pack --dry-run. */}
    <Publish include={["*.d.ts", "context.js", "dist", "dummy.js", "providers"]} exclude={[]} />
  </Package>,
);
