import type { ConfigEnv, UserConfig, PluginOption } from 'vite';
import type { PluginOptions } from 'vite-plugin-dts';

export interface CommonPluginOptions {
  /** 是否开启devtools */
  devtools?: boolean;
  /** 环境变量 */
  env?: Record<string, any>;
  /** 是否构建模式 */
  isBuild?: boolean;
  /** 构建模式 */
  mode?: string;
}
/**
 * 用于判断是否需要加载插件
 */
export interface ConditionPlugin {
  // 判断条件
  condition?: boolean;
  // 插件对象
  plugins: () => PluginOption[] | PromiseLike<PluginOption[]>;
}

export interface ApplicationPluginOptions extends CommonPluginOptions {
  /** 是否开启html插件  */
  html?: boolean;
  /** 是否注入app loading */
  injectAppLoading?: boolean;
}

export interface LibraryPluginOptions extends CommonPluginOptions {
  /** 开启 dts 输出 */
  dts?: boolean | PluginOptions;

  /** 是否注入lib css */
  injectLibCss?: boolean;
}

export type ApplicationOptions = ApplicationPluginOptions;
export type LibraryOptions = LibraryPluginOptions;

export type DefineConfig = DefineApplicationOptions | DefineLibraryOptions;

export type DefineApplicationOptions = (config?: ConfigEnv) => Promise<{
  application?: ApplicationOptions;
  vite?: UserConfig;
}>;

export type DefineLibraryOptions = (config?: ConfigEnv) => Promise<{
  library?: LibraryOptions;
  vite?: UserConfig;
}>;
