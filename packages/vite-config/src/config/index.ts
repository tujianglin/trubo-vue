import { existsSync } from 'fs';
import { join } from 'path';
import { defineApplicationConfig } from './application';
import type { DefineConfig } from '../typings';
import { defineLibraryConfig } from './library';

export * from './application';

export function defineConfig(
  userConfigPromise?: DefineConfig,
  type: 'application' | 'auto' | 'library' = 'auto',
) {
  let projectType = type;
  // 根据包是否存在 index.html,自动判断类型
  if (type === 'auto') {
    const htmlPath = join(process.cwd(), 'index.html');
    projectType = existsSync(htmlPath) ? 'application' : 'library';
  }
  switch (projectType) {
    case 'application': {
      return defineApplicationConfig(userConfigPromise);
    }
    case 'library': {
      return defineLibraryConfig(userConfigPromise);
    }
    default: {
      throw new Error(`Unsupported project type: ${projectType}`);
    }
  }
}
