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
 * Generated migration draft for packages/browser-preview/package.json.
 * Identity and package.json dependency sections are compatibility-derived facts.
 * MIGRATION_TODO_* comments mark unresolved or manually authored semantics.
 */
const deps = defineDeps({
  vitest: peer(workspace("vitest")),
  testingLibraryDom: dep(npm("@testing-library/dom", "^10.4.1"), { key: "@testing-library/dom" }),
  testingLibraryUserEvent: dep(npm("@testing-library/user-event", "^14.6.6"), { key: "@testing-library/user-event" }),
  vitestBrowser: dep(workspace("@vitest/browser"), { key: "@vitest/browser" }),
});

// MIGRATION_TODO_TARGETS: Author build, test, run, and publish intent from repository evidence.
export default definePackage(
  <Package
    name="@vitest/browser-preview"
    version="5.0.0-rc.3"
    license="MIT"
    kind="library"
    dependencies={{ values: [deps.vitest, deps.testingLibraryDom, deps.testingLibraryUserEvent, deps.vitestBrowser] }}
  >
    {/* MIGRATION_TODO_PUBLISH: compatibility-derived include; verify with tspack pack --dry-run. */}
    <Publish include={["context.d.ts", "dist"]} exclude={[]} />
  </Package>,
);
