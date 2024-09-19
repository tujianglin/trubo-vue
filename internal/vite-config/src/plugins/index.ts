import type {
  ApplicationPluginOptions,
  CommonPluginOptions,
  ConditionPlugin,
  LibraryPluginOptions,
} from '../typings';
import type { PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import viteVueDevTools from 'vite-plugin-vue-devtools';
import Unocss from 'unocss/vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import viteDtsPlugin from 'vite-plugin-dts';
import { viteInjectAppLoadingPlugin } from './inject-app-loading';
import { libInjectCss as viteLibInjectCss } from 'vite-plugin-lib-inject-css';

/**
 * 获取条件成立的 vite 插件
 * @param conditionPlugins
 */
export async function loadConditionPlugins(
  conditionPlugins: ConditionPlugin[],
) {
  const plugins: PluginOption[] = [];
  for (const conditionPlugin of conditionPlugins) {
    if (conditionPlugin.condition) {
      const realPlugins = await conditionPlugin.plugins();
      plugins.push(...realPlugins);
    }
  }
  return plugins.flat();
}

/**
 * 根据条件获取通用的vite插件
 */
export async function loadCommonPlugins(
  options: CommonPluginOptions,
): Promise<ConditionPlugin[]> {
  const { devtools, isBuild } = options;
  return [
    {
      condition: true,
      plugins: () => [
        vue({
          script: {
            defineModel: true,
          },
        }),
        vueJsx(),
        Unocss(),
      ],
    },

    {
      condition: !isBuild && devtools,
      plugins: () => [viteVueDevTools()],
    },
  ];
}

// app插件
export async function loadApplicationPlugins(
  options: ApplicationPluginOptions,
): Promise<PluginOption[]> {
  const { html, injectAppLoading, isBuild, env, ...commonOptions } = options;
  const commonPlugins = await loadCommonPlugins(commonOptions);
  return await loadConditionPlugins([
    ...commonPlugins,
    {
      condition: injectAppLoading,
      plugins: async () => [await viteInjectAppLoadingPlugin(!!isBuild, env)],
    },
    {
      condition: !!html,
      plugins: () => [createHtmlPlugin({ minify: true })],
    },
  ]);
}

// 工具包插件
export async function loadLibraryPlugins(
  options: LibraryPluginOptions,
): Promise<PluginOption[]> {
  // 单独取，否则commonOptions拿不到
  const isBuild = options.isBuild;
  const { dts, injectLibCss, ...commonOptions } = options;
  const commonPlugins = await loadCommonPlugins(commonOptions);
  return await loadConditionPlugins([
    ...commonPlugins,
    {
      condition: isBuild && !!dts,
      plugins: () => [viteDtsPlugin({ logLevel: 'error' })],
    },
    {
      condition: injectLibCss,
      plugins: () => [viteLibInjectCss()],
    },
  ]);
}
