import { defineConfig, mergeConfig } from 'vite';
import type { UserConfig } from 'vite';
import type { DefineLibraryOptions } from '../typings';
import { loadLibraryPlugins } from '../plugins';
import { readPackageJSON } from '@wm/utils';

export function defineLibraryConfig(userConfigPromise?: DefineLibraryOptions) {
  return defineConfig(async (config) => {
    const options = await userConfigPromise?.(config);
    const { command, mode } = config;
    const { library = {}, vite = {} } = options || {};
    const root = process.cwd();
    const isBuild = command === 'build';
    const plugins = await loadLibraryPlugins({
      dts: false,
      injectLibCss: true,
      isBuild,
      mode,
      ...library,
    });

    const { dependencies = {}, peerDependencies = {} } =
      await readPackageJSON(root);

    const externalPackages = [
      ...Object.keys(dependencies),
      ...Object.keys(peerDependencies),
    ];

    const applicationConfig: UserConfig = {
      build: {
        lib: {
          entry: 'src/index.ts',
          fileName: () => 'index.mjs',
          formats: ['es'],
        },
        rollupOptions: {
          external: (id) => {
            return externalPackages.some(
              (pkg) => id === pkg || id.startsWith(`${pkg}/`),
            );
          },
        },
      },
      plugins,
    };

    return mergeConfig(applicationConfig, vite);
  });
}
