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
 * Generated migration draft for examples/opentelemetry/package.json.
 * Identity and package.json dependency sections are compatibility-derived facts.
 * MIGRATION_TODO_* comments mark unresolved or manually authored semantics.
 */
const deps = defineDeps({
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  opentelemetryApi: tool(npm("@opentelemetry/api", "^1.9.1"), { key: "@opentelemetry/api" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  opentelemetryContextZone: tool(npm("@opentelemetry/context-zone", "^2.10.0"), { key: "@opentelemetry/context-zone" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  opentelemetryExporterTraceOtlpProto: tool(npm("@opentelemetry/exporter-trace-otlp-proto", "^0.221.0"), { key: "@opentelemetry/exporter-trace-otlp-proto" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  opentelemetryResources: tool(npm("@opentelemetry/resources", "^2.10.0"), { key: "@opentelemetry/resources" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  opentelemetrySdkNode: tool(npm("@opentelemetry/sdk-node", "^0.221.0"), { key: "@opentelemetry/sdk-node" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  opentelemetrySdkTraceWeb: tool(npm("@opentelemetry/sdk-trace-web", "^2.10.0"), { key: "@opentelemetry/sdk-trace-web" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  vitestBrowserPlaywright: tool(npm("@vitest/browser-playwright", "latest"), { key: "@vitest/browser-playwright" }),
  vite: tool(npm("vite", "latest")),
  vitest: tool(npm("vitest", "latest")),
});

// MIGRATION_TODO_TARGETS: Author build, test, run, and publish intent from repository evidence.
export default definePackage(
  <Package
    name="@vitest/example-opentelemetry"
    version="0.0.0"
    license="MIT"
    kind="app"
    dependencies={{ values: [deps.opentelemetryApi, deps.opentelemetryContextZone, deps.opentelemetryExporterTraceOtlpProto, deps.opentelemetryResources, deps.opentelemetrySdkNode, deps.opentelemetrySdkTraceWeb, deps.vitestBrowserPlaywright, deps.vite, deps.vitest] }}
  />,
);
