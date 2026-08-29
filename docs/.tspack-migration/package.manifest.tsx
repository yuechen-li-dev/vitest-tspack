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
 * Generated migration draft for docs/package.json.
 * Identity and package.json dependency sections are compatibility-derived facts.
 * MIGRATION_TODO_* comments mark unresolved or manually authored semantics.
 */
const deps = defineDeps({
  vueuseCore: dep(npm("@vueuse/core", "^14.4.0"), { key: "@vueuse/core" }),
  vue: dep(npm("vue", "^3.5.41")),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  antfuNi: tool(npm("@antfu/ni", "^30.5.0"), { key: "@antfu/ni" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  iconifyJsonCarbon: tool(npm("@iconify-json/carbon", "^1.2.25"), { key: "@iconify-json/carbon" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  iconifyJsonLogos: tool(npm("@iconify-json/logos", "^1.2.13"), { key: "@iconify-json/logos" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  iconifyVue: tool(npm("@iconify/vue", "^5.0.1"), { key: "@iconify/vue" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  shikijsTransformers: tool(npm("@shikijs/transformers", "^4.4.3"), { key: "@shikijs/transformers" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  shikijsVitepressTwoslash: tool(npm("@shikijs/vitepress-twoslash", "^4.4.3"), { key: "@shikijs/vitepress-twoslash" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  unocssReset: tool(npm("@unocss/reset", "^66.8.1"), { key: "@unocss/reset" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  vitePwaAssetsGenerator: tool(npm("@vite-pwa/assets-generator", "^1.0.2"), { key: "@vite-pwa/assets-generator" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  vitePwaVitepress: tool(npm("@vite-pwa/vitepress", "^1.1.0"), { key: "@vite-pwa/vitepress" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  vitejsPluginVue: tool(npm("@vitejs/plugin-vue", "^6.0.8"), { key: "@vitejs/plugin-vue" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  voidzeroDevVitepressTheme: tool(npm("@voidzero-dev/vitepress-theme", "^5.0.6"), { key: "@voidzero-dev/vitepress-theme" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  httpsLocalhost: tool(npm("https-localhost", "^4.7.1"), { key: "https-localhost" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  tinyglobby: tool(npm("tinyglobby", "^0.2.17")),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  unocss: tool(npm("unocss", "^66.8.1")),
  vite: tool(npm("vite", "^6.3.5")),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  vitePluginPwa: tool(npm("vite-plugin-pwa", "^1.3.0"), { key: "vite-plugin-pwa" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  vitepress: tool(npm("vitepress", "2.0.0-alpha.19")),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  vitepressPluginGroupIcons: tool(npm("vitepress-plugin-group-icons", "^1.7.6"), { key: "vitepress-plugin-group-icons" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  vitepressPluginLlms: tool(npm("vitepress-plugin-llms", "^1.13.5"), { key: "vitepress-plugin-llms" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  vitepressPluginTabs: tool(npm("vitepress-plugin-tabs", "^0.9.1"), { key: "vitepress-plugin-tabs" }),
  // MIGRATION_TODO_DEP_CLASSIFICATION: mechanically classified from devDependencies.
  workboxWindow: tool(npm("workbox-window", "^7.4.1"), { key: "workbox-window" }),
});

// MIGRATION_TODO_TARGETS: Author build, test, run, and publish intent from repository evidence.
export default definePackage(
  <Package
    name="docs"
    version="0.0.0"
    kind="app"
    dependencies={{ values: [deps.vueuseCore, deps.vue, deps.antfuNi, deps.iconifyJsonCarbon, deps.iconifyJsonLogos, deps.iconifyVue, deps.shikijsTransformers, deps.shikijsVitepressTwoslash, deps.unocssReset, deps.vitePwaAssetsGenerator, deps.vitePwaVitepress, deps.vitejsPluginVue, deps.voidzeroDevVitepressTheme, deps.httpsLocalhost, deps.tinyglobby, deps.unocss, deps.vite, deps.vitePluginPwa, deps.vitepress, deps.vitepressPluginGroupIcons, deps.vitepressPluginLlms, deps.vitepressPluginTabs, deps.workboxWindow] }}
  />,
);
