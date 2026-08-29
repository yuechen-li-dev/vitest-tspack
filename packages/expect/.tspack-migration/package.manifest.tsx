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
 * Generated migration draft for packages/expect/package.json.
 * Identity and package.json dependency sections are compatibility-derived facts.
 * MIGRATION_TODO_* comments mark unresolved or manually authored semantics.
 */
const deps = defineDeps({
  standardSchemaSpec: dep(npm("@standard-schema/spec", "^1.1.0"), { key: "@standard-schema/spec" }),
  typesChai: dep(npm("@types/chai", "^5.2.2"), { key: "@types/chai" }),
  vitestSpy: dep(workspace("@vitest/spy"), { key: "@vitest/spy" }),
  vitestUtils: dep(workspace("@vitest/utils"), { key: "@vitest/utils" }),
  chai: dep(npm("chai", "^6.2.2")),
  tinyrainbow: dep(npm("tinyrainbow", "^3.1.1")),
});

// MIGRATION_TODO_TARGETS: Author build, test, run, and publish intent from repository evidence.
export default definePackage(
  <Package
    name="@vitest/expect"
    version="5.0.0-rc.3"
    license="MIT"
    kind="library"
    dependencies={{ values: [deps.standardSchemaSpec, deps.typesChai, deps.vitestSpy, deps.vitestUtils, deps.chai, deps.tinyrainbow] }}
  >
    {/* MIGRATION_TODO_PUBLISH: compatibility-derived include; verify with tspack pack --dry-run. */}
    <Publish include={["dist"]} exclude={[]} />
  </Package>,
);
