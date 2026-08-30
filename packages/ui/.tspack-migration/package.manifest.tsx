import {
  Package,
  Publish,
  Targets,
  Tools,
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
 * Generated migration draft for packages/ui/package.json.
 * Identity and package.json dependency sections are compatibility-derived facts.
 * MIGRATION_TODO_* comments mark unresolved or manually authored semantics.
 */
const deps = defineDeps({
  vitest: peer(workspace("vitest")),
  vitestUtils: dep(workspace("@vitest/utils"), { key: "@vitest/utils" }),
  fflate: dep(npm("fflate", "^0.8.3")),
  flatted: dep(npm("flatted", "^3.4.4")),
  pathe: dep(npm("pathe", "^2.0.3")),
  sirv: dep(npm("sirv", "^3.0.2")),
  tinyrainbow: dep(npm("tinyrainbow", "^3.1.1")),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  fakerJsFaker: tool(npm("@faker-js/faker", "^10.6.0"), { key: "@faker-js/faker" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  iconifyJsonCarbon: tool(npm("@iconify-json/carbon", "^1.2.25"), { key: "@iconify-json/carbon" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  iconifyJsonLogos: tool(npm("@iconify-json/logos", "^1.2.13"), { key: "@iconify-json/logos" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  typesCodemirror: tool(npm("@types/codemirror", "^5.60.18"), { key: "@types/codemirror" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  typesD3Selection: tool(npm("@types/d3-selection", "^3.0.11"), { key: "@types/d3-selection" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  unocssReset: tool(npm("@unocss/reset", "^66.8.1"), { key: "@unocss/reset" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  vitejsPluginVue: tool(npm("@vitejs/plugin-vue", "^6.0.8"), { key: "@vitejs/plugin-vue" }),
  vitestBrowserPlaywright: tool(workspace("@vitest/browser-playwright"), { key: "@vitest/browser-playwright" }),
  vitestBrowserPreview: tool(workspace("@vitest/browser-preview"), { key: "@vitest/browser-preview" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  vueuseCore: tool(npm("@vueuse/core", "^14.4.0"), { key: "@vueuse/core" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  ansiToHtml: tool(npm("ansi-to-html", "^0.7.2"), { key: "ansi-to-html" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  birpc: tool(npm("birpc", "^4.2.0")),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  codemirror: tool(npm("codemirror", "^5.65.18")),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  codemirrorThemeVars: tool(npm("codemirror-theme-vars", "^0.1.2"), { key: "codemirror-theme-vars" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  cookie: tool(npm("cookie", "^1.1.1")),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  d3GraphController: tool(npm("d3-graph-controller", "^3.1.13"), { key: "d3-graph-controller" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  floatingVue: tool(npm("floating-vue", "^5.2.2"), { key: "floating-vue" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  mime: tool(npm("mime", "^4.1.0")),
  rollup: tool(npm("rollup", "^4.62.5")),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  rrwebSnapshot: tool(npm("rrweb-snapshot", "2.1.1"), { key: "rrweb-snapshot" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  splitpanes: tool(npm("splitpanes", "^4.1.2")),
  typescript: tool(npm("typescript", "^5.9.3")),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  unocss: tool(npm("unocss", "^66.8.1")),
  vite: tool(npm("vite", "8.0.11")),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  vitestBrowserVue: tool(npm("vitest-browser-vue", "2.1.0"), { key: "vitest-browser-vue" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  vue: tool(npm("vue", "^3.5.41")),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  vueRouter: tool(npm("vue-router", "^5.2.0"), { key: "vue-router" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  vueTsc: tool(npm("vue-tsc", "^3.3.11"), { key: "vue-tsc" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  vueVirtualScroller: tool(npm("vue-virtual-scroller", "2.0.1"), { key: "vue-virtual-scroller" }),
});

// MIGRATION_TODO_TARGETS: Author build, test, run, and publish intent from repository evidence.
export default definePackage(
  <Package
    name="@vitest/ui"
    version="5.0.0-rc.3"
    license="MIT"
    kind="library"
    dependencies={{ values: [deps.vitest, deps.vitestUtils, deps.fflate, deps.flatted, deps.pathe, deps.sirv, deps.tinyrainbow, deps.fakerJsFaker, deps.iconifyJsonCarbon, deps.iconifyJsonLogos, deps.typesCodemirror, deps.typesD3Selection, deps.unocssReset, deps.vitejsPluginVue, deps.vitestBrowserPlaywright, deps.vitestBrowserPreview, deps.vueuseCore, deps.ansiToHtml, deps.birpc, deps.codemirror, deps.codemirrorThemeVars, deps.cookie, deps.d3GraphController, deps.floatingVue, deps.mime, deps.rollup, deps.rrwebSnapshot, deps.splitpanes, deps.typescript, deps.unocss, deps.vite, deps.vitestBrowserVue, deps.vue, deps.vueRouter, deps.vueTsc, deps.vueVirtualScroller] }}
  >
    <Tools
      values={[
        deps.fakerJsFaker,
        deps.iconifyJsonCarbon,
        deps.iconifyJsonLogos,
        deps.typesCodemirror,
        deps.typesD3Selection,
        deps.unocssReset,
        deps.vitejsPluginVue,
        deps.vitestBrowserPlaywright,
        deps.vitestBrowserPreview,
        deps.vueuseCore,
        deps.ansiToHtml,
        deps.birpc,
        deps.codemirror,
        deps.codemirrorThemeVars,
        deps.cookie,
        deps.d3GraphController,
        deps.floatingVue,
        deps.mime,
        deps.rrwebSnapshot,
        deps.splitpanes,
        deps.typescript,
        deps.unocss,
        deps.vitestBrowserVue,
        deps.vue,
        deps.vueRouter,
        deps.vueTsc,
        deps.vueVirtualScroller,
      ]}
    />
    <Targets
      rows={[
        {
          name: "node",
          language: "typescript",
          compiler: "rollup",
          compilerConfig: "rollup.config.js",
          inputs: ["node/**/*.ts", "rollup.config.js"],
          artifact: "javaScript",
          export: ".",
          entry: "node/index.ts",
          runtime: "dist/index.js",
          types: "dist/index.d.ts",
          artifacts: [
            { name: "node-javascript", kind: "javaScript", path: "dist/*.js", role: "runtimeEntry" },
            { name: "node-declarations", kind: "typeDeclarations", path: "dist/*.d.ts", role: "typeDeclaration" },
          ],
          dependsOn: ["@vitest/utils:package"],
          deps: ["@vitest/utils", "cookie", "fflate", "flatted", "pathe", "sirv", "tinyrainbow", "mime"],
          peers: ["vitest"],
        },
        {
          name: "package",
          language: "typescript",
          compiler: "vite",
          compilerConfig: "vite.config.ts",
          artifact: "staticAsset",
          export: "./client",
          entry: "index.html",
          runtime: "dist/client/index.html",
          types: "",
          artifacts: [
            { name: "client-entry", kind: "staticAsset", path: "dist/client/index.html", role: "runtimeEntry" },
            { name: "client-assets", kind: "staticAsset", path: "dist/client/assets/*", role: "staticAsset" },
          ],
          dependsOn: [
            "node",
            "@vitest/browser-playwright:package",
            "@vitest/browser-preview:package",
            "@vitest/utils:package",
          ],
          deps: [
            "@faker-js/faker",
            "@iconify-json/carbon",
            "@iconify-json/logos",
            "@types/codemirror",
            "@types/d3-selection",
            "@unocss/reset",
            "@vitejs/plugin-vue",
            "@vitest/browser-playwright",
            "@vitest/browser-preview",
            "@vitest/utils",
            "@vueuse/core",
            "ansi-to-html",
            "birpc",
            "codemirror",
            "codemirror-theme-vars",
            "cookie",
            "d3-graph-controller",
            "fflate",
            "flatted",
            "floating-vue",
            "mime",
            "pathe",
            "rrweb-snapshot",
            "sirv",
            "splitpanes",
            "tinyrainbow",
            "unocss",
            "vitest-browser-vue",
            "vue",
            "vue-router",
            "vue-virtual-scroller",
          ],
          peers: ["vitest"],
        },
      ]}
    />
    <Publish include={["*.d.ts", "dist"]} exclude={[]} />
  </Package>,
);
