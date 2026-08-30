import {
  Package,
  Tools,
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
 * Generated migration draft for ./package.json.
 * Identity and package.json dependency sections are compatibility-derived facts.
 * MIGRATION_TODO_* comments mark unresolved or manually authored semantics.
 */
const deps = defineDeps({
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  antfuEslintConfig: tool(npm("@antfu/eslint-config", "^9.3.0"), { key: "@antfu/eslint-config" }),
  playwrightTest: tool(npm("@playwright/test", "^1.62.1"), { key: "@playwright/test" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  rollupPluginCommonjs: tool(npm("@rollup/plugin-commonjs", "^29.0.3"), { key: "@rollup/plugin-commonjs" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  rollupPluginJson: tool(npm("@rollup/plugin-json", "^6.1.0"), { key: "@rollup/plugin-json" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  rollupPluginNodeResolve: tool(npm("@rollup/plugin-node-resolve", "^16.0.3"), { key: "@rollup/plugin-node-resolve" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  typesNode: tool(npm("@types/node", "24.13.3"), { key: "@types/node" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  typesSemver: tool(npm("@types/semver", "^7.8.0"), { key: "@types/semver" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  typesWs: tool(npm("@types/ws", "^8.18.1"), { key: "@types/ws" }),
  vitestBrowser: tool(workspace("@vitest/browser"), { key: "@vitest/browser" }),
  vitestCoverageIstanbul: tool(workspace("@vitest/coverage-istanbul"), { key: "@vitest/coverage-istanbul" }),
  vitestCoverageV8: tool(workspace("@vitest/coverage-v8"), { key: "@vitest/coverage-v8" }),
  vitestUi: tool(workspace("@vitest/ui"), { key: "@vitest/ui" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  bumpp: tool(npm("bumpp", "^10.4.1")),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  changelogithub: tool(npm("changelogithub", "^14.0.0")),
  eslint: tool(npm("eslint", "^10.9.1")),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  knip: tool(npm("knip", "^6.32.2")),
  // Unit integrations import Vitest and Mocker source files directly. Their
  // optional peer resolution therefore walks to the workspace root.
  jsdom: tool(npm("jsdom", "^29.1.1")),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  magicString: tool(npm("magic-string", "^1.2.2"), { key: "magic-string" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  pathe: tool(npm("pathe", "^2.0.3")),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  premove: tool(npm("premove", "^4.0.0")),
  rollup: tool(npm("rollup", "^4.62.5")),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  rollupPluginDts: tool(npm("rollup-plugin-dts", "^6.5.1"), { key: "rollup-plugin-dts" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  rollupPluginLicense: tool(npm("rollup-plugin-license", "^3.7.1"), { key: "rollup-plugin-license" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  semver: tool(npm("semver", "^7.8.5")),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  tinyglobby: tool(npm("tinyglobby", "^0.2.17")),
  tinyexec: tool(npm("tinyexec", "1.3.0")),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  tsx: tool(npm("tsx", "^4.23.12")),
  typescript: tool(npm("typescript", "^5.9.3")),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  unpluginIsolatedDecl: tool(npm("unplugin-isolated-decl", "^0.17.0"), { key: "unplugin-isolated-decl" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  unpluginOxc: tool(npm("unplugin-oxc", "^0.6.1"), { key: "unplugin-oxc" }),
  vite: tool(npm("vite", "8.0.11")),
  vitest: tool(workspace("vitest")),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  zx: tool(npm("zx", "^8.8.5")),
});

// MIGRATION_TODO_TARGETS: Author build, test, run, and publish intent from repository evidence.
export default definePackage(
  <Package
    name="@vitest/monorepo"
    version="5.0.0-rc.3"
    kind="app"
    dependencies={{ values: [deps.antfuEslintConfig, deps.playwrightTest, deps.rollupPluginCommonjs, deps.rollupPluginJson, deps.rollupPluginNodeResolve, deps.typesNode, deps.typesSemver, deps.typesWs, deps.vitestBrowser, deps.vitestCoverageIstanbul, deps.vitestCoverageV8, deps.vitestUi, deps.bumpp, deps.changelogithub, deps.eslint, deps.knip, deps.jsdom, deps.magicString, deps.pathe, deps.premove, deps.rollup, deps.rollupPluginDts, deps.rollupPluginLicense, deps.semver, deps.tinyglobby, deps.tinyexec, deps.tsx, deps.typescript, deps.unpluginIsolatedDecl, deps.unpluginOxc, deps.vite, deps.vitest, deps.zx] }}
  >
    <Tools
      values={[
        deps.rollupPluginCommonjs,
        deps.rollupPluginJson,
        deps.rollupPluginNodeResolve,
        deps.rollupPluginDts,
        deps.rollupPluginLicense,
        deps.jsdom,
        deps.pathe,
        deps.tinyglobby,
        deps.tinyexec,
        deps.typescript,
        deps.unpluginIsolatedDecl,
        deps.unpluginOxc,
        deps.vite,
      ]}
    />
  </Package>,
);
