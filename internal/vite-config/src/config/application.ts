import { defineConfig, loadEnv, mergeConfig } from 'vite';
import type { UserConfig } from 'vite';
import type { DefineApplicationOptions } from '../typings';
import { loadApplicationPlugins } from '../plugins';
import { loadAndConvertEnv } from '../utils/env';

export function defineApplicationConfig(
  userConfigPromise?: DefineApplicationOptions,
) {
  return defineConfig(async (config) => {
    const options = await userConfigPromise?.(config);
    const { port } = await loadAndConvertEnv();
    const { command, mode } = config;
    const { application = {}, vite = {} } = options || {};
    const root = process.cwd();
    const isBuild = command === 'build';
    const env = loadEnv(mode, root);
    const plugins = await loadApplicationPlugins({
      env,
      mode,
      isBuild,
      devtools: true,
      html: true,
      injectAppLoading: true,
      ...application,
    });
    const applicationConfig: UserConfig = {
      base: './',
      build: {
        rollupOptions: {
          output: {
            assetFileNames: '[ext]/[name]-[hash].[ext]',
            chunkFileNames: 'js/[name]-[hash].mjs',
            entryFileNames: 'jse/index-[name]-[hash].mjs',
          },
        },
        target: 'es2015',
      },
      css: {
        preprocessorOptions: {
          less: {
            javascriptEnabled: true,
          },
        },
      },
      esbuild: {
        drop: isBuild ? ['debugger'] : [],
        legalComments: 'none',
      },
      plugins,
      server: {
        host: true,
        port,
        warmup: {
          // 预热文件
          clientFiles: [
            './index.html',
            './bootstrap.ts',
            './src/{views,layouts,router,store,api}/*',
          ],
        },
      },
    };

    return mergeConfig(applicationConfig, vite);
  });
}
