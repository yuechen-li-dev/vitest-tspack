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

// MIGRATION_TODO_TARGETS: Author build, test, run, and publish intent from repository evidence.
export default definePackage(
  <Package
    name="@vitest/coverage-v8"
    version="5.0.0-rc.3"
    license="MIT"
    kind="library"
    dependencies={{ values: [deps.vitestBrowser, deps.vitest, deps.bcoeV8Coverage, deps.vitestIstanbulLibCoverage, deps.vitestIstanbulLibReport, deps.astV8ToIstanbul, deps.magicast, deps.obug, deps.stdEnv, deps.tinyrainbow, deps.vitestBrowserPlaywright, deps.pathe] }}
  >
    {/* MIGRATION_TODO_PUBLISH: compatibility-derived include; verify with tspack pack --dry-run. */}
    <Publish include={["dist"]} exclude={[]} />
  </Package>,
);
