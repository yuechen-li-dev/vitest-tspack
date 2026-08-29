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
 * Generated migration draft for test/ui/package.json.
 * Identity and package.json dependency sections are compatibility-derived facts.
 * MIGRATION_TODO_* comments mark unresolved or manually authored semantics.
 */
const deps = defineDeps({
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  testingLibraryDom: tool(npm("@testing-library/dom", "^10.4.1"), { key: "@testing-library/dom" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  typesCodemirror: tool(npm("@types/codemirror", "^5.60.18"), { key: "@types/codemirror" }),
  vitestBrowserPlaywright: tool(workspace("@vitest/browser-playwright"), { key: "@vitest/browser-playwright" }),
  vitestBrowserPreview: tool(workspace("@vitest/browser-preview"), { key: "@vitest/browser-preview" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  happyDom: tool(npm("happy-dom", "^20.11.6"), { key: "happy-dom" }),
  vitest: tool(workspace("vitest")),
});

// MIGRATION_TODO_TARGETS: Author build, test, run, and publish intent from repository evidence.
export default definePackage(
  <Package
    name="@vitest/test-ui"
    version="0.0.0"
    kind="app"
    dependencies={{ values: [deps.testingLibraryDom, deps.typesCodemirror, deps.vitestBrowserPlaywright, deps.vitestBrowserPreview, deps.happyDom, deps.vitest] }}
  />,
);
