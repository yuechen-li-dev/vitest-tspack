import {
  Package,
  Publish,
  TestTargets,
  Tools,
  builtArtifactFixture,
  defineDeps,
  definePackage,
  dep,
  localFixture,
  npm,
  path,
  peer,
  tool,
  workspace,
} from "tspack/manifest";

/**
 * Generated migration draft for test/unit/package.json.
 * Identity and package.json dependency sections are compatibility-derived facts.
 * MIGRATION_TODO_* comments mark unresolved or manually authored semantics.
 */
const deps = defineDeps({
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  babelCore: tool(npm("@babel/core", "^7.29.7"), { key: "@babel/core" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  babelPluginProposalDecorators: tool(npm("@babel/plugin-proposal-decorators", "^7.29.7"), { key: "@babel/plugin-proposal-decorators" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  rolldownPluginBabel: tool(npm("@rolldown/plugin-babel", "^0.2.3"), { key: "@rolldown/plugin-babel" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  standardSchemaSpec: tool(npm("@standard-schema/spec", "^1.1.0"), { key: "@standard-schema/spec" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  testDepEsmNonExisting: tool(path("deps/dep-esm-non-existing"), { key: "@test/dep-esm-non-existing" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  testViteEnvironmentExternal: tool(path("projects/vite-environment-external"), { key: "@test/vite-environment-external" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  testViteExternal: tool(path("projects/vite-external"), { key: "@test/vite-external" }),
  vitestExpect: tool(workspace("@vitest/expect"), { key: "@vitest/expect" }),
  vitestMocker: tool(workspace("@vitest/mocker"), { key: "@vitest/mocker" }),
  vitestPrettyFormat: tool(workspace("@vitest/pretty-format"), { key: "@vitest/pretty-format" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  vitestTestDepCjs: tool(path("deps/dep-cjs"), { key: "@vitest/test-dep-cjs" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  vitestTestDepNestedCjs: tool(path("deps/dep-nested-cjs"), { key: "@vitest/test-dep-nested-cjs" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  vitestTestDep1: tool(path("deps/dep1"), { key: "@vitest/test-dep1" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  vitestTestDep2: tool(path("deps/dep2"), { key: "@vitest/test-dep2" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  vitestTestFn: tool(path("deps/dep-fn"), { key: "@vitest/test-fn" }),
  vitestUtils: tool(workspace("@vitest/utils"), { key: "@vitest/utils" }),
  vitestWebWorker: tool(workspace("@vitest/web-worker"), { key: "@vitest/web-worker" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  vueuseIntegrations: tool(npm("@vueuse/integrations", "^14.4.0"), { key: "@vueuse/integrations" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  httpClient: tool(path("projects/http-client"), { key: "http-client" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  immutable: tool(npm("immutable", "5.1.9")),
  // Required only by the jsdom-environment fixture target family.
  jsdom: tool(npm("jsdom", "^29.1.1")),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  loupe: tool(npm("loupe", "^3.2.1")),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  memfs: tool(npm("memfs", "^4.68.1")),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  obug: tool(npm("obug", "^2.1.4")),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  react: tool(npm("react", "^19.2.8")),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  react18: tool(npm("react", "18.3.1"), { key: "react-18" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  sinon: tool(npm("sinon", "^22.1.0")),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  sinonChai: tool(npm("sinon-chai", "^4.0.1"), { key: "sinon-chai" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  temporalPolyfill: tool(npm("temporal-polyfill", "~0.3.2"), { key: "temporal-polyfill" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  tinyrainbow: tool(npm("tinyrainbow", "^3.1.1")),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  tinyspy: tool(npm("tinyspy", "^4.0.4")),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  url: tool(npm("url", "^0.11.4")),
  // The bounded CI targets need an executable harness from a clean checkout.
  // The workspace package has source only until the broader Vitest build runs.
  vitest: tool(npm("vitest", "5.0.0-rc.3")),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  vitestEnvironmentCustom: tool(path("vitest-environment-custom"), { key: "vitest-environment-custom" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  vitestPackageExports: tool(npm("vitest-package-exports", "^1.2.0"), { key: "vitest-package-exports" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  vue: tool(npm("vue", "^3.5.41")),
});

export default definePackage(
  <Package
    name="@vitest/test-unit"
    version="0.0.0"
    kind="app"
    dependencies={{
      values: [
        deps.babelCore,
        deps.babelPluginProposalDecorators,
        deps.rolldownPluginBabel,
        deps.standardSchemaSpec,
        deps.testDepEsmNonExisting,
        deps.testViteEnvironmentExternal,
        deps.testViteExternal,
        deps.vitestExpect,
        deps.vitestMocker,
        deps.vitestPrettyFormat,
        deps.vitestTestDepCjs,
        deps.vitestTestDepNestedCjs,
        deps.vitestTestDep1,
        deps.vitestTestDep2,
        deps.vitestTestFn,
        deps.vitestUtils,
        deps.vitestWebWorker,
        deps.vueuseIntegrations,
        deps.httpClient,
        deps.immutable,
        deps.jsdom,
        deps.loupe,
        deps.memfs,
        deps.obug,
        deps.react,
        deps.react18,
        deps.sinon,
        deps.sinonChai,
        deps.temporalPolyfill,
        deps.tinyrainbow,
        deps.tinyspy,
        deps.url,
        deps.vitest,
        deps.vitestEnvironmentCustom,
        deps.vitestPackageExports,
        deps.vue,
      ],
    }}
  >
    <Tools
      values={[
        deps.babelCore,
        deps.babelPluginProposalDecorators,
        deps.rolldownPluginBabel,
      ]}
    />
    <TestTargets
      rows={[
        {
          name: "basic-threads",
          harness: "vitest",
          config: "vite.config.ts",
          sources: ["test/basic.test.ts"],
          project: "threads",
        },
        {
          name: "snapshot-threads",
          harness: "vitest",
          config: "vite.config.ts",
          sources: [
            "test/snapshot.test.ts",
            "test/snapshot-custom-serializer.test.ts",
          ],
          project: "threads",
        },
        {
          name: "requirements-fixtures-threads",
          harness: "vitest",
          config: "vite.config.ts",
          sources: [
            "test/chai-style-assertions-sinon.test.ts",
            "test/interop.test.ts",
          ],
          project: "threads",
          requirements: [
            deps.sinon,
            deps.sinonChai,
            deps.vitestTestDepCjs,
          ],
          fixtures: [
            localFixture(deps.vitestTestDepCjs, {
              name: "dep-cjs",
              binding: "@vitest/test-dep-cjs",
            }),
          ],
        },
        {
          name: "fixture-package-family-threads",
          harness: "vitest",
          config: "vite.config.ts",
          sources: [
            "test/chai-style-assertions-sinon.test.ts",
            "test/dual-package-hazard.test.ts",
            "test/exports.test.ts",
            "test/immutable.test.ts",
            "test/interop.test.ts",
            "test/mock-fs.test.ts",
            "test/module.test.ts",
            "test/snapshot-react.test.jsx",
            "test/mocking/autospying.test.ts",
            "test/mocking/external.test.ts",
            "test/mocking/factory.test.ts",
            "test/mocking/http-client-mocked.test.ts",
            "test/mocking/http-client-not-mocked.test.ts",
            "test/mocking/nested-default.spec.ts",
            "test/mocking/self-importing.test.ts",
            "test/mocking/tinyspy.test.ts",
          ],
          project: "threads",
          requirements: [
            deps.httpClient,
            deps.immutable,
            deps.jsdom,
            deps.memfs,
            deps.react,
            deps.sinon,
            deps.sinonChai,
            deps.testViteEnvironmentExternal,
            deps.testViteExternal,
            deps.tinyspy,
            deps.vitestPackageExports,
            deps.vitestTestDep1,
            deps.vitestTestDep2,
            deps.vitestTestDepCjs,
            deps.vitestTestDepNestedCjs,
            deps.vitestTestFn,
          ],
          fixtures: [
            localFixture(deps.httpClient, { name: "http-client", binding: "http-client" }),
            localFixture(deps.testViteEnvironmentExternal, {
              name: "vite-environment-external",
              binding: "@test/vite-environment-external",
              mode: "source",
            }),
            localFixture(deps.testViteExternal, {
              name: "vite-external",
              binding: "@test/vite-external",
              mode: "source",
            }),
            localFixture(deps.vitestTestDep1, { name: "dep1", binding: "@vitest/test-dep1" }),
            localFixture(deps.vitestTestDep2, { name: "dep2", binding: "@vitest/test-dep2" }),
            localFixture(deps.vitestTestDepCjs, { name: "dep-cjs", binding: "@vitest/test-dep-cjs" }),
            localFixture(deps.vitestTestDepNestedCjs, { name: "dep-nested-cjs", binding: "@vitest/test-dep-nested-cjs" }),
            localFixture(deps.vitestTestFn, { name: "dep-fn", binding: "@vitest/test-fn" }),
          ],
        },
        {
          name: "react18-threads",
          harness: "vitest",
          config: "vite.config.ts",
          sources: ["test/snapshot-react-18.test.jsx"],
          project: "threads",
          requirements: [deps.react18],
        },
        {
          name: "additional-package-fixtures-threads",
          harness: "vitest",
          config: "vite.config.ts",
          sources: [
            "test/imports.test.ts",
            "test/node-protocol-jsdom.spec.ts",
          ],
          project: "threads",
          requirements: [
            deps.jsdom,
            deps.testDepEsmNonExisting,
            deps.url,
          ],
          fixtures: [
            localFixture(deps.testDepEsmNonExisting, {
              name: "dep-esm-non-existing",
              binding: "@test/dep-esm-non-existing",
            }),
          ],
        },
        {
          name: "web-worker-built-threads",
          harness: "vitest",
          config: "vite.config.ts",
          sources: [
            "test/web-worker-jsdom.test.ts",
            "test/web-worker-mock.test.ts",
            "test/web-worker-node.test.ts",
          ],
          project: "threads",
          dependsOn: ["@vitest/web-worker:package"],
          builtFixtures: [
            builtArtifactFixture("@vitest/web-worker:package", {
              name: "web-worker-runtime",
              artifact: "runtime",
              binding: "@vitest/web-worker",
            }),
          ],
        },
        {
          name: "expect-built-threads",
          harness: "vitest",
          config: "vite.config.ts",
          sources: ["test/expect.test.ts"],
          project: "threads",
          requirements: [
            deps.standardSchemaSpec,
            deps.temporalPolyfill,
          ],
          dependsOn: [
            "@vitest/pretty-format:package",
            "@vitest/utils:package",
          ],
          builtFixtures: [
            builtArtifactFixture("@vitest/pretty-format:package", {
              name: "pretty-format-runtime",
              artifact: "runtime",
              binding: "@vitest/pretty-format",
            }),
            builtArtifactFixture("@vitest/utils:package", {
              name: "utils-runtime",
              artifact: "runtime",
              binding: "@vitest/utils",
            }),
          ],
        },
        {
          name: "pretty-format-built-threads",
          harness: "vitest",
          config: "vite.config.ts",
          sources: ["test/pretty-format.test.ts"],
          project: "threads",
          requirements: [deps.loupe],
          dependsOn: [
            "@vitest/pretty-format:package",
            "@vitest/utils:package",
          ],
          builtFixtures: [
            builtArtifactFixture("@vitest/pretty-format:package", {
              name: "pretty-format-runtime",
              artifact: "runtime",
              binding: "@vitest/pretty-format",
            }),
            builtArtifactFixture("@vitest/utils:package", {
              name: "utils-runtime",
              artifact: "runtime",
              binding: "@vitest/utils",
            }),
          ],
        },
      ]}
    />
  </Package>,
);
