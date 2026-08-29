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
 * Generated migration draft for examples/projects/package.json.
 * Identity and package.json dependency sections are compatibility-derived facts.
 * MIGRATION_TODO_* comments mark unresolved or manually authored semantics.
 */
const deps = defineDeps({
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  testingLibraryJestDom: tool(npm("@testing-library/jest-dom", "^7.0.1"), { key: "@testing-library/jest-dom" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  testingLibraryReact: tool(npm("@testing-library/react", "^16.3.2"), { key: "@testing-library/react" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  testingLibraryUserEvent: tool(npm("@testing-library/user-event", "^14.6.6"), { key: "@testing-library/user-event" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  typesReact: tool(npm("@types/react", "^19.2.18"), { key: "@types/react" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  vitejsPluginReact: tool(npm("@vitejs/plugin-react", "^5.2.0"), { key: "@vitejs/plugin-react" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  vitestUi: tool(npm("@vitest/ui", "latest"), { key: "@vitest/ui" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  fastify: tool(npm("fastify", "^5.12.1")),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  jsdom: tool(npm("jsdom", "^29.1.1")),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  react: tool(npm("react", "^19.2.8")),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  supertest: tool(npm("supertest", "^7.2.2")),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  tsx: tool(npm("tsx", "^4.23.12")),
  vite: tool(npm("vite", "latest")),
  vitest: tool(npm("vitest", "latest")),
});

// MIGRATION_TODO_TARGETS: Author build, test, run, and publish intent from repository evidence.
export default definePackage(
  <Package
    name="@vitest/example-projects"
    version="0.0.0"
    license="MIT"
    kind="app"
    dependencies={{ values: [deps.testingLibraryJestDom, deps.testingLibraryReact, deps.testingLibraryUserEvent, deps.typesReact, deps.vitejsPluginReact, deps.vitestUi, deps.fastify, deps.jsdom, deps.react, deps.supertest, deps.tsx, deps.vite, deps.vitest] }}
  />,
);
