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
 * Generated migration draft for packages/utils/package.json.
 * Identity and package.json dependency sections are compatibility-derived facts.
 * MIGRATION_TODO_* comments mark unresolved or manually authored semantics.
 */
const deps = defineDeps({
  vitestPrettyFormat: dep(workspace("@vitest/pretty-format"), { key: "@vitest/pretty-format" }),
  convertSourceMap: dep(npm("convert-source-map", "^2.0.0"), { key: "convert-source-map" }),
  tinyrainbow: dep(npm("tinyrainbow", "^3.1.1")),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  jridgewellTraceMapping: tool(npm("@jridgewell/trace-mapping", "0.3.31"), { key: "@jridgewell/trace-mapping" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  typesConvertSourceMap: tool(npm("@types/convert-source-map", "^2.0.3"), { key: "@types/convert-source-map" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  diffSequences: tool(npm("diff-sequences", "^29.6.3"), { key: "diff-sequences" }),
});

// MIGRATION_TODO_TARGETS: Author build, test, run, and publish intent from repository evidence.
export default definePackage(
  <Package
    name="@vitest/utils"
    version="5.0.0-rc.3"
    license="MIT"
    kind="library"
    dependencies={{ values: [deps.vitestPrettyFormat, deps.convertSourceMap, deps.tinyrainbow, deps.jridgewellTraceMapping, deps.typesConvertSourceMap, deps.diffSequences] }}
  >
    {/* MIGRATION_TODO_PUBLISH: compatibility-derived include; verify with tspack pack --dry-run. */}
    <Publish include={["*.d.ts", "dist"]} exclude={[]} />
  </Package>,
);
