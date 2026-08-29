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
 * Generated migration draft for packages/mocker/package.json.
 * Identity and package.json dependency sections are compatibility-derived facts.
 * MIGRATION_TODO_* comments mark unresolved or manually authored semantics.
 */
const deps = defineDeps({
  msw: peer(npm("msw", "^2.4.9"), { optional: true }),
  vite: peer(npm("vite", "^6.0.0 || ^7.0.0 || ^8.0.0"), { optional: true }),
  jridgewellTraceMapping: dep(npm("@jridgewell/trace-mapping", "0.3.31"), { key: "@jridgewell/trace-mapping" }),
  vitestSpy: dep(workspace("@vitest/spy"), { key: "@vitest/spy" }),
  estreeWalker: dep(npm("estree-walker", "^3.0.3"), { key: "estree-walker" }),
  magicString: dep(npm("magic-string", "^1.2.2"), { key: "magic-string" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  typesEstree: tool(npm("@types/estree", "^1.0.9"), { key: "@types/estree" }),
  vitestUtils: tool(workspace("@vitest/utils"), { key: "@vitest/utils" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  acornWalk: tool(npm("acorn-walk", "^8.3.5"), { key: "acorn-walk" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  cjsModuleLexer: tool(npm("cjs-module-lexer", "^2.2.1"), { key: "cjs-module-lexer" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  esModuleLexer: tool(npm("es-module-lexer", "^2.3.2"), { key: "es-module-lexer" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  pathe: tool(npm("pathe", "^2.0.3")),
});

// MIGRATION_TODO_TARGETS: Author build, test, run, and publish intent from repository evidence.
export default definePackage(
  <Package
    name="@vitest/mocker"
    version="5.0.0-rc.3"
    license="MIT"
    kind="library"
    dependencies={{ values: [deps.msw, deps.vite, deps.jridgewellTraceMapping, deps.vitestSpy, deps.estreeWalker, deps.magicString, deps.typesEstree, deps.vitestUtils, deps.acornWalk, deps.cjsModuleLexer, deps.esModuleLexer, deps.pathe] }}
  >
    {/* MIGRATION_TODO_PUBLISH: compatibility-derived include; verify with tspack pack --dry-run. */}
    <Publish include={["*.d.ts", "dist"]} exclude={[]} />
  </Package>,
);
