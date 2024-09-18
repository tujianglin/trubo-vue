import type {
  ApplicationPluginOptions,
  CommonPluginOptions,
  ConditionPlugin,
} from '../typings';
import type { PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import viteVueDevTools from 'vite-plugin-vue-devtools';
import Unocss from 'unocss/vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import { viteInjectAppLoadingPlugin } from './inject-app-loading';

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
